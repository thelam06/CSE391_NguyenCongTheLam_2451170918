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
##### Nguồn tham chiếu: 07_forms_interactive - mục Accessibility — Form cho mọi người