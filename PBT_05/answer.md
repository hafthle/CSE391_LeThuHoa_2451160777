### Câu A1 (5đ) — Viewport & Mobile-First

1. Viết chính xác thẻ `<meta viewport>` chuẩn và giải thích

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

- `name="viewport"`: cho trình duyệt biết thẻ này điều khiển viewport.
- `width=device-width`: đặt chiều rộng của layout viewport bằng chiều rộng thiết bị (tính theo CSS pixels), giúp các media query hoạt động đúng theo kích thước thiết bị.
- `initial-scale=1`: thiết lập tỉ lệ phóng ban đầu là 1 (không phóng to/thu nhỏ khi load).

2. Nếu THIẾU thẻ này, iPhone sẽ hiển thị trang web như thế nào?

- Trình duyệt sẽ giả sử một "virtual viewport" rộng (thường khoảng 980px) và thu nhỏ toàn bộ layout để vừa màn hình. Kết quả: giao diện trông như bản desktop bị co lại, chữ rất nhỏ, các breakpoint responsive không hoạt động như mong muốn.

3. Mobile-First và Desktop-First khác nhau thế nào? Viết ví dụ CSS cho mỗi cách với breakpoint 768px.

- Khái niệm:
	- Mobile-First: viết styles cơ bản cho màn hình nhỏ (mobile), sau đó mở rộng cho màn hình lớn bằng `@media (min-width: ...)`.
	- Desktop-First: viết styles cơ bản cho màn hình lớn (desktop), sau đó ghi đè cho màn hình nhỏ bằng `@media (max-width: ...)`.

- Ví dụ Mobile-First (breakpoint 768px):

```css
/* Mobile-first (base = mobile) */
.nav { display: block; }
.container { padding: 16px; }

@media (min-width: 768px) {
	.nav { display: flex; }
	.container { max-width: 1100px; margin: 0 auto; padding: 24px; }
}
```

- Ví dụ Desktop-First (breakpoint 768px):

```css
/* Desktop-first (base = desktop) */
.nav { display: flex; }
.container { max-width: 1100px; margin: 0 auto; padding: 24px; }

@media (max-width: 767px) {
	.nav { display: block; }
	.container { padding: 16px; }
}
```

4. Tại sao Mobile-First được khuyên dùng?

- Progressive enhancement: bắt đầu từ trải nghiệm cơ bản (mobile) rồi mở rộng cho thiết bị mạnh hơn.
- Hiệu năng: tải ít CSS mặc định cho mobile, giảm chi phí render trên thiết bị yếu và mạng chậm.
- Dễ bảo trì: dùng `min-width` và thêm styles mở rộng thay vì ghi đè nhiều lần.
- Tối ưu UX/SEO: ưu tiên nội dung cho người dùng di động (phổ biến) và cải thiện khả năng truy cập.

---

### Câu A2 (5đ) — Breakpoints

---
- **Extra small (xs)**
	- Kích thước: < 576px (không có media query riêng; base styles)
	- Thiết bị đại diện: điện thoại nhỏ

- **Small (sm)**
	- Kích thước: ≥ 576px
	- Thiết bị đại diện: điện thoại lớn / portrait phablet
	- Media query: `@media (min-width: 576px) { ... }`

- **Medium (md)**
	- Kích thước: ≥ 768px
	- Thiết bị đại diện: tablet / small landscape tablet
	- Media query: `@media (min-width: 768px) { ... }`

- **Large (lg)**
	- Kích thước: ≥ 992px
	- Thiết bị đại diện: laptop / small desktop
	- Media query: `@media (min-width: 992px) { ... }`

- **Extra large (xl)**
	- Kích thước: ≥ 1200px
	- Thiết bị đại diện: desktop
	- Media query: `@media (min-width: 1200px) { ... }`

- **XXL (xxl)**
	- Kích thước: ≥ 1400px
	- Thiết bị đại diện: màn hình lớn / desktop cao phân giải
	- Media query: `@media (min-width: 1400px) { ... }`

### Câu A3 (5đ) — Media Queries


| Chiều rộng màn hình | `.container` width |
|---------------------|--------------------|
| 375px (iPhone SE) | 100% (≈375px) |
| 600px | 540px |
| 800px | 720px |
| 1000px | 960px |
| 1400px | 1140px |

---

### SCSS (refactor) — files added

I created a SCSS structure and compiled CSS in `PBT_05`:

- `scss/_variables.scss` — color, font, breakpoints, spacing variables
- `scss/_mixins.scss` — `respond-to()`, `flex-center`, `card-shadow`
- `scss/_components.scss` — nested `.card` block and components
- `scss/style.scss` — main file importing partials
- `style.css` — compiled CSS output

Compile command (use Dart Sass):

```
sass scss/style.scss style.css --no-source-map
```

Or compile whole folder:

```
sass scss:.
```


## Câu A4 — SCSS Basics

### Tính năng 1 — Variables

Lưu trữ giá trị vào biến có tên có nghĩa, dùng lại ở nhiều nơi. Khi cần đổi màu thương hiệu chỉ cần sửa 1 chỗ.

```scss
$color-primary:    #38bdf8;
$color-dark:       #060e1a;
$font-display:     'Syne', sans-serif;
$font-text:        'DM Sans', sans-serif;
$bp-tablet:        768px;
$bp-desktop:       1024px;
$space-sm:         8px;
$space-md:         16px;
$space-lg:         32px;

.header {
    background: $color-dark;
    font-family: $font-display;
}

.btn-primary {
    background: $color-primary;
    padding: $space-sm $space-md;
}
```

### Tính năng 2 — Nesting

Viết CSS theo cấu trúc cha–con giống HTML. Dấu `&` đại diện cho selector cha, dùng cho pseudo-class (`:hover`) và modifier (`.featured`).

```scss
.product-card {
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;

    .product-card__img {
        width: 100%;
        object-fit: cover;
    }

    .product-card__title {
        font-size: 1rem;
        font-weight: 600;
    }

    .product-card__price {
        color: $color-primary;
        font-weight: 700;
    }

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
    }

    &.featured {
        border: 2px solid $color-primary;
    }
}
```

### Tính năng 3 — Mixins

Tạo đoạn CSS có thể dùng lại như một hàm, có thể nhận tham số.

```scss
@mixin respond-to($bp) {
    @media (min-width: $bp) {
        @content;
    }
}

@mixin flex-center($gap: 0) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $gap;
}

@mixin card-hover-shadow {
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(56, 189, 248, 0.18);
    }
}

// Sử dụng
.hero {
    @include flex-center(1rem);
    height: 100vh;
}

.card {
    @include card-hover-shadow;
}

.grid {
    grid-template-columns: 1fr;

    @include respond-to($bp-tablet) {
        grid-template-columns: repeat(2, 1fr);
    }

    @include respond-to($bp-desktop) {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

### Tính năng 4 — @extend / Inheritance

Cho phép một selector kế thừa toàn bộ styles của selector khác. Placeholder `%name` không tự tạo ra CSS cho đến khi được `@extend`.

```scss
%btn-reset {
    padding: 10px 20px;
    border-radius: 7px;
    cursor: pointer;
    font-family: $font-text;
    font-size: 0.85rem;
    font-weight: 500;
    border: none;
    transition: all 0.3s ease;
}

.btn-solid {
    @extend %btn-reset;
    background: $color-primary;
    color: $color-dark;
}

.btn-outline {
    @extend %btn-reset;
    background: transparent;
    color: $color-primary;
    border: 1px solid $color-primary;
}
```

---

### Tại sao trình duyệt không đọc được file .scss?

Trình duyệt chỉ hiểu HTML, CSS thuần và JavaScript. File `.scss` có cú pháp mở rộng (variables, nesting, mixins...) không thuộc chuẩn CSS — đây là ngôn ngữ tiền xử lý (preprocessor). Cần một bước compile (biên dịch) để chuyển SCSS thành CSS thuần trước khi trình duyệt có thể dùng.

Các cách compile SCSS:

```bash
# Cài sass toàn cục qua npm
npm install -g sass

# Compile một lần
sass scss/style.scss dist/style.css

# Theo dõi và tự compile khi có thay đổi (watch mode)
sass --watch scss/style.scss dist/style.css
```

Trong VS Code: cài extension **Live Sass Compiler**, nhấn "Watch Sass" ở thanh trạng thái dưới cùng — file CSS sẽ tự động tạo ra mỗi khi lưu `.scss`.

### Câu C1 (10đ)
**Navigation thay đổi thế nào?**
- Mobile (375px): Thanh navigation bị thu gọn đáng kể để phù hợp màn hình nhỏ. Chỉ còn logo, ô tìm kiếm nhỏ và một phần menu chính. Các mục như tài khoản, địa chỉ giao hàng và nhiều shortcut bị ẩn. Không thấy menu ngang đầy đủ như desktop.
- Tablet (768px): Navigation hiển thị nhiều hơn mobile. Thanh tìm kiếm dài hơn, các menu danh mục bắt đầu xuất hiện đầy đủ hơn theo dạng hàng ngang. Tuy nhiên vẫn chưa hiển thị toàn bộ chức năng như desktop.
- Desktop (1440px): Navigation hiển thị đầy đủ theo chiều ngang gồm: logo, thanh tìm kiếm lớn, trang chủ, tài khoản, giỏ hàng, địa chỉ giao hàng.
Không sử dụng hamburger menu trong ảnh desktop; thay vào đó là horizontal navigation đầy đủ.

 **Lưới content thay đổi mấy cột?**
- Mobile (< 768px):
   + Layout gần như còn 1 cột chính.
   + Banner và sản phẩm hiển thị theo chiều dọc.
   + Sidebar danh mục bị thu hẹp đáng kể.
- Tablet (≥ 768px và < 1024px):
   + Layout khoảng 2 cột.
   + Một cột sidebar danh mục bên trái và một cột nội dung/banner bên phải.
- Desktop (≥ 1024px):
   + Layout mở rộng khoảng 3–4 cột nội dung.
   + Banner lớn hiển thị song song.
   + Hiển thị được nhiều icon dịch vụ và nhiều sản phẩm cùng lúc.
    (Website thay đổi bố cục bằng responsive layout và media queries để tăng số cột khi màn hình rộng hơn.)

- **Elements nào bị ẩn trên mobile?**
    - `.sidebar` (filter) — ẩn trên mobile, hiển thị ở tablet/desktop.
	- `.ads` (ads bar) — ẩn trên mobile và tablet, hiển thị ở desktop.
	- `.main-nav` về mặt hiển thị mặc định bị ẩn trên mobile (thay bằng hamburger).

- **Font size có thay đổi không?**
Có thay đổi theo kích thước màn hình.
   - Mobile: Font nhỏ hơn để vừa màn hình hẹp; khoảng cách giữa các chữ và menu cũng nhỏ hơn.
   - Tablet: Font tăng nhẹ giúp dễ đọc hơn và cân bằng với kích thước màn hình trung bình.
   - Desktop: Font lớn và thoáng hơn; tiêu đề, menu và nội dung dễ nhìn hơn trên màn hình rộng.
    Website sử dụng responsive typography để cải thiện readability trên từng thiết bị.

### Câu C2 (10đ) — Thiết kế trang "Đặt bàn nhà hàng" (Wireframe & CSS skeleton)

Wireframe (theo Mobile-First):

Mobile (≤ 767px)
[HEADER]
  Logo      Hotline đặt bàn

[HERO IMAGE]
  (ảnh full chiều ngang)

[FORM ĐẶT BÀN]
  [Ngày]
  [Giờ]
  [Số người]
  [Ghi chú]
  [Nút đặt bàn]

[GALLERY MÓN ĂN]
  ▢
  ▢
  ▢
  ▢
  ▢
  ▢
  (1 cột)

{GOOGLE MAP: ẩn hoặc thu nhỏ}

[FOOTER]

Tablet (768px — 1023px)
[HEADER]
  Logo -------- Hotline đặt bàn

[HERO IMAGE]
  (banner rộng)

[KHU VỰC CHÍNH]
  [FORM ĐẶT BÀN]
  (các input chia 2 cột)

[GALLERY MÓN ĂN]
  ▢ ▢
  ▢ ▢
  ▢ ▢
  (lưới 2 cột)

[GOOGLE MAP]
  (hiển thị dưới gallery)

[FOOTER]
Desktop (≥ 1024px)
[HEADER]
  Logo ---------------- Hotline đặt bàn

[HERO IMAGE]
  (banner lớn toàn chiều ngang)

[LAYOUT CHÍNH: 3 cột]

  [TRÁI]
    Sidebar:
    - Khuyến mãi
    - Giờ mở cửa
    - Thông tin nhà hàng

  [GIỮA]
    GALLERY MÓN ĂN
    ▢ ▢ ▢
    ▢ ▢ ▢
    (lưới 3 cột)

  [PHẢI]
    FORM ĐẶT BÀN
    GOOGLE MAP

[FOOTER]

Các phần bị ẩn/di chuyển theo breakpoint:

Mobile: Google Maps bị ẩn hoặc thu gọn; sidebar không hiển thị; gallery giảm còn 1 cột.
Tablet: Gallery hiển thị 2 cột; Google Maps hiển thị dưới gallery; form chia 2 cột input.
Desktop: Sidebar xuất hiện; gallery tăng lên 3 cột; form và Google Maps nằm bên phải.

CSS skeleton (Mobile-First) — chỉ layout, dùng Grid + media queries

/* Mobile-First */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  font-family:Arial,sans-serif;
}

.container{
  display:grid;
  grid-template-rows:auto auto 1fr auto;
  min-height:100vh;
}

/* Header */
.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:12px;
  background:#f5f5f5;
}

/* Hero */
.hero{
  width:100%;
  height:220px;
  background:#ccc;
}

/* Main */
.main{
  display:grid;
  gap:16px;
  padding:16px;
}

/* Form */
.booking-form{
  display:grid;
  gap:12px;
  padding:16px;
  background:#fff;
  border-radius:6px;
}

/* Gallery */
.gallery{
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}

.gallery img{
  width:100%;
  display:block;
}

/* Sidebar */
.sidebar{
  display:none;
}

/* Map */
.map{
  display:none;
}

/* Footer */
.footer{
  padding:16px;
  text-align:center;
  background:#eee;
}

/* Tablet */
@media (min-width:768px){

  .hero{
    height:320px;
  }

  .booking-form{
    grid-template-columns:1fr 1fr;
  }

  .gallery{
    grid-template-columns:repeat(2,1fr);
  }

  .map{
    display:block;
    height:300px;
    background:#ddd;
  }
}

/* Desktop */
@media (min-width:1024px){

  .main{
    grid-template-columns:220px 1fr 320px;
    align-items:start;
  }

  .sidebar{
    display:block;
    padding:16px;
    background:#f2f2f2;
  }

  .gallery{
    grid-template-columns:repeat(3,1fr);
  }

  .right-panel{
    display:grid;
    gap:16px;
  }

  .map{
    height:400px;
  }
}