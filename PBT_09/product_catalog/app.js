// --- data ---
const catalog = [
    { id: 1,  name: "iPhone 16",            price: 25990000, cat: "phone",  img: "https://placehold.co/400x300/2563eb/ffffff?text=iPhone+16",      stars: 4.5, stock: true },
    { id: 2,  name: "Samsung Galaxy S25",   price: 22990000, cat: "phone",  img: "https://placehold.co/400x300/1d4ed8/ffffff?text=Galaxy+S25",      stars: 4.3, stock: true },
    { id: 3,  name: "Xiaomi 14 Pro",        price: 18490000, cat: "phone",  img: "https://placehold.co/400x300/7c3aed/ffffff?text=Xiaomi+14",       stars: 4.2, stock: false },
    { id: 4,  name: "MacBook Air M3",       price: 32990000, cat: "laptop", img: "https://placehold.co/400x300/059669/ffffff?text=MacBook+Air",     stars: 4.8, stock: true },
    { id: 5,  name: "Dell XPS 15",          price: 28490000, cat: "laptop", img: "https://placehold.co/400x300/0d9488/ffffff?text=Dell+XPS+15",     stars: 4.4, stock: true },
    { id: 6,  name: "ASUS ROG Zephyrus",    price: 35990000, cat: "laptop", img: "https://placehold.co/400x300/dc2626/ffffff?text=ROG+Zephyrus",    stars: 4.6, stock: true },
    { id: 7,  name: "iPad Pro 13 M4",       price: 29990000, cat: "tablet", img: "https://placehold.co/400x300/d97706/ffffff?text=iPad+Pro",        stars: 4.7, stock: true },
    { id: 8,  name: "Samsung Galaxy Tab S9",price: 19990000, cat: "tablet", img: "https://placehold.co/400x300/b45309/ffffff?text=Galaxy+Tab",      stars: 4.1, stock: false },
    { id: 9,  name: "Lenovo Tab P12 Pro",   price: 14990000, cat: "tablet", img: "https://placehold.co/400x300/92400e/ffffff?text=Lenovo+Tab",      stars: 3.9, stock: true },
    { id: 10, name: "Sony WH-1000XM5",      price: 8490000,  cat: "audio",  img: "https://placehold.co/400x300/374151/ffffff?text=Sony+WH1000",     stars: 4.9, stock: true },
    { id: 11, name: "AirPods Pro 2",        price: 6990000,  cat: "audio",  img: "https://placehold.co/400x300/1f2937/ffffff?text=AirPods+Pro",     stars: 4.6, stock: true },
    { id: 12, name: "Bose QuietComfort 45", price: 7490000,  cat: "audio",  img: "https://placehold.co/400x300/111827/ffffff?text=Bose+QC45",       stars: 4.5, stock: false },
];

// --- state ---
let state = {
    cat: "all",
    query: "",
    sort: "",
    basket: 0,
    dark: false,
};

// --- DOM ---
const itemsArea   = document.getElementById("itemsArea");
const catList     = document.getElementById("catList");
const searchBox   = document.getElementById("searchBox");
const sortPicker  = document.getElementById("sortPicker");
const cartCount   = document.getElementById("cartCount");
const themeBtn    = document.getElementById("themeBtn");
const overlay     = document.getElementById("overlay");
const detailPopup = document.getElementById("detailPopup");

// --- format tiền VN ---
const vnd = (n) => n.toLocaleString("vi-VN") + "đ";

// --- lọc + sắp xếp ---
function getVisible() {
    let list = catalog.filter(p => {
        const matchCat   = state.cat === "all" || p.cat === state.cat;
        const matchQuery = !state.query || p.name.toLowerCase().includes(state.query.toLowerCase());
        return matchCat && matchQuery;
    });

    const sorters = {
        "price-low":  (a, b) => a.price - b.price,
        "price-high": (a, b) => b.price - a.price,
        "az":         (a, b) => a.name.localeCompare(b.name),
        "top-rated":  (a, b) => b.stars - a.stars,
    };

    if (sorters[state.sort]) list.sort(sorters[state.sort]);
    return list;
}

// --- render cards ---
function renderItems() {
    const visible = getVisible();
    const frag = document.createDocumentFragment();

    visible.forEach(p => {
        const card = document.createElement("div");
        card.className = "item-card" + (p.stock ? "" : " no-stock");
        card.dataset.id = p.id;

        const img = document.createElement("img");
        img.src = p.img;
        img.alt = p.name;

        const body = document.createElement("div");
        body.className = "item-body";

        const nameEl  = Object.assign(document.createElement("div"), { className: "item-name", textContent: p.name });
        const priceEl = Object.assign(document.createElement("div"), { className: "item-price", textContent: vnd(p.price) });
        const starsEl = Object.assign(document.createElement("div"), { className: "item-stars", textContent: "★".repeat(Math.floor(p.stars)) + ` ${p.stars}` });
        const catEl   = Object.assign(document.createElement("div"), { className: "item-cat", textContent: p.cat });

        body.append(nameEl, priceEl, starsEl, catEl);

        const cartBtn = document.createElement("button");
        cartBtn.className = "btn-cart";
        cartBtn.textContent = p.stock ? "Thêm giỏ" : "Hết hàng";
        cartBtn.disabled = !p.stock;
        cartBtn.dataset.action = "cart";

        card.append(img, body, cartBtn);
        frag.appendChild(card);
    });

    itemsArea.innerHTML = "";
    itemsArea.appendChild(frag);
}

// --- build category buttons ---
function buildCategories() {
    const cats = ["all", ...new Set(catalog.map(p => p.cat))];
    cats.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "cat-option" + (c === "all" ? " selected" : "");
        btn.dataset.cat = c;
        btn.textContent = c === "all" ? "Tất cả" : c[0].toUpperCase() + c.slice(1);
        catList.appendChild(btn);
    });
}

// --- popup chi tiết ---
function openPopup(product) {
    detailPopup.innerHTML = `
        <button class="popup-close" id="popupClose">✕</button>
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <div class="popup-price">${vnd(product.price)}</div>
        <div class="popup-stars">${"★".repeat(Math.floor(product.stars))} ${product.stars}/5</div>
        <div class="popup-stock">${product.stock ? "✔ Còn hàng" : "✘ Hết hàng"}</div>
    `;
    detailPopup.classList.remove("hide");
    overlay.classList.remove("hide");
    document.getElementById("popupClose").addEventListener("click", closePopup);
}

function closePopup() {
    detailPopup.classList.add("hide");
    overlay.classList.add("hide");
}

// --- event delegation cho item grid ---
itemsArea.addEventListener("click", (e) => {
    const card = e.target.closest(".item-card");
    if (!card) return;

    const product = catalog.find(p => p.id === parseInt(card.dataset.id));
    if (!product) return;

    if (e.target.dataset.action === "cart") {
        if (!product.stock) return;
        state.basket++;
        cartCount.textContent = state.basket;
        cartCount.classList.remove("hide");
        return;
    }

    openPopup(product);
});

overlay.addEventListener("click", closePopup);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closePopup(); });

// --- filter / search / sort events ---
catList.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-option");
    if (!btn) return;
    document.querySelectorAll(".cat-option").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.cat = btn.dataset.cat;
    renderItems();
});

searchBox.addEventListener("input", (e) => {
    state.query = e.target.value;
    renderItems();
});

sortPicker.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderItems();
});

themeBtn.addEventListener("click", () => {
    state.dark = !state.dark;
    document.body.classList.toggle("dark", state.dark);
    themeBtn.textContent = state.dark ? "☀ Sáng" : "☾ Tối";
});

// --- khởi động ---
buildCategories();
renderItems();