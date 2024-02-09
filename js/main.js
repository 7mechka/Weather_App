const weatherApp = {
    API_KEY: 'b19d963363387696d098ae8fd8fdc5a4',
    isLoading: false,
    selector: document.querySelector('.weather'),
    insertData: function (element, data) {
        this.selector.querySelector(element).innerText = data
    },
    fetchWeather: function (city) {
        this.isLoading = true
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&lang=ua&units=metric`)
        .then((res) => res.json())
        .then(data => this.renderWeather(data))
        .catch((e) => alert(e))
        .finally(() => this.isLoading = false)
    },
    renderWeather: function (info) {
        this.selector.classList.add('--open')
        this.insertData('.name', info.name)
        this.insertData('.desc', info.weather[0].description)
        this.insertData('.temp', `Температура: ${Math.round(info.main.temp)} °C`)
        this.insertData('.feels_like', `Відчувається як: ${Math.round(info.main.feels_like)} °C`)
        this.insertData('.humidity', `Вологість: ${info.main.humidity}%`)
        this.insertData('.wind', `Швидкість вітру: ${Math.round(info.wind.speed)} м/с`)
        this.selector.querySelector('.icon').setAttribute('src', `https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`)
        this.selector.querySelector('.icon').setAttribute('alt', info.weather[0].main)

        document.body.style.backgroundImage = 'url(' + `https://source.unsplash.com/featured/?${info.weather[0].main}` + ')'
    }
}

document.forms[0].addEventListener('submit', function () {
    event.preventDefault()
    weatherApp.fetchWeather(document.forms[0].elements.city.value)
    document.forms[0].reset()
})

