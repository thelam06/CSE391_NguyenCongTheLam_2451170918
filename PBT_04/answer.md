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
```
/* Trường hợp 1 */
.container { display: flex; }
.item { flex: 1; }
/* 4 items → Bố cục = ??? */

/* Trường hợp 2 */
.container { display: flex; flex-wrap: wrap; }
.item { width: 45%; margin: 2.5%; }
/* 6 items → Bố cục = ??? (mấy hàng, mấy cột?) */

/* Trường hợp 3 */
.container { display: flex; justify-content: space-between; align-items: center; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 4 */
.container { display: grid; grid-template-columns: 200px 1fr 200px; gap: 20px; }
/* 3 items → Bố cục = ??? */

/* Trường hợp 5 */
.container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
/* 7 items → Bố cục = ??? (mấy hàng? item cuối ở đâu?) */
```

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