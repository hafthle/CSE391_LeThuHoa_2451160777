// Xu ly du lieu sinh vien
// Chay: node student_data.js

const students = [
    { name: "An",    math: 8,  physics: 7, cs: 9, gender: "M" },
    { name: "Binh",  math: 6,  physics: 9, cs: 7, gender: "F" },
    { name: "Chi",   math: 9,  physics: 6, cs: 8, gender: "F" },
    { name: "Dung",  math: 5,  physics: 5, cs: 6, gender: "M" },
    { name: "Em",    math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3,  physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7,  physics: 7, cs: 7, gender: "F" },
    { name: "Huy",   math: 4,  physics: 6, cs: 3, gender: "M" },
];

// --- 1. Tinh diem trung binh ---
function tinhTB(sv) {
    let tb = sv.math * 0.4 + sv.physics * 0.3 + sv.cs * 0.3;
    return parseFloat(tb.toFixed(1));
}

// --- 2. Xep loai ---
function xepLoai(tb) {
    if (tb >= 8.0) return "Gioi";
    else if (tb >= 6.5) return "Kha";
    else if (tb >= 5.0) return "Trung binh";
    else return "Yeu";
}

// --- 3. In bang ket qua ---
console.log("BANG KET QUA:");
console.log("| STT | Ten    | TB   | Xep loai    |");
console.log("|-----|--------|------|-------------|");

for (let i = 0; i < students.length; i++) {
    let sv   = students[i];
    let tb   = tinhTB(sv);
    let loai = xepLoai(tb);

    let stt  = String(i + 1).padEnd(3);
    let ten  = sv.name.padEnd(6);
    let diem = String(tb.toFixed(1)).padEnd(4);
    let xl   = loai.padEnd(11);

    console.log(`| ${stt} | ${ten} | ${diem} | ${xl} |`);
}

// --- 4. Dem so SV moi xep loai ---
let soGioi = 0, soKha = 0, soTB = 0, soYeu = 0;

for (let i = 0; i < students.length; i++) {
    let loai = xepLoai(tinhTB(students[i]));
    if (loai === "Gioi")        soGioi++;
    else if (loai === "Kha")    soKha++;
    else if (loai === "Trung binh") soTB++;
    else                        soYeu++;
}

console.log("\nTHONG KE XEP LOAI:");
console.log("Gioi: "       + soGioi + " sinh vien");
console.log("Kha: "        + soKha  + " sinh vien");
console.log("Trung binh: " + soTB   + " sinh vien");
console.log("Yeu: "        + soYeu  + " sinh vien");

// --- 5. SV cao nhat va thap nhat ---
let caoNhat = students[0];
let thapNhat = students[0];

for (let i = 1; i < students.length; i++) {
    let tb = tinhTB(students[i]);
    if (tb > tinhTB(caoNhat))  caoNhat  = students[i];
    if (tb < tinhTB(thapNhat)) thapNhat = students[i];
}

console.log("\nSV DIEM CAO NHAT: " + caoNhat.name  + " (TB: " + tinhTB(caoNhat)  + ")");
console.log("SV DIEM THAP NHAT: " + thapNhat.name + " (TB: " + tinhTB(thapNhat) + ")");

// --- 6. Diem TB tung mon ---
let tongMath = 0, tongPhysics = 0, tongCs = 0;

for (let i = 0; i < students.length; i++) {
    tongMath    += students[i].math;
    tongPhysics += students[i].physics;
    tongCs      += students[i].cs;
}

let n = students.length;
console.log("\nDIEM TB TUNG MON:");
console.log("Math:    " + (tongMath    / n).toFixed(2));
console.log("Physics: " + (tongPhysics / n).toFixed(2));
console.log("CS:      " + (tongCs      / n).toFixed(2));

// --- 7. Bonus: TB theo gioi tinh ---
let tongNam = 0, tongNu = 0, soNam = 0, soNu = 0;

for (let i = 0; i < students.length; i++) {
    let tb = tinhTB(students[i]);
    if (students[i].gender === "M") { tongNam += tb; soNam++; }
    else                            { tongNu  += tb; soNu++;  }
}

console.log("\nDIEM TB THEO GIOI TINH:");
console.log("Nam: " + (tongNam / soNam).toFixed(2));
console.log("Nu:  " + (tongNu  / soNu).toFixed(2));
