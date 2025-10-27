const btn = document.querySelector('#enter-btn');
const loc = document.querySelector('#loc');
const tbody = document.querySelector('#tbody');

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
    
}