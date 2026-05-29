# PHẦN A — KIỂM TRA ĐỌC HIỂU
## Câu A1 — Sync vs Async
```javascript
console.log("1 - Start");

setTimeout(() => console.log("2 - Timeout 0ms"), 0);

Promise.resolve().then(() => console.log("3 - Promise"));

console.log("4 - End");

setTimeout(() => console.log("5 - Timeout 100ms"), 100);

Promise.resolve().then(() => {
    console.log("6 - Promise 2");
    setTimeout(() => console.log("7 - Nested timeout"), 0);
});
```
### Thứ tự output:
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```
### Giải thích Event Loop, Microtask Queue, Macrotask Queue.
1. Event Loop:
- Là một cơ chế giúp JavaScript xử lý các tác vụ bất đồng bộ - Asynchronous (như gọi API, đọc file, setTimeout)
- Vì JavaScript là single-threaded — chỉ làm 1 việc tại 1 thời điểm -> dùng event loop để không block main thread trong khi chờ I/O (network, file, timer)
- Thứ tự ưu tiên: Call Stack (console.log, phép tính,...) -> Microtask Queue (Promise.then(), async/await) -> Macrotask Queue (setTimeout, setInterval, các sự kiện click/input,...)
2. Microtask Queue:
- Nơi xếp hàng của các tác vụ bất đồng bộ khẩn cấp, chủ yếu là Promise.then() và async/await
3. Macrotask Queue:
- Nơi xếp hàng của các tác vụ bất đồng bộ thông thường, chủ yếu là setTimeout, setInterval và các sự kiện click/input của người dùng
##### Nguồn tham chiếu: tuan_5_javascript_dom_async - 20_ajax_async