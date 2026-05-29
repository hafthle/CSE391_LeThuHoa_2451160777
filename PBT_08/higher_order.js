function pipe(...fns) {
    return (val) => fns.reduce((acc, fn) => fn(acc), val);
}

console.log("=== pipe() ===");

const process = pipe(
    x => x * 2,
    x => x ** 2,
    x => x.toString(),
    x => "Ket qua: " + x
);
console.log(process(5)); // → "Ket qua: 20"

// ung dung thuc te: xu ly gia
const xuLyGia = pipe(
    (p) => p * 1.1,                              // them 10% VAT
    (p) => Math.round(p),                        // lam tron
    (p) => p.toLocaleString("vi-VN") + "d"       // dinh dang
);
console.log(xuLyGia(25990000));


// ============================================================
// 2. memoize() — cache ket qua, khong tinh lai lan 2
// ============================================================

function memoize(fn) {
    const store = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (store.has(key)) return store.get(key);
        const result = fn(...args);
        store.set(key, result);
        return result;
    };
}

console.log("\n=== memoize() ===");

const expensiveCalc = memoize((n) => {
    console.log("Dang tinh...");
    let total = 0;
    for (let i = 0; i < n; i++) total += i ** 2;
    return total;
});

console.log(expensiveCalc(1000000)); // in "Dang tinh..." lan 1
console.log(expensiveCalc(1000000)); // lay cache, khong in "Dang tinh..."
console.log(expensiveCalc(500000));  // tham so khac → tinh lai
console.log(expensiveCalc(500000));  // cache lai

const memoAdd = memoize((a, b) => {
    console.log(`Binh phuong ${a} ** ${b}`);
    return a ** b;
});
console.log(memoAdd(3, 4)); // tinh
console.log(memoAdd(3, 4)); // cache
console.log(memoAdd(5, 6)); // tinh moi


// ============================================================
// 3. debounce() — chi chay sau khi user ngung nhap
// ============================================================

function debounce(fn, ms) {
    let handle;
    return function(...args) {
        clearTimeout(handle);
        handle = setTimeout(() => fn(...args), ms);
    };
}

console.log("\n=== debounce() ===");

const search = debounce((q) => {
    console.log("Searching:", q);
}, 500);

// goi lien tuc, chi lan cuoi chay
search("i");
search("ip");
search("iph");
search("ipho");
search("iphon");
search("iphone");

setTimeout(() => {
    console.log("(Sau 600ms, chi in mot lan)");
}, 600);


// ============================================================
// 4. retry() — thu lai neu loi
// ============================================================

async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        } catch (err) {
            if (attempt === maxAttempts) throw err;
            console.log(`Lan thu ${attempt} that bai: ${err.message}. Thu lai...`);
        }
    }
}

console.log("\n=== retry() ===");

// api that bai 2 lan, thanh cong lan 3
let hits = 0;
const flakyApi = () => new Promise((ok, fail) => {
    hits++;
    hits < 3 ? fail(new Error(`Server loi lan ${hits}`)) : ok({ data: "OK", hits });
});

retry(flakyApi, 3)
    .then(r => console.log("Thanh cong:", r))
    .catch(e => console.log("That bai hoan toan:", e.message));

// api luc nao cung loi → that bai sau maxAttempts
let fails = 0;
const alwaysDown = () => new Promise((_, rej) => {
    fails++;
    rej(new Error(`Loi lan ${fails}`));
});

retry(alwaysDown, 3)
    .then(() => console.log("Khong nen toi day"))
    .catch(e => console.log("Dung roi — that bai sau 3 lan:", e.message));