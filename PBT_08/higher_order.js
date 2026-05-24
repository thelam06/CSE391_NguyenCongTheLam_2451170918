// =============pipe() — Nối chuỗi functions=============
// 1. "fns" là một cái giỏ chứa tất cả các ông thợ (các hàm con) được đưa vào.
function pipe(...fns) {
    // 2. Hàm này trả về một "băng chuyền" nhận vào nguyên liệu thô ban đầu (initialValue).
    return function (initialValue) {
        // "currentValue": Nguyên liệu hiện tại đang có ở trên tay.
        // "currentFn": Ông thợ tiếp theo trong hàng.
        return fns.reduce((currentValue, currentFn) => {
            // Ông thợ nhận nguyên liệu hiện tại, chế biến xong nhả ra nguyên liệu mới.
            return currentFn(currentValue);
        }, initialValue); // "initialValue" là điểm xuất phát (Ví dụ: số 5)
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);

console.log(process(5)); // → "Kết quả: 20"

// =============memoize() — Cache kết quả=============
function memoize(fn) {
    // 1. Tạo ra một "cuốn sổ tay" trống (Map) nằm ẩn bên trong.
    const cache = new Map();
    // 2. "args" là câu hỏi (tham số) được đưa vào, ví dụ: số 1000000.
    return function (...args) {
        // Biến câu hỏi thành một chuỗi chữ (String) để làm nhãn ghi vào sổ tay.
        const key = JSON.stringify(args);
        // 3. Kiểm tra xem trong sổ tay đã từng ghi câu hỏi này chưa?
        if (cache.has(key)) {
            // Nếu có rồi -> Lấy luôn kết quả trong sổ đọc ra, không cần tính lại!
            return cache.get(key);
        }
        // 4. Nếu chưa có -> Bắt ông thợ (fn) vận hành tính toán từ đầu.
        const result = fn(...args);
        // 5. Tính xong thì phải ghi ngay kết quả vào sổ tay để lần sau dùng.
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log(expensiveCalc(1000000)); // → "Đang tính..." → 499999500000
console.log(expensiveCalc(1000000)); // → (không in "Đang tính...", lấy cache!)

// =============debounce() — Chờ user ngừng gõ mới thực hiện=============
function debounce(fn, delay) {
    // 1. "timerId" giống như chiếc đồng hồ bấm giờ hẹn giờ. Ban đầu chưa bật.
    let timerId = null;
    // 2. Cứ mỗi lần người dùng bấm phím (hành động kích hoạt)...
    return function (...args) {
        // Nếu đồng hồ cũ đang chạy dở (tức là lệnh gõ trước chưa hết thời gian chờ)
        if (timerId) {
            clearTimeout(timerId); //bỏ đồng hồ cũ đi, hủy lịch hẹn cũ!
        }
        // 3. Thiết lập một cái lịch hẹn giờ mới.
        timerId = setTimeout(() => {
            fn(...args); // Chỉ khi hết sạch thời gian "delay" mà không bị ai bỏ, hàm mới chạy.
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
// Gọi liên tục → chỉ lần cuối mới chạy

// =============retry() — Thử lại nếu lỗi=============
async function retry(fn, maxAttempts = 3) {// "maxAttempts": Số lần thử tối đa được phép (Mặc định là 3 lần).
    let lastError = null; // Biến dùng để ghi lại nguyên nhân bị lỗi của lần gần nhất.
    // Sử dụng vòng lặp đếm số lần thử từ 1 cho đến giới hạn tối đa
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        // 1. Thử chạy hàm. 
        try {
            // Từ khóa "await" nghĩa là ngồi chờ xem hàm có chạy thành công không.
            // Nếu thành công, lệnh "return" sẽ kết thúc và trả về kết quả.
            return await fn();
        // 2. Nếu chẳng may gặp lỗi
        } catch (error) {
            lastError = error; // Ghi lại lý do lỗi
            console.warn(`Lần thử thứ ${attempt} thất bại. Đang thử lại...`);
            // 3. Nếu đây đã là lần thử cuối cùng rồi (attempt bằng maxAttempts)
            // thì dừng vòng lặp, không tiếp tục nữa.
            if (attempt === maxAttempts) break;
        }
    }
    // 4. Nếu đi qua hết cả 3 lần thử mà không được -> Ném lỗi ra ngoài.
    throw new Error(`Thất bại hoàn toàn sau ${maxAttempts} lần thử. Lỗi: ${lastError.message}`);
}