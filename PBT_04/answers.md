### Câu A1 (10đ) — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Flow bình thường | Có | Mặc định; nội dung bình thường trong flow |
| `relative` | Có | Vị trí gốc của chính nó | Có | Dịch nhẹ phần tử; làm điểm tọa độ cho con |
| `absolute` | Không | Bám vào cha RELATIVE gần nhất | Có | Badge, dropdown, tooltip, overlay (phần tử nằm chồng, không chiếm chỗ) |
| `fixed` | Không | Cửa sổ trình duyệt | Có | Chat button, cookie banner, modal cố định |
| `sticky` | Có | dính khi scroll đến ngưỡng | Ban đầu cuộn; khi đạt ngưỡng thì dính | Sticky header, table header, sidebar dính khi scroll |

- Khi nào absolute tham chiếu body? Khi không có bất kỳ ancestor nào có position khác static (tức mọi cha đều mặc định position: static), trình duyệt sẽ dùng khối chứa ban đầu (root — thường là html/body) làm tham chiếu.
- Khi nào absolute tham chiếu parent? Khi có một ancestor (không nhất thiết là cha trực tiếp) mà có position = relative | absolute | fixed | sticky; absolute sẽ lấy ancestor gần nhất trong số đó làm tham chiếu.
- "Nearest positioned ancestor" nghĩa là: ancestor gần nhất trên cây DOM có giá trị position khác static — đó là gốc tọa độ (containing block) để tính top/right/bottom/left cho phần tử position: absolute (hoặc cho position: fixed/sticky trong các ngữ cảnh tương ứng).

### Câu A2 (10đ) — Flexbox vs Grid
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 1 hàng, 4 cột ngang, mỗi item chia đều chiều ngang.
4 items → Bố cục = [ item1 ] [ item2 ] [ item3 ] [ item4 ] */

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* Hai cột mỗi hàng (45% + margins ≈ 50% mỗi item), nên 6 items → 3 hàng × 2 cột.
6 items → Bố cục = 
Row1: [ item1 ] [ item2 ]
Row2: [ item3 ] [ item4 ]
Row3: [ item5 ] [ item6 ] */

/* Trường hợp 3 */
```css
.container { display: flex; justify-content: space-between; align-items: center; }
```
/* 1 hàng; item1 dàn trái, item3 dàn phải, item2 ở giữa (khoảng rỗng giữa đều); tất cả căn giữa theo chiều dọc.
3 items → Bố cục = [ item1 ]──────────[ item2 ]──────────[ item3 ] */

/* Trường hợp 4 */
```css
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
```
/* 1 hàng, 3 vùng cột: trái 200px, giữa linh hoạt, phải 200px; mỗi item vào một cột tương ứng
3 items → Bố cục = | [Sidebar 200px] | [Main 1fr] | [Ads 200px] | */

/* Trường hợp 5 */
```css
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
```
/* Lưới 3 cột, điền theo hàng trái→phải, top→down. 7 items → ceil(7/3)=3 hàng. Hàng 1: items 1-3; hàng 2: 4-6; hàng 3: item7 ở cột 1, cột 2-3 trống.
7 items → Bố cục = Row1: [1] [2] [3]
Row2: [4] [5] [6]
Row3: [7] [ ] [ ] */

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

- Navigation bar ngang — Flexbox: Flexbox dễ căn giữa theo trục ngang/đứng, phân chia logo/menu/buttons và giữ vertical centering; xử lý items đều nhau với justify-content & gap.

- Lưới ảnh Instagram (3 cột, số ảnh thay đổi) — Grid (hoặc Flexbox): CSS Grid xử lý lưới cố định cột/row và gap tốt với grid-auto-rows/grid-auto-flow; Flexbox cũng được nhưng Grid cho layout lưới ổn định hơn khi muốn hàng/cột chính xác.

- Layout blog: main content + sidebar — Flexbox (kết hợp Grid nếu cần): Dùng Flexbox để chia hai cột chính (responsive dễ dàng). Nếu layout phức tạp hơn (header/hero/footer cùng vùng), kết hợp Grid cho toàn trang rồi Flexbox cho từng vùng.

- Footer 4 cột thông tin — Grid: Grid dễ tạo số cột cố định/đều, kiểm soát gap và responsive với repeat()/minmax(); ngắn gọn hơn và mạnh hơn Flexbox cho nhiều cột.

- Card sản phẩm (ảnh trên, text giữa, nút dính đáy) — Flexbox: Bên trong card, dùng display:flex; flex-direction:column; và margin-top:auto trên nút để đẩy nó xuống đáy; Grid không cần thiết cho cấu trúc linear này.

### Câu C2 (10đ) — Debug Flexbox
**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

```css
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```
- Mô tả: mỗi .card có chiều cao khác nhau vì nội dung biến thiên; nút không được đẩy xuống đáy. Ngoài ra dùng tính toán width + margin dễ gây rounding issues.
- Sửa: 
```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;               /* thay margin hack */
}
.card {
  flex: 0 0 calc(33.333% - 13.33px); /* 3 cột với gap */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;  /* cho nội dung theo cột */
  min-height: 320px;       /* đảm bảo chiều cao tối thiểu nếu cần */
  background:#fff;
  padding:12px;
}
.card img{ width:100%; height:auto; display:block; object-fit:cover; }
.card .btn{ margin-top: auto; } /* đẩy nút xuống đáy ổn định */
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```css
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```
- Mô tả: thiếu justify-content / align-items trên container flex; hoặc body mặc định có margin; hoặc .hero-content không là flex item.
- Sửa:
```css
html,body{height:100%; margin:0;} /* đảm bảo 100vh không bị offset */
.hero{
  height:100vh;
  display:flex;
  align-items:center;    
  justify-content:center;
  text-align:center;     /* căn trong phần tử */
}
.hero-content{
  max-width:900px;
  width:100%;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài

```css
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```
- Mô tả: trong flex container, flex items có thể co lại. Nếu .content có nội dung rộng (long word / large image) nó ép layout và làm sidebar thay đổi; hoặc sidebar cho phép shrink.
- Sửa:
```css
.layout{ display:flex; gap:20px; align-items:flex-start; }
.sidebar{
  width:250px;
  flex: 0 0 250px;    /* không cho shrink/grow */
}
.content{
  flex: 1 1 0%;
  min-width: 0;       
  overflow-wrap: break-word;
}
```