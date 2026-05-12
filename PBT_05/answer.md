# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — Viewport & Mobile-First
1. Viết chính xác thẻ `<meta viewport>` chuẩn:  
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Giải thích từng thuộc tính:
    + `meta name="viewport"`: Vùng hiển thị của trình duyệt trên thiết bị
    + `content="width=device-width`: Thiết lập chiều rộng của viewport bằng với chiều rộng thực tế của thiết bị
    + `initial-scale=1.0"`: Thiết lập mức độ phóng to ban đầu khi trang web vừa tải xong. Giá trị `1.0` nghĩa là tỉ lệ 1:1
2. Nếu THIẾU thẻ này, iPhone giả định trang rộng 980px (như desktop) → trang web thu nhỏ lại → chữ bé xíu → UX tệ
3. Điểm khác nhau giữa Mobile-First và Desktop-First:

| Tiêu chí | Mobile-First (Ưu tiên di động) | Desktop-First (Ưu tiên máy tính) |
|---|---|---|
| **Điểm bắt đầu** | Thiết kế cho màn hình nhỏ nhất (Smartphone). | Thiết kế cho màn hình lớn nhất (Desktop). |
| **Kỹ thuật Media Query** | Sử dụng `min-width` (Mở rộng từ nhỏ đến lớn). | Sử dụng `max-width` (Thu hẹp từ lớn đến nhỏ). |
| **Triết lý thiết kế** | **Progressive Advancement**: Xây dựng nền tảng cốt lõi rồi thêm tính năng khi không gian cho phép. | **Graceful Degradation**: Thiết kế đầy đủ tính năng rồi cắt giảm/ẩn bớt khi thiếu không gian. |
| **Hiệu suất (Speed)** | **Tối ưu hơn**: Thiết bị di động chỉ tải các thành phần cần thiết, giúp tiết kiệm băng thông. | **Kém hơn**: Thiết bị di động phải tải cả bộ mã của Desktop sau đó mới thực hiện lệnh ẩn. |
| **Nội dung & UX** | Tập trung vào thông tin quan trọng nhất, giao diện tinh gọn và dễ tương tác bằng cảm ứng. | Dễ sa đà vào các hiệu ứng phức tạp, hình ảnh lớn và menu đa cấp khó dùng trên di động. |
| **SEO (Google)** | Được ưu tiên mạnh mẽ nhờ thuật toán **Mobile-First Indexing** của Google. | Thường bị đánh giá thấp hơn nếu phiên bản di động bị cắt xén quá nhiều nội dung so với PC. |
| **Phù hợp cho** | Các trang web hiện đại, thương mại điện tử, mạng xã hội, tin tức. | Các hệ thống quản trị chuyên sâu (Admin), Dashboard phức tạp, công cụ làm việc chuyên nghiệp. |

#### Viết ví dụ CSS cho mỗi cách với breakpoint 768px:
-  Mobile-First:
```
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}

@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```
- Desktop-First

```
.product-grid { grid-template-columns: repeat(4, 1fr); }
@media (max-width: 768px) {
    .product-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```
#### Mobile-First được khuyên dùng vì:
- Mobile tải ít CSS hơn (mobile chỉ tải mobile styles, không download desktop styles)
- Buộc bạn ưu tiên nội dung quan trọng trước (content thinking)
- Google và performance tools đánh giá cao hơn
##### Nguồn tham chiếu: 13_creating_responsive_layouts

## Câu A2 — Breakpoints
### Ghi lại breakpoints chuẩn:
| Tên | Kích thước pixel | Thiết bị đại diện | Ví dụ: lưới sản phẩm nên hiển thị mấy cột?
|---|---|---|---|
| **Mobile** | < 576px | iPhone SE, các điện thoại nhỏ | 1 cột |
| **Mobile L** | ≥ 576px | iPhone Plus, điện thoại ngang | 2 cột |
| **Tablet** | ≥ 768px | iPad dọc, tablet | 2 cột |
| **Desktop** | ≥ 992px | Laptop nhỏ | 3 cột |
| **Desktop L** | ≥ 1200px | Desktop, laptop lớn | 3 cột |
| **Desktop XL** | ≥ 1400px | Màn hình 4K, ultrawide | 4 cột |
##### Nguồn tham chiếu: 13_creating_responsive_layouts - 3. ⚙️ Core Technical Truth - Breakpoints chuẩn