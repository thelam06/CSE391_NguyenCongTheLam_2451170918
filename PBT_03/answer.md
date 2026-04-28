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

### Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, cách dùng Inline sẽ "thắng" vì:
- Inline nằm "gần" phần tử nhất, áp dụng thuộc tính trực tiếp vào phần tử đó.
#### Cách viết Internal và External được áp dụng phụ thuộc vào vị trí trong code vì:
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

## Câu A3 — Box Model — Tính toán kích thước
### Trường hợp 1: content-box (mặc định)
```
.box-1 {
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
-> Chiều rộng hiển thị = 450px
<br>
-> Không gian chiếm trên trang = 470px
<br>

### Trường hợp 2: border-box
```
.box-2 {
    box-sizing: border-box;
    width: 400px;
    padding: 20px;
    border: 5px solid black;
    margin: 10px;
}
```
-> Chiều rộng hiển thị = 400px
<br>
-> Kích thước content thực tế = 330px
<br>
-> Không gian chiếm trên trang = 420px
<br>

### Trường hợp 3: Margin collapse
```
.box-a { margin-bottom: 25px; }
.box-b { margin-top: 40px; }
```
-> Khoảng cách giữa box-a và box-b = 40px
<br>
-> Giải thích tại sao KHÔNG PHẢI 65px:
<br>
- Vì box-a và box-b nằm dọc nhau, mà không có border hay padding để ngăn cách giữa chúng.
- Do đó xảy ra hiện tượng "Margin collapse": box-b (40px: to hơn) gộp với box-a (25px: nhỏ hơn) -> lấy box-b vì lớn hơn.
<br>
→ Nâng cao:
```
.box-a { margin-bottom: -10px; }
.box-b { margin-top: 40px; }
```
-> Khoảng cách = 40 + (-10) = 30px

##### Nguồn tham chiếu: 11_box_model

## Câu A4 — Specificity (Độ ưu tiên)
Cho các CSS rules sau cùng target 1 element `<p class="price" id="main-price">`:
```
p { color: black; }                 /* Rule A */
.price { color: blue; }             /* Rule B */
#main-price { color: red; }         /* Rule C */
p.price { color: green; }           /* Rule D */
```
### Tính specificity score (a, b, c) cho mỗi rule
- Rule A: (0, 0, 1)
- Rule B: (0, 1, 0)
- Rule C: (1, 0, 0)
- Rule D: (0, 1, 1)
### Element sẽ có màu đỏ của Rule C. Giải thích:
- Ta có cách tính điểm specificity score (a, b, c): a = 100, b = 10, c = 1. Tổng a + b + c càng cao thì thuộc tính càng được ưu tiên.
- Tính tổng điểm của từng Rule:
```
Rule A: 1 điểm
Rule B: 10 điểm
Rule C: 100 điểm
Rule D: 11 điểm
```
- Ta thấy Rule C có tổng điểm cao nhất -> Ưu tiên thuộc tính của Rule C.
### Nếu thêm `<p class="price" id="main-price" style="color: orange;">`, element có màu cam.
### Nếu Rule A thêm !important, element có màu đen của Rule A, vì:
- !important có độ ưu tiên cao nhất trong tất cả các Selector.
- Do đó, khi thêm !important vào thuộc tính của Rule A -> Rule A có độ độ ưu tiên cao hơn so với 3 Rule còn lại -> Ưu tiên thuộc tính của Rule A.

##### Nguồn tham chiếu: 09_css_selectors - Phần 3. ⚙️ Core Technical Truth - Mục Specificity: "Ai thắng khi xung đột?"

<br>

# PHẦN B — THỰC HÀNH CODE
## Bài B1 — Style trang Profile
### 5 loại selector khác nhau:
- element:
```
body
header
nav
table
```
- class:
```
nav.active
.noi_dung tr:nth-child(even)
.noi_dung tr:hover
```
- id:
`#footer`
- descendant:
```
nav a
table thead th
```
- pseudo-class:
```
.noi_dung tr:nth-child(even)
nav:hover
.noi_dung tr:hover
```

## Bài B2 — Box Model Lab
### Phần 1 — Chứng minh content-box vs border-box
- Hộp 1 (content-box): chiều rộng thực tế = 350 px (đo từ DevTools)
- Hộp 2 (border-box): chiều rộng thực tế = 300 px (đo từ DevTools)
#### Giải thích sự khác biệt:
##### Ở hộp 1 (content-box):
- Thuộc tính width:300px chỉ chiều rộng của phần nội dung (content) trong hộp. Mà thực tế ta còn tính thêm chiều rộng của các thuộc tính padding và border.
- Cụ thể: chiều rộng thực tế của hộp 1 (content-box) = width + padding trái + padding phải + border trái + border phải = 300 + 20 + 20 + 5 + 5 = 350px (đúng với chiều rộng đã đo được ở DevTools).
##### Ở hộp 2 (border-box):
- Thuộc tính width:300px chỉ chiều rộng của toàn bộ các thuộc tính content, padding và border. Nên chiều rộng thực tế của hộp 2 (border-box) = 300px (đúng với chiều rộng đã đo được ở DevTools).

### Phần 2 — Layout 3 cột

## Bài B3 — Specificity Battle
### Liệt kê 10 rules + specificity score
```
p { color: magenta; }                       /* Specificity: 0,0,1; Score = 1*/
.text { color: blue; }                      /* Specificity: 0,1,0; Score = 10*/
.highlight { color: green; }                /* Specificity: 0,1,0; Score = 10*/
.text p { color: brown; }                   /* Specificity: 0,1,1; Score = 11*/
.highlight p { color: yellow; }             /* Specificity: 0,1,1; Score = 11*/
.text.highlight { color: orange; }          /* Specificity: 0,2,0; Score = 20*/
#demo { color: purple; }                    /* Specificity: 1,0,0; Score = 100*/
#demo.text { color: pink; }                 /* Specificity: 1,1,0; Score = 110*/
#demo.highlight { color: cyan; }            /* Specificity: 1,1,0; Score = 110*/
#demo.text.highlight { color: red; }        /* Specificity: 1,2,0; Score = 120*/
```
### Element cuối cùng hiển thị màu đỏ vì dòng #demo.text.highlight { color: red; } có điểm Specificity Score = 120, cao nhất so với những dòng khác.
### Thay đổi thứ tự rules trong CSS file. Kết quả có thể thay đổi hoặc không thay đổi vì:
#### Trường hợp kết quả không thay đổi:
- Trong CSS file, trình duyệt lấy Rule của thuộc tính có điểm specificity score cao nhất.
- Do đó, dù có thay đổi thứ tự các Rule thì cũng không làm ảnh hưởng đến kết quả cuối cùng.
#### Trường hợp kết quả thay đổi:
- Khi có nhiều hơn 1 Rule có điểm specificity score cao nhất.
- Khi đó trình duyệt sẽ ưu tiên theo thứ tự từ trên xuống -> Rule ở sau sẽ thắng.

<br>

# PHẦN C — DEBUG & SUY LUẬN
## Câu C1 — Debug CSS Layout
```
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
1. Tính chiều rộng thực tế của sidebar và content (content-box!)
- chiều rộng thực tế của sidebar = width + padding trái + padding phải + border trái + border phải = 300 + 20 + 20 + 1 + 1 = 342px
- chiều rộng thực tế của content = width + padding trái + padding phải + border trái + border phải = 660 + 30 + 30 + 1 + 1 = 722px
2. Layout bị vỡ vì chiều rộng của sidebar và content lớn hơn so với container (342 + 722 = 1064 > 960)
3. Đưa ra 2 cách sửa khác nhau (1 cách dùng border-box, 1 cách không dùng)
### Cách 1: Dùng border-box: thêm dòng * {box-sizing: border-box;} vào file CSS.
### Cách 2: Tính toán lại trường width cho sidebar và content:
- width của sidebar = 300 - (padding trái + padding phải + border trái + border phải) = 30 - (20 + 20 + 1 + 1) = 258px
- width của content = 660 - (padding trái + padding phải + border trái + border phải) = 660 - (30 + 30 + 1 + 1) = 598px
4. Chứng minh cả 2 cách sửa hoạt động trong file [debug_layout.html](debug_layout.html) và [debug_layout.css](debug_layout.css)

## Câu C2 — Cascade Puzzle
### Cho CSS file:
```
body { font-size: 16px; color: #333; }
.container { font-size: 14px; }
.card { color: blue; }
.card .title { font-size: 20px; }
.card p { color: inherit; }
#featured .title { color: red; }
.highlight { color: green !important; }
```
### Và HTML:
```
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
#### Tính điểm specificity score cho từng Rule:
```
body { font-size: 16px; color: #333; }        Specificity: 0,0,1; Score = 1
.container { font-size: 14px; }                 Specificity: 0,1,0; Score = 10
.card { color: blue; }                          Specificity: 0,1,0; Score = 10
.card .title { font-size: 20px; }               Specificity: 0,2,0; Score = 20
.card p { color: inherit; }                     Specificity: 0,1,1; Score = 11
#featured .title { color: red; }                Specificity: 1,1,0; Score = 110
.highlight { color: green !important; }         Specificity: -,-,-; Score = -
```
<hr>

1. "Sản phẩm A" (h2) có font-size = 20px và color = green
#### Giải thích font-size = 20px
- Có 3 Rule nhắm vào thẻ "Sản phẩm A" (h2) là .card .title { font-size: 20px; }, .container { font-size: 14px; } và body { font-size: 16px; color: #333; }
- Trong đó .card .title { font-size: 20px; } có điểm specificity score = 20, cao hơn 2 Rule còn lại -> Áp dụng font-size = 20px cho "Sản phẩm A" (h2)
#### Giải thích color = green
- Trong 7 Rule có .highlight { color: green !important; } sử dụng !important -> Áp dụng color = green cho "Sản phẩm A" (h2)
<hr>

2. "Mô tả sản phẩm" (p trong card featured) có color = blue
#### Giải thích color = blue
- Có 3 Rule nhắm vào thẻ "Mô tả sản phẩm" (p trong card featured) là .card p { color: inherit; }, .card { color: blue; } và body { font-size: 16px; color: #333; }
- Trong đó card p { color: inherit; } có điểm specificity score = 11, cao hơn 2 Rule còn lại -> Áp dụng color = inherit cho thẻ "Mô tả sản phẩm" (p trong card featured). Ý nghĩa của Rule trên là kế thừa màu của thuộc tính cha
- Màu của thuộc tính cha (`<div class="card" id="featured">`) là color = blue vì có Rule .card { color: blue; } được áp dụng
- Do đó, "Mô tả sản phẩm" (p trong card featured) sẽ kế thừa thuộc tính color = blue từ `<div class="card" id="featured">` -> Áp dụng color = blue.
<hr>

3. "Sản phẩm B" (h2) có font-size = 20px và color = blue
#### Giải thích font-size = 20px
- Có 2 Rule nhắm vào thẻ "Sản phẩm B" (h2) là .card .title { font-size: 20px; } và body { font-size: 16px; color: #333; }
- Trong đó .card .title { font-size: 20px; } có điểm specificity score = 20, cao hơn Rule còn lại -> Áp dụng font-size = 20px cho "Sản phẩm B" (h2)
#### Giải thích color = blue
- Có 3 Rule nhắm vào thẻ "Sản phẩm B" (h2) là .card { color: blue; } và body { font-size: 16px; color: #333; }
- Trong đó .card { color: blue; } có điểm specificity score = 10, cao hơn Rule còn lại -> Áp dụng color = blue cho "Sản phẩm B" (h2)
<hr>

4. "Mô tả sản phẩm B" (p.highlight) có color = green
#### Giải thích color = green
- Trong 7 Rule có .highlight { color: green !important; } sử dụng !important -> Áp dụng color = green cho "Mô tả sản phẩm B" (p.highlight)