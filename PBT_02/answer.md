# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)
## Câu A1 — Input Types
### 10 input types khác nhau trong HTML5:
#### Format: type="email" → Ô nhập text, tự kiểm tra có @ → Dùng cho form đăng ký
1. type="text" -> Ô nhập text, tự kiểm tra minlength, maxlength, pattern -> Dùng cho thông tin sản phẩm
2. type="password" -> Ẩn ký tự, tự kiểm tra minlength, pattern -> Dùng cho form đăng nhập
3. type="number" -> Số + nút tăng/giảm, tự kiểm tra min, max, step -> Dùng cho thông tin về số lượng
4. type="tel" -> Bàn phím số (mobile) , tự kiểm tra pattern -> Dùng cho số điện thoại
5. type="date" -> Date picker, tự kiểm tra min, max -> Dùng cho thời gian giao sản phẩm 
6. type="color" -> Color picker -> Dùng cho UI, UX
7. type="range" -> Slider, tự kiểm tra min, max, step -> Dùng cho thông tin về số lượng 
8. type="file" -> Upload file, tự kiểm tra accept, multiple -> Dùng cho đánh giá sản phẩm
9. type="url" -> Validate url, tự kiểm tra http:// -> dùng cho tham chiếu đến sản phẩm
10. type="search" -> Ô tìm kiếm + nút X -> Dùng cho tìm kiếm sản phẩm
##### Nguồn tham chiếu: 07_forms_interactive - mục "Các Input Types HTML5"

## Câu A2:
### Dự đoán điều xảy ra trong các trường hợp
1. `<input type="text" required value="">   <!-- User để trống -->`
- Dự đoán: Không có gì xảy ra
2. `<input type="email" value="abc">        <!-- User gõ "abc" -->`
- Dự đoán: Thông báo lỗi vì thiếu @
3. `<input type="number" min="1" max="10" value="15"> <!-- User gõ 15 -->`
- Dự đoán: Thông báo lỗi vì giá trị số vượt giá trị tối đa
4. `<input type="text" pattern="[0-9]{10}" value="abc123"> <!-- User gõ "abc123" -->`
- Dự đoán: Thông báo lỗi vì chứa chữ cái trong khi chuỗi yêu cầu số
5. `<input type="password" minlength="8" value="123">  <!-- User gõ "123" -->`
- Dự đoán: Thông báo lỗi vì mật khẩu cần ít nhất 8 ký tự

### Tạo file [validation_test.html](validation_test.html), đặt 5 trường hợp trên vào 1 form, bấm Submit và [chụp screenshot](screenshots/Câu_A2.png) kết quả validation thực tế.
### So sánh với dự đoán: Không có gì xảy ra trong cả 5 trường hợp trên.

##### Nguồn tham chiếu: 07_forms_interactive - mục "Các Input Types HTML5"

## Câu A3:
### 1. `<label for="email">` quan trọng cho người dùng screen reader vì:
- Khi người dùng click chuột vào chữ "email", trình duyệt sẽ tự động chuyển trạng thái "focus" (nháy con trỏ) vào ô nhập liệu tương ứng. Điều này cực kỳ hữu ích những người gặp khó khăn về vận động (như run tay) vì nó làm tăng diện tích tiếp xúc.
- Khi người dùng screen reader dùng trình đọc màn hình để chuyển tiêu điểm (focus) vào ô nhập liệu, trình đọc sẽ thông báo: "Email, edit text". Nếu thiếu label, nó chỉ đọc: "Edit text", khiến người dùng không biết phải điền thông tin gì.
 
### 2. Dùng `<fieldset>` + `<legend>` khi:
- Form dài hoặc có nhiều nhóm thông tin khác biệt (như thông tin cá nhân, địa chỉ thanh toán, thông tin thẻ tín dụng).
- Dùng cho người dùng screen reader: Khi người dùng screen reader tab vào ô nhập liệu bên trong `<fieldset>`, trình đọc sẽ đọc nội dung của `<legend>` trước, giúp người dùng biết họ đang ở trong "ngữ cảnh" nào.
#### Ví dụ cụ thể:
```
<!-- ✅ Fieldset + Legend cho nhóm liên quan -->
<fieldset>
    <legend>Thông tin giao hàng</legend>
    <label for="addr">Địa chỉ:</label>
    <input type="text" id="addr" name="addr">
</fieldset>
```

### 3. aria-label dùng khi:
- Muốn cung cấp văn bản cho một phần tử (Icon, hình ảnh, emoji).
- Đặc biệt aria-label hữu ích đối với người dùng screen reader khi các nút bấm chỉ có Icon (như nút ✅, ♿, ➡️). Vì trình đọc màn hình không hiểu hình ảnh/emoji, nên aria-label sẽ cung cấp nội dung cho các Icon để máy đọc được.
#### KHÔNG nên dùng aria-label khi đã có `<label>` vì:
- Trình đọc màn hình thường ưu tiên aria-label và ghi đè/bỏ qua nội dung của thẻ `<label>`. Điều này có thể gây ra sự thiếu nhất quán giữa những gì người dùng nhìn thấy và những gì họ nghe thấy.
- Thẻ <label> tốt hơn aria-label vì nó hỗ trợ cả trình duyệt cũ, hỗ trợ tìm kiếm và cung cấp vùng click chuột lớn hơn (như `<label for="email">`).
##### Nguồn tham chiếu: 07_forms_interactive - mục Accessibility — Form cho mọi người

## Câu A4:
### 1. 
#### Giải thích thuộc tính loading="lazy" trên thẻ <img>:
- loading="lazy" là một kỹ thuật trì hoãn việc tải các hình ảnh nằm ngoài vùng nhìn thấy (viewport) của người dùng. Trình duyệt sẽ chỉ bắt đầu tải ảnh khi người dùng cuộn trang đến gần vị trí của tấm ảnh đó.
#### loading="lazy" cải thiện gì:
- Giảm dung lượng dữ liệu cần tải ban đầu, từ đó tăng tốc độ tải trang, giúp trang web hiển thị nội dung chính nhanh hơn.
- Tiết kiệm băng thông, đặc biệt hữu ích cho người dùng di động sử dụng mạng 3G/4G, vì họ sẽ không phải tải những hình ảnh mà họ chưa (hoặc không bao giờ) cuộn tới.
- Tối ưu tài nguyên hệ thống, giảm tải cho CPU và bộ nhớ của thiết bị vì không phải xử lý nhiều hình ảnh cùng lúc.
#### Khi nào KHÔNG nên dùng loading="lazy":
- Ảnh ở đầu trang: Những hình ảnh xuất hiện ngay lập tức khi vừa mở web (như Logo) nếu dùng loading="lazy", nó sẽ làm chậm thời gian hiển thị nội dung quan trọng, gây ảnh hưởng xấu đến điểm SEO.
- Ảnh nhỏ/Icon quan trọng: Những hình ảnh quá nhẹ hoặc cần xuất hiện ngay lập tức để định hình giao diện.

### 2.
#### Nên cung cấp nhiều `<source>` trong thẻ `<video>` vì:
- Hỗ trợ trình duyệt: Không phải trình duyệt nào cũng đọc được mọi định dạng video.
- Tối ưu dung lượng: Ví dụ ta có thể cung cấp file WebM (nhẹ hơn) cho các trình duyệt hiện đại và file MP4 (nặng hơn nhưng phổ biến) làm phương án dự phòng cho trình duyệt cũ. Trình duyệt sẽ quét từ trên xuống dưới và lấy file đầu tiên mà nó hỗ trợ.
#### Liệt kê ít nhất 3 format video web phổ biến:
- MP4 (H.264): Phổ biến nhất, hoạt động trên hầu hết mọi trình duyệt và thiết bị.
- WebM: Định dạng hiện đại của Google, chất lượng cao nhưng dung lượng rất nhẹ.
- Ogg/Theora: Một định dạng mã nguồn mở, thường được dùng để dự phòng.

### 3.
#### Thuộc tính alt trên `<img>` dùng để:
- Cung cấp nguồn thông tin chính cho screen reader. Khi người dùng screen reader sử dụng web, máy sẽ đọc nội dung trong thẻ alt để họ hiểu hình ảnh đó đang hiển thị cái gì.
- Trường hợp lỗi tải ảnh vì đường truyền mạng yếu hoặc file ảnh bị xóa, trình duyệt sẽ hiển thị đoạn văn bản trong thẻ alt này thay vì chỉ để lại một ô trống vô nghĩa.
- Tối ưu SEO. Các công cụ tìm kiếm như Google không thể "xem" ảnh như người, chúng dựa vào thẻ alt để hiểu nội dung ảnh và xếp hạng chúng trong mục Tìm kiếm hình ảnh (Google Images).
#### Viết alt tốt cho 3 trường hợp:
- Ảnh sản phẩm iPhone 16
<br>

`<img src="iPhone_16" alt="iPhone 16 với thiết kế sang trọng, khung titan chống trầy xước và va đập">`
- Ảnh trang trí (decorative)
<br>

`<img src="Ảnh_trang_trí" alt="Thiết kế đẹp mắt, màu sắc hài hoà">`
- Ảnh biểu đồ doanh thu Q1/2026
<br>

`<img src="Doanh_thu_Q1/2026" alt="Doanh thu quý I năm 2026">`
##### Nguồn tham chiếu: 06_graphics_multimedia

## Câu A5 - So sánh `<figure>` với `<img>`
```
<!-- Cách 1 -->
<img src="product.jpg" alt="iPhone">

<!-- Cách 2 -->
<figure>
    <img src="product.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max — 25.990.000đ</figcaption>
</figure>
```
### Dùng Cách 1 khi:
- Hình ảnh chỉ mang tính chất trang trí hoặc là một phần của danh sách sản phẩm lớn.
- Cần tối giản code và tự kiểm soát bố cục bằng CSS.
#### Ví dụ:
`<img src="Apple_logo.jpg" alt="Đây là thương hiệu của điện thoại Apple">`

### Dùng Cách 2 khi:
- Hình ảnh là một nội dung độc lập (ảnh minh họa trong bài viết, bài đánh giá sản phẩm, ...).
- Nhóm hình ảnh và chú thích thành một khối thống nhất về mặt ý nghĩa.
- Cần tối ưu SEO: Trình đọc màn hình đánh giá cao việc hình ảnh có chú thích rõ ràng bằng `<figcaption>`.
#### Ví dụ:
```
<figure>
    <img src="iPhone_Image.jpg" alt="iPhone 16 Pro Max 256GB Titan">
    <figcaption>iPhone 16 Pro Max màu Titan — Giá 25.990.000đ</figcaption>
</figure>
```
<br>

# PHẦN B — THỰC HÀNH CODE
## Bài B1 — Form Đăng ký Tài khoản: làm trong file [register.html](register.html)
### HTML không thể validate confirm password vì:
- HTML xử lý validation dựa trên từng phần tử độc lập. Nó không có cơ chế mặc định để "biết" giá trị của một ô khác đang là gì để so sánh tại thời điểm thực hiện (runtime). Ví dụ: Nếu so sánh `Giá trị A == Giá trị B`. HTML chỉ có thể hiểu logic đơn lẻ: Nếu `Giá trị A khớp với Quy tắc X`
- Việc so sánh hai trường dữ liệu đòi hỏi một logic "Nếu A khác B thì báo lỗi". Đây là logic điều kiện thuộc về ngôn ngữ lập trình (như JavaScript) chứ không phải ngôn ngữ đánh dấu (HTML).

## Bài B2 — Trang Multimedia: làm trong file [media.html](media.html)

## Bài B3 — Form Đặt hàng hoàn chỉnh: làm trong file [checkout.html](checkout.html)
<br>

# PHẦN C — PHÂN TÍCH & SUY LUẬN
## Câu C1 - Debug Form
```
<form>
    Tên: <input type="text">
    
    <input type="email" placeholder="Email của bạn">
    
    <input type="password" placeholder="Mật khẩu">
    <input type="password" placeholder="Nhập lại mật khẩu">
    
    Phone: <input type="text" value="0901234567">
    
    <select>
        <option>Hà Nội</option>
        <option>TP.HCM</option>
    </select>
    
    <label>
        Tôi đồng ý điều khoản
    </label>
    
    <input type="submit" value="Gửi">
</form>
```
### Tìm và sửa tất cả 8 lỗi về validation, accessibility, và best practices:
#### Lỗi 1: Dòng 2 — Input "Tên" không có <label for="...">, vi phạm accessibility
- Sửa:
```
<label for="name">Tên:</label> 
<input type="text" id="name" name="name" required>
```

#### Lỗi 2: Dòng 4 — Email chỉ dùng placeholder mà không có nhãn (label) thực tế, khiến người dùng bị mất ngữ cảnh khi gõ và trình đọc màn hình khó nhận diện.
- Sửa:
```
<label for="email">Email:</label>
<input type="email" id="email" name="email" required>
```

#### Lỗi 3: Dòng 6 và 7 — Hai ô mật khẩu không có thuộc tính name, dữ liệu sẽ không được gửi về server khi submit.
Sửa:
```
<input type="password" name="pass" placeholder="Mật khẩu">
<input type="password" name="repass placeholder="Nhập lại mật khẩu">
```

#### Lỗi 4: Dòng 6 — Mật khẩu không có ràng buộc độ phức tạp (validation), gây mất an toàn tài khoản.
Sửa: `<input type="password" placeholder="Mật khẩu" minlength="8" required>`

#### Lỗi 5: Dòng 9 — Số điện thoại đang dùng type="text".
Sửa: ```<input type="tel" value="0901234567">```

#### Lỗi 6: Dòng 11 — Thẻ `<select>` thiếu thuộc tính name và nhãn (label) mô tả mục đích chọn.
Sửa: 
```
<label for="city">Thành phố:</label>
    <select id="city" name="city">
        <option>Hà Nội</option>
        <option>TP.HCM</option>
    </select>
```

#### Lỗi 7: Dòng 16 — Thẻ `<label>` của checkbox không chứa input bên trong và thiếu thuộc tính required cho một điều khoản bắt buộc.
Sửa: `<label><input type="checkbox" name="agree" required>Tôi đồng ý điều khoản</label>`

#### Lỗi 8: Dòng 1 - Thẻ `<form>` thiếu thuộc tính action và method, dẫn đến việc không xác định được dữ liệu sẽ gửi đi đâu và bằng phương thức nào.
Sửa: `<form action="#" method="POST">`

## Câu C2 — Thiết kế chiến lược Validation
1. Viết Pattern Regex cho CMND/CCCD và Số tài khoản:
- CMND/CCCD (Đúng 12 chữ số): "^\d{12}$"
- Số tài khoản (10 đến 15 chữ số): "^\d{10,15}$"

2. HTML5 Validation chưa đủ an toàn cho ngân hàng vì:
- Bất kỳ ai cũng có thể mở công cụ F12 (Developer Tools) trên trình duyệt để xóa thuộc tính required hoặc pattern.
- HTML5 chỉ kiểm tra được "định dạng", không kiểm tra được logic if-else (kiểm tra thông qua JavaScript).

3. Ba loại Validation HTML5 KHÔNG THỂ làm được (Phải dùng JavaScript):
- Kiểm tra xem Số tài khoản hoặc Email đã tồn tại trong hệ thống hay chưa.
- HTML5 không thể xử lý logic if-else (nếu-thì) giữa các trường dữ liệu.
- Kiểm tra xem ô "Nhập lại mật khẩu" có trùng khớp 100% với ô "Mật khẩu" đã nhập trước đó hay không.

4. Hai rủi ro bảo mật nếu chỉ validate trên Frontend:
- Kẻ tấn công có thể sử dụng các công cụ như Postman hoặc lệnh curl để gửi mã độc đến Server mà không qua giao diện web, với mục đích chiếm quyền điều khiển cơ sở dữ liệu.
- Nếu Backend không validate quyền sở hữu hoặc quyền hạn, kẻ tấn công có thể thông qua quyền Admin để thực hiện các thao tác trái phép mà người dùng (User) không thể làm.
<br>

# PHẦN D — VIDEO THỰC HÀNH OBS
## Đề bài Video: Code-along "Form đăng ký với HTML5 Validation"
- Link video: [PBT02_NguyenCongTheLam_2451170918](https://drive.google.com/file/d/1wSbHAEh5h8SxzFyslOungd7XyFF41pAM/view?usp=sharing)