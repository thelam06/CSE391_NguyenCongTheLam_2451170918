// Input: Danh sách món ăn + giá + số lượng
const cart = [
    { name: "Phở bò đặc biệt", price: 65000, quantity: 2 },
    { name: "Trà đá", price: 5000, quantity: 3 },
    { name: "Bún chả Hà Nội", price: 55000, quantity: 1 },
    { name: "Lẩu hải sản (Lớn)", price: 380000, quantity: 1 }
];

// Hàm tính tổng tiền và in hoá đơn
function printRestaurantInvoice(items, tipPercent = 0) {
    // Tính tổng tiền ban đầu
    let rawTotal = 0;
    for (let i = 0; i < items.length; i++) {
        rawTotal += items[i].price * items[i].quantity;
    }

    // Biến chứa lượng giảm giá theo đơn vị %
    let discountPercent = 0;

    // Tổng > 500k → giảm 10%
    if (rawTotal > 500000) {
        discountPercent = 10;
    }
    // Tổng > 1 triệu → giảm 15%
    else if (rawTotal > 1000000) {
        discountPercent = 15;
    }

    // Ngày thứ 3 (Wednesday) → giảm thêm 5%
    const currentDay = new Date().getDay();
    let isWednesday = (currentDay === 3);
    if (isWednesday) {
        discountPercent += 5;
    }

    // Tính số tiền được giảm
    let discountAmount = (rawTotal * discountPercent) / 100;

    // Tính thuế VAT và tiền Tip
    // Tiền thuế VAT (8% tính trên tổng tiền sau khi đã trừ giảm giá)
    let totalAfterDiscount = rawTotal - discountAmount;
    let vatAmount = (totalAfterDiscount * 8) / 100;

    // Tiền Tip (tính trên tổng tiền sau giảm giá)
    let tipAmount = (totalAfterDiscount * tipPercent) / 100;

    // Tính tổng tiền cuối cùng cần thanh toán
    let finalPayment = totalAfterDiscount + vatAmount + tipAmount;

    // In hoá đơn
    // Hàm phụ để định dạng số thành chuỗi tiền tệ (Ví dụ: 10000 -> 10.000đ)
    const formatMoney = (num) => num.toLocaleString('vi-VN') + "đ";

    console.log("   ╔═══════════════════════════════════════════════╗");
    console.log("   ║                 HÓA ĐƠN NHÀ HÀNG              ║");
    console.log("   ╠═══════════════════════════════════════════════╣");

    // In danh sách món ăn
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let itemTotal = item.price * item.quantity;

        // Căn lề chữ
        let stt = `${i + 1}.`.padEnd(3);
        let name = item.name.padEnd(16).substring(0, 16); // Giới hạn tên tối đa 16 ký tự để không tràn khung
        let qty = `x${item.quantity}`.padEnd(4);
        let price = `@${(item.price / 1000)}k`.padEnd(7);
        let totalStr = `= ${formatMoney(itemTotal)}`.padStart(11);

        console.log(`   ║ ${stt} ${name} ${qty} ${price} ${totalStr} ║`);
    }

    console.log("   ╠═══════════════════════════════════════════════╣");
    console.log(`   ║ Tổng cộng:       ${formatMoney(rawTotal).padStart(28)} ║`);
    console.log(`   ║ Giảm giá (${discountPercent}%):  ${formatMoney(discountAmount).padStart(28)} ║`);
    console.log(`   ║ VAT (8%):        ${formatMoney(vatAmount).padStart(28)} ║`);
    console.log(`   ║ Tip (${tipPercent}%):        ${formatMoney(tipAmount).padStart(28)} ║`);
    console.log("   ╠═══════════════════════════════════════════════╣");
    console.log(`   ║ THANH TOÁN:      ${formatMoney(finalPayment).padStart(28)} ║`);
    console.log("   ╚═══════════════════════════════════════════════╝");
}

// Output: Truyền tham số vào hàm (danh sách món ăn + tiền tip)
printRestaurantInvoice(cart, 5);