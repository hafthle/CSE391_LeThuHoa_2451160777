
## PHẦN A 

# Câu A1 (5đ) — 3 Cách nhúng CSS

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

### Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

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

### Câu A3 (7đ) — Box Model — Tính toán kích thước

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

Nâng cao: Nếu .box-a { margin-bottom: -10px; } và .box-b { margin-top: 40px; } → Khoảng cách = 40px + (-10px) = 30px

### Câu A4 (5đ) — Specificity (Độ ưu tiên)

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

## PHẦN C — DEBUG & SUY LUẬN (20 điểm)

### Câu C1 — Debug CSS Layout (Vỡ Layout)

#### Vấn đề:

Layout được mong muốn:
```
┌─────────────────────────────┐
│    Container (960px)        │
├──────────────┬──────────────┤
│  Sidebar     │   Content    │
│  (300px)     │   (660px)    │
├──────────────┴──────────────┤
└─────────────────────────────┘
```

Nhưng thực tế, content bị đẩy xuống dòng mới

#### CSS gốc:
```css
.container {
    width: 960px;
    margin: 0 auto;
}
.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}
.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

#### 1. Tính chiều rộng thực tế (content-box)

```
Sidebar chiều rộng thực tế:
= width + padding-left + padding-right + border-left + border-right
= 300 + 20 + 20 + 1 + 1
= 342px

Content chiều rộng thực tế:
= width + padding-left + padding-right + border-left + border-right
= 660 + 30 + 30 + 1 + 1
= 722px

Tổng: 342 + 722 = 1064px > 960px VO LAYOUT!
```

#### 2. Giải thích tại sao layout bị vỡ

Browser dùng box-sizing: content-box (mặc định), nên:
- width chỉ là phần content, không bao gồm padding + border
- Sidebar chiếm: 300 + 40 (padding) + 2 (border) = 342px
- Content chiếm: 660 + 60 (padding) + 2 (border) = 722px
- Tổng: 1064px > 960px container → Content bị lấn ra ngoài, đẩy xuống dòng

---

#### 3. Cách sửa — 2 phương pháp

##### Cách 1: Dùng box-sizing: border-box (Khuyến khích)

```css
* {
    box-sizing: border-box; /* Reset toàn bộ project */
}

.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}

.content {
    width: 660px;
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Tính toán:
```
Sidebar: width = 300px (đã bao gồm padding + border)
Content: width = 660px (đã bao gồm padding + border)
Tổng: 300 + 660 = 960px DUNG!
```

---

##### Cách 2: Không dùng border-box — Giảm width để tính padding

```css
.container {
    width: 960px;
    margin: 0 auto;
}

.sidebar {
    width: 258px;  /* 300 - (20*2) - (1*2) = 258 */
    padding: 20px;
    border: 1px solid #ccc;
    float: left;
}

.content {
    width: 598px;  /* 660 - (30*2) - (1*2) = 598 */
    padding: 30px;
    border: 1px solid #ccc;
    float: left;
}
```

Tính toán:
```
Sidebar: 258 + 40 + 2 = 300px
Content: 598 + 60 + 2 = 660px
Tổng: 300 + 660 = 960px DUNG!
```

---

#### So sánh 2 cách:

| Tiêu chí | Cách 1 (border-box) | Cách 2 (giảm width) |
|---|---|---|
| Dễ hiểu | Rõ ràng | Phức tạp, dễ sai |
| Bảo trì | Dễ sửa | Khó scale |
| Performance | Tương đương | Tương đương |
| Recommended | YES | Only if needed |

Best Practice: Luôn thêm dòng này ở đầu CSS file:
```css
* {
    box-sizing: border-box;
}
```

---

### Câu C2 — Cascade Puzzle (Tìm màu cuối cùng)

#### CSS:
```css
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```

#### HTML:
```html
<body>
    <div class="container">
        <div class="card" id="featured">
            <h2 class="title highlight">Sản phẩm A</h2>
            <p>Mô tả sản phẩm</p>
        </div>
        <div class="card">
            <h2 class="title">Sản phẩm B</h2>
            <p class="highlight">Mô tả sản phẩm B</p>
        </div>
    </div>
</body>
```

#### Trả lời chi tiết:

##### 1. "Sản phẩm A" (h2.title.highlight#featured)

Tính toán color:
```
Các rules áp dụng:
1. .title { ... }              → không set color
2. .card .title { font-size: 20px; }  → không set color
3. #featured .title { color: red; }   → Specificity: (1,0,1) = red
4. .highlight { color: green !important; } → Specificity: (0,1,0)!important = green

So sánh:
- Rule 3 (red): (1, 0, 1)
- Rule 4 (green !important): (0, 1, 0) + !important

!important LUON THANG mặc dù ID cao hơn
→ COLOR = GREEN
```

Tính toán font-size:
```
Inheritance từ cha mẹ:
- body: 16px
- .container: 14px (override)
- .card: không set
- .card .title { font-size: 20px; } → Trực tiếp set

→ FONT-SIZE = 20px
```

Đáp án:
- Color = green (!important thắng)
- Font-size = 20px

---

##### 2. "Mô tả sản phẩm" (p trong card featured)

```html
<div class="card" id="featured">
    <p>Mô tả sản phẩm</p>  <!-- Không có class="highlight" -->
</div>
```

Tính toán color:
```
Các rules áp dụng:
1. body { color: #333; } → Inherited
2. .container { ... } → không set color
3. .card { color: blue; } → Specificity: (0,1,0) = blue
4. .card p { color: inherit; } → Specificity: (0,1,1) = inherit

.card p có specificity (0,1,1) > .card (0,1,0)
→ Cái nào được áp dụng? .card p { color: inherit; }

color: inherit nghĩa là thừa kế từ cha → .card
→ COLOR = blue
```

Tính toán font-size:
```
Inheritance:
- body: 16px
- .container: 14px (override)
- .card: không set
- p: không set

→ FONT-SIZE = 14px (thừa kế từ .container)
```

Đáp án:
- Color = blue (inherited từ .card)
- Font-size = 14px (inherited từ .container)

---

##### 3. "Sản phẩm B" (h2.title)

```html
<div class="card">
    <h2 class="title">Sản phẩm B</h2>
</div>
```

Tính toán color:
```
Các rules áp dụng:
1. body { color: #333; } → Inherited
2. .container { ... } → không set color
3. .card { color: blue; } → Specificity: (0,1,0)
4. .card .title { font-size: 20px; } → không set color
5. .title { ... } → không set color

blue được thừa kế từ .card

Lưu ý: #featured .title { color: red; } CHI áp dụng cho h2 có id="featured"
Ở đây không có id="featured" → rule này KHONG áp dụng

→ COLOR = blue
```

Tính toán font-size:
```
Các rules:
1. body: 16px
2. .container: 14px
3. .card .title { font-size: 20px; } → Specificity: (0,2,1) = 20px

.card .title có specificity cao nhất
→ FONT-SIZE = 20px
```

Đáp án:
- Color = blue (inherited từ .card, không có #featured)
- Font-size = 20px

---

##### 4. "Mô tả sản phẩm B" (p.highlight trong card)

```html
<div class="card">
    <p class="highlight">Mô tả sản phẩm B</p>
</div>
```

Tính toán color:
```
Các rules áp dụng:
1. body { color: #333; }
2. .card { color: blue; } → Specificity: (0,1,0)
3. .card p { color: inherit; } → Specificity: (0,1,1) = inherit từ .card
4. .highlight { color: green !important; } → Specificity: (0,1,0) + !important

So sánh:
- .highlight: (0,1,0) + !important = green
- .card p: (0,1,1) = inherit = blue

!important THANG tat ca
→ COLOR = green
```

Tính toán font-size:
```
Inheritance:
- .container: 14px (không set cho p)
- .card: không set

→ FONT-SIZE = 14px
```

Đáp án:
- Color = green (!important thắng)
- Font-size = 14px

---

#### Tóm tắt bảng kết quả:

| Element | Color | Font-size |
|---|---|---|
| "Sản phẩm A" (h2.title.highlight#featured) | green (!important) | 20px |
| "Mô tả sản phẩm" (p) | blue (inherited) | 14px |
| "Sản phẩm B" (h2.title) | blue (inherited) | 20px |
| "Mô tả sản phẩm B" (p.highlight) | green (!important) | 14px |

---

## Kết luận

### **Cascade & Specificity Rules:**

1. **Specificity:** `!important` > Inline > ID > Class > Element
2. **Inheritance:** Child thừa kế từ parent (nếu không có rule trực tiếp)
3. **Cascade:** Rule được viết sau cùng thắng (nếu specificity bằng nhau)
4. **Best Practice:** Tránh dùng `!important`, tránh inline CSS, dùng External CSS

### **CSS Writing Best Practices:**

```css
/* 1. Đầu tiên: Reset box-sizing */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* 2. Base styles (body, html, etc) */
body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #333;
    line-height: 1.6;
}

/* 3. Element styles */
h1, h2, h3 { /* ... */ }
p { /* ... */ }
a { /* ... */ }

/* 4. Class styles */
.container { /* ... */ }
.card { /* ... */ }
.highlight { /* ... */ }

/* 5. ID styles (ít dùng) */
#main { /* ... */ }

/* 6. Responsive / Media queries */
@media (max-width: 768px) {
    /* ... */
}
```
