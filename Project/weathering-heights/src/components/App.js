import React from "react";
import Signup from "./Signup";
import {Container} from 'react-bootstrap'
import { AuthProvider } from "../contexts/AuthContext";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Homepage from "./Homepage";
import MyProfile from "./MyProfile";

function App() {
  return (
    
      <Container className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route element={<PrivateRoute/>}>
                  <Route exact path="/" element={<MyProfile/>} />
                </Route>
                <Route path="/signup" element={<Signup/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/homepage" element={<Homepage/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    
  )
}

export default App;
