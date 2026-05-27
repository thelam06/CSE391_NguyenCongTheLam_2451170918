const formState = {
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false,
    isConfirmPasswordValid: false,
    isPhoneValid: false,
};

// 1. Nút Submit: Disabled cho đến khi tất cả fields valid
const btnSubmit = document.querySelector(".btn-submit");

function checkFormValidity() {
    btnSubmit.disabled = !(
        formState.isNameValid &&
        formState.isEmailValid &&
        formState.isPasswordValid &&
        formState.isConfirmPasswordValid &&
        formState.isPhoneValid
    );
}

// 2. Tên (2-50 ký tự): Hiện ✅ hoặc ❌ ngay khi gõ
const nameInput = document.querySelector("#username");
const nameError = document.querySelector(".input-block .name-error-message");

nameInput.addEventListener("input", function () {
    const value = nameInput.value.trim();
    if (value.length >= 2 && value.length <= 50) {
        nameError.textContent = "✅ Hợp lệ";
        formState.isNameValid = true;
    } else {
        nameError.textContent = "❌ Tên phải từ 2-50 ký tự";
        formState.isNameValid = false;
    }
    checkFormValidity();
});

// 3. Email (regex validate): Hiện thông báo lỗi cụ thể bên dưới input
// 3.1 Hàm phụ để kiểm tra và trả về thông báo
function getEmailErrorMessage(email) {
    if (email === "") {
        return `❌ Email không được để trống!`;
    }
    if (!email.includes("@")) {
        return `❌ Email phải có ký tự @`;
    }
    const emailParts = email.split("@");
    const emailAccount = emailParts[0];
    const emailDomain = emailParts[1];
    if (emailAccount === "") {
        return `❌ Bạn chưa nhập tên tài khoản trước dấu '@'`;
    }
    if (emailDomain === "") {
        return `❌ Bạn chưa nhập tên miền phía sau dấu '@' (Ví dụ: gmail.com)`;
    }
    const domainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(?:\.[a-zA-Z]{2,6})?$/;
    if (!domainRegex.test(emailDomain)) {
        return "❌ Tên miền không hợp lệ (Ví dụ đúng: gmail.com, edu.vn)";
    }
    return "✅ Email hợp lệ";
}

const emailInput = document.querySelector("#email");
const emailError = document.querySelector(".input-block .email-error-message");

emailInput.addEventListener("input", function () {
    const value = emailInput.value.trim();
    let errorMessage = getEmailErrorMessage(value);
    if (errorMessage === "✅ Email hợp lệ") {
        formState.isEmailValid = true;
        emailError.style.color = "green";
    }
    else {
        formState.isEmailValid = false;
        emailError.style.color = "red";
    }
    emailError.textContent = errorMessage;
    checkFormValidity();
});

// 4. Kiểm tra Password strength
const passwordInput = document.querySelector("#password");
const passwordError = document.querySelector(
    ".input-block .password-error-message",
);

// 4.1 Hàm phụ kiểm tra Password strength (trả về kết quả gồm text và score ứng với từng mức độ trong progress bar)
function checkPasswordStrength(password) {
    const hasLetterAndNumber = /(?=.*[a-zA-Z])(?=.*[0-9])/.test(password);
    const hasSpecialChar = /(?=.*[!@#$%^&*])/.test(password);
    if (password.length < 8) return { text: `Yếu`, score: 1 };
    else if (hasLetterAndNumber && hasSpecialChar)
        return { text: `Mạnh`, score: 3 };
    else if (hasLetterAndNumber) return { text: `Trung bình`, score: 2 };
    return { text: `Yếu`, score: 1 };
}

// 4.2 Hàm phụ kiểm tra khớp mật khẩu
const confirmPasswordInput = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(
    ".input-block .confirm-password-error-message",
);
function checkPasswordMatch() {
    if (
        confirmPasswordInput.value.trim() === "" ||
        passwordInput.value.trim() === ""
    ) {
        confirmPasswordError.textContent = ``;
        formState.isConfirmPasswordValid = false;
        return;
    }
    if (confirmPasswordInput.value.trim() === passwordInput.value.trim()) {
        confirmPasswordError.textContent = `✅ Mật khẩu khớp`;
        formState.isConfirmPasswordValid = true;
    } else {
        confirmPasswordError.textContent = `❌ Mật khẩu không khớp`;
        formState.isConfirmPasswordValid = false;
    }
    checkFormValidity();
}

// 4.2 Hiển thị lỗi lên màn hình
const progress = document.querySelector("#strength-progress");
passwordInput.addEventListener("input", function () {
    const value = passwordInput.value.trim();
    if (value === "") {
        progress.style.width = "0%";
        passwordError.textContent = "";
        formState.isPasswordValid = false;
        checkFormValidity();
        return;
    }
    const resultPassword = checkPasswordStrength(value);
    passwordError.textContent = resultPassword.text;
    // Với mỗi mức độ của password, thay đổi trạng thái thanh progress bar
    if (resultPassword.score === 1) {
        progress.style.width = "33%";
        progress.style.backgroundColor = "red";
        formState.isPasswordValid = false;
    } else if (resultPassword.score === 2) {
        progress.style.width = "66%";
        progress.style.backgroundColor = "yellow";
        formState.isPasswordValid = true;
    } else if (resultPassword.score === 3) {
        progress.style.width = "100%";
        progress.style.backgroundColor = "green";
        formState.isPasswordValid = true;
    }
    checkPasswordMatch();
    checkFormValidity();
});

// 5. Confirm password: Real-time check khớp với password
confirmPasswordInput.addEventListener("input", checkPasswordMatch);

// 6. Phone (10 chữ số): Tự thêm dấu gạch khi gõ: 0901-234-567
const phoneInput = document.querySelector("#phone-number");
const phoneError = document.querySelector(
    ".input-block .phone-number-error-message",
);

phoneInput.addEventListener("input", function () {
    // Chuyển tất cả các ký tự không phải là số thành chữ số
    let rawNumbers = phoneInput.value.replace(/\D/g, "");
    rawNumbers = rawNumbers.slice(0, 10);

    //Thêm dấu "-" mỗi khi người dùng nhập xong một lượng chữ số nhất định
    let formatted = "";
    if (rawNumbers.length > 0) {
        formatted += rawNumbers.slice(0, 4);
    }
    if (rawNumbers.length > 4) {
        formatted += "-" + rawNumbers.slice(4, 7);
    }
    if (rawNumbers.length > 7) {
        formatted += "-" + rawNumbers.slice(7, 10);
    }
    phoneInput.value = formatted;

    // Hiển thị lên màn hình
    if (rawNumbers.length === 10) {
        phoneError.textContent = `✅ Số điện thoại hợp lệ`;
        formState.isPhoneValid = true;
    } else {
        phoneError.textContent = `❌ Số điện thoại phải đủ 10 chữ số`;
        formState.isPhoneValid = false;
    }
    checkFormValidity();
});

// 7. Khi submit, hiện modal "Đăng ký thành công!" với thông tin đã nhập
const form = document.querySelector(".validator-form");
const modal = document.querySelector("#success-modal");
const btnClose = document.querySelector(".btn-close-modal");

const resultName = document.querySelector("#result-name");
const resultEmail = document.querySelector("#result-email");
const resultPhone = document.querySelector("#result-phone");

// Hiển thị modal khi submit
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentName = document.querySelector("#username").value;
    const currentEmail = document.querySelector("#email").value;
    const currentPhone = document.querySelector("#phone-number").value;

    resultName.textContent = currentName;
    resultEmail.textContent = currentEmail;
    resultPhone.textContent = currentPhone;

    modal.classList.add("open");
});

// Sự kiện đóng modal
btnClose.addEventListener("click", function () {
    modal.classList.remove("open");
    form.reset();

    // Reset trạng thái mở nút submit
    formState.isNameValid = false;
    formState.isEmailValid = false;
    formState.isPasswordValid = false;
    formState.isConfirmPasswordValid = false;
    formState.isPhoneValid = false;

    // Reset thông báo bên dưới input
    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    phoneError.textContent = "";
    progress.style.width = "0%";

    checkFormValidity();
});
