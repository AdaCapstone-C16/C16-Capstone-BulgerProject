import React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
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

function App() {
  const [peakList, setPeakList] = useState([]);
  const [status, setStatus] = useState(true);

  // // // Use this to view data
  console.log(getBulgerListData())

  useEffect(() => {
    const peaksData = getBulgerListData();
    
    setPeakList(peaksData);
    setStatus(false);
  }, []);
  

  useEffect(() => {
    console.log(peakList);
  }, [peakList]);

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
                <Route path="/" element={<Homepage data={peakList}/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  )
}

export default App;
