## TRACK A — BOOTSTRAP 5

## PHẦN A — ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — Grid System
```html
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```
- `col-12`: Áp dụng mặc định (từ 0px trở lên) — chiếm 12/12 = **100% chiều rộng**
- `col-md-6`: Từ 768px trở lên (tablet) — chiếm 6/12 = **50% chiều rộng**
- `col-lg-3`: Từ 992px trở lên (desktop) — chiếm 4 cột trong 12 = **25% chiều rộng**

**Vẽ layout ở 3 kích thước**

| Kích thước | < 768px (Mobile) | 768px - 991px (Tablet) | ≥ 992px (Desktop) |
|:---|:---|:---|:---|
| **Số cột trên hàng** | 1 cột | 2 cột | 4 cột |
| **Chiều rộng mỗi box** | 100% | 50% | 25% |
| **Layout** | Chồng lên nhau | 2 hàng, mỗi hàng 2 boxes | 1 hàng, 4 boxes |

**Sơ đồ chi tiết:**

**Mobile (< 768px):**
```
┌─────────────────────────────┐
│ Box 1 (100%)                │ (chiều rộng toàn màn hình)
├─────────────────────────────┤
│ Box 2 (100%)                │
├─────────────────────────────┤
│ Box 3 (100%)                │
├─────────────────────────────┤
│ Box 4 (100%)                │
└─────────────────────────────┘
```

**Tablet (768px - 991px):**
```
┌──────────────────┬──────────────────┐
│ Box 1 (50%)      │ Box 2 (50%)      │ (mỗi box 50% chiều rộng)
├──────────────────┼──────────────────┤
│ Box 3 (50%)      │ Box 4 (50%)      │
└──────────────────┴──────────────────┘
```

**Desktop (≥ 992px):**
```
┌────────────┬────────────┬────────────┬────────────┐
│ Box 1(25%) │ Box 2(25%) │ Box 3(25%) │ Box 4(25%) │ (mỗi box 25%)
└────────────┴────────────┴────────────┴────────────┘
```
**Câu hỏi thêm:**
**1) `col-md-6` nghĩa là gì?**

`col-md-6` = "Column Medium Breakpoint, chiếm 6 cột":
- `col`: Chỉ định đây là một cột trong grid
- `md`: Breakpoint = Medium = từ 768px trở lên
- `6`: Chiếm 6 cột trong 12 cột = 50% chiều rộng

**2) Tại sao không cần viết `col-sm-12`?**

Vì Bootstrap áp dụng quy tắc **"Mobile First"**:
- vì col-12 (không có tiền tố breakpoint) đã đặt chiều rộng 12/12 cho mọi kích thước mặc định (mobile-first). Khi tới breakpoint md/lg các lớp col-md-*/col-lg-* sẽ ghi đè. Viết thêm col-sm-12 là thừa (chỉ lặp lại giá trị đã có).
---

### Câu A2 (10đ) — Utilities & Components

### **1) Giải thích `d-none d-md-block` — Khi nào hiển thị/ẩn?**
d-none: ẩn (display: none) trên mọi kích thước (mặc định).
d-md-block: từ breakpoint md trở lên (Bootstrap: >=768px) ghi đè thành display: block.
Kết luận: phần tử sẽ ẩn trên mobile / nhỏ (<768px) và **hiện dạng block trên tablet+ / desktop** (>=768px).

### **2) Liệt kê 5 spacing utilities và giải thích:**

**Cú pháp chung:** `{m/p}{direction}-{size}`

`mt-3`: Margin Top 3, `margin-top: 1rem`, 16px: tạo khoảng cách phía trên của phần tử.
Hay dùng để: tách các section, tạo khoảng trống giữa tiêu đề và nội dung, tránh các element dính sát nhau.

`px-4`: Padding Horizontal (left + right) 4, `padding-left: 1.5rem; padding-right: 1.5rem`, 24px: tạo khoảng đệm bên trong theo chiều ngang.
Hay dùng cho: button, navbar, card, input -> giúp nội dung không dính sát mép.

`mb-auto`: Margin Bottom auto, `margin-bottom: auto`, tự động: tự động chiếm khoảng trống phía dưới. Thường dùng trong layout tự căn chỉnh.

`py-2`: Padding Vertical (top + bottom) 2, `padding-top: 0.5rem; padding-bottom: 0.5rem`, 8px + 8px: tạo khoảng đệm bên trong theo chiều dọc. Hay dùng cho: button, navbar, card, input.
-> Giúp element cao hơn và dễ nhìn hơn.

`ms-auto`: Margin Start (start = left) auto, `margin-left: auto, tự động (đẩy sang phải): Tự động đẩy phần tử sang bên phải. Hay dùng cho: menu, navbar

### **3) Sự khác nhau giữa `.container`, `.container-fluid`, `.container-md`?**
Tất cả đều là lớp bọc dùng để căn giữa và giới hạn chiều rộng nội dung.

`.container`: hộp có chiều rộng cố định từng breakpoint (responsive max-width). Ở mỗi breakpoint có max-width khác nhau; không chiếm toàn chiều ngang, có padding bên trong. Dùng cho layout bình thường, article, blog.
`.container-fluid`:chiếm 100% chiều rộng viewport (full-width) ở mọi kích thước. Thường dùng cho background hoặc layout trải toàn trang, hero section, banner toàn màn hình.
`.container-md`: chiếm toàn chiều rộng (100%) dưới breakpoint đó, và chuyển thành container cố định (max-width) từ breakpoint đó trở lên. Ví dụ .container-md là full-width dưới md, và từ md (>=768px) trở lên sẽ có max-width tương ứng breakpoint md.


#### Câu C1 (10đ) — Tùy biến Bootstrap
- Các bước; 
1. Xác định biến SASS dùng cho màu chủ đạo (ví dụ ` $primary` hoặc `$primary-color`).
2. Thay giá trị biến bằng `#E63946` trong file biến SASS.
3. Biên dịch lại SCSS sang CSS bằng Dart Sass (`sass`) hoặc chạy task build của project.


Tại sao KHÔNG nên override trực tiếp ` .btn-primary { background: red; }`
- **Bảo trì:** Thay đổi biến một chỗ cập nhật toàn site; override selector phải sửa nhiều chỗ.
- **Nhất quán giao diện:** Các thành phần khác (border, hover, focus, disabled) thường dùng cùng biến — dùng biến giữ tất cả đồng bộ.
- **Theming & reuse:** Dễ tạo theme (ví dụ light/dark) hoặc đổi nhanh bằng cách thay vài biến, không phải tìm/replace CSS.
- **Phép toán màu:** SASS cho phép dùng `lighten()`, `darken()`, `mix()` trên biến màu để tự sinh hover/active tự động.
- **Tránh vấn đề specificity/cascade:** Việc ghi đè selector có thể cần `!important` hoặc selectors phức tạp; biến tránh rối này. 