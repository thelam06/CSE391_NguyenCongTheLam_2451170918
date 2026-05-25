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