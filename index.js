const apikey = "f7286bdbacc2a3db47da54e40002d61d";

const Weatherdata = document.getElementById("weather-data")
const cityinput = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityvalue = cityinput.value;
    getWeatherData(cityvalue);
});
async function  getWeatherData(cityvalue){
    try {
        const response = await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`)
        if(!response.ok){
            throw new Error("Network responce was not ok")
        }
        const data = await response.json()
        const temperature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like:${Math.round(data.main.temp)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed}m/s`,
        ]
        Weatherdata.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="WeatherIcon">`;
        Weatherdata.querySelector(".temperature").textContent = `${temperature}°C`;
        Weatherdata.querySelector(".description").textContent = description;

        Weatherdata.querySelector(".details").innerHTML = details.map((detail)=>
        `<div>${detail}</div>`
        ).join("");

    } catch (error) {
        Weatherdata.querySelector(".icon").innerHTML = "";
        Weatherdata.querySelector(".temperature").textContent ="";
        Weatherdata.querySelector(".description").textContent ="An Error happend";

        Weatherdata.querySelector(".details").innerHTML ="";
      
    }
}