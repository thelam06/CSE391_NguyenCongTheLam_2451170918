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

# PHẦN C — PHÂN TÍCH
## Câu C1 — Error Handling Strategy
### Bạn xây dựng app E-Commerce gọi nhiều APIs. Thiết kế chiến lược xử lý lỗi:
**1. Network errors (mất mạng giữa chừng):**
#### Chiến lược:
- Kiểm tra trạng thái mạng trước khi cho phép mua sắm/thanh toán
- Nếu mất kết nối mạng, thay vì để app sập ngầm, chủ động hiện thông báo Toast nhắc nhở khách hàng
- Khi có mạng trở lại, hệ thống tự động tải lại giỏ hàng cho khách
```javascript
// Hàm kiểm tra trạng thái mạng trước khi cho phép mua sắm/thanh toán
function checkNetworkBeforeAction() {
    if (!navigator.onLine) {
        // Chủ động hiện thông báo Toast nhắc nhở khách hàng
        alert("🔌 Mất kết nối Internet! Vui lòng kiểm tra lại kết nối để tiếp tục mua sắm.");
        return false;
    }
    return true;
}

// Lắng nghe sự kiện hệ thống để cập nhật giao diện
window.addEventListener("offline", () => {
    // Hiển thị một banner "Đang ngoại tuyến"
    console.log("Người dùng đang ngoại tuyến!");
});

window.addEventListener("online", () => {
    // Ẩn banner ngoại tuyến, tự động tải lại giỏ hàng cho khách
    console.log("Đã có mạng trở lại!");
});
```
**2. API errors (server trả 500, 404, 429 Too Many Requests):**
#### Chiến lược:
- Sử dụng điều kiện if `(!response.ok)` và đọc chỉ số `response.status` để phân loại lỗi (500, 404, 429 Too Many Requests) và đưa ra trải nghiệm người dùng (UX) phù hợp:
```javascript
async function handleEcomApiResponse(response) {
    if (response.ok) {
        return await response.json();
    }

    // Nếu response.ok bằng false, bắt đầu phân tích mã lỗi response.status:
    switch (response.status) {
        case 404:
            throw new Error("Sản phẩm không tồn tại hoặc đã bị gỡ bỏ!");
        case 429:
            throw new Error("Bạn đang thao tác quá nhanh. Vui lòng thử lại sau vài giây!");
        case 500:
            throw new Error("Máy chủ đang quá tải. Vui lòng thử lại sau ít phút!");
        default:
            throw new Error(`Lỗi hệ thống không xác định: ${response.status}`);
    }
}
```
**3. Timeout (API chậm > 10 giây):**
#### Chiến lược:
- Viết một hàm cho phép tự huỷ lệnh fetch nếu quá một khoảng thời gian nào đó
```javascript
async function fetchWithTimeout(url, options = {}, ms = 10000) {
    // Khởi tạo bộ điều khiển tự hủy
    const controller = new AbortController();
    // Đưa chiếc chìa khóa hủy (signal) vào trong cấu hình của lệnh fetch
    options.signal = controller.signal;
    // Khởi tạo đồng hồ bấm giờ
    const timeoutId = setTimeout(() => {
        // Huỷ fetch ngay lập tức khi hết giờ!
        controller.abort();
    }, ms);

    try {
        const response = await fetch(url, options);
        return response;
    }
    catch (error) {
        // Nếu lỗi do huỷ lệnh fetch, thông báo cho người dùng
        if (error.name === "AbortError") {
            throw new Error("Hệ thống mất quá nhiều thời gian để phản hồi!");
        }
        throw error;
    }
    finally {
        // Xóa đồng hồ bấm giờ nếu fetch thành công trước thời hạn
        clearTimeout(timeoutId);
    }
}
```
**4. Retry logic (thử lại 3 lần nếu lỗi network):**
#### Chiến lược:
- Tự động gọi lại API đó thêm 3 lần nữa, mỗi lần cách nhau một khoảng ngắn.
- Nếu đến lần thứ 3 vẫn thất bại thì mới báo lỗi lên màn hình
```javascript
// Hàm phụ hỗ trợ tạo độ trễ bằng Promise
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    // Chạy vòng lặp từ lần thử 1 đến maxRetries
    for (let i = 1; i <= maxRetries; i++) {
        try {
            console.log(`Đang thử kết nối lần thứ ${i}...`);
            const response = await fetch(url, options);
            if (!response.ok) {
                // Nếu server trả lỗi 404, 500 -> Không retry nữa, ném lỗi ra ngoài
                throw new Error(`Lỗi: ${response.status}`);
            }
            // Nếu kết nối thành công thì trả dữ liệu về và thoát hàm
            return await response.json();
        } catch (error) {
            // Nếu đây là lần thử cuối cùng rồi mà vẫn lỗi -> Chính thức ném lỗi ra ngoài
            if (i === maxRetries) {
                throw new Error(`Đã thử lại ${maxRetries} lần nhưng vẫn thất bại! Lỗi: ${error.message}`);
            }
            // Nếu chưa hết số lần thử, bắt hệ thống "đóng băng" trước khi sang vòng lặp kế tiếp
            console.warn(`Lần ${i} thất bại do lỗi mạng. Đang đợi để thử lại...`);
            await delay(1500); 
        }
    }
}
```

## Câu C2 — Promise.all vs Promise.allSettled vs Promise.race
### Giải thích sự khác nhau:
| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `.all()` | Khi tất cả các Promise đều thành công | Chỉ cần 1 Promise thất bại (Reject) là sập toàn bộ ngay lập tức | Khi các API có mối quan hệ ràng buộc với nhau |
| `.allSettled()` | Khi tất cả các Promise đều đã chạy xong (Bất kể thành công hay thất bại) | Không bao giờ bị Reject | Khi các API độc lập hoàn toàn |
| `.race()` | Khi có 1 Promise đầu tiên chạy xong (Bất kể thành công hay thất bại) | Khi có 1 Promise đầu tiên bị thất bại trước khi có Promise thành công | Làm tính năng Timeout cho API hoặc đo tốc độ phản hồi đường truyền |
| `.any()` | Khi có Promise đầu tiên thành công | Khi tất cả các Promise đều bị thất bại | Gọi các Server dự phòng |
### Viết ví dụ code cho mỗi method với scenario thực tế (không phải ví dụ delay đơn giản):
- Chọn scenario trong một trang E-commerce:
1. `Promise.all()`
```javascript
async function renderCheckoutPage(userId) {
    try {
        // Gọi đồng thời 3 API để tiết kiệm thời gian
        const [cart, wallet, shipping] = await Promise.all([
            fetch(`/api/cart/${userId}`).then(res => res.json()),
            fetch(`/api/wallet/${userId}`).then(res => res.json()),
            fetch(`/api/shipping-fee?user=${userId}`).then(res => res.json())
        ]);
        // Nếu cả 3 API đều được gọi thành công thì mới hiện trang thanh toán hoá đơn
        console.log("Đang hiện trang thanh toán:", { cart, wallet, shipping });
        // Giao diện (UI) hóa đơn ở đây...
    }
    catch (error) {
        // Chỉ cần 1 trong 3 API trên bị sập, nhảy vào hàm catch và trả về lỗi
        console.error("Lỗi khi hiển thị hiện trang thanh toán", error.message);
        alert("Hệ thống tính toán hóa đơn gặp sự cố. Vui lòng bấm F5 để thử lại!");
    }
}
```
2. `Promise.allSettled()`
```javascript
async function loadUserDashboard(userId) {
    // Gọi đồng thời 3 API cùng lúc
    const results = await Promise.allSettled([
        fetch(`/api/profile/${userId}`).then(res => res.json()),
        fetch(`/api/orders/${userId}`).then(res => res.json()),
        fetch(`/api/wishlist/${userId}`).then(res => res.json())
    ]);

    // results trả về một mảng gồm 3 Object
    const [profileRes, ordersRes, wishlistRes] = results;

    //Xử lý từng khối, nếu trong 3 khối có khối bị lỗi thì không làm ảnh hưởng đến các khối còn lại
    // Khối 1: Xử lý hiển thị Profile
    if (profileRes.status === "fulfilled") {
        document.querySelector("#profile").textContent = `Chào, ${profileRes.value.name}`;
    } 
    else {
        document.querySelector("#profile").textContent = "Không thể tải thông tin cá nhân";
    }

    // Khối 2: Xử lý hiển thị Đơn hàng
    if (ordersRes.status === "fulfilled") {
        renderOrderTable(ordersRes.value);
    } 
    else {
        document.querySelector("#orders-box").textContent = "Lỗi tải lịch sử đơn hàng";
    }

    // Khối 3: Xử lý hiển thị Wishlist
    if (wishlistRes.status === "fulfilled") {
        renderWishlist(wishlistRes.value);
    } 
    else {
        document.querySelector("#wishlist-box").textContent = "Không thể tải danh sách yêu thích lúc này";
    }
}
```
3. `Promise.race()`
```javascript
async function quickCheckout(orderData) {
    // khởi tạo đồng hồ bấm giờ tự động Reject sau 5 giây
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Hệ thống nghẽn mạng")), 5000)
    );

    // API đặt đơn hàng thật lên server
    const apiPromise = fetch("/api/quick-buy", {
        method: "POST",
        body: JSON.stringify(orderData)
    }).then(res => res.json());

    try {
        // Cho API đua tốc độ với đồng hồ bấm giờ 5 giây
        // Nếu API về đích trước, Promise.race sẽ lấy kết quả của API
        const winner = await Promise.race([apiPromise, timeoutPromise]);
        
        alert("Đặt hàng thành công! Mã đơn: " + winner.orderId);
    } 
    catch (error) {
        // Nếu đồng hồ bấm giờ về đích trước, báo lỗi và trả về kết quả
        alert("Thất bại: " + error.message);
    }
}
```
4. `Promise.any()`
```javascript
async function downloadPriceList() {
    try {
        // Gọi lệnh fetch tải 3 nguồn dự phòng cùng lúc
        const fastestData = await Promise.any([
            fetch("https://vn-server.com/prices.json").then(res => res.json()),
            fetch("https://sg-server.com/prices.json").then(res => res.json()),
            fetch("https://us-server.com/prices.json").then(res => res.json())
        ]);

        console.log("Đã lấy được bảng giá từ server nhanh nhất:", fastestData);
        renderPrices(fastestData);
    }
    // Nếu cả 3 server đều sập mới nhảy vào hàm catch
    catch (aggregateError) {
        console.error("Tất cả server dự phòng đều sập!", aggregateError.errors);
        alert("Không thể tải bảng giá sản phẩm. Vui lòng liên hệ tổng đài!");
    }
}
```