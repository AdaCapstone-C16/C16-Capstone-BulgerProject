import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ref, onValue } from "firebase/database";
import { db } from './../firebase.js';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getBulgerListData } from '../api/BulgerAPI'
import Login from './Login';
import Signup from './Signup';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Homepage from './Homepage';
import MyProfile from './MyProfile';
import Thanks from './Thanks'


function App() {
  const [peakList, setPeakList] = useState([]);
  const [status, setStatus] = useState(true);

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

    // console.log(peakList)

  // useEffect(() => {
  //   console.log(peakList);
  // }, [peakList]);

  return (
      <main>
        <Router>
          <AuthProvider>
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route exact path="/my-profile" element={<MyProfile/>} />
              </Route>
              <Route path="/signup" element={<Signup/>} />
              <Route path="/thanks" element={<Thanks/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<Homepage/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
          </AuthProvider>
        </Router>
      </main>
    
  )
}

export default App;
