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
    // const NWSUrl = "https://api.weather.gov/points";
    // // console.log(coordinates[0])
    // if (coordinates !== []) {
    //   // Make API call for each peak coordinates
    //   // for (let i = 0; i < Object.keys(coordinates).length; i++) {
    //   for (let i = 0; i < Object.keys(coordinates).length; i++) {
    //     // Lat, Lon truncated to four decimals
    //     let lat = parseFloat(coordinates[i].lat)
    //     lat = lat.toFixed(4);
    //     let lon = parseFloat(coordinates[i].lon)
    //     lon = lon.toFixed(4)

    //   axios
    //       //lat, lon must be only to 4 decimal points
    //       .get(`${NWSUrl}/${lat},${lon}`)
    //       .then((res) => {
            
    //           const forecast_link = res.data.properties.forecast
    //           setStatus(false);
    //           return axios.get(`${forecast_link}`);
    //       })
    //       .then((res) => {
    //           // Today's forecast
    //           const today = res.data.properties.periods[0]
    //           const temp = today.temperature
    //           const wind = `${today.windSpeed} ${today.windDirection}`
    //           // const detailedForecast = today.detailedForecast
    //           console.log({temp: temp, wind: wind})
    //           return {temp: temp, wind: wind}
    //       })
    //       .catch((err) => {
    //           console.log(err);
    //       });
    //     }
    //   }
    // }, [coordinates]);

    // ###############################################################
    // GET OpenWeatherMap weather data for each peak
//   useEffect(() => {
//     const weatherData = []

//     const baseURL = "api.openweathermap.org/data/2.5/weather"
//     // const api_key = process.env.REACT_APP_OPEN_WEATHER_APP_API_KEY
//     const apiKey = "76d327ebfc625384cf892171d9e30d25"
//     if (coordinates !== []) {
//       // Make API call for each peak coordinates
//       // for (let i = 0; i < Object.keys(coordinates).length; i++) {
//       for (let i = 0; i < Object.keys(coordinates).length; i++) {
//         // Lat, Lon truncated to four decimals
//         let lat = parseFloat(coordinates[i].lat)
//         lat = lat.toFixed(4);
//         let lon = parseFloat(coordinates[i].lon)
//         lon = lon.toFixed(4)

//       axios
//           .get(`http://${baseURL}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
//           .then((res) => {
//               weatherData.push({
//                 // Today's forecast
//                 temp: res.data.main.temp,
//                 wind: `${res.data.wind.speed}`,
//                 // rain: res.data.rain["1h"],
//                 // snow: res.data.snow["1h"],
//             })
//           })
//           .catch((err) => {
//               console.log(err.data);
//           });
//         }
//       }
//       console.log(weatherData);
//     }, [coordinates]);