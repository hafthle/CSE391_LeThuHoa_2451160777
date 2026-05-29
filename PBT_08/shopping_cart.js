function createCart() {
    // bien private, ben ngoai khong truy cap duoc
    let basket = [];
    let voucher = { code: null, amount: 0 };

    // tinh tong truoc giam
    const subtotal = () => basket.reduce((s, it) => s + it.price * it.qty, 0);

    // bo sung hang vao gio
    function addItem(product, qty = 1) {
        const found = basket.find(it => it.id === product.id);
        if (found) {
            found.qty += qty;
        } else {
            basket.push({ ...product, qty });
        }
    }

    // xoa hang theo id
    function removeItem(id) {
        basket = basket.filter(it => it.id !== id);
    }

    // doi so luong
    function updateQuantity(id, newQty) {
        const it = basket.find(it => it.id === id);
        if (it) it.qty = newQty;
    }

    // ap ma giam gia
    function applyDiscount(code) {
        const base = subtotal();
        const rules = {
            "SALE10":   base * 0.1,
            "SALE20":   base * 0.2,
            "FREESHIP": 30000,
        };

        if (!rules[code]) {
            console.log(`Ma "${code}" khong hop le.`);
            voucher = { code: null, amount: 0 };
            return;
        }

        voucher = { code, amount: rules[code] };
        console.log(`Ap dung ma ${code}: giam ${voucher.amount.toLocaleString("vi-VN")}d`);
    }

    // tong sau giam
    function getTotal() {
        return subtotal() - voucher.amount;
    }

    // in bang gio hang
    function printCart() {
        const W   = 70;
        const sep = "─".repeat(W);
        const base  = subtotal();
        const final = getTotal();
        const giam  = base - final;

        console.log("┌" + sep + "┐");
        console.log(
            "│ " +
            "#".padEnd(4) +
            "San pham".padEnd(22) +
            "SL".padStart(4) +
            "Don gia".padStart(16) +
            "Thanh tien".padStart(16) +
            " │"
        );
        console.log("├" + sep + "┤");

        basket.forEach((it, idx) => {
            const dong = it.price * it.qty;
            console.log(
                "│ " +
                String(idx + 1).padEnd(4) +
                it.name.padEnd(22) +
                String(it.qty).padStart(4) +
                it.price.toLocaleString("vi-VN").padStart(16) +
                dong.toLocaleString("vi-VN").padStart(16) +
                " │"
            );
        });

        console.log("├" + sep + "┤");

        if (giam > 0) {
            console.log(
                "│ " +
                "Tam tinh:".padEnd(48) +
                base.toLocaleString("vi-VN").padStart(20) + "d │"
            );
            console.log(
                "│ " +
                `Giam gia (${voucher.code}):`.padEnd(48) +
                ("-" + giam.toLocaleString("vi-VN")).padStart(20) + "d │"
            );
            console.log("├" + sep + "┤");
        }

        console.log(
            "│ " +
            "TONG CONG:".padEnd(48) +
            final.toLocaleString("vi-VN").padStart(20) + "d │"
        );
        console.log("└" + sep + "┘");
    }

    // tong so luong san pham
    function getItemCount() {
        return basket.reduce((s, it) => s + it.qty, 0);
    }

    // xoa toan bo gio
    function clearCart() {
        basket = [];
        voucher = { code: null, amount: 0 };
        console.log("Da xoa toan bo gio hang.");
    }

    return { addItem, removeItem, updateQuantity, getTotal, applyDiscount, printCart, getItemCount, clearCart };
}


// =================== CHAY TEST ===================

const cart = createCart();

console.log("=== THEM SAN PHAM ===");
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000  }, 2);
cart.addItem({ id: 1, name: "iPhone 16",   price: 25990000 }, 1); // tang len 2

console.log("\nGio hang ban dau:");
cart.printCart();

console.log("\nSo san pham:", cart.getItemCount()); // → 4

console.log("\n=== AP MA SALE10 ===");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\n=== THU MA KHONG HOP LE ===");
cart.applyDiscount("XYZ99");

console.log("\n=== AP MA FREESHIP ===");
cart.applyDiscount("FREESHIP");
cart.printCart();

console.log("\n=== XOA AIRPODS PRO ===");
cart.removeItem(3);
console.log("Sau khi xoa AirPods Pro:");
cart.printCart();
console.log("So san pham:", cart.getItemCount()); // → 2

console.log("\n=== CAP NHAT SO LUONG IPHONE → 3 ===");
cart.updateQuantity(1, 3);
cart.printCart();

console.log("\n=== XOA TOAN BO GIO ===");
cart.clearCart();
console.log("So san pham sau clear:", cart.getItemCount()); // → 0

console.log("\n=== KIEM TRA PRIVATE STATE ===");
console.log(typeof cart.basket); // → undefined (khong the truy cap tu ngoai)