const api = "https://api.openweathermap.org/data/2.5/weather?q=surat&appid=b07b0211108cbd461f58c798c960ed24"
const API_KEY = "b07b0211108cbd461f58c798c960ed24"
const weatherIcon = document.querySelector('#weatherIcon')
const userInput = document.querySelector('#userInput');
const searchButton = document.querySelector('#search');
const fetchApi = async () => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${userInput.value}&appid=${API_KEY}&units=metric`
        let res = await fetch(url);
        let data = await res.json(); 
        console.log(data);
        userInput.value = "";
        if(data.cod === "404"){
            throw Error;
        }else{
            document.querySelector('.weatherContainer').style.display = "block";
            document.querySelector('.not-foundContainer').style.display = "none";
            document.querySelector('.weatherContainer').innerHTML = `
                 <div class="weatherBox">
                    <p class="name">${data.name}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" id="weatherIcon">
                    <p class="tempreture">${data.main.temp}<span>&#x2103;</span></p>
                    <p class="discription">${data.weather[0].description}</p>
                </div>
                <div class="weatherInfo">
                    <div class="humidity">
                        <i class='bx bx-water'></i>
                        <div class="humidityInfo">
                            <span>${data.main.humidity}%</span>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div class="wind">
                        <i class='bx bx-wind'></i>
                        <div class="windInfo">
                            <span>${data.wind.speed} km/h</span>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            `;

        }
    }
    catch{
        document.querySelector('.weatherContainer').style.display = "none";
        document.querySelector('.not-foundContainer').style.display = "block";
    }
}
searchButton.addEventListener('click',fetchApi) 
userInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        fetchApi();
    }
});

(
    function() {
        userInput.value = "ahmedabad";
        fetchApi();
    }
)()