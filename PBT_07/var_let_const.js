// ========== KIEM TRA VAR / LET / CONST ==========
// Chay: node var_let_const.js

// --- Doan 1: var hoisting ---
// var duoc khai bao truoc khi chay, gia tri la undefined
console.log("=== Doan 1 ===");
console.log(x);       // → undefined (vi var duoc hoist len dau)
var x = 5;

// --- Doan 2: let bi TDZ (Temporal Dead Zone) ---
console.log("\n=== Doan 2 ===");
try {
    console.log(y);   // → ReferenceError
    let y = 10;
} catch (e) {
    console.log("Loi:", e.message);
}

// --- Doan 3: const khong the reassign ---
console.log("\n=== Doan 3 ===");
try {
    const z = 15;
    z = 20;            // → TypeError
    console.log(z);
} catch (e) {
    console.log("Loi:", e.message);
}

// --- Doan 4: const voi array van sua duoc noi dung ---
// chi khong reassign duoc bien, con object/array van push/pop binh thuong
console.log("\n=== Doan 4 ===");
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);     // → [1, 2, 3, 4]

// --- Doan 5: let co block scope ---
console.log("\n=== Doan 5 ===");
let a = 1;
{
    let a = 2;        // bien a khac, chi song trong block nay
    console.log("Trong block:", a);   // → 2
}
console.log("Ngoai block:", a);       // → 1
