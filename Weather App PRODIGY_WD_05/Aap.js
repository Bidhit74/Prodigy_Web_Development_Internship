const userWeather = document.querySelector(".your-weather");
const searchWeather = document.querySelector(".search-weather");
const userAllow = document.querySelector(".Grant-location");
const allowBtn = document.querySelector("[data-grantBtn]");
const userSearch = document.querySelector(".search-form");
const searchBtn = document.querySelector("[data-searchBtn]");
const loading = document.querySelector(".loading-screen");
const mainContent = document.querySelector(".content");

const API_KEY = "f7d74cc321b0dc2221d5b8fd056c013f";
let oldTab = userWeather;
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!userSearch.classList.contains("active")) {
            //kya search form wala container is invisible, if yes then make it visible
            mainContent.classList.remove("active");
            userAllow.classList.remove("active");
            userSearch.classList.add("active");
        } else {
            //main pehle search wale tab pr tha, ab your weather tab visible karna h
            userSearch.classList.remove("active");
            mainContent.classList.remove("active");
            //ab main your weather tab me aagya hu, toh weather bhi display karna poadega, so let's check local storage first
            //for coordinates, if we haved saved them there.
            getfromSessionStorage();
        }
    }
}

function showPosition(position) {
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("gelolocation support available");
    }
}

function renderWeatherInfo(weatherInfo) {
    const userPlaceName = document.querySelector("[data-placeName]");
    const userCountry = document.querySelector("[data-placeIcon]");
    const userPlaceDescription = document.querySelector("[data-weatherDes]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const placeTemprature = document.querySelector("[data-temprature]");
    const windPara = document.querySelector("[data-windPara]");
    const humidityPara = document.querySelector("[data-humidityPara]");
    const cloudsPara = document.querySelector("[data-cloudsPara]");
    userPlaceName.textContent = weatherInfo?.name;
    userCountry.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    userPlaceDescription.textContent = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    placeTemprature.textContent = weatherInfo?.main?.temp;
    windPara.textContent = weatherInfo?.wind?.speed;
    humidityPara.textContent = weatherInfo?.main?.humidity;
    cloudsPara.textContent = weatherInfo?.clouds?.all;
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // make grantcontainer invisible
    userAllow.classList.remove("active");
    //make loader visible
    loading.classList.add("active");

    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        loading.classList.remove("active");
        mainContent.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        loadingScreen.classList.remove("active");
        console.log("Error loading weather info");
    }
}

//check if cordinates are already present in session storage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        //agar local coordinates nahi mile
        userAllow.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

userWeather.addEventListener("click", () => {
    switchTab(userWeather);
});
searchWeather.addEventListener("click", () => {
    switchTab(searchWeather);
});
allowBtn.addEventListener("click", getLocation);

const searchInput = document.querySelector(".search-input");

async function fetchSearchWeatherInfo(city) {
    loading.classList.add("active");
    mainContent.classList.remove("active");
    userAllow.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        loading.classList.remove("active");
        mainContent.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        alert("Error: " + err.message);
    }
}

userSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "") {
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
    }
});
