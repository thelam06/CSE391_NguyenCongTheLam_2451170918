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