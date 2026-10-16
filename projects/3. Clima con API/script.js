const weatherCodes = {
    0: {name: "Despejado", icon: "despejado.png"},
    1: {name: "Mayormente Despejado", icon: "mayormente-despejado.png"},
    2: {name: "Parcialmente Nublado", icon: "parcialmente-nublado.png"},
    3: {name: "Nublado", icon: "nublado.png"},
    45: {name: "Niebla", icon: "niebla.png"},
    48: {name: "Niebla", icon: "niebla.png"},
    51: {name: "Llovizna Ligera", icon: "lluvia-ligera.png"},
    52: {name: "Llovizna Moderada", icon: "lluvia-ligera.png"},
    53: {name: "Llovizna Intensa", icon: "lluvia-ligera.png"},
    61: {name: "Lluvia Ligera", icon: "lluvia-fuerte.png"},
    63: {name: "Lluvia Moderada", icon: "lluvia-fuerte.png"},
    65: {name: "Lluvia Intensa", icon: "lluvia-fuerte.png"},
    66: {name: "LLuvia Helada Ligera", icon: "lluvia-fuerte.png"},
    67: {name: "LLuvia Helada Intensa", icon: "lluvia-fuerte.png"},
    71: {name: "Nieve Ligera", icon: "nieve.png"},
    73: {name: "Nieve Moderada", icon: "nieve.png"},
    75: {name: "Nieve Intensa", icon: "nieve.png"},
    77: {name: "Copos de Nieve", icon: "nieve.png"},
    80: {name: "Chubascos Ligeros", icon: "lluvia-fuerte.png"},
    81: {name: "Chubascos Moderados", icon: "lluvia-fuerte.png"},
    82: {name: "Chubascos Intensos", icon: "lluvia-fuerte.png"},
    85: {name: "Chubascos de Nieve Ligeros", icon: "nieve.png"},
    86: {name: "Chubascos de Nieve Intensos", icon: "nieve.png"},
    95: {name: "Tormenta Electrica", icon: "tormenta-electrica.png"},
    96: {name: "Tormenta con Granizo Ligero", icon: "tormenta-electrica.png"},
    99: {name: "Tormenta con Granizo Intenso", icon: "tormenta-electrica.png"}
}

const searchBar = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-button");
const cityName = document.querySelector(".city-name");
const currentDate = document.querySelector(".date")
const weatherStatus = document.querySelector(".weather-status");
const temperatureInfo = document.querySelector(".weather .temperatura");
const weatherInfo = document.querySelector(".weather .descripcion");
const windInfo = document.querySelector(".wind-detail");
const humidityInfo = document.querySelector(".humidity-detail");
const apparentInfo = document.querySelector(".apparent-detail");
const forecastDates = document.querySelectorAll(".forecast-date");
const forecastStatuses = document.querySelectorAll(".forecast-img")
const temperaturasMax = document.querySelectorAll(".temperatura-max")
const temperaturasMin = document.querySelectorAll(".temperatura-min")
const pressureInfo = document.querySelector(".pressure-detail")
const uvInfo = document.querySelector(".uv-detail")
const visibilityInfo = document.querySelector(".visibility-detail")
const sunriseInfo = document.querySelector(".sunrise-detail")
const sunsetInfo = document.querySelector(".sunset-detail")

const weatherContainer = document.querySelector(".weather-container")
const weatherDetails = document.querySelector(".weather-details")
const forecastContainer = document.querySelector(".forecast-container")

let lastSearch = localStorage.getItem("lastSearch");
if (lastSearch && lastSearch.trim() !== "") {
    let [ciudad, pais] = lastSearch.split(",");
    getWeather(ciudad.trim(), pais ? pais.trim() : "");
} else {
    getWeather("Ottawa", "Canada");
}


function quitarTildes(str) {
  return str
    .toLowerCase()
    .normalize("NFD")              // separa letra y acento
    .replace(/[\u0300-\u036f]/g, ""); // elimina los acentos
}

function formatFullDate(dateString) {
  const date = new Date(dateString);
  const options = { weekday: "long", day: "numeric", month: "long"};
  return date.toLocaleDateString("es-ES", options);
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const options = { weekday: "short"};
  return date.toLocaleDateString("es-ES", options);
}



async function getWeather(ciudad, pais) {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${ciudad}&language=es`)
        const data = await res.json();
        let latitude, longitude, name, country;

        
        
        if (data.results && data.results.length > 0) {
        // Buscar coincidencia exacta de país
            let match = null;
            if (pais) {
                match = data.results.find(r => quitarTildes(r.country) === quitarTildes(pais));
            }

        // Si no hay coincidencia, usar el primer resultado
                const chosen = match || data.results[0];
            latitude = chosen.latitude;
            longitude = chosen.longitude;
            name = chosen.name;
            country = chosen.country;

            cityName.textContent = `${name}, ${country}`;
            console.log("Lat:", latitude, "Lon:", longitude);
        } else {
            cityName.textContent = "Ciudad no encontrada";
            return; // salir para no llamar forecast sin coords
        }

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relative_humidity_2m,is_day&hourly=pressure_msl,visibility,uv_index&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset&forecast_days=6&timezone=auto`)
        const weatherData = await weatherRes.json()
        
        let {temperature_2m, apparent_temperature, weathercode, windspeed_10m, relative_humidity_2m, time, is_day: isDay} = weatherData.current

        let dayState;

        if (isDay) {
            document.body.style.backgroundImage = 'url(resources/bg-day.webp)'
            document.querySelector(".details-container").style.borderColor = "#fff5"
            dayState = "day"

        } else {
            document.body.style.backgroundImage = 'url(resources/bg-night.png)'
            document.querySelector(".details-container").style.borderColor = "#fff2"
            dayState = "night"
        }

        currentDate.textContent = formatFullDate(time);
        
        weatherStatus.src = `resources/${dayState}/${weatherCodes[weathercode].icon}`;
        weatherInfo.textContent = weatherCodes[weathercode].name;
        temperatureInfo.textContent = temperature_2m + "ºC";
        windInfo.textContent = windspeed_10m + " km/h";
        humidityInfo.textContent= relative_humidity_2m + " %"
        apparentInfo.textContent = apparent_temperature + "ºC"

        console.log(weatherData)
        let {temperature_2m_max, temperature_2m_min, time: forecast_time, weathercode: forecast_weathercode, sunrise, sunset, uv_index, pressure_msl, visibility} = weatherData.daily

        function formatHour(isoString) {
            const date = new Date(isoString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        }

        sunsetInfo.textContent = formatHour(sunset[0])
        sunriseInfo.textContent = formatHour(sunrise[0])

        const now = new Date();

    function formatToApiHour(date) {
        return date.toISOString().slice(0, 13) + ":00"; 
    }

        const currentHour = formatToApiHour(now);


        const idx = weatherData.hourly.time.indexOf(currentHour);
        
        visibilityInfo.textContent = (weatherData.hourly.visibility[idx] / 1000).toFixed(2) + " km"
        pressureInfo.textContent = weatherData.hourly.pressure_msl[idx] + " hPa";
        uvInfo.textContent = "UV: " + weatherData.hourly.uv_index[idx];

        dates = forecast_time.slice(1)
        console.log(dates)
        codes = forecast_weathercode.slice(1)
        minTemps = temperature_2m_min.slice(1)
        maxTemps = temperature_2m_max.slice(1)

        for (i = 0; i < dates.length; i++) {
            forecastStatuses[i].src = `resources/${dayState}/${weatherCodes[codes[i]].icon}`
            forecastDates[i].textContent = formatDate(dates[i])
            temperaturasMax[i].textContent = maxTemps[i] + "º"
            temperaturasMin[i].textContent = minTemps[i] + "º"
        }
    }



searchBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    searchValue = searchBar.value.trim();

    if (searchValue !== "") {
        localStorage.setItem("lastSearch", searchValue); // guarda última búsqueda
        datos = searchBar.value.split(",")
        ciudad = datos[0] ? datos[0].trim() : "";
        pais   = datos[1] ? datos[1].trim() : "";
        getWeather(ciudad, pais)
    }  
})




