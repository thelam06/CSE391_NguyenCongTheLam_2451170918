// 1. Máy random 1 số từ 1-100
const targetNumber = Math.floor(Math.random() * 100) + 1;

// Khởi tạo các biến trạng thái trò chơi
const max_attempts = 7;      // Giới hạn 7 lần đoán
let attempts = 0;            // 3. Biến đếm số lần đoán hiện tại
let guessedNumbers = [];     // Mảng chứa các số user đã đoán để kiểm tra trùng lặp
let isWin = false;           // Trạng thái thắng cuộc của trò chơi

alert("Chào mừng bạn đến với Mini Game Đoán Số!\nMáy đã chọn ngẫu nhiên 1 số từ 1-100. Bạn có tối đa 7 lượt đoán. Bắt đầu nào!");

// Vòng lặp trò chơi (Chạy đến khi hết lượt hoặc đoán đúng)
while (attempts < max_attempts){
    // User nhập số
    let currentTurn = attempts + 1;
    let input = prompt(`Lượt ${currentTurn}/${max_attempts}: Nhập một số từ 1 đến 100:`);

    // Trường hợp bấm "Huỷ (Cancel)" trên hộp thoại prompt
    if (input === null) {
        alert("Bạn đã thoát trò chơi.");
        break;
    }

    // Ép kiểu dữ liệu nhập vào thành số nguyên
    let guess = parseInt(input.trim());

    // Validate input: Chỉ chấp nhận số 1-100
    if (isNaN(guess) || guess < 1 || guess > 100){
        alert("Lỗi: Vui lòng chỉ nhập số nguyên nằm trong khoảng từ 1 đến 100!");
        continue;
    }

    // Validate nếu nhập trùng số
    let isDuplicated = false;
    for (let i = 0; i < guessedNumbers.length; i++) {
        if (guessedNumbers[i] === guess) {
            isDuplicated = true;
            break;
        }
    }

    // Nếu user nhập cùng số 2 lần → cảnh báo "Bạn đã đoán số này rồi!"
    if (isDuplicated) {
        alert(`Bạn đã đoán số ${guess} này rồi!`);
        continue; // Bắt nhập lại lượt này, không trừ lượt đoán
    }

    // Nếu vượt qua 2 validate trên, ghi nhận số này hợp lệ và tăng số lần đoán
    attempts++;
    guessedNumbers.push(guess);

    // 2. User nhập số, máy trả lời "Cao hơn" / "Thấp hơn" / "Đúng rồi!"
    // 4. Sau khi đoán đúng, hiển thị: "Bạn đoán đúng sau X lần!"
    if (guess === targetNumber) {
        alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
        isWin = true;
        break; // Thoát vòng lặp ngay lập tức vì đã thắng
    } else if (guess > targetNumber) {
        alert("Thấp hơn!");
    } else {
        alert("Cao hơn!");
    }

    // 5. Giới hạn 7 lần đoán — Hết lượt → thua, hiển thị đáp án
    if (!isWin && attempts === max_attempts) {
        alert(`Bạn đã hết lượt đoán! Bạn đã thua cuộc.\nĐáp án chính xác là: ${targetNumber}`);
    }
}