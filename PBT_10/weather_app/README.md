# Bài B1 — Weather App
## API đã dùng:
1. API tìm tọa độ thành phố (Open-Meteo Geocoding API)  
`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en`
### Cách chạy:
2. API thời tiết (Open-Meteo Forecast API)  
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&current=relative_humidity_2m`
## Cách chạy: 
### Người dùng nhập tên thành phố
- Gọi API tìm tọa độ thành phố (Geocoding API)
- Nhận latitude và longitude (vĩ độ và kinh độ)
- Gọi API thời tiết (truyển toạ độ latitude và longitude từ Geocoding API vào API thời tiết để hiển thị thời tiết theo địa điểm cụ thể)
- Nhận dữ liệu thời tiết
- Hiển thị kết quả lên màn hình
- Lưu lịch sử vào localStorage