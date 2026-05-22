# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — Function Declaration vs Expression vs Arrow
- Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
- Hàm tính: Thuế = 10% nếu lương > 11 triệu, 0% nếu ≤ 11 triệu. Trả về object `{ thuong, thuc_nhan }`.
1. Function Declaration
```
function tinhThueBaoHiem(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
2. Function Expression
```
const tinhThueBaoHiem = function(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
3. Arrow Function
```
const tinhThueBaoHiem = luong => {
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
### 3 cách này khác nhau về hoisting, giải thích bằng ví dụ code cụ thể:
1. Function Declaration
```
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

function tinhThueBaoHiem(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Trong Function Declaration, do cơ chế hoisting, nên dù hàm `tinhThueBaoHiem` được gọi trước khi định nghĩa -> Chạy bình thường, không lỗi.
2. Function Expression
```
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

const tinhThueBaoHiem = function(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Function Expression không có cơ chế hoisting -> Biến `ketQua` bị rơi vào TDZ (Temporal Dead Zone), không thể truy cập (lỗi ReferenceError) -> Phải khai báo hàm `tinhThueBaoHiem` trước khi dùng
3. Arrow Function
```
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

const tinhThueBaoHiem = luong => {
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Tương tự Function Expression, do Arrow Function không có cơ chế hoisting -> Biến `ketQua` bị rơi vào TDZ (Temporal Dead Zone), không thể truy cập (lỗi ReferenceError) -> Phải khai báo hàm `tinhThueBaoHiem` trước khi dùng
##### Nguồn tham chiếu: tuan_4_javascript_basics - 05_functions - 3. ⚙️ Core Technical Truth - 3 cách khai báo function