import { useState, useEffect, useRef } from 'react';
import { ref, update } from "firebase/database";
import { db } from './../firebase.js';
import axios from "axios";
import PropTypes from 'prop-types';

const UpdateWeatherButton = ({ coordinates, peakList, signalDBPull }) => {
    
    const getNextSaturday = () => {
        const forecast = new Date();
        const day = forecast.getDay();
        const date = forecast.getDate();
        
        // Pull current weather for Sunday
        if (day === 0) {
            return forecast;
        } 
        // Pull current weather for Saturday
        else if (day === 6) {
            return forecast;
        } 
        // All other days of the week will pull from upcoming Saturday
        else {
            const tilSaturday = 6 - day
            const newDate = date + tilSaturday;
            forecast.setDate(newDate);
            
            console.log(forecast);
            return forecast;
        }
    }
    getNextSaturday();

    // Tracks inital render to prevent API calls
    const onFirstRender = useRef(true); 
    // State to activate API calls when user requests
    const [runUpdateWeather, setRunUpdateWeather] = useState(0);

    // Pulls new data from weather API, posts to DB
    const updateWeather = () => {
        // Prevents weather API calls on initial render
        if (onFirstRender.current) {
            onFirstRender.current = false;
            console.log("This is on first render");
            return;
        } else {
            console.log('NOT FIRST RENDER')
            const baseURL = "http://api.weatherapi.com/v1"
            // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
            if (coordinates !== []) {
                // Make API call for each set of peak coordinates
                for (let i = 0; i < Object.keys(coordinates).length; i++) {
                    // Lat, Lon truncated to four decimals
                    let lat = parseFloat(coordinates[i].lat)
                    lat = lat.toFixed(4);
                    let lon = parseFloat(coordinates[i].lon)
                    lon = lon.toFixed(4);
        
                    let key = peakList[i].key;

                    // TODO: WHY IS THIS GOING ON LOAD?!
                    // TODO: Calculated date of Saturday
                    
                    // TODO: Insert date into API call
                    // TODO: Run API calls
                    // TODO: FIGURE OUT THE ONLOAD BIT
                    // Forecast Weather API calls
                    // axios
                    // // Connects to Weather API at lat & lon
                    // // dt format => dt=2022-02-12
                    // .get(`${baseURL}/forecast.json?key=${apiKey}&q=${lat},${lon}dt=${date}&aqi=no`)
                    // .then((res) => {
                    //     const now = res.data.current;
                    //     // Updates temperature data in without override
                    //     update(ref(db, 'peaks/' + key), {
                    //     temp: now.temp_f,
                    //     chance_precip: now.precip_in,
                    //     wind_speed: now.wind_mph,
                    //     wind_direction: `${now.wind_dir}`,
                    //     });
                    // })
                    // .catch((err) => {
                    //     console.log(err.data);
                    // });
        
                    // // TODO: WHY IS THIS GOING ON LOAD?!
                    // // Weather API calls
                    // axios
                    // // Connects to Weather API at lat & lon
                    // .get(`${baseURL}/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
                    // .then((res) => {
                    //     const now = res.data.current;
                    //     // Updates temperature data in without override
                    //     update(ref(db, 'peaks/' + key), {
                    //     temp: now.temp_f,
                    //     chance_precip: now.precip_in,
                    //     wind_speed: now.wind_mph,
                    //     wind_direction: `${now.wind_dir}`,
                    //     });
                    // })
                    // .catch((err) => {
                    //     console.log(err.data);
                    // });
                }
                // Initiate new pull to DB for updated state 
                signalDBPull();
            }
        }
    }

    // GET & Update OpenWeatherMap weather data for each peak
    useEffect(() => {
        updateWeather();
        }, [runUpdateWeather]);
    
    return (
        <>
            <button onClick={() => setRunUpdateWeather(runUpdateWeather + 1)}>Refresh Weather</button>
        </>
    )
};

UpdateWeatherButton.propTypes = {
    peakList: PropTypes.arrayOf(
        PropTypes.shape({
            chance_precip: PropTypes.number.isRequired,
            coordinates: PropTypes.arrayOf(PropTypes.string.isRequired,),
            elevation: PropTypes.string.isRequired,
            indigenous_name: PropTypes.string,
            key: PropTypes.number.isRequired,
            link: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            range: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired,
            temp: PropTypes.number.isRequired,
            windSpeed: PropTypes.string.isRequired,
        })
    ),
    coordinates: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            lat: PropTypes.string.isRequired,
            lon: PropTypes.string.isRequired,
          })
        ),
    signalDBPull: PropTypes.func.isRequired,
  };

export default UpdateWeatherButton;