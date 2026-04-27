# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — 3 Cách nhúng CSS
### Inline:
#### Ví dụ code:
`<h1 style="color: #2563eb; font-size: 32px;">Tiêu đề</h1>`
#### Ưu và nhược điểm của Inline:
- Ưu điểm: nhanh, tiện lợi vì sửa trực tiếp trong phần tử.
- Nhược điểm: Không tái sử dụng được, khó bảo trì.
#### Khi nào nên dùng: Chỉ dùng khẩn cấp / override tạm thời

### Internal:
#### Ví dụ code:
```
<head>
    <style>
        h1 { color: #2563eb; font-size: 32px; }
    </style>
</head>
```
#### Ưu và nhược điểm của Internal:
- Ưu điểm: Dễ quản lý hơn Inline vì tất cả style đều tập trung ở một chỗ.
- Nhược điểm: Chỉ có tác dụng trên một trang duy nhất -> Mỗi một trang mới là một cách viết CSS.
#### Khi nào nên dùng: Khi làm một trang web đơn lẻ hoặc muốn viết style riêng biệt cho một trang mà không ảnh hưởng đến toàn cục

### External:
#### Ví dụ code:
```
<head>
    <link rel="stylesheet" href="styles.css">
</head>
/* Trong styles.css */
h1 { color: #2563eb; font-size: 32px; }
```
#### Ưu và nhược điểm của External:
- Ưu điểm: Quản lý tập trung cho toàn bộ website; giúp trang web tải nhanh hơn (nhờ cơ chế cache của trình duyệt); code HTML cực kỳ sạch sẽ.
- Nhược điểm: Tốn thêm một yêu cầu tải file từ server (HTTP Request), nếu file CSS lỗi thì trang web sẽ mất định dạng hoàn toàn.
#### Khi nào nên dùng: Là tiêu chuẩn cho mọi dự án thực tế, dùng khi website có từ 2 trang trở lên

### Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách được viết ở dưới cùng sẽ "thắng" vì:
- Trong các ngôn ngữ lập trình, trình biên dịch code sẽ đọc code tuần tự từ trên xuống dưới.
- Do đó, cách viết CSS ở phía trên sẽ được áp dụng trước, trong khi đó cách viết ở phía dưới sẽ ghi đè lên cách viết trên, và tương tự cho đến cách viết CSS cuối cùng.
##### Nguồn tham chiếu: 08_introduction_css - 2. 🌐 Big Picture — CSS hoạt động thế nào? + 3. ⚙️ Core Technical Truth

## Câu A2 — CSS Selectors — Dự đoán kết quả
### Mỗi selector sau chọn được các element:
1. h1
→ Chọn: Đối tượng nằm trong thẻ h1:
```
<h1>ShopTLU</h1>
```
2. .price
→ Chọn: Đối tượng nằm trong thẻ có trường class="price":
```
<p class="price">25.990.000đ</p>
<p class="price">45.990.000đ</p>
```
3. #app header
→ Chọn: Đối tượng nằm trong thẻ có trường id="app" và trong thẻ `<header>`:
```
<div id="app">
    <header class="top-bar dark">
        <h1>ShopTLU</h1>
        <nav>
            <a href="/" class="active">Home</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
        </nav>
    </header>
</div>
```
4. nav a:first-child
→ Chọn: Đối tượng đầu tiên trong thẻ `<a>` mà nằm trong thẻ `<nav>`:
```
<nav>
    <a href="/" class="active">Home</a>
</nav>
```
5. .product.featured h2
→ Chọn: Đối tượng nằm trong thẻ có trường class="product featured" và là thẻ `<h2>`:
```
<article class="product featured">
    <h2>MacBook Pro</h2>
</article>
```
6. article > p
→ Chọn: Đối tượng nằm trong thẻ `<p>` mà nằm trong thẻ `<article>`:
```
<article class="product">
    <p class="price">25.990.000đ</p>
    <p>Mô tả sản phẩm...</p>
</article>
<article class="product featured">
    <p class="price">45.990.000đ</p>
    <p>Mô tả sản phẩm...</p>
</article>
```
7. a[href="/"]
→ Chọn: Đối tượng nằm trong thẻ có giá trị trường href="/":
```
<a href="/" class="active">Home</a>
```
8. .top-bar.dark h1
→ Chọn: Đối tượng nằm trong thẻ có trường class="top-bar dark" và là thẻ `<h1>`:
```
<header class="top-bar dark">
    <h1>ShopTLU</h1>
</header>
```
##### Nguồn tham chiếu: 09_css_selectors