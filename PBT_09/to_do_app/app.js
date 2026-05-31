// lấy dữ liệu từ storage, nếu chưa có thì dùng mảng rỗng
const loadData = () => {
    try {
        return JSON.parse(localStorage.getItem("task_data")) ?? [];
    } catch {
        return [];
    }
};

const saveData = (arr) => localStorage.setItem("task_data", JSON.stringify(arr));

// tạo id tăng dần dựa vào data hiện tại
const makeId = (arr) => arr.reduce((max, t) => Math.max(max, t.id), 0) + 1;

// --- state ---
let taskList = loadData();
let viewMode = "all"; // all | pending | done

// --- DOM refs ---
const taskInput = document.getElementById("taskInput");
const taskListEl = document.getElementById("taskList");
const countLabel = document.getElementById("countLabel");
const btnAdd = document.getElementById("btnAdd");
const btnClear = document.getElementById("btnClear");
const tabs = document.querySelectorAll(".tab");

// --- helpers ---
const pendingCount = () => taskList.filter(t => !t.done).length;

function updateCounter() {
    const n = pendingCount();
    const txt = `${n} việc còn lại`;
    countLabel.textContent = txt;
    document.querySelector(".remaining-count").textContent = txt;
}

// check xem item có bị ẩn theo filter không
const isHidden = (task) => {
    if (viewMode === "pending") return task.done;
    if (viewMode === "done") return !task.done;
    return false;
};

// build một li từ task object
function buildItem(task) {
    const li = document.createElement("li");
    li.dataset.id = task.id;
    if (task.done) li.classList.add("is-done");
    if (isHidden(task)) li.dataset.hidden = "true";

    const nameEl = document.createElement("span");
    nameEl.className = "task-name";
    nameEl.textContent = task.text;

    // click vào tên → toggle done
    nameEl.addEventListener("click", () => toggleDone(task.id));

    // double click → edit mode
    nameEl.addEventListener("dblclick", () => startEdit(li, task));

    const delBtn = document.createElement("button");
    delBtn.className = "btn-remove";
    delBtn.textContent = "✕";
    delBtn.addEventListener("click", () => removeTask(task.id));

    li.append(nameEl, delBtn);
    return li;
}

// render toàn bộ lại
function renderList() {
    taskListEl.innerHTML = "";
    taskList.forEach(t => taskListEl.appendChild(buildItem(t)));
    updateCounter();
}

// apply filter mà không re-render toàn bộ
function applyView() {
    taskListEl.querySelectorAll("li").forEach(li => {
        const id = parseInt(li.dataset.id);
        const task = taskList.find(t => t.id === id);
        if (!task) return;
        li.dataset.hidden = isHidden(task) ? "true" : "false";
    });
}

// --- actions ---
function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    taskList.push({ id: makeId(taskList), text: trimmed, done: false });
    saveData(taskList);
    renderList();
}

function removeTask(id) {
    taskList = taskList.filter(t => t.id !== id);
    saveData(taskList);
    document.querySelector(`li[data-id="${id}"]`)?.remove();
    updateCounter();
}

function toggleDone(id) {
    const task = taskList.find(t => t.id === id);
    if (!task) return;
    task.done = !task.done;
    saveData(taskList);

    const li = document.querySelector(`li[data-id="${id}"]`);
    if (!li) return;
    li.classList.toggle("is-done", task.done);
    li.dataset.hidden = isHidden(task) ? "true" : "false";
    updateCounter();
}

function startEdit(li, task) {
    const nameEl = li.querySelector(".task-name");
    const editEl = document.createElement("input");
    editEl.className = "task-edit-input";
    editEl.value = task.text;
    nameEl.replaceWith(editEl);
    editEl.focus();
    editEl.select();

    const finishEdit = () => {
        const newText = editEl.value.trim();
        if (newText && newText !== task.text) {
            task.text = newText;
            saveData(taskList);
        }
        const restored = document.createElement("span");
        restored.className = "task-name";
        restored.textContent = task.text;
        restored.addEventListener("click", () => toggleDone(task.id));
        restored.addEventListener("dblclick", () => startEdit(li, task));
        editEl.replaceWith(restored);
    };

    editEl.addEventListener("blur", finishEdit);
    editEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finishEdit();
        if (e.key === "Escape") {
            const restored = document.createElement("span");
            restored.className = "task-name";
            restored.textContent = task.text;
            restored.addEventListener("click", () => toggleDone(task.id));
            restored.addEventListener("dblclick", () => startEdit(li, task));
            editEl.replaceWith(restored);
        }
    });
}

// --- event binding ---
btnAdd.addEventListener("click", () => {
    addTask(taskInput.value);
    taskInput.value = "";
    taskInput.focus();
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") btnAdd.click();
});

btnClear.addEventListener("click", () => {
    taskList = taskList.filter(t => !t.done);
    saveData(taskList);
    renderList();
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        viewMode = tab.dataset.view;
        applyView();
    });
});

// --- khởi động ---
renderList();