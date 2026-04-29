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