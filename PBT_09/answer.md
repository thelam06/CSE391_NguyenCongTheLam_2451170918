# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — DOM Tree
- Cho HTML:
```html
<div id="app">
    <header>
        <h1>Todo App</h1>
        <nav>
            <a href="#" class="active">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
        </nav>
    </header>
    <main>
        <form id="todoForm">
            <input id="todoInput" type="text">
            <button type="submit">Add</button>
        </form>
        <ul id="todoList">
            <li class="todo-item">Learn HTML</li>
            <li class="todo-item completed">Learn CSS</li>
        </ul>
    </main>
</div>
```
### 1. Vẽ DOM tree (sơ đồ cây) cho HTML trên
```
div #app
      ├──header
      |       ├──h1 -> "Todo App"
      |       └──nav
      |            ├──a # .active -> All
      |            ├──a # -> Active
      |            └──a # -> Completed
      └──main
            ├──form #todoForm
            |               ├──input #todoInput type="text"
            |               └──button type="submit" -> Add
            └──ul #todoList
                        ├──li .todo-item -> Learn HTML
                        └──li .todo-item completed -> Learn CSS
```
### Viết querySelector cho mỗi yêu cầu:
1. Chọn thẻ `<h1>`
```javascript
const h1 = document.querySelector("h1");
```
2. Chọn input trong form
```javascript
const input = document.querySelector("#todoForm #todoInput");
```
3. Chọn tất cả .todo-item
```javascript
const todoItem = document.querySelectorAll(".todo-item");
```
4. Chọn link đang active
```javascript
const activeLink = document.querySelector("a .active");
```
5. Chọn `<li>` đầu tiên trong #todoList
```javascript
const firstLi = document.querySelector("#todoList li:first-child");
```
6. Chọn tất cả `<a>` bên trong `<nav>`
```javascript
const navA = document.querySelectorAll("nav a");
```
##### Nguồn tham chiếu: tuan_5_javascript_dom_async - 19_dom_manipulation

## Câu A2 — innerHTML vs textContent
### Giải thích sự khác nhau. Cho ví dụ khi nào dùng mỗi cái.
| Tiêu chí | innerHTML | textContent |
|---|---|---|
| Đọc | Text + HTML tags bên trong | Chỉ text, không có HTML tags |
| Sửa | ⚠️ Parse HTML — nguy cơ XSS (Cross-Site Scripting)! | ✅ An toàn — không parse HTML |
| Khi nào dùng | Khi cần chèn một cấu trúc HTML phức tạp (không liên quan đến User Input) | Khi cập nhật nội dung dạng chữ của một phần tử (đổi tên, hiện thông báo,...) |
| Dùng trong user input | ❌ Nguy hiểm — chạy script! | ✅ An toàn — hiện text literal |
#### Ví dụ
- innerHTML:
```javascript
// Khi hiển thị sẽ thêm định dạng chữ cho thông báo (in đậm, in nghiêng)
const alertBox = document.querySelector("#alert");
alertBox.innerHTML = "<strong>Cảnh báo:</strong> Bạn <em>chưa nhập</em> mật khẩu!";
```
- textContent:
```javascript
// Đổi tên người dùng
const userName = document.querySelector(".user-name");
userName.textContent = "Nguyễn Văn A";
```
### Câu hỏi bảo mật: innerHTML có thể gây lỗ hổng XSS vì:
- Khi dùng innerHTML để hiển thị một chuỗi chữ do người dùng nhập, trình duyệt sẽ coi chuỗi chữ đó là lệnh HTML hợp pháp. Hacker sẽ lợi dụng điều này để lừa được trình duyệt của nạn nhân **tự động chạy một đoạn code mã độc** (JavaScript) như onerror, onload, onmouseover.
#### Viết 1 ví dụ code minh họa:
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").innerHTML = userInput;  // ← Nguy hiểm!
```
- Cách sửa: thay thế `innerHTML` thành `textContent`:
```javascript
// Giả sử user nhập vào input: <img src=x onerror="alert('Hacked!')">
const userInput = document.querySelector("#search").value;
document.querySelector("#result").textContent = userInput;  // ← An toàn hơn!
```
##### Nguồn tham chiếu: tuan_5_javascript_dom_async - 19_dom_manipulation - 3. ⚙️ Core Technical Truth - Đọc & Sửa Elements

<br>

# PHẦN C — DEBUG & PHÂN TÍCH
## Câu C1 — Debug DOM Code
```javascript
// App: Counter with history
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.innerHTML = count;
    
    // Lưu history
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        deleteHistory(this);
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("onclick", function() {
    count--;
    countDisplay.innerHTML = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay = count;
    historyList.innerHTML = null;
});

function deleteHistory(element) {
    element.parentNode.removeChild(element);
}

// Clear all history
document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove;
    });
});

// Save to localStorage
window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

// Load from localStorage
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
});
```
### Tìm và sửa tất cả lỗi (ít nhất 7 lỗi):
1. Lỗi 1: Dòng 20 `document.querySelector("#decrementBtn").addEventListener("onclick", function()` - Sử dụng `onclick` trong phương thức `addEventListener`
- Sửa: thay `onclick` thành `click`
```javascript
document.querySelector("#decrementBtn").addEventListener("click", function())
```
2. Lỗi 2: Dòng 27 `countDisplay = count;` - Gán trực tiếp giá trị số vào biến chứa thẻ HTML
- Sửa: thêm `.innerHTML` sau `countDisplay`
```javascript
countDisplay.innerHTML = count;
```
3. Lỗi 3: Dòng 39 `item.remove;` - Gọi hàm xóa nhưng thiếu cặp dấu ngoặc đơn
- Sửa: thêm cặp ngoặc tròn () thành `item.remove();`
4. Lỗi 4: Dòng 51 `count = localStorage.getItem("count");` - Ép sai kiểu dữ liệu của biến count (kiểu Number) khi lấy từ localStorage (kiểu String)
- Sửa: Thêm thuộc tính `parseInt` để chuyển chuỗi lấy từ `localStorage` thành kiểu số
```javascript
count = parseInt(localStorage.getItem("count"));
```
5. Lỗi 5: Dòng 51 `count = localStorage.getItem("count");` - Lỗi Logic/Runtime khi người dùng mới mở web lần đầu (localStorage trống)
- Sửa: thêm giá trị 0 thay thế nếu dữ liệu trong `localStorage` trống
```javascript
count = parseInt(localStorage.getItem("count")) || 0;
```
6. Lỗi 6: Dòng 50 - Quên không khôi phục lại danh sách Lịch sử (historyList) từ bộ nhớ
- Sửa: Thêm dòng lệnh: `historyList.innerHTML = localStorage.getItem("history") || "";` vào trong sự kiện load
```javascript
window.addEventListener("load", () => {
    count = localStorage.getItem("count");
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || "";
});
```
7. Lỗi 7: Dòng 14 đến 16 - Mất sự kiện Click xóa của các thẻ `<li>` sau khi tải lại trang
```javascript
li.addEventListener("click", function() {
    deleteHistory(this);
});
```
- Sửa: dùng kỹ thuật Event Delegation cho thẻ cha `#history` thay vì gắn sự kiện click trực tiếp vào từng thẻ `<li>`
```javascript
historyList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        deleteHistory(e.target);
    }
});
```
8. Lỗi 8: Dòng 9 `countDisplay.innerHTML = count;`, dòng 22 `countDisplay.innerHTML = count;` và dòng 28 `historyList.innerHTML = null;` - Lỗi bảo mật XSS và giảm hiệu năng do sử dụng nhiều `.innerHTML`
- Sửa: thay thế `.innerHTML` thành `.textContent`
```javascript
// Dòng 9 và 22
countDisplay.textContent = count;
// Dòng 28
historyList.textContent = null;
```

## Câu C2 - Performance
1. Bind event lên 1000 elements riêng lẻ là BAD PRACTICE vì:
- Tốn nhiều RAM: Mỗi hàm addEventListener thực chất là một Object trong bộ nhớ JavaScript. Trình duyệt phải cấp phát 1000 ô nhớ riêng biệt để lưu trữ 1000 Object này. Nếu số lượng phần tử tăng dần tới vô hạn, ứng dụng sẽ bị ngốn RAM, gây ra hiện tượng giật lag, đặc biệt là trên điện thoại cấu hình yếu
- Gây rò rỉ bộ nhớ (Memory Leak): Khi xóa một thẻ HTML khỏi màn hình bằng JavaScript, nếu không gỡ bỏ sự kiện trên thẻ đó, trình duyệt sẽ không thể giải phóng ô nhớ của thẻ đó vì hàm addEventListener vẫn đang gắn với thẻ HTML đó
### Event Delegation giải quyết thế nào?
- Nhờ vào cơ chế Event Bubbling, khi bất kỳ thẻ HTML nào bị click, quả bóng sự kiện sẽ tự động bay ngược lên trên, đi qua các tầng cha và chạm vào thẻ cha hoặc thẻ container bao bọc ngoài cùng
- Chỉ cần 1 hàm duy nhất gắn tại thẻ cha. Bộ nhớ RAM được tiết kiệm tới 99.9%. Thẻ con có thêm mới hay xóa đi thì thẻ cha vẫn đứng đó hứng sự kiện, loại bỏ hoàn toàn nguy cơ rò rỉ bộ nhớ
2. Cho code
```javascript
for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    document.body.appendChild(div);   // ← 1000 lần reflow!
}
```
### Refactor dùng DocumentFragment để chỉ gây 1 lần reflow:
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```
### Giải thích: dùng DocumentFragment nhanh hơn vì:
- Code cũ: 1000 lần chỉnh sửa DOM thật = 1000 lần trình duyệt phải Reflow
- Code mới: 1000 lần chỉnh sửa trên DocumentFragment (trong bộ nhớ RAM, 0 lần Reflow) + 1 lần đổ vào DOM thật