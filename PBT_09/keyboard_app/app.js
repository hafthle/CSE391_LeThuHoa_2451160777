// --- data ---
const photos = [
    { src: "https://placehold.co/900x500/1e3a5f/ffffff?text=Mountain+Dawn",  cap: "Mountain Dawn — Bình minh trên núi" },
    { src: "https://placehold.co/900x500/14532d/ffffff?text=Forest+Path",     cap: "Forest Path — Con đường trong rừng" },
    { src: "https://placehold.co/900x500/7c2d12/ffffff?text=Desert+Dunes",    cap: "Desert Dunes — Đồi cát sa mạc" },
    { src: "https://placehold.co/900x500/1e1b4b/ffffff?text=Night+City",      cap: "Night City — Thành phố về đêm" },
    { src: "https://placehold.co/900x500/064e3b/ffffff?text=Ocean+Calm",      cap: "Ocean Calm — Mặt biển yên tĩnh" },
    { src: "https://placehold.co/900x500/4c1d95/ffffff?text=Lavender+Field",  cap: "Lavender Field — Cánh đồng hoa oải hương" },
    { src: "https://placehold.co/900x500/7f1d1d/ffffff?text=Autumn+Leaves",   cap: "Autumn Leaves — Lá mùa thu" },
    { src: "https://placehold.co/900x500/134e4a/ffffff?text=Waterfall",       cap: "Waterfall — Thác nước" },
    { src: "https://placehold.co/900x500/1c1917/ffffff?text=Volcano+Glow",    cap: "Volcano Glow — Ánh sáng núi lửa" },
];

// command palette entries
const cmds = [
    { ico: "🖼️", lbl: "Mở Gallery",         key: "—",      fn: () => viewerSection.scrollIntoView({ behavior: "smooth" }) },
    { ico: "▶️", lbl: "Play / Dừng Slideshow", key: "Space", fn: () => toggleSlide() },
    { ico: "⏭️", lbl: "Ảnh tiếp theo",        key: "→",     fn: () => jumpTo(pos + 1) },
    { ico: "⏮️", lbl: "Ảnh trước",            key: "←",     fn: () => jumpTo(pos - 1) },
    { ico: "1️⃣", lbl: "Ảnh số 1",              key: "1",     fn: () => jumpTo(0) },
    { ico: "5️⃣", lbl: "Ảnh số 5",              key: "5",     fn: () => jumpTo(4) },
    { ico: "9️⃣", lbl: "Ảnh số 9",              key: "9",     fn: () => jumpTo(8) },
    { ico: "🔍", lbl: "Mở Command Palette",    key: "Ctrl+K", fn: () => openPalette() },
    { ico: "❌", lbl: "Đóng tất cả",           key: "Esc",   fn: () => { closeLb(); closePalette(); } },
];

// --- state ---
let pos = 0;
let slideTimer = null;
let hlIdx = -1;

// --- DOM refs ---
const viewerSection = document.getElementById("viewerSection");
const mainPhoto     = document.getElementById("mainPhoto");
const mainCaption   = document.getElementById("mainCaption");
const photoNum      = document.getElementById("photoNum");
const thumbStrip    = document.getElementById("thumbStrip");
const slideStatus   = document.getElementById("slideStatus");
const prevPhoto     = document.getElementById("prevPhoto");
const nextPhoto     = document.getElementById("nextPhoto");
const photoStage    = document.getElementById("photoStage");

const lbWrap   = document.getElementById("lbWrap");
const lbBg     = document.getElementById("lbBg");
const lbPhoto  = document.getElementById("lbPhoto");
const lbCaption= document.getElementById("lbCaption");
const lbClose  = document.getElementById("lbClose");

const paletteWrap = document.getElementById("paletteWrap");
const paletteBg   = document.getElementById("paletteBg");
const palettSearch= document.getElementById("palettSearch");
const cmdItems    = document.getElementById("cmdItems");

// --- thumbnail build ---
function buildThumbs() {
    photos.forEach((p, i) => {
        const img = document.createElement("img");
        img.src = p.src;
        img.alt = p.cap;
        img.className = "thumb-img" + (i === 0 ? " current" : "");
        img.dataset.i = i;
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "listitem");
        thumbStrip.appendChild(img);
    });
}

function syncThumbs() {
    thumbStrip.querySelectorAll(".thumb-img").forEach((t, i) => {
        t.classList.toggle("current", i === pos);
    });
}

// --- display photo ---
function jumpTo(idx) {
    pos = ((idx % photos.length) + photos.length) % photos.length;
    const p = photos[pos];

    // fade swap
    mainPhoto.style.opacity = "0";
    setTimeout(() => {
        mainPhoto.src = p.src;
        mainPhoto.alt = p.cap;
        mainPhoto.style.opacity = "1";
    }, 200);

    mainCaption.textContent = p.cap;
    photoNum.textContent = `${pos + 1} / ${photos.length}`;
    syncThumbs();
}

// --- slideshow ---
function toggleSlide() {
    if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
        slideStatus.textContent = "Đã dừng slideshow.";
    } else {
        slideTimer = setInterval(() => jumpTo(pos + 1), 2500);
        slideStatus.textContent = "Slideshow đang chạy… (Space để dừng)";
    }
}

// --- lightbox ---
function openLb() {
    const p = photos[pos];
    lbPhoto.src = p.src;
    lbPhoto.alt = p.cap;
    lbCaption.textContent = p.cap;
    lbWrap.classList.remove("hide");
    lbClose.focus();
}

function closeLb() {
    lbWrap.classList.add("hide");
    photoStage.focus();
}

// --- palette ---
function openPalette() {
    paletteWrap.classList.remove("hide");
    palettSearch.value = "";
    hlIdx = -1;
    drawCmds(cmds);
    palettSearch.focus();
}

function closePalette() {
    paletteWrap.classList.add("hide");
}

function drawCmds(list) {
    cmdItems.innerHTML = "";
    hlIdx = -1;

    if (!list.length) {
        const li = document.createElement("li");
        li.className = "no-cmd";
        li.textContent = "Không tìm thấy lệnh";
        cmdItems.appendChild(li);
        return;
    }

    list.forEach((c, i) => {
        const li = document.createElement("li");
        li.dataset.idx = i;

        const ico  = Object.assign(document.createElement("span"), { className: "cmd-ico",  textContent: c.ico });
        const lbl  = Object.assign(document.createElement("span"), { className: "cmd-lbl",  textContent: c.lbl });
        const key  = Object.assign(document.createElement("span"), { className: "cmd-key",  textContent: c.key });

        li.append(ico, lbl, key);
        li.addEventListener("click", () => { c.fn(); closePalette(); });
        cmdItems.appendChild(li);
    });
}

function moveHL(dir) {
    const rows = [...cmdItems.querySelectorAll("li:not(.no-cmd)")];
    if (!rows.length) return;
    rows.forEach(r => { r.classList.remove("on"); r.removeAttribute("aria-selected"); });
    hlIdx = (hlIdx + dir + rows.length) % rows.length;
    rows[hlIdx].classList.add("on");
    rows[hlIdx].setAttribute("aria-selected", "true");
    rows[hlIdx].scrollIntoView({ block: "nearest" });
}

// --- events ---
prevPhoto.addEventListener("click", () => jumpTo(pos - 1));
nextPhoto.addEventListener("click", () => jumpTo(pos + 1));
photoStage.addEventListener("click", openLb);
lbClose.addEventListener("click", closeLb);
lbBg.addEventListener("click", closeLb);
paletteBg.addEventListener("click", closePalette);

thumbStrip.addEventListener("click", (e) => {
    const t = e.target.closest(".thumb-img");
    if (t) jumpTo(parseInt(t.dataset.i));
});

thumbStrip.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        const t = e.target.closest(".thumb-img");
        if (t) jumpTo(parseInt(t.dataset.i));
    }
});

palettSearch.addEventListener("input", () => {
    const q = palettSearch.value.toLowerCase();
    const filtered = cmds.filter(c => c.lbl.toLowerCase().includes(q) || c.key.toLowerCase().includes(q));
    drawCmds(filtered);
});

palettSearch.addEventListener("keydown", (e) => {
    const rows = [...cmdItems.querySelectorAll("li:not(.no-cmd)")];
    switch (e.key) {
        case "ArrowDown": e.preventDefault(); moveHL(1); break;
        case "ArrowUp":   e.preventDefault(); moveHL(-1); break;
        case "Enter":
            if (hlIdx >= 0 && rows[hlIdx]) rows[hlIdx].click();
            break;
        case "Escape": closePalette(); break;
    }
});

document.addEventListener("keydown", (e) => {
    // ignore khi palette mở
    if (!paletteWrap.classList.contains("hide")) return;

    switch (true) {
        case e.key === "ArrowLeft":
            e.preventDefault(); jumpTo(pos - 1); break;
        case e.key === "ArrowRight":
            e.preventDefault(); jumpTo(pos + 1); break;
        case e.key === " " && lbWrap.classList.contains("hide"):
            e.preventDefault(); toggleSlide(); break;
        case e.key === "Escape":
            closeLb(); break;
        case (e.key === "k" && (e.ctrlKey || e.metaKey)):
            e.preventDefault(); openPalette(); break;
        default:
            if (e.key >= "1" && e.key <= "9") {
                const n = parseInt(e.key) - 1;
                if (n < photos.length) jumpTo(n);
            }
    }
});

// --- init ---
buildThumbs();
jumpTo(0);