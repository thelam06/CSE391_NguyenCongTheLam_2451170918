// Chuyển trạng thái của ứng dụng
const layoutLoading = document.querySelector("#layout-loading");
const layoutSuccess = document.querySelector("#layout-success");
const layoutError = document.querySelector("#layout-error");

function changeUIState(state) {
    layoutLoading.classList.add("d-none");
    layoutSuccess.classList.add("d-none");
    layoutError.classList.add("d-none");

    if (state === "LOADING") {
        layoutLoading.classList.remove("d-none");
    }
    else if (state === "SUCCESS") {
        layoutSuccess.classList.remove("d-none");
    }
    else if (state === "ERROR") {
        layoutError.classList.remove("d-none");
    }
}

// Chuyển mã thời tiết thành văn bản hiển thị
const textCity = document.querySelector("#text-city");
const textTemp = document.querySelector("#text-temp");
const textWind = document.querySelector("#text-wind");
const textHumidity = document.querySelector("#text-humidity");
const textDescription = document.querySelector("#text-description");

function parseWeatherCode(code) {
    if (code === 0) return "Trời quang mây tạnh ☀️";
    if (code >= 1 && code <= 3) return "Mây rải rác / U ám ⛅";
    if (code >= 45 && code <= 48) return "Có sương mù bao phủ 🌫️";
    if (code >= 51 && code <= 65) return "Có mưa nhỏ / Mưa rào 🌧️";
    if (code >= 71 && code <= 77) return "Có tuyết rơi ❄️";
    if (code >= 80 && code <= 86) return "Mưa xối xả ⛈️";
    return "Thời tiết đặc biệt";
}

// Hàm xử lý gọi API
async function getWeatherData(cityName) {
    changeUIState("LOADING");
    try {
        // Gọi thêm một API để lấy toạ độ địa điểm đã nhập
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("Không tìm thấy thành phố này!");
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;

        // Truyền toạ độ trực tiếp vào API
        const url =
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&current=relative_humidity_2m`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Lỗi máy chủ HTTP: ${response.status}`);
        }

        // Hiển thị dữ liệu API lên màn hình
        const data = await response.json();
        textCity.textContent = cityName;
        textTemp.textContent = `${data.current_weather.temperature}°C`;
        textWind.textContent = `💨 Gió: ${data.current_weather.windspeed} km/h`;
        const humidity = data?.current?.relative_humidity_2m ?? "--";
        textHumidity.textContent = `💧 Độ ẩm: ${humidity}%`;
        textDescription.textContent = `Trạng thái: ${parseWeatherCode(data.current_weather.weathercode)}`;

        // Thông báo tìm kiếm thành công và lưu vào localStorage
        saveToHistory(cityName);
        changeUIState("SUCCESS");
    }

    catch (error) {
        console.error("Gặp lỗi khi gọi API:", error);
        changeUIState("ERROR");
    }
}

// Bắt sự kiện khi người dùng nhấn vào nút "Tìm"
const btnSearch = document.querySelector("#btn-search");
const cityInput = document.querySelector("#city-input");

btnSearch.addEventListener("click", function () {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Vui lòng nhập tên thành phố trước khi tìm!");
        return;
    }

    getWeatherData(cityName);
});

// Hàm lưu lịch sử tìm kiếm vào localStorage
function saveToHistory(cityName){
    let history = JSON.parse(localStorage.getItem("weather_history")) || [];
    history = history.filter(item => item && typeof item === 'string' && item.toLowerCase() !== cityName.toLowerCase());

    history.unshift(cityName)

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("weather_history", JSON.stringify(history));
    renderHistoryButtons();
}

// Hàm lưu thay đổi mỗi lần tìm kiếm địa điểm
function renderHistoryButtons(){
    const historyContainer = document.querySelector("#history-container");
    historyContainer.innerHTML = '<span class="text-muted me-2">Lịch sử:</span>';
    const history = JSON.parse(localStorage.getItem("weather_history")) || [];

    history.forEach(city => {
        const btn = document.createElement("button");
        btn.textContent = city;
        btn.classList.add("btn", "btn-sm", "btn-outline-secondary", "me-1", "mb-1");

        btn.addEventListener("click", function() {
            cityInput.value = city;
            getWeatherData(city);
        });

        historyContainer.appendChild(btn);
    });
}

renderHistoryButtons();