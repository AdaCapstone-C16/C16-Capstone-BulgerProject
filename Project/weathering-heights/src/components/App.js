import React from 'react';
import axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { ref, onValue, set, update } from "firebase/database";
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

  const [fakeData, setFakeData] = useState({
    key: 234,
    temp: "TEST",
    wind_speed: "TEST",
    chance_precip: "TEST",
    coordinates: [1, 2],
    elevation: "TEST",
    indigenous_name: "TEST" ,
    link: "www.TEST.com",
    name: "TEST",
    range: "TEST",
    rank: "TEST",
  })
  // Extracts peak coordinates once peakList state has set
  useEffect(() => {
    if (peakList !== []) {
      const peakCoords = getBulgerListCoords(peakList);
      setCoordinates(peakCoords);
    }
  }, [peakList]);
    

  // GET OpenWeatherMap weather data for each peak
  useEffect(() => {
    const weatherData = []

    const baseURL = "http://api.weatherapi.com/v1"
    // const api_key = process.env.REACT_APP_WEATHER_APP_API_KEY
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    if (coordinates !== []) {
      // Make API call for each peak coordinates
      // for (let i = 0; i < Object.keys(coordinates).length; i++) {
        // Lat, Lon truncated to four decimals
        // let lat = parseFloat(coordinates[i].lat)
        // lat = lat.toFixed(4);
        // let lon = parseFloat(coordinates[i].lon)
        // lon = lon.toFixed(4);
      const lat = 46.8529;
      const lon = -121.7604;
      const key = "0"

      axios
          // Connects to Weather API at lat & lon
          .get(`${baseURL}/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`)
          .then((res) => {
            const now = res.data.current;
            // Updates temperature data in without override
            // Will trigger onValue, which will update state
            update(ref(db, 'fake/' + key), {
              temp: now.temp_f,
              chance_precip: now.precip_in,
              wind_speed: `${now.wind_mph} ${now.wind_dir}`
            });
          })
          .catch((err) => {
              console.log(err.data);
          });
        // }
      }
    }, [coordinates]);

    // //POST Updated Weater Data to DB
    // function writeUserData(key, temp, wind, rain) {
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
