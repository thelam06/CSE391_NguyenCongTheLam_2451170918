# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — Function Declaration vs Expression vs Arrow
- Viết **cùng 1 hàm** `tinhThueBaoHiem(luong)` theo 3 cách:
- Hàm tính: Thuế = 10% nếu lương > 11 triệu, 0% nếu ≤ 11 triệu. Trả về object `{ thuong, thuc_nhan }`.
1. Function Declaration
```javascript
function tinhThueBaoHiem(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
2. Function Expression
```javascript
const tinhThueBaoHiem = function(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
3. Arrow Function
```javascript
const tinhThueBaoHiem = luong => {
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
### 3 cách này khác nhau về hoisting, giải thích bằng ví dụ code cụ thể:
1. Function Declaration
```javascript
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

function tinhThueBaoHiem(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Trong Function Declaration, do cơ chế hoisting, nên dù hàm `tinhThueBaoHiem` được gọi trước khi định nghĩa -> Chạy bình thường, không lỗi.
2. Function Expression
```javascript
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

const tinhThueBaoHiem = function(luong){
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Function Expression không có cơ chế hoisting -> Biến `ketQua` bị rơi vào TDZ (Temporal Dead Zone), không thể truy cập (lỗi ReferenceError) -> Phải khai báo hàm `tinhThueBaoHiem` trước khi dùng
3. Arrow Function
```javascript
const ketQua = tinhThueBaoHiem(20000000);
console.log(ketQua);

const tinhThueBaoHiem = luong => {
    const thuc_nhan = luong > 11000000 ? luong*0.9 : luong;
    return {thuong: luong, thuc_nhan};
};
```
- Tương tự Function Expression, do Arrow Function không có cơ chế hoisting -> Biến `ketQua` bị rơi vào TDZ (Temporal Dead Zone), không thể truy cập (lỗi ReferenceError) -> Phải khai báo hàm `tinhThueBaoHiem` trước khi dùng
##### Nguồn tham chiếu: tuan_4_javascript_basics - 05_functions - 3. ⚙️ Core Technical Truth - 3 cách khai báo function


## Câu A2 — Scope & Closure
### Không chạy code, dự đoán output:
```javascript
// Đoạn 1:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}
const c = counter();
console.log(c.increment());  // Kết quả: 1
console.log(c.increment());  // Kết quả: 2
console.log(c.increment());  // Kết quả: 3
console.log(c.decrement());  // Kết quả: 2
console.log(c.getCount());   // Kết quả: 2

// Đoạn 2:
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log("var:", i), 100);
}
// Output sau 100ms: 3 3 3
for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let:", j), 200);
}
// Output sau 200ms: 0 1 2
```
### Giải thích chi tiết: `var` và `let` cho kết quả khác nhau trong vòng lặp setTimeout vì:
- `let` có tính chất Block Scope: Mỗi lần bắt đầu vòng lặp sẽ tạo ra một biến độc lập -> Khi kết thúc thời gian trong vòng lặp `setTimeout` sẽ in ra giá trị của từng biến độc lập đó
- `var` không có tính chất Block Scope như `let`: Toàn bộ vòng lặp dùng chung 1 biến duy nhất -> Khi kết thúc thời gian trong vòng lặp `setTimeout` sẽ chỉ in ra giá trị của một biến dùng chung đó
##### Nguồn tham chiếu: tuan_4_javascript_basics - 05_functions - 3. ⚙️ Core Technical Truth - (Scope—"Ai nhìn thấy biến nào" và Closures—"Function nhớ môi trường của mình")

## Câu A3 — Array Methods
### Cho mảng: `const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`
### Viết **1 dòng code** cho mỗi yêu cầu (dùng arrow function):
```javascript
`1. Lấy các số chẵn                    → [2, 4, 6, 8, 10]`
const evens = nums.filter((num) => num % 2 === 0);
`2. Nhân mỗi số với 3                  → [3, 6, 9, ..., 30]`
const triple = nums.map((num) => num * 3);
`3. Tính tổng tất cả                   → 55`
const total = nums.reduce((sum, num) => sum + num, 0);
`4. Tìm số đầu tiên > 7               → 8`
const firstGreaterThan7 = nums.find((num) => num > 7);
`5. Kiểm tra CÓ số > 10 không         → false`
const hasGreaterThan10 = nums.some((num) => num > 10);
`6. Kiểm tra TẤT CẢ đều > 0           → true`
const allGreaterThan0 = nums.every((num) => num > 0);
`7. Tạo mảng "Số X là [chẵn/lẻ]"      → ["Số 1 là lẻ", "Số 2 là chẵn", ...]`
const descriptions = nums.map((num) => `Số ${num} là ${num % 2 === 0 ? "chẵn" : "lẻ"}`);
`8. Đảo ngược mảng (không mutate gốc)  → [10, 9, ..., 1]`
const reversed = [...nums].reverse();
```
##### Nguồn tham chiếu: tuan_4_javascript_basics - (05_functions và 06_arrays_objects)

## Câu A4 — Object Destructuring & Spread
### Không chạy code, dự đoán output:
```javascript
const product = {
    name: "iPhone 16",
    price: 25990000,
    specs: { ram: 8, storage: 256, color: "Titan" }
};

// Destructuring
const { name, price, specs: { ram, color } } = product;
console.log(name, price, ram, color);   // Kết quả: iPhone 16" 25990000 8 Titan
console.log(specs);                     // Kết quả: Lỗi ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price);            // Kết quả: 23990000
console.log(updated.sale);             // Kết quả: true
console.log(product.price);            // Kết quả: 25990000 (gốc không đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram);        // 16 (thay vì 8)
```
#### Câu lệnh `console.log(product.specs.ram);` trả về 16 thay vì 8 vì:
- Toán tử Spread `...` chỉ có thể sao chép (copy) độc lập ở **tầng đầu tiên**, không có khả năng copy tự động các object lồng bên trong (nested object).
    + Khi viết `const copy = { ...product };`, các thuộc tính tầng 1 như name và price sẽ được copy giá trị sang biến `copy` hoàn toàn độc lập.
    + Tuy nhiên, thuộc tính specs bản chất lại giữ một địa chỉ vùng nhớ (tham chiếu/pointer) trỏ tới object con { ram: 8, storage: 256, color: "Titan" }.
    + Khi Spread hoạt động, toán tử Spread chỉ sao chép địa chỉ vùng nhớ đó sang cho `copy.specs`. Vì vậy, cả product.specs và copy.specs hiện tại đang cùng trỏ vào đúng 1 object con duy nhất ở trong bộ nhớ.
- Hệ quả: Câu lệnh `copy.specs.ram = 16;` sẽ đi theo con đường của copy để sửa ô nhớ dùng chung đó -> nếu dùng console.log(product.specs.ram) -> kết quả thay đổi thành 16
##### Nguồn tham chiếu: tuan_4_javascript_basics - 08_destructuring_spread

# PHẦN C — SUY LUẬN
## Câu C1 — Refactor Code
```javascript
// TRƯỚC (ugly code):
function processOrders(orders) {
    var result = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "completed") {
            if (orders[i].total > 100000) {
                var item = {};
                item.id = orders[i].id;
                item.customer = orders[i].customer;
                item.total = orders[i].total;
                item.discount = orders[i].total * 0.1;
                item.finalTotal = orders[i].total - item.discount;
                result.push(item);
            }
        }
    }
    // Sort by finalTotal descending
    for (var j = 0; j < result.length; j++) {
        for (var k = j + 1; k < result.length; k++) {
            if (result[j].finalTotal < result[k].finalTotal) {
                var temp = result[j];
                result[j] = result[k];
                result[k] = temp;
            }
        }
    }
    return result;
}
```
### **Refactor** thành ≤ 10 dòng dùng `filter`, `map`, `sort`, destructuring, array methods + arrow functions:
```javascript
const processOrders = orders => orders
        .filter(({status, total}) => status === "completed" && total > 100000)
        .map(({id, customer, total}) => ({
            id, customer, total,
            discount: total * 0.1,
            finalTotal: total * 0.9
        }))
    // Sort by finalTotal descending
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

## Câu C2 — Thiết kế API
### Thiết kế một thư viện JS nhỏ `miniArray` cung cấp `map`, `filter`, `reduce`  (không dùng built-in).
```javascript
const miniArray = {
    map(arr, fn) {
        // Implement: giống Array.prototype.map
        const result = [];
        for(let i = 0; i < arr.length; i++){
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    filter(arr, fn) {
        // Implement: giống Array.prototype.filter
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    reduce(arr, fn, initialValue) {
        // Implement: giống Array.prototype.reduce
        const hasInitialValue = initialValue !== undefined;
        let accumulator = hasInitialValue ? initialValue : arr[0];
        const startIndex = hasInitialValue ? 0 : 1;
        for (let i = startIndex; i < arr.length; i++) {
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// Test phải pass:
console.log(miniArray.map([1,2,3], x => x * 2));        // → [2,4,6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));    // → [3,4]
console.log(miniArray.reduce([1,2,3,4], (a,b) => a+b, 0)); // → 10
```