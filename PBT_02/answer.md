## PHẦN A
# Câu A1 — 10 input types
1. type="text" → Ô nhập văn bản. Validation cơ bản nếu thêm `required`, `minlength`, `maxlength`. Dùng cho tên sản phẩm hoặc họ tên.
2. type="email" → Ô nhập email, trình duyệt kiểm tra định dạng có `@` và domain. Dùng cho form đăng ký/đặt hàng.
3. type="tel" → Ô nhập số điện thoại. Không tự kiểm tra format cụ thể trừ khi dùng `pattern`. Dùng cho form liên hệ.
4. type="password" → Ô nhập mật khẩu, ẩn ký tự. Dùng cho đăng ký/đăng nhập.
5. type="number" → Ô nhập số, hiển thị nút tăng/giảm. Dùng cho số lượng sản phẩm.
6. type="date" → Ô chọn ngày, hiển thị lịch. Dùng cho ngày sinh hoặc ngày giao hàng.
7. type="radio" → Chọn một trong nhiều lựa chọn. Dùng cho phương thức thanh toán.
8. type="checkbox" → Chọn bật/tắt một tùy chọn. Dùng cho đồng ý điều khoản.
9. type="file" → Chọn tệp tải lên. Dùng cho upload ảnh sản phẩm.
10. type="search" → Ô tìm kiếm, thường dùng với danh sách gợi ý. Dùng cho tìm sản phẩm trong cửa hàng.

# Câu A2 — Dự đoán validation
1. <input type="text" required value=""> → Không submit được, trình duyệt báo "Vui lòng điền vào trường này" vì `required` bắt buộc.
2. <input type="email" value="abc"> → Không submit, báo lỗi định dạng email vì giá trị không chứa `@` và domain hợp lệ.
3. <input type="number" min="1" max="10" value="15"> → Không submit, báo "Giá trị phải lớn hơn hoặc bằng 1 và nhỏ hơn hoặc bằng 10" do vượt quá `max`.
4. <input type="text" pattern="[0-9]{10}" value="abc123">  → Không submit, báo lỗi pattern vì không đủ 10 chữ số. `pattern` yêu cầu đúng 10 ký tự số.
5. <input type="password" minlength="8" value="123"> → Không submit, báo lỗi vì độ dài phải ít nhất 8 ký tự.

**So sánh thực tế**: Trình duyệt sẽ hiển thị các thông báo validation tương tự như dự đoán ngay khi bấm Submit, và không gửi form nếu điều kiện không đúng.

# Câu A3 — Accessibility
1. <label for="email"> quan trọng vì label liên kết với input qua `for`/`id`, giúp screen reader đọc tên trường, người dùng nhấn vào label cũng focus vào input. Điều này cải thiện truy cập cho người dùng khuyết tật.
2. Dùng <fieldset> + <legend> khi nhóm các trường liên quan, ví dụ nhóm thông tin cá nhân hoặc thông tin giao hàng. <legend> mô tả nội dung nhóm, giúp screen reader hiểu rõ cấu trúc form.
3. `aria-label` dùng khi không có label hiển thị và cần cung cấp tên cho phần tử. Không nên dùng `aria-label` khi đã có <label> vì dễ gây trùng lặp thông tin và làm code phức tạp, kém trực quan hơn so với label chuẩn.

# Câu A4 — Media
1. loading="lazy" trên <img> giúp trì hoãn tải ảnh khi ảnh chưa hiển thị trên màn hình, giảm thời gian tải trang và tiết kiệm băng thông. Không nên dùng khi ảnh phải hiện ngay lập tức ở đầu trang vì người dùng cần thấy ngay.
2. Nên cung cấp nhiều <source> trong <video> để tăng khả năng tương thích nhiều trình duyệt. Ví dụ: `video/mp4`, `video/webm`, `video/ogg`.
3. Thuộc tính `alt` dùng để mô tả ảnh khi ảnh không hiển thị hoặc với người dùng screen reader.
   - iPhone 16: `alt="Ảnh iPhone 16 màu trắng, thiết kế mỏng nhẹ"`
   - ảnh trang trí: `alt=""` (hoặc `alt="decorative"` nếu không cần mô tả nội dung)
   - ảnh biểu đồ doanh thu: `alt="Biểu đồ cột doanh thu Q1/2026 tăng đều"`

# Câu A5 — figure vs img
- Cách 1 (<img>) dùng khi chỉ cần hiển thị ảnh đơn lẻ, không cần chú thích chi tiết. Ví dụ: logo trang web, ảnh icon sản phẩm.
- Cách 2 (<figure> + <figcaption>) dùng khi ảnh cần chú thích hoặc giải thích nội dung. Ví dụ như ảnh sản phẩm có mô tả giá/kích thước, ảnh minh họa bài viết.
<--Ví dụ-->
- Cách 1: ảnh logo cửa hàng, ảnh thumbnail sản phẩm hiển thị đơn giản.
- Cách 2: ảnh sản phẩm kèm giá, ảnh bài viết kèm chú thích nội dung.

## PHẦN B

# B1
- `register.html` đã có 3 fieldset, `legend`, `label for`, `placeholder`, validation `required`, `pattern`, `minlength`, `maxlength`.
- Trường xác nhận password cần JavaScript hoặc backend để so sánh đúng với password, nên HTML chỉ giới hạn cùng pattern/độ dài.

# B2
- `media.html` có 3 ảnh sản phẩm với `<figure>` + `<figcaption>` + `loading="lazy"`, iframe YouTube, `<video>` với 2 source, `<audio>`, inline SVG.

# B3
- `checkout.html` có bảng giỏ hàng với `<tfoot>`, form thanh toán radio, mã khuyến mãi `pattern="SALE[0-9]{4}"`, ngày giao hàng `min="2026-05-07"`, select khung giờ, `range`, `datalist`, `output`, `meter`.


## PHẦN C 

# Câu C1 — Debug form
Lỗi 1: Input "Tên" không có `<label for="...">`, vi phạm accessibility.
Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`

Lỗi 2: Input email không có `id` và label cụ thể. Cần có `<label for="email">Email của bạn:</label>`.

Lỗi 3: Hai trường password không có `label`, không có `id`, không có `name` rõ ràng.
Sửa: thêm 2 label riêng cho mật khẩu và xác nhận mật khẩu.

Lỗi 4: Input phone sử dụng `type="text"` nhưng nên dùng `type="tel"` để phù hợp với số điện thoại và keyboard di động.

Lỗi 5: `select` không có `name` và `id`, không có label, nên thêm `<label for="city">Thành phố:</label>`.

Lỗi 6: `<label>` cho checkbox không đóng đủ nội dung và không có `for` hoặc `id` liên kết rõ ràng.
Sửa: `<input type="checkbox" id="agree" name="agree" required> <label for="agree">Tôi đồng ý điều khoản</label>`.

Lỗi 7: Form không có `action` hoặc `method`, nên thêm `action="#" method="POST"`.

Lỗi 8: Input submit không đủ rõ ràng; nên dùng `<button type="submit">Gửi</button>` để cải thiện khả năng tùy chỉnh.

# Câu C2 
1. `pattern` cho CMND/CCCD: `pattern="[0-9]{12}"`
2. `pattern` cho số tài khoản: `pattern="[0-9]{10,15}"`
3. HTML5 validation không đủ an toàn cho ngân hàng vì có thể bị bỏ qua hoặc giả mạo phía client. Phải kiểm tra lại mọi dữ liệu ở backend để đảm bảo an toàn.
4. Ba loại validation HTML5 không làm được: kiểm tra giá trị trùng lặp với cơ sở dữ liệu, so sánh cross-field (ví dụ password và confirm password), và kiểm tra logic phức tạp như điều kiện ngày/thời gian tùy theo trạng thái khác.
5. Hai rủi ro nếu chỉ validate frontend: kẻ tấn công có thể gửi request thủ công đến server với dữ liệu độc hại, hoặc bypass validation bằng cách tắt JavaScript / sửa HTML.
