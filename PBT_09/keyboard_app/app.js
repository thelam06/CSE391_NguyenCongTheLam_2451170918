// Dữ liệu ảnh thực tế lấy từ các thuộc tính src của thẻ img
const thumbnails = document.querySelectorAll(".btn-thumbnail");
const images = Array.from(thumbnails).map(
    (btn) => btn.querySelector("img").src,
);

// Trạng thái của ứng dụng (State)
let currentIndex = -1;
let isSlideshowActive = false;
let slideshowInterval = null;

// Các phần tử DOM cần tương tác
const modal = document.getElementById('photo-modal');
const modalImg = document.getElementById('modal-img');
const closeBtnModal = document.getElementById('btn-close-modal');
const slideshowStatus = document.getElementById('slide-show-status');

const palette = document.getElementById('command-palette');
const paletteInput = document.getElementById('palette-input');
const commandList = document.getElementById('command-list');

// Danh sách các Command (Dùng cho Command Palette)
const commands = [
    { id: 'open-1', text: 'Xem ảnh 1', action: () => openModal(0) },
    { id: 'open-2', text: 'Xem ảnh 2', action: () => openModal(1) },
    { id: 'open-3', text: 'Xem ảnh 3', action: () => openModal(2) },
    { id: 'open-4', text: 'Xem ảnh 4', action: () => openModal(3) },
    { id: 'open-5', text: 'Xem ảnh 5', action: () => openModal(4) },
    { id: 'open-6', text: 'Xem ảnh 6', action: () => openModal(5) },
    { id: 'open-7', text: 'Xem ảnh 7', action: () => openModal(6) },
    { id: 'open-8', text: 'Xem ảnh 8', action: () => openModal(7) },
    { id: 'open-9', text: 'Xem ảnh 9', action: () => openModal(8) },
    { id: 'play', text: 'Bật/Tắt Tự động chạy ảnh (Slideshow)', action: () => toggleSlideshow() },
    { id: 'close', text: 'Đóng cửa sổ ảnh / Tìm kiếm', action: () => { closeModal(); closePalette(); } }
];

let filteredCommands = [...commands];
let selectedCommandIndex = 0; // Vị trí dòng lệnh đang được chọn bằng phím lên/xuống

//==================== Các hàm xử lý chức năng (logic) ====================

// Hàm mở ảnh lớn (modal)
function openModal(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;
    modalImg.src = images[currentIndex];
    modal.classList.add('open');
    // Khi mở modal, tự động focus vào nút đóng để tránh mất dấu bộ gõ
    closeBtnModal.focus();
}

// Hàm đóng ảnh lớn (modal)
function closeModal() {
    modal.classList.remove('open');
    stopSlideshow();
    // Trả focus về lại ảnh cũ vừa nhấn để người dùng Tab tiếp được
    if (currentIndex >= 0) thumbnails[currentIndex].focus();
}

// Hàm bật/tắt tự động chạy ảnh (Slideshow)
function toggleSlideshow() {
    if (!modal.classList.contains('open')) return; // Chỉ chạy khi đang mở ảnh lớn (modal)

    if (isSlideshowActive) {
        stopSlideshow();
    }
    else {
        isSlideshowActive = true;
        slideshowStatus.innerText = "▶ Đang chạy Slideshow...";
        // Đặt bộ đếm thời gian chuyển giữa các ảnh
        slideshowInterval = setInterval(() => { openModal((currentIndex + 1) % images.length) }, 2000);
    }
}

// Hàm dừng tự động chạy ảnh (Slideshow)
function stopSlideshow() {
    isSlideshowActive = false;
    slideshowStatus.innerText = "";
    // Xoá bộ đếm thời gian chuyển giữa các ảnh
    clearInterval(slideshowInterval);
}

//==================== Gallery ảnh: Xử lý sự kiện bàn phím (keyboard navigation) ====================

// Sự kiện click chuột vào các ảnh thu nhỏ
thumbnails.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal(parseInt(btn.dataset.index));
    });
});

// Sự kiện khi nhấn vào nút đóng trên modal
closeBtnModal.addEventListener('click', closeModal);

// Sự kiện khi thao tác với các phím trong Gallery ảnh
window.addEventListener('keydown', (e) => {
    // Command palette: 1. Ctrl+K mở ô tìm kiếm overlay (giống VS Code)
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); // Ngăn chặn hành động mặc định của trình duyệt
        openPalette();
        return;
    }

    // Xử lý khi modal xem ảnh đang mở
    if (modal.classList.contains('open')) {
        // Gallery ảnh:
        // 1. Mũi tên ← → để chuyển ảnh
        if (e.key === 'ArrowRight') {
            openModal((currentIndex + 1) % images.length);
        }
        else if (e.key === 'ArrowLeft') {
            openModal((currentIndex - 1 + images.length) % images.length);
        }
        // 3. Space để play/pause slideshow
        else if (e.key === ' ') {
            e.preventDefault(); // Ngăn màn hình bị cuộn xuống khi bấm Space
            toggleSlideshow();
        }
        // 4. Escape để đóng modal
        else if (e.key === 'Escape') {
            closeModal();
        }
    }

    // Gallery ảnh: 2. Số 1-9 để nhảy đến ảnh tương ứng
    // Chỉ kích hoạt khi không gõ chữ trong ô tìm kiếm
    if (document.activeElement !== paletteInput) {
        if (e.key >= '1' && e.key <= '9') {
            const targetIndex = parseInt(e.key) - 1;
            if (targetIndex < images.length) {
                openModal(targetIndex);
            }
        }
    }
});

//==================== Xử lý Command Palette ====================

function openPalette() {
    palette.classList.add('open');
    paletteInput.value = ""; // Xoá văn bản cũ
    renderCommands(commands);
    paletteInput.focus(); // Đưa con trỏ chuột vào ô nhập liệu
}

function closePalette() {
    palette.classList.remove('open');
}

// Hàm vẽ danh sách câu lệnh ra màn hình
function renderCommands(list) {
    filteredCommands = list;
    commandList.innerHTML = '';

    if (list.length === 0) {
        commandList.innerHTML = '<li style="padding:1rem; color:#9ca3af;">Không tìm thấy lệnh nào...</li>';
        return;
    }

    list.forEach((cmd, index) => {
        const li = document.createElement('li');
        li.className = `command-item ${index === selectedCommandIndex ? 'selected' : ''}`;
        li.innerHTML = `<span>${cmd.text}</span> <span class="shortcut-hint">Action</span>`;

        li.addEventListener('click', () => {
            cmd.action();
            closePalette();
        });

        commandList.appendChild(li);
    });
}

// Command palette: 2. Gõ keyword → hiện danh sách commands
paletteInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    const result = commands.filter(cmd => cmd.text.toLowerCase().includes(keyword));
    selectedCommandIndex = 0; // Reset dòng chọn về vị trí đầu tiên
    renderCommands(result);
});

// Sự kiện di chuyển phím lên/xuống, Enter và Escape trong Command Palette
paletteInput.addEventListener('keydown', (e) => {
    if (!palette.classList.contains('open')) return;

    // Command palette: 3. Escape để đóng
    if (e.key === 'Escape') {
        closePalette();
        return;
    }
    // Nếu không tìm thấy lệnh (danh sách commands rỗng)
    if (filteredCommands.length === 0) return;

    // Di chuyển xuống bằng mũi tên xuống
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length;
        renderCommands(filteredCommands);
    }
    // Di chuyển lên bằng mũi tên lên
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length;
        renderCommands(filteredCommands);
    }

    // Command palette: 3. Enter để chọn
    else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedCommandIndex]) {
            filteredCommands[selectedCommandIndex].action(); // Chạy hàm tương ứng của lệnh
            closePalette();
        }
    }
});