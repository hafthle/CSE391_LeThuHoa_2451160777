
## PHẦN A 

# Câu A1 — 3 Cách nhúng CSS

1. Inline CSS: Viết CSS trực tiếp vào thuộc tính style của thẻ HTML.

Ví dụ: <p style="color: red; font-size: 18px;">Xin chào!</p>

Ưu điểm: Nhanh, tiện khi test nhanh hoặc sửa 1 element duy nhất.

Nhược điểm: Code HTML rối, khó bảo trì, không tái sử dụng.

Khi nào dùng: Khi sửa gấp 1 phần tử hoặc dùng trong email marketing.

2. Internal CSS (CSS nội bộ): Viết CSS trong thẻ <style> ở phần <head> của file HTML.

Ví dụ:
```html
<head>
    <style>
        h1 { color: blue; }
        .box { margin: 10px; }
    </style>
</head>
```

Ưu điểm: Kiểm soát style của 1 trang tại 1 nơi, không cần file ngoài.

Nhược điểm: Chỉ áp dụng cho trang đó, không tái sử dụng cho trang khác.

Khi nào dùng: Khi làm trang đơn hoặc muốn style riêng cho 1 trang đặc biệt.

3. External CSS (CSS bên ngoài): Viết CSS trong file .css riêng và liên kết với HTML qua <link>.

Ví dụ:
- File style.css: body { background: #eee; } .card { padding: 15px; }
- File index.html: <head><link rel="stylesheet" href="style.css"></head>

Ưu điểm: Tách biệt HTML và CSS, dễ bảo trì, tái sử dụng cho nhiều trang.

Nhược điểm: Phải tải thêm file, có thể chậm nếu file lớn.

Khi nào dùng: Khi xây dựng website nhiều trang. Đây là cách tốt nhất cho dự án thực tế.

4. Nếu cùng 1 element bị ảnh hưởng bởi cả 3 cách: Inline CSS thắng trước, sau đó Internal và External (nếu specificity bằng nhau, cái viết sau thắng).

Giải thích: Inline có specificity cao nhất vì trực tiếp trên element. Internal và External bằng nhau, nhưng External thường đặt trước nên Internal thắng nếu xung đột.

# Câu A2 — CSS Selectors — Dự đoán kết quả

Code HTML:
```html
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article class="product">
            <h2>iPhone 16</h2>
            <p class="price">25.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
        <article class="product featured">
            <h2>MacBook Pro</h2>
            <p class="price">45.990.000đ</p>
            <p>Mô tả sản phẩm...</p>
        </article>
    </main>
</div>
```

Dự đoán:
1. h1                       → Chọn: ShopTLU
2. .price                   → Chọn: 25.990.000đ và 45.990.000đ
3. #app header              → Chọn: Toàn bộ thẻ <header>
4. nav a:first-child        → Chọn: Home
5. .product.featured h2     → Chọn: MacBook Pro
6. article > p              → Chọn: 25.990.000đ, Mô tả sản phẩm... (iPhone), 45.990.000đ, Mô tả sản phẩm... (MacBook)
7. a[href="/"]              → Chọn: Home
8. .top-bar.dark h1         → Chọn: ShopTLU

# Câu A3 — Box Model — Tính toán kích thước

Trường hợp 1: content-box (mặc định)
```css
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
→ Chiều rộng hiển thị = 400 + (20×2) + (5×2) = 450px
→ Không gian chiếm trên trang = 450 + (10×2) = 470px

Trường hợp 2: border-box
```css
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
→ Chiều rộng hiển thị = 400px
→ Kích thước content thực tế = 400 - (20×2) - (5×2) = 350px
→ Không gian chiếm trên trang = 400 + (10×2) = 420px

Trường hợp 3: Margin collapse
```css
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
→ Khoảng cách giữa box-a và box-b = 40px
→ Giải thích: Margin collapse chọn giá trị lớn nhất (40px), không cộng lại thành 65px.

Nâng cao: Nếu .box-a { margin-bottom: -10px; } và .box-b { margin-top: 40px; } 
→ Khoảng cách = 40px + (-10px) = 30px

# Câu A4 (5đ) — Specificity (Độ ưu tiên)

Cho <p class="price" id="main-price">25.990.000đ</p> và CSS:
```css
p { color: black; }                    /* Rule A */
.price { color: blue; }               /* Rule B */
#main-price { color: red; }           /* Rule C */
p.price { color: green; }             /* Rule D */
```

1. Specificity score:
   - Rule A: 0-0-1 (1 element)
   - Rule B: 0-1-0 (1 class)
   - Rule C: 1-0-0 (1 ID)
   - Rule D: 0-1-1 (1 class + 1 element)

2. Element có màu gì? Đỏ (red) — Rule C thắng vì ID có specificity cao nhất.

3. Nếu thêm style="color: orange;": Cam (orange) — Inline style thắng ID.

4. Nếu Rule A thêm !important: Đen (black) — !important thắng tất cả, kể cả inline.

### Bài B1 (20đ) — Style trang Profile

- Element selectors: `body`, `table`, `img`, `footer`.
- Class selectors: `.active`, `.highlight`.
- ID selectors: `#about`, `#skills`, `#contact`.
- Descendant selector: `header nav ul li a`.
- Pseudo-classes: `a:hover`, `tr:hover`, `tr:nth-child(even)`.

### Bài B2 (20đ) — Box Model Lab

Phần 1 — Content-box vs Border-box

- Hộp 1 (content-box): chiều rộng thực tế = 350 px (300px width + 20px padding ×2 + 5px border ×2)
- Hộp 2 (border-box): chiều rộng thực tế = 300 px (width 300px đã bao gồm padding và border)

Giải thích sự khác biệt:

Content-box là chế độ mặc định: thuộc tính `width` chỉ áp dụng cho phần content bên trong; padding và border được cộng thêm vào khiến tổng chiều rộng hiển thị = content width  + 2×padding + 2×border. Ở ví dụ này: 300 + 40 + 10 = 350px.

Border-box: `width` bao gồm cả padding và border nên tổng chiều rộng hiển thị bằng đúng giá trị `width` khai báo (300px). Vì vậy cùng một `width`+`padding`+`border` cho hai chế độ sẽ dẫn tới kết quả khác nhau trong kích thước hiển thị.

Phần 2 — Layout 3 cột

- Phiên bản `border-box`: tổng chiều rộng 3 cột = 1000px (ghi kết quả và đính kèm screenshot DevTools).
- Phiên bản `content-box`: tổng chiều rộng 3 cột = ___ px (ghi kết quả và đính kèm screenshot DevTools showing overflow > 1000px).

### Bài B3 (15đ) — Specificity Battle

1) Danh sách 10 rules (theo file `PBT_03/specificity.css`) và điểm specificity (id-class-element):

- `p { color: #777777; }` — Specificity: 0-0-1
- `body p { color: #0066cc; }` — Specificity: 0-0-2
- `section article p { color: #008000; }` — Specificity: 0-0-3
- `.text { color: #aa00aa; }` — Specificity: 0-1-0
- `[class~="text"] { color: #ff6600; }` — Specificity: 0-1-0
- `div .text { color: #0000ff; }` — Specificity: 0-1-1
- `.text.highlight { color: #ff1493; }` — Specificity: 0-2-0
- `#demo { color: #00ced1; }` — Specificity: 1-0-0
- `#demo.text { color: #8b0000; }` — Specificity: 1-1-0
- `html body section article #demo.text.highlight { color: #000000; }` — Specificity: 1-2-4

2) Element cuối cùng hiển thị màu gì? Tại sao?

- Hiển thị màu: `#000000` (đen). Vì rule cuối cùng (`html body section article #demo.text.highlight`) có specificity cao nhất (1-2-4) nên nó thắng mọi rule khác mặc dù tất cả đều target cùng phần tử.

4) Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

- Nếu đổi thứ tự giữa các rules có specificity khác nhau (ví dụ một rule có class vs một rule có id), rule có specificity cao hơn luôn thắng bất kể thứ tự xuất hiện. Vì vậy thay đổi thứ tự không làm thay đổi kết quả khi specificity khác nhau.
- Nếu có hai rules có specificity bằng nhau (ví dụ `.text {}` và `[class~="text"] {}` đều 0-1-0), thì rule xuất hiện sau trong file sẽ thắng (cascade by source order). Vì vậy thay đổi thứ tự giữa các rules cùng specificity sẽ thay đổi màu hiển thị.

### Câu C1 (10đ) 

1) Tính chiều rộng thực tế (content-box):

- Sidebar: declared = 300px; padding = 20px ×2 = 40px; border = 1px ×2 = 2px → actual = 300 + 40 + 2 = 342 px.
- Content: declared = 660px; padding = 30px ×2 = 60px; border = 1px ×2 = 2px → actual = 660 + 60 + 2 = 722 px.
- Tổng actual = 342 + 722 = 1064 px (> container 960px) → content bị đẩy xuống dòng.

2) Vì sao layout bị vỡ

- Vì đang dùng `content-box` (mặc định): `width` chỉ áp dụng cho phần content; padding và border được cộng thêm vào tổng kích thước. Do đó hai cột chiếm >960px nên không còn chỗ để nằm cạnh nhau.

3) Hai cách sửa

- Cách 1 (dùng `border-box`):
    - Thêm `.sidebar, .content { box-sizing: border-box; }` (hoặc `*{box-sizing:border-box}` global).
    - Khi đó declared width đã bao gồm padding+border ⇒ sidebar actual = 300, content actual = 660 ⇒ tổng = 960 (khít).

- Cách 2 (không dùng `border-box`):
    - Giữ `content-box` nhưng hiệu chỉnh width để bù padding+border.
    - Tổng extra = sidebar_extra + content_extra = (40+2) + (60+2) = 104. Do đó s + c phải = 960 - 104 = 856. Giữ s = 300 ⇒ c = 556.
    - Đổi `.content { width:556px; }` → actual tổng = 342 + (556+60+2) = 960.

    ## Câu C2 (10đ)

1) "Sản phẩm A" (thẻ `h2.title.highlight` bên trong `#featured`)
- `font-size` = 20px.
    - Vì có rule `.card .title { font-size: 20px; }` áp dụng trực tiếp lên `h2` (specificity đủ cao so với `body`/`.container`).
- `color` = green.
    - Các rule liên quan: `body { color: #333 }`, `.card { color: blue }`, `#featured .title { color: red }`, `.highlight { color: green !important }`.
    - `.highlight` có `!important`, nên bất kể specificity của các rule khác ra sao, `color: green !important` thắng mọi rule khác theo quy tắc `!important` của CSS.

2) "Mô tả sản phẩm" (thẻ `p` trong card `#featured`)
- `color` = blue.
    - Giải thích: có rule `.card { color: blue }` nên `.card` đặt màu cho vùng card; rule `.card p { color: inherit; }` khiến `p` kế thừa màu từ `.card` (blue). Rule `#featured .title` ảnh hưởng chỉ tới `h2`, `.highlight` áp dụng cho phần tử có class `highlight` (ở đây là `h2`) và không ảnh hưởng tới `p`.

3) "Sản phẩm B" (thẻ `h2.title` của card thứ hai)
- `font-size` = 20px.
    - Vì `.card .title { font-size: 20px }` áp dụng trực tiếp.
- `color` = blue.
    - Vì card này có `.card { color: blue }` và không có rule ID hay `!important` khác áp dụng cho `h2` này; `h2` kế thừa (hoặc nhận) màu từ `.card` → blue.

4) "Mô tả sản phẩm B" (thẻ `p.highlight`)
- `color` = green.
    - Giải thích: `p` có class `highlight`, và rule `.highlight { color: green !important; }` chứa `!important`, nên sẽ thắng mọi quy tắc khác (kể cả `.card p { color: inherit }` hay `.card { color: blue }`). Vì vậy `p.highlight` hiển thị màu green.

Ghi chú về cascade + inheritance:
- `!important` > normal declarations (bất kể specificity). Nếu có nhiều `!important`, so sánh specificity giữa chúng.
- Nếu không có `!important`, CSS chọn rule có specificity cao hơn; nếu specificity bằng nhau, chọn rule xuất hiện sau (source order).
- Thuộc tính `color` là inheritable: nếu phần tử không có color được khai báo, nó sẽ kế thừa màu từ tổ tiên gần nhất có color.

