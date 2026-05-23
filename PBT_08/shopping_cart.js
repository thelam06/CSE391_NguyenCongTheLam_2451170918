function createCart() {
    // Private data
    let items = [];
    let discountCode = ""; // Lưu mã giảm giá đang áp dụng
    let discountPercent = 0; // Lưu % giảm
    let discountFixed = 0; // Lưu số tiền mặt được giảm trực tiếp

    return {
        // Thêm sản phẩm (nếu đã có → tăng quantity)
        addItem(product, quantity = 1) {
            if (quantity <= 0) return;
            const exisingItem = items.find(item => item.id === product.id);
            if (exisingItem) exisingItem.quantity += quantity;
            else items.push({ ...product, quantity })
        },

        // Xóa sản phẩm theo id
        removeItem(productId) {
            items = items.filter(item => item.id === productId);
        },

        // Cập nhật số lượng
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
                return;
            }
            const targetItem = items.find(item => item.id === productId);
            if (targetItem) {
                targetItem.quantity = newQuantity;
            }
        },

        // Tính tổng tiền
        getTotal() {
            const rawTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
            if (discountPercent > 0) return rawTotal * (1 - discountPercent);
            if (discountFixed > 0) return Math.max(0, rawTotal - discountFixed);
            return rawTotal;
        },

        // Áp dụng mã giảm giá
        applyDiscount(code) {
            discountCode = code.toUpperCase().trim();
            // Đặt lại các giá trị giảm về 0 trước khi nạp mã mới
            discountPercent = 0;
            discountFixed = 0;
            switch (discountCode) {
                case "SALE10":
                    discountPercent = 0.1;
                    break;
                case "SALE20":
                    discountPercent = 0.2;
                    break;
                case "FREESHIP":
                    discountFixed = 30000;
                    break;
                default:
                    console.log(`Mã giảm giá "${code}" không tồn tại!`);
                    discountCode = "";
            }
        },
        // Codes: "SALE10" → -10%, "SALE20" → -20%, "FREESHIP" → -30000

        // In giỏ hàng dạng bảng
        printCart() {
            if (items.length === 0) {
                console.log(`Giỏ hàng rỗng`);
                return;
            }
            const formatMoney = num => num.toLocaleString('vi-VN');
            console.log(`┌────────────────────────────────────────────────────┐`);
            console.log(`│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │`);
            items.forEach((item, index) => {
                const id = String(index + 1).padEnd(2);
                const name = item.name.padEnd(14);
                const qty = String(item.quantity).padStart(2);
                const price = formatMoney(item.price).padStart(11);
                const total = formatMoney(item.price * item.quantity).padStart(11);
                console.log(`│ ${id}│ ${name}│ ${qty} │ ${price} │ ${total} │`);
            });
            console.log("├────────────────────────────────────────────────────┤");
            // Dòng tổng tiền cuối cùng kèm theo định dạng chữ
            let discountNote = "";
            if (discountCode) {
                // Nếu là mã giảm theo % thì nhân với 100, nếu giảm tiền mặt thì format chữ 'đ'
                discountNote = discountPercent > 0
                    ? ` (giảm ${discountPercent * 100}%)`
                    : ` (giảm ${formatMoney(discountFixed)}đ)`;
            }
            const finalPrice = `${formatMoney(this.getTotal())}đ${discountNote}`;
            const summaryLabel = "Tổng cộng:";
            const paddingLength = 50 - summaryLabel.length;
            const finalLine = summaryLabel + finalPrice.padStart(paddingLength);

            console.log(`│ ${finalLine} │`);
            console.log("└────────────────────────────────────────────────────┘");
        },

        // Lấy tổng số sản phẩm (tổng quantity)
        getItemCount() {
            return items.reduce((total, item) => total + item.quantity, 0);
        },

        // Xóa toàn bộ giỏ
        clearCart() {
            item = [];
            discountCode = "";
            discountPercent = 0;
            discountFixed = 0;
        }
    };
}

const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();
// Kỳ vọng:
// ┌─────────────────────────────────────────────────────┐
// │ # │ Sản phẩm       │ SL │ Đơn giá     │ Tổng        │
// │ 1 │ iPhone 16      │  2 │ 25.990.000  │ 51.980.000  │
// │ 2 │ AirPods Pro    │  2 │  6.990.000  │ 13.980.000  │
// ├─────────────────────────────────────────────────────┤
// │ Tổng cộng:                              65.960.000đ │
// └─────────────────────────────────────────────────────┘

cart.applyDiscount("SALE10");
cart.printCart();
// → Tổng: 59.364.000đ (giảm 10%)

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2