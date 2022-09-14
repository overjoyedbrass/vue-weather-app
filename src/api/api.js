import { OW_API_KEY } from '../config.js'

export async function getWeatherData(city){
    if(!city) return false;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OW_API_KEY}&units=metric`);
    const data = await response.json()
    return data
}