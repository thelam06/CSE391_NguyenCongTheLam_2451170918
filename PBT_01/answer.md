# PHẦN A - KIỂM TRA ĐỌC HIỂU
## Câu A1:
### 1. Khi gõ https://shopee.vn vào trình duyệt và nhấn Enter, liệt kê đúng thứ tự ít nhất 5 bước xảy ra (từ DNS lookup đến render):
    - B1: Gõ URL, nhấn Enter.
    - B2: HTTP Request.
    - B3: Server xử lý.
    - B4: HTTP Response.
    - B5: Trình duyệt hiện trang.
##### Nguồn tham chiếu: 01_introduction_html_universe.md, mục 1.1

### 2. Trong DevTools của Chrome, tab Network cho thấy:
- Name: Tên request.
- Status: Trạng thái (200 OK, 204 No Content, ...).
- Type: Định dạng (script, text/plain, text/javascript, ...).
- Initiator: Ai gọi request.
- Size: Dung lượng.
- Time: Thời gian tải.
#### Mở một trang web bất kỳ, chụp screenshot tab Network và đánh dấu (vẽ mũi tên/khoanh tròn)
![Ảnh](screenshots/Câu_A1.2.png)
![Ảnh](screenshots/Câu_A1.2_(1).png)
##### Nguồn tham chiếu: 01_introduction_html_universe.md, mục 4.3

## Câu A2:
### Trang web bị Google đánh giá SEO thấp vì dùng quá nhiều thẻ <div> thay cho các thẻ HTML có ý nghĩa (Semantic). Điều này làm máy tìm kiếm và trình đọc màn hình khó hiểu cấu trúc nội dung.
### Lỗi semantic chính:
- Dùng `<div>` cho phần đầu trang thay vì thẻ `<header>`.
- Dùng `<div>` cho menu điều hướng thay vì thẻ `<nav>`.
- Dùng `<div>` cho nội dung sản phẩm và tiêu đề thay vì `<article>` và `<h1>`.
- Dùng `<div>` cho chân trang thay vì thẻ `<footer>`.
### Sửa lại HTML semantic:
```
<header class="header">
    <div class="logo">ShopTLU</div>
    <nav class="menu">
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>
<main class="main">
    <article class="product">
        <h1 class="title">iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="iPhone 16 Pro">
            <figcaption>Hình ảnh iPhone 16 Pro</figcaption>
        </figure>
    </article>
</main>
<footer class="footer">© 2026 ShopTLU</footer>
```
##### Nguồn tham chiếu: 04_visible_part_html mục "Semantic HTML5 — "Thẻ có ý nghĩa"

## Câu A3
### Mô tả bằng text art kết quả hiển thị của đoạn HTML:
`<div>`Hộp 1`</div>`  
`<span>`Text A`</span>`  
`<span>`Text B`</span>`  
`<div>`Hộp 2`</div>`  
`<span>`Text C`</span>`  
`<strong>`Text D`</strong>`  
`<div>`Hộp 3`</div>`  

#### Kết quả mô tả
Hộp 1  
Text A Text B  
Hộp 2  
Text C *Text D*  
Hộp 3  

### Giải thích:
1. Hộp 1 nằm trong thẻ `<div>` nên là một dòng riêng.
2. Text A và Text B nằm trong thẻ `<span>` nên nằm cùng một dòng.
3. Hộp 2 nằm trong thẻ `<div>` nên xuống một dòng mới. 
4. Text C nằm trong thẻ `<span>` và Text D nằm trong thẻ `<strong>` nên nằm cùng một dòng.
5. Thẻ `<strong>` để in đậm văn bản của "Text D"
6. Hộp 3 nằm trong thẻ `<div>` nên xuống một dòng mới.

##### Nguồn tham chiếu: 04_visible_part_html mục "Block vs Inline — Hai loại element cơ bản"

## Câu A4:
### Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`:
- `<thead>`: Dùng cho Header (tiêu đề cột).
- `<tbody>`: Dùng cho Body (dữ liệu chính).
- `<tfoot>`: Dùng cho Footer (tổng kết).
### KHÔNG NÊN dùng table để tạo layout trang web vì:
1. Sai lệch semantic: table chỉ dùng cho dữ liệu dạng bảng, không dùng cho layout.
2. Ảnh hưởng SEO: công cụ tìm kiếm hiểu sai nội dung.
3. Accessibility kém: trình đọc màn hình (screen reader) đọc rối.
4. Hiệu suất chậm: phải tải toàn bộ bảng trước render.
5. Khó bảo trì: code phức tạp khi lồng nhiều tầng.
6. Không responsive: không scale tốt trên mobile.
##### Nguồn tham chiếu: 05_tables_hyperlinks