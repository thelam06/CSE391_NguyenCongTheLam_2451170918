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

## Câu A2 — Fetch API
```javascript
async function getData() {
    try {
        const response = await fetch("https://api.example.com/data");
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed:", error.message);
        return null;
    }
}
```
### Giải thích từng dòng code:
1. await fetch(...)
- fetch trả về một Promise. Khi hoàn thành, Promise trả về Response.
- Cần await để tạm dừng việc thực hiện các dòng code tiếp theo trong hàm async cho đến khi hoàn thành Promise thì mới chạy xuống dòng dưới
2. response.ok
- response.ok chuyển sang false khi máy chủ (server) nhận được yêu cầu nhưng phản hồi về một mã trạng thái HTTP (status code) nằm ngoài khoảng thành công (từ 200 đến 299)
- 3 status codes tương ứng:
    + 301 Moved Permanently
    + 400 Bad Request
    + 404 Not Found
3. response.json()
- Hàm response.json() trả về một Promise. Do đó, cần await lần nữa để chờ quá trình thực hiện lệnh response.json() hoàn tất
4. try...catch
- Lỗi mạng (Network Error): Người dùng bị mất mạng, đứt cáp, sai địa chỉ URL (Domain không tồn tại)
- Lỗi do lập trình viên ném ra (throw new Error): Khi server trả về lỗi 404. Đoạn code `if (!response.ok)` đã chủ động ném (throw) lỗi ra cho tầng catch
- Lỗi dữ liệu bị hỏng (JSON Parse Error): server trả về thành công (200 OK) nhưng dữ liệu bị hỏng hoặc trả về một trang lỗi HTML không phải JSON
##### Nguồn tham chiếu: tuan_5_javascript_dom_async - 20_ajax_async

## Câu A3 — Promise States
### Vẽ sơ đồ 3 trạng thái của Promise (Pending → Fulfilled, Pending → Rejected) liên tưởng đến ví dụ đặt đồ ăn:
    Đặt hàng                                    Nhận đồ ăn
        │                                            │
        ▼                                            ▼
    ┌─────────────────────────────────────────────────────┐
    │                                                     │
    │   ⏳ PENDING        →    ✅ FULFILLED    hoặc    ❌ REJECTED
    │   (Đang xử lý)          (Thành công)            (Thất bại)
    │                                                     │
    │   Nhà hàng đang         Đồ ăn giao thành       Nhà hàng hủy đơn
    │   nấu đồ ăn             công → ăn ngon!         → hoàn tiền
    │                                                     │
    └─────────────────────────────────────────────────────┘
### Giải thích:
- Callback Hell là hiện tượng xảy ra khi có quá nhiều tác vụ bất đồng bộ (Asynchronous) phải chạy tuần tự phụ thuộc vào nhau -> Các hàm callback lồng vào nhau liên tiếp
- Viết ví dụ 4 cấp callback hell → Refactor thành async/await:
```javascript
// Callback Hell
function getUserOrder() {
    // Cấp 1
    request("/api/user", function (err1, user) {
        if (err1) {
            console.error(err1);
            return;
        }
        // Cấp 2
        request(`/api/orders/${user.id}`, function (err2, orders) {
            if (err2) {
                console.error(err2);
                return;
            }
            // Cấp 3
            request(`/api/products/${orders[0].productId}`, function (err3, product) {
                if (err3) {
                    console.error(err3);
                    return;
                }
                // Cấp 4
                console.log(product);
            }); // Đóng Cấp 3
        }); // Đóng Cấp 2
    }); // Đóng Cấp 1
}

// Async/Await
async function getUserOrder() {
    try {
        const userRes = await fetch("/api/user");
        const user = await userRes.json();

        const ordersRes = await fetch(`/api/orders/${user.id}`);
        const orders = await ordersRes.json();

        const productRes = await fetch(`/api/products/${orders[0].productId}`);
        const product = await productRes.json();

        console.log(product);
    } catch (err) {
        console.error(err);
    }
}
```
##### Nguồn tham chiếu: tuan_5_javascript_dom_async - 20_ajax_async - 3. ⚙️ Core Technical Truth - (Promise — "Lời hứa" trong JavaScript và Async/Await — "Promise nhưng đọc như code thường")