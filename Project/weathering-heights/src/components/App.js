//from main
import React from 'react';
import { useState, useEffect } from 'react';
import { ref, onValue, get, child } from "firebase/database";
import { db } from './../firebase.js';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getBulgerListCoords } from '../api/BulgerAPI';
import Navigation from './Navigation';
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Homepage from './Homepage';
import MyProfile from './MyProfile';
// import Thanks from './Thanks'
import Map from './Map'
import UpdateWeatherButton from './UpdateWeatherButton.js';

function App() {
  const [peakList, setPeakList] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  const [updateWeather, setUpdateWeather] = useState(0);

  // GET peak data from FBDB
  useEffect(() => {
    const bulgerListArr = [];

    get(child(ref(db), 'peaks/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
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
                    windSpeed: data[i].wind_speed,
                    windDir: data[i].wind_direction,
                });
            };
        };
        // Sets state for App
        setPeakList(bulgerListArr);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }, [updateWeather]);

  // Extracts peak coordinates to state once peakList state has set
  useEffect(() => {
    if (peakList !== []) {
      const peakCoords = getBulgerListCoords(peakList);
      setCoordinates(peakCoords);
    }
  }, [peakList]);

  // Toggles updateWeather state, which then triggers DB pull
  const signalDBPull = () => {
    setUpdateWeather(updateWeather + 1);
  }

  return (
      // <Container className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
      // <Container>

      // <main>
      //   <UpdateWeatherButton 
      //     peakList={peakList}  
      //     coordinates={coordinates}
      //     signalDBPull={signalDBPull} />

        <div>
          <Router>
            
            <AuthProvider>
              <Navigation />
              <Routes>
                <Route element={<PrivateRoute/>}>
                  <Route exact path="/my-profile" element={<MyProfile data={peakList}/>} />
                </Route>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route exxact path="/map" element={<Map/>}/>
                {/* <Route path="/thanks" element={<Thanks/>}/> */}
                <Route path="/" element={<Homepage data={peakList}/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      // </main>
      // </Container>
    
  )
}

export default App;