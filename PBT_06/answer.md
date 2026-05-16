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

# PHẦN B — THỰC HÀNH