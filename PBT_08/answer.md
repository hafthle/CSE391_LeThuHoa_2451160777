### A1 — Function Declaration / Expression / Arrow

Ba cách viết cùng một hàm `tinhThueBaoHiem(luong)`:

```js
// --- Cách 1: Function Declaration ---
function tinhThueBaoHiem(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
}

// --- Cách 2: Function Expression ---
const tinhThueBaoHiem = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};

// --- Cách 3: Arrow Function ---
const tinhThueBaoHiem = luong => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;

    return {
        thuong: thue,
        thuc_nhan: luong - thue
    };
};
```

**Hoisting có khác nhau không?**

Có — khác hoàn toàn.

* **Function Declaration** được hoisted toàn bộ (cả tên và nội dung hàm). Có thể gọi trước khi khai báo.
* **Function Expression** và **Arrow Function** chỉ hoisted tên biến, chưa có giá trị hàm nên gọi trước sẽ lỗi.

Ví dụ:

```js
// Function Declaration — gọi trước được
ketQua1(15000000); // chạy OK

function ketQua1(luong) {
    return luong > 11000000 ? luong * 0.1 : 0;
}

// Function Expression — lỗi
ketQua2(15000000); // TypeError

const ketQua2 = function(luong) {
    return luong > 11000000 ? luong * 0.1 : 0;
};

// Arrow Function — lỗi tương tự
ketQua3(15000000); // TypeError

const ketQua3 = luong =>
    (luong > 11000000 ? luong * 0.1 : 0);
```

Lý do: `const` và `let` nằm trong Temporal Dead Zone cho tới khi chạy tới dòng khai báo nên chưa thể dùng trước.

---

### A2 — Scope & Closure

**Đoạn 1 — counter():**

```js
1
2
3
2
2
```

**Giải thích:**
`counter()` tạo ra một closure.

Biến `count` nằm bên trong function `counter`, bên ngoài không truy cập trực tiếp được. Ba hàm `increment`, `decrement`, `getCount` cùng dùng chung biến `count` đó.

```js
function counter() {
    let count = 0;

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
```
Mỗi lần gọi hàm là thay đổi trực tiếp trên cùng một biến `count`.
---

**Đoạn 2 — var vs let trong setTimeout:**

```js
var: 3
var: 3
var: 3

let: 0
let: 1
let: 2
```

Giải thích chi tiết:

**Trường hợp `var`:**

`var` có function scope (hoặc global scope nếu không có function bao ngoài). Vòng `for` chạy xong, `i` đã bằng 3. Cả 3 callback setTimeout đăng ký sau đó đều trỏ về cùng một biến `i` — lúc chạy thì `i = 3` nên cả 3 in ra `3`.

```js
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
    // i ở đây là biến chung, không phải bản sao
}
// vòng lặp xong: i = 3
// 100ms sau, 3 callback cùng đọc i → đều ra 3
```

**Trường hợp `let`:**

`let` có block scope. Mỗi lần lặp tạo ra một biến `j` mới, độc lập. Callback của lần lặp nào thì "giữ" giá trị `j` của lần lặp đó — không bị ảnh hưởng bởi lần sau.

```js
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
    // mỗi vòng lặp có j riêng: j=0, j=1, j=2
}
// 200ms sau: in ra 0, 1, 2 đúng thứ tự
```


### A3 — Array Methods 1 dòng

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. lấy số chẵn
nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]

// 2. nhân mỗi số với 3
nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. tính tổng
nums.reduce((tong, n) => tong + n, 0);
// → 55

// 4. tìm số đầu tiên > 7
nums.find(n => n > 7);
// → 8

// 5. có số nào > 10 không
nums.some(n => n > 10);
// → false

// 6. tất cả đều > 0 không
nums.every(n => n > 0);
// → true

// 7. tạo mảng chẵn/lẻ
nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. đảo ngược không mutate gốc
[...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

---
### A4 — Object Destructuring & Spread

const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};
```

**Output dự đoán:**

```id="y9m3ke"
iPhone 16 25990000 8 Titan
ReferenceError: specs is not defined
```

Ở dòng:

```js id="v0g6qf"
const { name, price, specs: { ram, color } } = product;
```

JavaScript chỉ destructure trực tiếp `ram` và `color` từ object `specs`, chứ không tạo ra biến tên `specs`. Vì vậy khi gọi:

```js id="w8d2pn"
console.log(specs);
```

sẽ bị lỗi `ReferenceError`.

---

```id="q1n5ul"
23990000
true
25990000
```

Giải thích:

```js id="d6k8ab"
const updated = { ...product, price: 23990000, sale: true };
```

* `updated.price` được ghi đè thành `23990000`
* `updated.sale` có giá trị `true`
* `product.price` vẫn là `25990000`

Spread tạo ra object mới nên object gốc không bị thay đổi.

---

```id="c4h7rm"
16
```

Dòng:

```js id="z7x4po"
copy.specs.ram = 16;
```

làm cho:

```js id="n2v9lg"
product.specs.ram
```

cũng đổi thành `16`.

Nguyên nhân là spread (`...`) chỉ copy nông (**shallow copy**). Object `specs` bên trong vẫn được dùng chung giữa `copy` và `product`, nên sửa một bên sẽ ảnh hưởng bên còn lại.

Muốn copy sâu phải dùng:

```js id="m8f2ya"
structuredClone(product)
```
hoặc:
```js id="u3c5ew"
JSON.parse(JSON.stringify(product))
```
