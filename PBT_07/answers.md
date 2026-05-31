# Bài tập JS Basics — Phần A + C1

---

## A1 — var / let / const

Đoán trước khi chạy:

**Đoạn 1** — `console.log(x); var x = 5;`
→ `undefined`
Vì `var` bị hoist lên đầu scope nhưng chưa có giá trị, nên đọc trước khi gán thì ra `undefined`.

**Đoạn 2** — `console.log(y); let y = 10;`
→ `ReferenceError: Cannot access 'y' before initialization`
`let` cũng bị hoist nhưng nằm trong Temporal Dead Zone, không thể đọc trước khi khai báo.

**Đoạn 3** — `const z = 15; z = 20;`
→ `TypeError: Assignment to constant variable.`
`const` không cho phép gán lại.

**Đoạn 4** — `const arr = [1,2,3]; arr.push(4);`
→ `[1, 2, 3, 4]`
`const` chỉ khóa biến (không cho trỏ sang chỗ khác), không khóa nội dung bên trong. Array vẫn thêm được phần tử.

**Đoạn 5** — block scope với `let`
→ In ra `Trong block: 2` rồi `Ngoài block: 1`
Hai biến `a` khác nhau hoàn toàn — cái trong block chỉ sống trong `{}` đó.

---

## A2 — Data Types & Coercion

| Biểu thức | Kết quả | Lý do |
|-----------|---------|-------|
| `typeof null` | `"object"` | Lỗi lịch sử từ đầu của JS, không sửa được vì sẽ vỡ web cũ |
| `typeof undefined` | `"undefined"` | đúng như tên |
| `typeof NaN` | `"number"` | NaN vẫn thuộc kiểu number, dù giá trị không hợp lệ |
| `"5" + 3` | `"53"` | `+` gặp string → nối chuỗi |
| `"5" - 3` | `2` | `-` không có nghĩa với chuỗi → ép thành số |
| `"5" * "3"` | `15` | `*` ép cả hai thành số |
| `true + true` | `2` | boolean được ép thành 0/1 khi dùng toán tử số |
| `[] + []` | `""` | cả hai thành chuỗi rỗng rồi nối lại |
| `[] + {}` | `"[object Object]"` | `[]` thành `""`, `{}` thành `"[object Object]"` |
| `{} + []` | `0` | `{}` bị đọc là block rỗng, `+[]` là ép mảng rỗng thành số = 0 |

**Tại sao `"5" + 3` khác `"5" - 3`:**
Toán tử `+` có hai vai: cộng số và nối chuỗi. Khi có string, nó ưu tiên nối. Còn `-` chỉ có một vai là trừ số, nên tự ép `"5"` thành `5` rồi tính.

---

## A3 — == vs ===

| Biểu thức | Kết quả |
|-----------|---------|
| `5 == "5"` | `true` — ép kiểu trước khi so |
| `5 === "5"` | `false` — khác kiểu là sai ngay |
| `null == undefined` | `true` — đây là case đặc biệt trong spec |
| `null === undefined` | `false` — khác kiểu |
| `NaN == NaN` | `false` — NaN không bằng chính nó |
| `0 == false` | `true` — false ép thành 0 |
| `0 === false` | `false` — khác kiểu |
| `"" == false` | `true` — cả hai về 0 sau khi ép |

**Nên dùng `===`.** Vì `==` âm thầm ép kiểu, dễ ra kết quả bất ngờ và khó debug. `===` rõ ràng hơn, ít bug hơn.

---

## A4 — Truthy & Falsy

Các giá trị Falsy trong JS (chỉ có 6 cái):
`false`, `0`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`

Kết quả if:

| Điều kiện | In không? | Lý do |
|-----------|-----------|-------|
| `"0"` | Có (in A) | chuỗi không rỗng → truthy |
| `""` | Không | chuỗi rỗng → falsy |
| `[]` | Có (in C) | mảng rỗng vẫn là object → truthy |
| `{}` | Có (in D) | object rỗng → truthy |
| `null` | Không | falsy |
| `0` | Không | falsy |
| `-1` | Có (in G) | số khác 0 → truthy |
| `" "` | Có (in H) | có space → chuỗi không rỗng → truthy |

---

## A5 — Template Literal

```js
// Cách 1
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3
const html = `<div class="card">
  <h2>${title}</h2>
  <p>${description}</p>
  <span>Giá: ${price}đ</span>
</div>`;
```

---

## C1 — Debug

Code gốc có các lỗi sau:

**Lỗi 1:** `if (giaSauGiam = 0)` — dùng `=` thay vì `===`, đây là phép gán không phải so sánh.
→ Sửa: `if (giaSauGiam === 0)`

**Lỗi 2:** `const gia = tinhGiaGiamGia("100000", 20)` — truyền chuỗi `"100000"` thay vì số.
Hàm không validate kiểu input, sẽ tính sai. Nên thêm check hoặc truyền số: `tinhGiaGiamGia(100000, 20)`.

**Lỗi 3:** Thiếu `return` hoặc xử lý khi giá đầu vào không phải số — hàm không validate `giaBan`.

**Lỗi 4:** `tinhGiaGiamGia(50000, 110)` — 110% không hợp lệ, hàm đúng là return lỗi rồi, nhưng đoạn in `"Giá: " + gia2` sẽ in ra chuỗi lỗi — cần xử lý riêng.

**Lỗi 5 (ẩn) — var trong vòng lặp + setTimeout:**
```js
for (var i = 0; i < 5; i++) {
    setTimeout(function() { console.log("Item " + i) }, 1000)
}
```
Khi chạy, cả 5 callback đều in `Item 5` vì `var i` là biến chung của toàn scope. Sau 1 giây, vòng lặp đã xong, `i` đã là 5.

→ Sửa bằng `let`:
```js
for (let i = 0; i < 5; i++) {
    setTimeout(function() { console.log("Item " + i) }, 1000)
}
```
`let` tạo ra closure riêng cho mỗi lần lặp, nên in đúng 0, 1, 2, 3, 4.

**Lỗi 6:** Thiếu dấu `;` ở một số dòng (tuy JS tự thêm nhưng dễ gây bug).
