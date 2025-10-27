const btn = document.querySelector('#enter-btn');
const loc = document.querySelector('#loc');
const tbody = document.querySelector('#tbody');
const img = document.querySelector('img');

btn.addEventListener('click', async () => {
    // clear the table
    tbody.textContent = '';

    const location = loc.value;
    if (location === '') {
        alert('Please enter a location.')
        return;
    }
    try {
        const weather = await getWeather(location);
        display(weather);
        await displayImg(weather.conditions);
    } catch (error) {
        alert(`Error fetching weather. ${error.message}`);
    }
})

async function getWeather(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=PP5N5KG65VP2BY9D8MYBRYX6J`)
    if (!response.ok) {
        throw new Error('Invalid location or network error.')
    }
    const responseJson = await response.json();
    const weather = responseJson.days[0];
    const conditions = weather.conditions;
    const tempmin = weather.tempmin;
    const tempmax = weather.tempmax;
    const temp = weather.temp;
    const humidity = weather.humidity;

    return { conditions, tempmin, tempmax, temp, humidity };
}

function display(weather) {
    const keys = Object.keys(weather);
    const headers = ['Condition', 'Temp-Min', 'Temp-Max', 'Temp', 'Humidity'];
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        const header = document.createElement('th');
        const data = document.createElement('td');
        header.textContent = headers[i];
        data.textContent = weather[keys[i]];
        row.appendChild(header);
        row.appendChild(data);
        tbody.appendChild(row);
    }
}

async function displayImg(condition) {
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=QeOY5WAJwWM4BSrlwQ7BelaU09Byth9F&s=${condition}`);
    const res = await response.json();
    img.src = res.data.images.original.url;
}