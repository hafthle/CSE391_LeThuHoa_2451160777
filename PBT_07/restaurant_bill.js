// ========== HOA DON NHA HANG ==========
// Chay: node restaurant_bill.js

// 0=CN, 1=T2, 2=T3, 3=T4, 4=T5, 5=T6, 6=T7
const HOM_NAY = new Date().getDay();
const VAT_RATE  = 0.08;
const TIP_RATE  = 0.05;

const tienFormat = n => n.toLocaleString("vi-VN") + "d";

// tinh phan tram giam gia
const layPhanTramGiam = (tong) => {
    let pct = tong > 1_000_000 ? 15 : tong > 500_000 ? 10 : 0;
    if (HOM_NAY === 3) pct += 5;   // thu 4 giam them 5%
    return pct;
};

// tinh tong tien cac mon
const tongMonAn = (danhSach) =>
    danhSach.reduce((s, m) => s + m.gia * m.sl, 0);


const inHoaDon = (danhSach, coTip = true) => {
    const W = 42;
    const line  = "═".repeat(W);
    const split = "╠" + line + "╣";

    const row = (str) => {
        const pad = W - str.length;
        return `║ ${str}${" ".repeat(pad - 1)}║`;
    };

    console.log("╔" + line + "╗");
    console.log(row("       HOA DON NHA HANG"));
    console.log(split);

    // in tung mon
    danhSach.forEach((m, i) => {
        const thanh = m.gia * m.sl;
        const dong  = `${i + 1}. ${m.ten.padEnd(12)} x${m.sl}  @${tienFormat(m.gia).padEnd(8)} = ${tienFormat(thanh)}`;
        console.log(row(dong));
    });

    console.log(split);

    // tinh toan
    const tongGoc   = tongMonAn(danhSach);
    const pctGiam   = layPhanTramGiam(tongGoc);
    const soGiam    = Math.round(tongGoc * pctGiam / 100);
    const congVao   = tongGoc - soGiam;
    const vat       = Math.round(congVao * VAT_RATE);
    const tip       = coTip ? Math.round(congVao * TIP_RATE) : 0;
    const cuoiCung  = congVao + vat + tip;

    console.log(row(`Tong cong:        ${tienFormat(tongGoc).padStart(14)}`));
    console.log(row(`Giam gia (${pctGiam}%):    ${tienFormat(soGiam).padStart(14)}`));
    console.log(row(`VAT (8%):         ${tienFormat(vat).padStart(14)}`));
    console.log(row(`Tip (5%):         ${tienFormat(coTip ? tip : 0).padStart(14)}`));
    console.log(split);
    console.log(row(`THANH TOAN:       ${tienFormat(cuoiCung).padStart(14)}`));
    console.log("╚" + line + "╝\n");
};


// --- don hang nho ---
inHoaDon([
    { ten: "Pho bo",  gia: 65000, sl: 2 },
    { ten: "Tra da",  gia: 5000,  sl: 3 },
    { ten: "Bun cha", gia: 55000, sl: 1 },
], true);

// --- don hang lon (> 500k) ---
console.log("--- Test don hang lon ---");
inHoaDon([
    { ten: "Bo luc lac", gia: 180000, sl: 2 },
    { ten: "Hai san",    gia: 250000, sl: 1 },
    { ten: "Nuoc ngot",  gia: 15000,  sl: 3 },
], false);
