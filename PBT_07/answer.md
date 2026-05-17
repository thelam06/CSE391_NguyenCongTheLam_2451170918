# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — var / let / const
### Không chạy code, dự đoán output cho từng đoạn
1. Đoạn 1
```
console.log(x);
var x = 5;
```
- Dự đoán output: 5

2. Đoạn 2
```
console.log(y);
let y = 10;
```
- Dự đoán output: 10

3. Đoạn 3
```
const z = 15;
z = 20;
console.log(z);
```
- Dự đoán output: 15

4. Đoạn 4
```
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
- Dự đoán output: [ 1, 2, 3, 4 ]

5. Đoạn 5
```
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
- Dự đoán output:
    + Trong block: 2
    + Ngoài block: 1

#### So sánh
| Tiêu chí | Đoạn 1 | Đoạn 2 | Đoạn 3 | Đoạn 4 | Đoạn 5 |
|---|---|---|---|---|---|
| Dự đoán output | 5 | 10 | 15 | 1, 2, 3, 4 | Trong block: 2; ngoài block: 1 |
| Kết quả thực tế | undefined | ReferenceError: Cannot access 'y' before initialization | TypeError: Assignment to constant variable | [ 1, 2, 3, 4 ] | Trong block: 2; ngoài block: 1 |
| Giải thích | Hoisting chỉ đẩy `var x` lên trên console.log, còn giá trị vẫn nằm bên dưới -> Biến x chưa có giá trị | Hoisting không dùng được trước khai báo -> Cần khai báo biến trước khi chạy `console.log`| Thay đổi giá trị const cố định -> Báo lỗi | Chỉ thêm giá trị vào mảng đã có, không thay đổi trực tiếp tham chiếu đến mảng hiện tại | Do tính chất Block scope của kiểu let -> Hai biến trong và ngoài cặp ngoặc nhọn độc lập với nhau |
##### Nguồn tham chiếu: tuan_4_javascript_basics - 02_getting_started