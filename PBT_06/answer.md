# PHẦN A — ĐỌC HIỂU
## Câu A1 — Grid System
```
<div class="container">
    <div class="row">
        <div class="col-12 col-md-6 col-lg-3">Box 1</div>
        <div class="col-12 col-md-6 col-lg-3">Box 2</div>
        <div class="col-12 col-md-6 col-lg-3">Box 3</div>
        <div class="col-12 col-md-6 col-lg-3">Box 4</div>
    </div>
</div>
```
### Vẽ layout cho từng kích thước:
- Kích thước < 768px:
```
+------------------------------------------------+
|                                                |
|    +--------------------------------------+    |
|    |                                      |    |
|    |                 Box 1                |    |
|    |                                      |    |
|    |                                      |    |
|    +--------------------------------------+    |
|                                                |
|    +--------------------------------------+    |
|    |                                      |    |
|    |                 Box 2                |    |
|    |                                      |    |
|    |                                      |    |
|    +--------------------------------------+    |
|                                                |
|    +--------------------------------------+    |
|    |                                      |    |
|    |                 Box 3                |    |
|    |                                      |    |
|    |                                      |    |
|    +--------------------------------------+    |
|                                                |
|    +--------------------------------------+    |
|    |                                      |    |
|    |                 Box 4                |    |
|    |                                      |    |
|    |                                      |    |
|    +--------------------------------------+    |
|                                                |
+------------------------------------------------+
```
- Kích thước 768px - 991px:
```
+------------------------------------------------+
|                                                |
|    +--------------+        +--------------+    |
|    |              |        |              |    |
|    |    Box 1     |        |     Box 2    |    |
|    |              |        |              |    |
|    |              |        |              |    |
|    +--------------+        +--------------+    |
|                                                |
|                                                |
|    +--------------+        +--------------+    |
|    |              |        |              |    |
|    |    Box 3     |        |     Box 4    |    |
|    |              |        |              |    |
|    |              |        |              |    |
|    +--------------+        +--------------+    |
|                                                |
+------------------------------------------------+
```
- Kích thước ≥ 992px:
```
+--------------------------------------------------------------------------------+
|                                                                                |
|    +-----------+        +-----------+       +-----------+       +-----------+  |
|    |           |        |           |       |           |       |           |  |
|    |   Box 1   |        |   Box 2   |       |   Box 3   |       |   Box 4   |  |
|    |           |        |           |       |           |       |           |  |
|    |           |        |           |       |           |       |           |  |
|    +-----------+        ------------+       +-----------+       +-----------+  |
|                                                                                |
+--------------------------------------------------------------------------------+
```
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
|------------|---------|---------------|---------|
| Số cột | 1 | 2 | 4 |
| Box layout | Xếp chồng (100% width) | Dàn hàng ngang (50% width) | Dàn hàng ngang (25% width) |
### col-md-6 nghĩa là gì? Tại sao không cần viết col-sm-12?
- Ý nghĩa của col-md-6:
    + col: viết tắt của column, nghĩa là cột
    + md: viết tắt của medium, áp dụng cho màn hình có min-width: 768px
    + 6: Bootstrap có hệ thống lưới 12 cột. Số 6 có nghĩa là chia lưới thành 12/6 = 2 cột  
--> col-md-6 nghĩa là chia màn hình thành 2 cột, áp dụng cho màn hình có kích thước từ 768px trở lên
- Không cần viết col-sm-12 vì:
    + Bootstrap được thiết kế theo hướng Mobile-first.
    + Khi viết giá trị cho class là col-12 thì mặc định sẽ áp dụng cho tất cả các màn hình từ nhỏ đến lớn (1 cột).
##### Nguồn tham chiếu: bootstrap - 02_grid_system - 2. 🌐 Big Picture — Grid System hoạt động thế nào?

## Câu A2 — Utilities & Components
1. Giải thích class d-none d-md-block. Element này hiển thị khi nào, ẩn khi nào?
- `d-none`: ẩn hoàn toàn (display: none)
- `d-md-block`: hiện trên tablet
2. Liệt kê 5 spacing utilities (margin/padding) và giải thích. VD: mt-3, px-4, mb-auto
- `mt-3`: Margin top 1rem
- `px-4`: Padding theo trục Ox (horizontal) 1.5rem
- `mb-auto`: Margin bottom auto
- `mb-4`: Margin bottom 1.5rem
- `py-5`: Padding theo trục Oy (vertical) 3rem
3. Sự khác nhau giữa .container, .container-fluid, .container-md?
- `.container`: Tự động căn giữa, có max-width theo breakpoint
- `.container-fluid`: Full width mọi kích thước — dùng cho hero/footer/banner
- `.container-md?`: Full width dưới md, có max-width từ md trở lên
##### Nguồn tham chiếu: 
1. bootstrap - 02_grid_system - 3. ⚙️ Core Technical Truth - Container — Lớp bọc ngoài cùng
2. bootstrap - 04_utilities - 3. ⚙️ Core Technical Truth

# PHẦN C — PHÂN TÍCH
## Câu C1 — Tùy biến Bootstrap
1. Giải thích quy trình đổi màu $primary từ xanh mặc định sang #E63946:
#### Công cụ:
- Thư viện Bootstrap: Node.js và npm, cài đặt thông qua lệnh npm install bootstrap
- Trình biên dịch SASS (SASS Compiler): Live Sass Compiler

#### Modify file nào:
- Tạo một file riêng (ví dụ: your-custom.scss) chứa các thay đổi được viết bằng SASS
- Trong thư mục your-custom.scss:
```
your-custom.scss
├── Override $primary: #E63946;  ← TRƯỚC khi import Bootstrap
├── Override $font-family: '...'; ← TRƯỚC khi import Bootstrap
└── @import "bootstrap/scss/bootstrap";  ← Bootstrap dùng values của bạn
```

2. KHÔNG nên override trực tiếp .btn-primary { background: red; } vì:
- Biến `$primary` không chỉ có `.btn-primary` mà còn có .bg-primary, .text-primary,... Nếu chỉ sửa 1 thuộc tính `.btn-primary` sẽ làm cho giao diện tổng thể rời rạc và thiếu nhất quán.
- Một class như `.btn-primary` chứa rất nhiều thuộc tính như :hover, :active, :focus,... Nếu override CSS trực tiếp, nút bấm sẽ bị mất toàn bộ các hiệu ứng này, hoặc phải tự tay viết thêm hàng chục dòng CSS khác để override cả :hover, :active, :focus,...
- Việc override trực tiếp thay vì sửa tận gốc sẽ làm kích thước file tăng, làm giảm hiệu năng hệ thống, khó bảo trì hơn.
#### Nên dùng SASS variables vì:
- Khi đổi `$primary: #E63946;`, hàng trăm class khác sử dụng lại biến này (như .text-primary, .bg-primary, .border-primary, các trạng thái alert, badge...) sẽ tự động cập nhật theo màu mới chỉ sau một lần biên dịch.
- Không phải override :hover, :active, :focus,...
- Trình biên dịch sẽ thay trực tiếp màu #E63946 vào lõi Bootstrap trước khi xuất sang CSS mà không cần phải viết CSS thừa.

## Câu C2 (10đ) — So sánh
### Viết CSS thuần để tạo 1 navbar responsive + 1 product card.
```html
<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive</title>
    <link rel="stylesheet" href="responsive.css">
</head>

<body>
    <header class="navbar">
        <button class="hamburger">☰</button>
        <h2 class="logo">Cửa hàng điện tử</h2>
        <nav class="navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </nav>
        <button class="btn-login">Login</button>
    </header>
    <main class="body">
        <section class="product-card">
            <article class="card">
                <img src="https://placehold.co/200x300" alt="iPhone 17 Pro Max">
                <h4>iPhone 17 Pro Max 256GB</h4>
                <p>Giá: 37.000.000đ</p>
                <button class="btn-buy">Mua</button>
            </article>
        </section>
    </main>
</body>

</html>
```

```CSS thuần
* {
    box-sizing: border-box;
    font-size: 1.2rem;
    text-decoration: none;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #000;
}

.navigation {
    display: none;
    border-left: 1px solid #000;
    border-right: 1px solid #000;
}

.btn-login {
    display: none;
}

.body {
    display: grid;
    grid-template-columns: 1fr;
    background: lightcyan;
    border: 1px solid #000;
}

.product-card {
    display: grid;
    grid-template-columns: 1fr;
}

.card {
    display: flex;
    flex-direction: column;
    border: 1px solid #000;
}

.card img {
    max-width: 100%;
    height: auto;
}

.btn-buy {
    margin-top: auto;
}

@media (min-width: 768px) {
    * {
        font-size: 1.1rem;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navigation {
        display: flex;
    }

    .btn-login {
        display: flex;
    }

    .hamburger {
        display: none;
    }

    .navigation a{
        margin: 1.4rem;
    }

    .product-card {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }

    .card {
        margin: 1.2rem;
    }
}

@media (min-width: 1024px) {
    * {
        font-size: 1rem;
    }

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .hamburger {
        display: none;
    }

    .navigation a{
        margin: 1.6rem;
    }

    .btn-login {
        display: flex;
    }

    .body {
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
    }

    .product-card {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }

    .card {
        margin: 1.3rem;
    }
}
```
### So sánh với Bootstrap version:
| Tiêu chí | CSS version | Bootstrap version |
|---|---|---|
| Số dòng CSS cần viết | Khoảng hơn 100 dòng, do phải tự viết lại từ đầu | Gần như bằng 0, do chỉ phải gọi class đã được định nghĩa sẵn |
| Thời gian phát triển | Lâu hơn | Nhanh hơn |
| Khả năng tùy biến | Xuất sắc, do tự viết code nên có thể tự do tuỳ biến theo ý người viết | Hạn chế hơn do lấy "khuôn" có sẵn, muốn tuỳ biến phải override CSS hoặc dùng SCSS |
- NÊN dùng Bootstrap khi:
    + Cần làm dự án nhanh, tiến độ gấp, không quá khắt khe về giao diện
    + Dùng trong các dự án Admin Dashboard, nơi cần sự chuẩn hoá về form nhập liệu, bảng số liệu, thống kê,...
    + Trong nhóm có ít người có khả năng code giỏi
- KHÔNG NÊN dùng Bootstrap khi:
    + Làm sản phẩm Landing Page sáng tạo, Portfolio cá nhân, những trang web đòi hỏi tính nghệ thuật, hoạt họa (Animation) phức tạp, độc đáo và mang bản sắc riêng
    + Khi cần tối ưu SEO và tốc độ tải trang, việc gánh thêm một framework cồng kềnh sẽ làm giảm hiệu năng tổng thể