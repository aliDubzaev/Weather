const apiKey = 'c7cbda32da57df4d0afc0855f89f24dd';
const card = document.querySelector('.card');
const searchBox = document.querySelector('.card__input');
const searchBtn = document.getElementById('searchBtn');
const temp = document.querySelector('.card__title--temp');
const cityName = document.getElementById('city');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const icon = document.querySelector('.card__weather-icon');
const date = document.getElementById('date');
const loadingElement = document.querySelector('.card__loading'); 

const showDate = () => {
  const now = new Date();
  const day = now.getDate();
  const monthName = now.toLocaleString('ru', {month:'long'});
  date.innerHTML = `${day} ${monthName}`;
}

async function getWeather(city) {
  city = city.trim();
  if (!city) return;

  try {
    card.classList.add('card--loading');
    searchBtn.disabled = true;
    searchBox.disabled = true;
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) throw new Error('Город не найден');

    const result = await response.json();

    await new Promise(resolve => setTimeout(resolve, 500));
    
    card.classList.add('active');
    card.style.height = '530px';

    const iconUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;
    icon.src = iconUrl;

    cityName.innerHTML = result.name;
    humidity.innerHTML = `${result.main.humidity} %`;
    wind.innerHTML = `${result.wind.speed} м/с`;
    temp.innerHTML = `${Math.round(result.main.temp)}°C`;

    document.querySelector('.card__details').style.display = 'grid';

  } catch (err) {
    alert(err);
  } finally {
    card.classList.remove('card--loading');
    searchBtn.disabled = false;
    searchBox.disabled = false;
  }
}

searchBtn.addEventListener('click',() => {
  getWeather(searchBox.value);
});

searchBox.addEventListener('keypress',(e) => {
  if (e.key === 'Enter') {
    getWeather(searchBox.value);
  }
});

document.addEventListener('click', (e) => {
  if (card.classList.contains('active') && !card.contains(e.target)) {
    card.classList.remove('active');
    card.style.height = '230px';
    searchBox.value = '';
    document.querySelector('.card__details').style.display = 'none';
  }
});

showDate();