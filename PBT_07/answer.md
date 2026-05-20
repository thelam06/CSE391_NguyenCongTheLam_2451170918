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

## Câu A2 — Data Types & Coercion
### Không chạy code, dự đoán kết quả:
```
console.log(typeof null);            // Dự đoán: null
console.log(typeof undefined);       // Dự đoán: undefined
console.log(typeof NaN);             // Dự đoán: NaN
console.log("5" + 3);                // Dự đoán: 8
console.log("5" - 3);                // Dự đoán: 2
console.log("5" * "3");              // Dự đoán: 15
console.log(true + true);            // Dự đoán: true
console.log([] + []);                // Dự đoán: []
console.log([] + {});                // Dự đoán: []{}
console.log({} + []);                // Dự đoán: {}[]
```
### Chạy code kiểm tra
```
console.log(typeof null);            // Kết quả: object
console.log(typeof undefined);       // Kết quả: undefined
console.log(typeof NaN);             // Kết quả: number
console.log("5" + 3);                // Kết quả: 53
console.log("5" - 3);                // Kết quả: 2
console.log("5" * "3");              // Kết quả: 15
console.log(true + true);            // Kết quả: 2
console.log([] + []);                // Kết quả: 
console.log([] + {});                // Kết quả: [object Object]
console.log({} + []);                // Kết quả: [object Object]
```
- `"5" + 3` và `"5" - 3` cho kết quả khác nhau vì:
    + CỘNG (+) — ưu tiên string nếu có 1 toán hạng là string  
    -> `"5" + 3 = "53"`
    + TRỪ/NHÂN/CHIA/% — chỉ áp dụng cho number → convert sang number  
    -> `"5" - 3`: "5" thành 5, sau đó `"5" - 3 = 2`
##### Nguồn tham chiếu: tuan_4_javascript_basics - 03_data_types_variables

## Câu A3 — So sánh == vs ===
### Dự đoán true hay false:
```
console.log(5 == "5");                // true
console.log(5 === "5");               // false
console.log(null == undefined);       // true
console.log(null === undefined);      // false
console.log(NaN == NaN);              // false
console.log(0 == false);              // true
console.log(0 === false);             // false
console.log("" == false);             // true
```
### Từ giờ trở đi, nên dùng === thay vì == vì:
- Dấu `==` tự chuyển kiểu (type) thành kiểu số (number) khi so sánh hai phần tử khác nhau.
- Dấu `===` kiểm tra cả giá trị và kiểu (type) của các phần tử khi so sánh --> An toàn hơn.
##### Nguồn tham chiếu: tuan_4_javascript_basics - 02_getting_started - Operators—Toán tử - So sánh-CẨN THẬN với == vs ===

## Câu A4 — Truthy & Falsy
### Liệt kê TẤT CẢ giá trị Falsy trong JavaScript
1. false
2. 0
3. 0n
4. ""
5. underfined
6. NaN
### Dự đoán kết quả
```
if ("0") console.log("A");           // In
if ("") console.log("B");            // Không in
if ([]) console.log("C");            // In
if ({}) console.log("D");            // In
if (null) console.log("E");          // Không in
if (0) console.log("F");             // Không in
if (-1) console.log("G");            // In
if (" ") console.log("H");           // In
```
##### Nguồn tham chiếu: tuan_4_javascript_basics - 03_data_types_variables - 3. ⚙️ Core Technical Truth - Truthy & Falsy—Sáu giá trị "giả" trong JavaScript

## Câu A5 — Template Literals
### Viết lại 3 cách nối chuỗi bằng template literal 
1. Cách 1:
`var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";`
- Viết lại: ```var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;```

2. Cách 2:
`var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;`
- Viết lại: ```var url = `https://api.example.com/users/${userId}/orders?page=${page}`;```

3. Cách 3:
```
var html = "<div class=\"card\">" +
    "<h2>" + title + "</h2>" +
    "<p>" + description + "</p>" +
    "<span>Giá: " + price + "đ</span>" +
    "</div>";
```
- Viết lại: 
```
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
    </div>`;
```
##### Nguồn tham chiếu: tuan_4_javascript_basics - 02_getting_started

# PHẦN C — SUY LUẬN
## Câu C1 — Debug JavaScript
```
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

// Test
const gia = tinhGiaGiamGia("100000", 20)
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```
### Tìm và sửa TẤT CẢ lỗi trong code:
1. Lỗi 1: Dòng 3 `return "Phần trăm giảm không hợp lệ"` - kiểu trả về không đồng nhất với dòng 13 `return giaSauGiam`
- Giải thích: ở nhánh lỗi, hàm trả về một chuỗi `"Phần trăm giảm không hợp lệ"`, còn còn ở nhánh thành công hàm lại trả về một số `giaSauGiam`. Khi gọi hàm dễ gây lỗi tính toán
- Cách sửa: đồng nhất kiểu trả về:
```
return -1
```

2. Lỗi 2: Dòng 6 `var giamGia = giaBan * phanTramGiam / 100` - dùng kiểu `var` để khai báo
- Giải thích: kiểu `var` không còn được sử dụng do cơ chế hoisting (đẩy phần khai báo biến lên đầu phạm vi) gây rò rỉ biến và làm code khó kiểm soát khi mở rộng quy mô dự án.
- Cách sửa: thay kiểu `var` bằng `const` vì giá trị biến `giamGia` sau khi tính xong là cố định:
```
const giamGia = giaBan * phanTramGiam / 100
```

3. Lỗi 3: Dòng 9 `if (giaSauGiam = 0)` - điều kiện if nhưng dùng phép gán `=` thay vì phép so sánh
- Giải thích: câu lệnh `if (giaSauGiam = 0)` gán 0 (giá trị Falsy) cho biến `giaSauGiam` dẫn đến điều kiện if luôn sai
- Cách sửa: thay phép gán `=` thành phép so sánh `===`:
```
if (giaSauGiam === 0)
```

4. Lỗi 4: Dòng 10 `console.log("Sản phẩm miễn phí!")` - chèn vào giữa hàm tính toán
- Giải thích: Hàm tính toán chỉ nên làm đúng 1 nhiệm vụ là tính và trả kết quả. Chèn thêm dòng `console.log("Sản phẩm miễn phí!")` làm giảm khả năng tái sử dụng hàm nếu áp dụng cho nhiều sản phẩm
- Cách sửa: Bỏ dòng `console.log("Sản phẩm miễn phí!")` trong hàm `tinhGiaGiamGia`, hiển thị thông báo bên ngoài hàm `tinhGiaGiamGia`

5. Lỗi 5: Dòng 17 `const gia = tinhGiaGiamGia("100000", 20)` - sử dụng tham số kiểu chuỗi `"100000"` thay vì số
- Giải thích: nếu người dùng vô tình truyền tham số kiểu không phải số, kết quả sẽ trả về NaN, gây lỗi cho các dòng code về sau
- Cách sửa: thêm điều kiện kiểm tra tham số truyền vào
```
if (typeof giaBan !== "number" || typeof phanTramGiam !== "number" || Number.isNaN(giaBan) || Number.isNaN(phanTramGiam)) {
    return `Dữ liệu không phải kiểu số!`; 
}
```

6. Lỗi 6: Dòng 18 `console.log("Giá sau giảm: " + gia + "đ")` - sử dụng cú pháp nối chuỗi cũ
- Giải thích: cú pháp nối chuỗi cũ dễ viết nhầm, rối mắt và không tối ưu bằng cú pháp nối chuỗi Template Literals
- Cách sửa: thay thế bằng cú pháp nối chuỗi Template Literals
```
console.log(`Giá sau giảm: ${gia}đ`)
```

7. Lỗi 7: Dòng 20 `console.log("Giá: " + gia2)` - sử dụng cú pháp nối chuỗi cũ
- Giải thích: cú pháp nối chuỗi cũ dễ viết nhầm, rối mắt và không tối ưu bằng cú pháp nối chuỗi Template Literals
- Cách sửa: thay thế bằng cú pháp nối chuỗi Template Literals
```
console.log(`Giá: ${gia2}`)
```

8. Lỗi ẩn: Dòng 23 - Dùng `var` trong vòng lặp thay vì `let`
- Giải thích: biến khai báo bằng `var` sử dụng cơ chế Function Scope nên chỉ tạo ra duy nhất 1 ô nhớ cho toàn bộ vòng lặp. Hàm `setTimeout` dùng để thực hiện một lệnh sau một khoảng thời gian nào đó, giá trị để trong hàm là `1000` (1 giây). Trong 1 giây đó, vòng lặp for đã chạy xong và đẩy giá trị của ô nhớ i chung lên số `5`. Do đó sau 1 giây, hàm `setTimeout` sẽ khiến màn hình in ra 5 lần chuỗi Item 5 trùng lặp
- Cách sửa: thay `var` bằng `let` để tận dụng tính chất Block Scope, tạo ra một ô nhớ i mới độc lập cho từng lượt lặp:
```
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)
    }, 1000)
}
```