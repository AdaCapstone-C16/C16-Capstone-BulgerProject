import { useState, useEffect, useRef } from 'react';
import { ref, update } from "firebase/database";
import { db } from './../firebase.js';
import axios from "axios";

const UpdateWeatherButton = ({ coordinates, peakList, signalDBPull }) => {
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
        // if (runUpdateWeather < 3) {
        //     //     onFirstRender.current = false;
        //         console.log("This is on first render");
        //         return;
        } else {
            console.log('NOT FIRST RENDER')
            const baseURL = "http://api.weatherapi.com/v1"
            const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    
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
                    // Weather API calls
                    axios
                    // Connects to Weather API at lat & lon
                    .get(`${baseURL}/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
                    .then((res) => {
                        const now = res.data.current;
                        // Updates temperature data in without override
                        update(ref(db, 'peaks/' + key), {
                        temp: now.temp_f,
                        chance_precip: now.precip_in,
                        wind_speed: `${now.wind_mph} ${now.wind_dir}`
                        });
                    })
                    .catch((err) => {
                        console.log(err.data);
                    });
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

export default UpdateWeatherButton;