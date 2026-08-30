// Ваш API ключ (замените на реальный)
const API_KEY = '313f231d404ff72ac8cd5acffde56350';

// Ссылки на элементы DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temp');
const icon = document.getElementById('icon');
const description = document.getElementById('description');

// Функция для получения погоды
async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Город не найден');
        }

        const data = await response.json();

          

// Заполняем элементы страницы
cityName.textContent = data.name;
temp.textContent = data.main.temp + '°C';

// 1. Исправляем получение иконки (добавляем)
icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

// 2. Исправляем получение описания (добавляем)
description.textContent = data.weather.description;

document.querySelector('.weather_info').style.display = 'block';



// Проверяем наличие дождя
if (data.rain && data.rain['12h']) {
    description.textContent += ` (дождь: \${data.rain['12h']} мм за час)`;
}

// Проверяем наличие снега
if (data.snow && data.snow['12h']) {
    description.textContent += ` (снег: \${data.snow['12h']} мм за час)`;
}




    } catch (error) {
        alert('Ошибка: ' + error.message);
    }
}

// Обработчик нажатия кнопки
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Введите название города');
    }

});
// Обработчик нажатия клавиши Enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('Введите название города');
        }
    }
});




