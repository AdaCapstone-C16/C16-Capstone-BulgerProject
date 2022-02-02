import React from 'react';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from './../firebase.js';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getBulgerListCoords } from '../api/BulgerAPI'
import { GetWeatherAPI } from '../api/GetWeatherAPI';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Homepage from './Homepage';
import MyProfile from './MyProfile';

function App() {
  const [peakList, setPeakList] = useState([]);
  const [status, setStatus] = useState(true);
  const [coordinates, setCoordinates] = useState([]);

  // GET peak data from FBDB
  useEffect(() => {
    const bulgerListArr = [];

    const peaks = ref(db, 'peaks/');
    onValue(peaks, (snapshot) => {
        const data = snapshot.val();
        for (let i = 0; i < data.length; i++) {
            if (data[i]) { 
                bulgerListArr.push({
                    key: i,
                    chance_precip: data[i].chance_precip,
                    coordinates: data[i].coordinates,
                    elevation: data[i].elevation,
                    indigenous_name: data[i].indigenous_name,
                    link: data[i].link,
                    name: data[i].name,
                    range: data[i].range,
                    rank: data[i].rank,
                    temp: data[i].temp,
                    wind_speed: data[i].wind_speed,
                });
                };
        };
        setPeakList(bulgerListArr);
      });
    }, []);

  // Extracts peak coordinates once peakList state has set
  useEffect(() => {
    const peakCoords = getBulgerListCoords(peakList);
    setCoordinates(peakCoords);
  }, [peakList]);

  // GET OpenWeatherMap weather data for each peak
  useEffect(() => {
    const weatherData = []

    const baseURL = "api.openweathermap.org/data/2.5/weather"
    // const api_key = process.env.REACT_APP_OPEN_WEATHER_APP_API_KEY
    const apiKey = "76d327ebfc625384cf892171d9e30d25"
    if (coordinates !== []) {
      // Make API call for each peak coordinates
      // for (let i = 0; i < Object.keys(coordinates).length; i++) {
      for (let i = 0; i < Object.keys(coordinates).length; i++) {
        // Lat, Lon truncated to four decimals
        let lat = parseFloat(coordinates[i].lat)
        lat = lat.toFixed(4);
        let lon = parseFloat(coordinates[i].lon)
        lon = lon.toFixed(4)

      axios
          .get(`http://${baseURL}?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`)
          .then((res) => {
              weatherData.push({
                // Today's forecast
                temp: res.data.main.temp,
                wind: `${res.data.wind.speed}`,
                // rain: res.data.rain["1h"],
                // snow: res.data.snow["1h"],
            })
          })
          .catch((err) => {
              console.log(err.data);
          });
        }
      }
      console.log(weatherData);
    }, [coordinates]);

    //POST Updated Weater Data to DB
    // function writeUserData(key, temp, wind, rain, snow) {
    //   const db = getDatabase();
    //   set(ref(db, 'peaks/' + key), {
    //     snow: snow,
    //     temp: temp,
    //     windSpeed: wind
    //   });
    // }

  // Retrieves weather data once coordinates state is set
  // useEffect(() => {
  //   useGetWeatherAPI(coordinates);
  // }, [coordinates]);

  return (
      <Container className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route element={<PrivateRoute/>}>
                  <Route exact path="/my-profile" element={<MyProfile/>} />
                </Route>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/" element={<Homepage/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  )
}

export default App;
