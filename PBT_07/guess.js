// ========== GAME DOAN SO ==========

const MAX_LUOT = 7;

// luu toan bo trang thai game o day
let state = {
    dapAn: 0,
    luot: 0,
    daDoan: [],
    xong: false,
};

// khoi tao / reset game
const resetGame = () => {
    state = {
        dapAn: Math.floor(Math.random() * 100) + 1,
        luot: 0,
        daDoan: [],
        xong: false,
    };

    qs("#inp").value = "";
    qs("#inp").disabled = false;
    qs("#btnGuess").disabled = false;
    qs("#history").textContent = "";
    qs("#counter").textContent = `Con ${MAX_LUOT} luot`;
    hideMsg();
};

// helper query
const qs = sel => document.querySelector(sel);

const showMsg = (text, type) => {
    const el = qs("#msg");
    el.textContent = text;
    el.className = "msg " + type;
    el.style.display = "block";
};

const hideMsg = () => {
    qs("#msg").style.display = "none";
};

const lockGame = () => {
    state.xong = true;
    qs("#inp").disabled = true;
    qs("#btnGuess").disabled = true;
    qs("#counter").textContent = "";
};

// xu ly moi lan nhan Doan
const xuLyDoan = () => {
    if (state.xong) return;

    const raw = qs("#inp").value.trim();
    const so  = Number(raw);

    // validate
    if (!raw || isNaN(so) || !Number.isInteger(so)) {
        showMsg("Nhap so nguyen hop le!", "warn");
        return;
    }
    if (so < 1 || so > 100) {
        showMsg("Chi chap nhan so tu 1 den 100!", "warn");
        return;
    }
    if (state.daDoan.includes(so)) {
        showMsg(`So ${so} da doan roi, thu so khac di!`, "warn");
        return;
    }

    // cap nhat state
    state.daDoan.push(so);
    state.luot++;
    qs("#inp").value = "";
    qs("#history").textContent = `Da doan: ${state.daDoan.join(", ")}`;

    // doan dung
    if (so === state.dapAn) {
        showMsg(`Chinh xac! Ban doan dung sau ${state.luot} luot!`, "win");
        lockGame();
        return;
    }

    // het luot
    if (state.luot >= MAX_LUOT) {
        showMsg(`Het luot! Dap an la ${state.dapAn}.`, "lose");
        lockGame();
        return;
    }

    // goi y
    const con = MAX_LUOT - state.luot;
    const hint = so < state.dapAn ? "Cao hon!" : "Thap hon!";
    showMsg(`${hint} Con ${con} luot.`, "hint");
    qs("#counter").textContent = `Luot ${state.luot}/${MAX_LUOT}`;
};

// bat su kien
document.addEventListener("DOMContentLoaded", () => {
    resetGame();

    qs("#btnGuess").addEventListener("click", xuLyDoan);
    qs("#btnReset").addEventListener("click", resetGame);

    // enter de doan
    qs("#inp").addEventListener("keydown", e => {
        if (e.key === "Enter") xuLyDoan();
    });
});
