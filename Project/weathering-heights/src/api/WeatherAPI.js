import { useEffect, useState } from 'react';
import axios from "axios";


    // Q: ASK about GET WEATHER API CAPITALIZATION...was getting error
    //     about capitalization to make component or custom hook
    //     is this really a component? I'm just trying to export logic to maintain
    //     size of app.js
    // Q: React Hook "useEffect" may be executed more than once. Possibly because it is called in a loop. 
    //     React Hooks must be called in the exact same order in every component render
    // TODO: TURN DATA INTO JSON OBJ FOR RETURN TO FBDB

// export const GetWeatherAPI = (peaksCoordinates) => {
//     const [status, setStatus] = useState(true);
//         // GET NWS weather data for each peak
//         // https://www.weather.gov/documentation/services-web-api
//     useEffect(() => {
        
//         const NWSUrl = "https://api.weather.gov/points";

//         // Make API call for each peak coordinates
//         for (let peakCoord in peaksCoordinates) {
//         // Lat, Lon truncated to four decimals
//         const lat = peakCoord.lat.toFixed(4)
//         const lon = peakCoord.lon.toFixed(4)
//         console.log(lat, lon);

//         axios
//             //lat, lon must be only to 4 decimal points
//             .get(`${NWSUrl}/${lat},${lon}`)
//             .then((res) => {
//             const forecast_link = res.data.properties.forecast
//             setStatus(false);
//             return axios.get(`${forecast_link}`);
//             })
//             .then((res) => {
//             // Today's forecast
//             const today = res.data.properties.periods[0]
//             const temp = today.temperature
//             const wind = `${today.windSpeed} ${today.windDirection}`
//             const detailedForecast = today.detailedForecast
//             return {temp: temp, wind: wind}
//             })
//             .catch((err) => {
//             console.log(err);
//             });
//         }
//     }, []);
// };