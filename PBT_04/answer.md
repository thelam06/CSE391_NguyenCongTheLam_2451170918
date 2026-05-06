# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — 5 Loại Positioning
| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|----------|---------------------------|-------------------|------------------|----------|
| `static` | Có | Không | Có | Mặc định - không cần viết |
| `relative` | Có | Vị trí gốc của nó | Có | Làm anchor cho absolute con, dịch nhẹ |
| `absolute` | Không | Cha relative gần nhất | Có | Badge, dropdown, tooltip, overlay |
| `fixed` | Không | Viewport | Không | Chat button, cookie banner, header cố định |
| `sticky` | Có->Không | Viewport (khi dính) | Có | Sticky header, sticky table header, sidebar |
### Khi nào absolute tham chiếu body?
- Khi tất cả các phần tử cha, ông, bà... bao quanh nó đều có position: static (mặc định).
### Khi nào absolute tham chiếu parent?
- Khi phần tử cha được thiết lập position khác static, cụ thể là relative, absolute, fixed, hoặc sticky.
### Giải thích khái niệm "nearest positioned ancestor".
#### Là quy tắc "truy tìm gốc tọa độ" của trình duyệt dành cho phần tử absolute:
- Trình duyệt bắt đầu nhìn lên phần tử Cha trực tiếp. Nếu cha có position khác static (thường là relative) nó dừng lại và lấy cha làm gốc.
- Nếu cha là static, trình duyệt tiếp tục nhìn lên Ông.
- Nếu ông cũng là static, nó nhìn lên Cụ, và cứ thế tiếp tục.
- Nó sẽ dừng lại ở phần tử đầu tiên mà nó gặp có thuộc tính position khác static. Phần tử đó chính là "Nearest Positioned Ancestor".
##### Nguồn tham chiếu: 12_css_positioning

## Câu A2 — Flexbox vs Grid
### Trường hợp 1:
```
.container { display: flex; }
.item { flex: 1; }
```
- 4 items → Bố cục = 1 hàng (row) gồm 4 items trong container.
#### Text art:
```
________________________________________________
|                   Các tab                    |
|______________________________________________|
|Item 1     Item 2      Item 3      Item 4     |
|______________________________________________|
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|______________________________________________|
```

### Trường hợp 2:
```
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
```
- 6 items → Bố cục = 3 hàng, 2 cột.
#### Text art:
```
________________________________________________
|                   Các tab                    |
|______________________________________________|
|Item 1                 Item 2                 |
|Item 3                 Item 4                 |
|Item 5                 Item 6                 |
|______________________________________________|
|                                              |
|                                              |
|                                              |
|                                              |
|______________________________________________|
```

### Trường hợp 3:
`.container { display: flex; justify-content: space-between; align-items: center; }`
- 3 items → Bố cục = 3 Item cùng 1 hàng (row). 1 item nằm sát bên trái container, 1 item nằm sát bên phải container và 1 item nằm chính giữa container.
#### Text art:
```
________________________________________________
|                   Các tab                    |
|______________________________________________|
|Item 1             Item 2               Item 3|
|______________________________________________|
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|______________________________________________|
```

### Trường hợp 4:
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
- 3 items → Bố cục = Chia làm 3 cột với khoảng cách giữa mỗi cột là 20px, trong đó cột giữa chiếm nhiều nhất trong container. Các item nằm ở sát bên trái của mỗi cột.
#### Text art:
```
________________________________________________
|                   Các tab                    |
|______________________________________________|
|Item 1     Item 2                       Item 3|
|______________________________________________|
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|                                              |
|______________________________________________|
```

### Trường hợp 5:
`.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }`
- 7 items → Bố cục = 3 hàng, item cuối ở hàng thứ 3.
#### Text art:
```
________________________________________________
|                   Các tab                    |
|______________________________________________|
|Item 1         Item 2          Item 3         |
|Item 4         Item 5          Item 6         |
|Item 7                                        |
|______________________________________________|
|                                              |
|                                              |
|                                              |
|                                              |
|______________________________________________|
```
##### Nguồn tham chiếu: 13_creating_responsive_layouts

<br>

# PHẦN B — THỰC HÀNH CODE
## Bài B1 — Positioning Playground
### Kết quả bài tập trong file [positioning.html](positioning.html) và [positioning.css](positioning.css)

## Bài B2 — Flexbox Navigation & Cards
### Kết quả bài tập trong file [flexbox-layout.html](flexbox_layout.html) và [flexbox.css](flexbox.css)

## Bài B3 — Grid Layout — Trang E-Commerce
### Kết quả bài tập trong file [grid_layout.html](grid_layout.html) và [grid.css](grid.css)

<br>

# PHẦN C — SUY LUẬN
## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?
1. Navigation bar ngang (logo + menu + buttons)
- Dùng flexbox vì ta không biết trước số lượng buttons hay số lượng các phần tử trong menu, và ta có thể dễ dàng căn chỉnh theo trục dọc cho các phần tử khác nhau.
2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)
- Dùng grid vì grid phù hợp với bố cục dạng lưới, có biết trước số cột, dễ dàng phân chia thành 3 cột đều nhau cho các ảnh.
3. Layout blog: main content + sidebar
- Dùng grid vì có thể chia rõ được vùng nào là main content, vùng nào là sidebar, và có thể dễ dàng thay đổi vị trí của các vùng.
4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)
- Dùng kết hợp grid và flexbox. Dùng grid để chia footer thành 4 cột thông tin, và dùng flexbox để căn chỉnh các phần tử trong từng cột.
5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)
- Dùng flexbox vì flexbox có thể thay đổi linh hoạt kích thước tuỳ thuộc vào kích thước của các phần tử, đặc biệt để nút luôn dính đáy thì flexbox làm được dễ dàng (với thuộc tính `margin-top: auto;`).

## Câu C2 — Debug Flexbox
### Mô tả lỗi và sửa.
#### Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
```
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; }
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; }
```
##### Nguyên nhân: Do sự không đồng nhất của nội dung bên trong:
- Về văn bản: Tiêu đề hoặc mô tả có độ dài dòng khác nhau.
- Về hình ảnh: Các ảnh có tỷ lệ khung hình khác nhau (cái dọc, cái ngang).
- Mặc dù các Card có thể cao bằng nhau nhờ Flexbox cha `.card-container`, nhưng các phần tử con bên trong Card lại xếp chồng tự nhiên từ trên xuống, không có cơ chế tự đẩy nút xuống đáy.
##### Cách sửa:
- Trong `.card`: thêm dòng `display: flex; flex-direction: column;` để tạo bố cục theo chiều dọc cho từng card.
- Trong `.card img`: thêm dòng `aspect-ratio: 1/1;` để cho ảnh ngang dọc khác nhau vào một khung chuẩn đồng kích thước, và thêm dòng `object-fit: cover;` để lấp đầy khung đó.
- Trong `.card .btn`: thêm dòng `margin-top: auto;` để đẩy button xuống đáy card.
###### Code CSS sau khi sửa:
```
.card-container { display: flex; flex-wrap: wrap; }
.card { width: 30%; margin: 1.5%; display: flex; flex-direction: column; }
.card img { width: 100%; aspect-ratio: 1/1; object-fit: cover;}
.card h3 { font-size: 18px; }
.card .btn { padding: 10px; margin-top: auto; }
```

#### Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
```
.hero {
    height: 100vh;
    display: flex;
}
.hero-content {
    text-align: center;
}
```
##### Nguyên nhân: Chỉ mới thiết lập `display: flex;` trong `.hero`, nên theo mặc định nội dung sẽ dính vào góc trên bên trái.
##### Cách sửa: trong `.hero`: thêm hai dòng `justify-content: center;` và `align-items: center;` để căn giữa theo hai trục dọc và ngang.
###### Code CSS sau khi sửa:
```
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero-content {
    text-align: center;
}
```

#### Lỗi 3: Sidebar bị co lại khi content quá dài
```
.layout { display: flex; }
.sidebar { width: 250px; }
.content { flex: 1; }
```
##### Nguyên nhân:
- Khi content quá dài, sidebar sẽ tự động co lại để tránh làm vỡ bố cục (layout).
##### Cách sửa:
Trong `.sidebar`: Thêm dòng `flex-shrink: 0;` để sidebar không bị co lại khi content quá dài. 
###### Code CSS sau khi sửa:
```
.layout { display: flex; }
.sidebar { width: 250px; flex-shrink: 0;}
.content { flex: 1; }
```