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
import PeaksState from '../contexts/PeaksState';

function App() {
  const [peakList, setPeakList] = useState([]);
  const [status, setStatus] = useState(true);
  //const [isLoading, setIsLoading] = useState(false)

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

  // const [isLoading, setIsLoading] = useState(false)

  // // // // Use this to view data
  // // console.log(getBulgerListData())

  // const getPeaks = () =>{
  //   const peaksData = getBulgerListData();
  //   return peaksData
  // }
  
  // useEffect(() => {  
  //   const peaks = getPeaks()
  //   if(peaks){
  //   setPeakList(peaks);
  //   setStatus(false);
  //   // setIsLoading(true); 
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log(peakList);
  //   // setIsLoading(false); 
  // }, [peakList]);

  return (
    <PeaksState>
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
    </PeaksState>
  )
}

export default App;


// import React from 'react';
// import axios from "axios";
// import { useState, useEffect, useContext } from 'react';
// import { Container } from 'react-bootstrap'
// import { AuthProvider } from '../contexts/AuthContext';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { getBulgerListData, getBulgerListCoords } from '../api/BulgerAPI'
// // import { GetWeatherAPI } from '../api/WeatherAPI';
// import Login from './Login';
// import Signup from './Signup';
// import PrivateRoute from './PrivateRoute';
// import ForgotPassword from './ForgotPassword';
// import Homepage from './Homepage';
// import MyProfile from './MyProfile';

// function fetchData() {
//   return Promise.all([
//     getBulgerListData(),
//   ]).then(([data]) => {
//     return {data};
//   })
// };

// function App() {
//   const [peakList, setPeakList] = useState([]);
//   const [status, setStatus] = useState(true);
//   const [coordinates, setCoordinates] = useState();

//   // Use this to view data
//   // console.log(getBulgerListData())

//   // Kick off fetching as early as possible
//   const promise = fetchData();

//   useEffect(() => {
//     promise.then(data => {
//       setPeakList(data);
//     });
//   }, []);

//   console.log(`Testing...${peakList}`);

//   // ##################THIS WORKS#################################
//   // Retrieves peak data from db
//   // useEffect(() => {
//   //   const peaksData = getBulgerListData();
    
//   //   setPeakList(peaksData);
//   //   setStatus(false);
//   // }, []);

  
//   // useEffect(() => {
//   //   const coords = getBulgerListCoords(peakList);
//   //   setCoordinates(coords);
//   // }, [peakList]);
//   // ##################END THIS WORKS##############################

//   useEffect(() => {
//     // console.log('WERE HERE')
//     // console.log(coordinates);
//     const NWSUrl = "https://api.weather.gov/points";

//     // Make API call for each peak coordinates
//     for (let peakCoord in coordinates) {
//       console.log(peakCoord)
//       // Lat, Lon truncated to four decimals
//       const lat = peakCoord.lat.toFixed(4)
//       const lon = peakCoord.lon.toFixed(4)
//       console.log(lat, lon);

//       axios
//         //lat, lon must be only to 4 decimal points
//         .get(`${NWSUrl}/${lat},${lon}`)
//         .then((res) => {
//           const forecast_link = res.data.properties.forecast
//           setStatus(false);
//           return axios.get(`${forecast_link}`);
//         })
//         .then((res) => {
//           // Today's forecast
//           const today = res.data.properties.periods[0]
//           const temp = today.temperature
//           const wind = `${today.windSpeed} ${today.windDirection}`
//           // const detailedForecast = today.detailedForecast
//           console.log({temp: temp, wind: wind})
//           return {temp: temp, wind: wind}
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//       }
//   }, [coordinates]);

//   return (
//       <Container className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
//         <div className="w-100" style={{ maxWidth: '400px'}}>
//           <Router>
//             <AuthProvider>
//               <Routes>
//                 <Route element={<PrivateRoute/>}>
//                   <Route exact path="/my-profile" element={<MyProfile/>} />
//                 </Route>
//                 <Route path="/signup" element={<Signup/>} />
//                 <Route path="/login" element={<Login/>} />
//                 <Route path="/" element={<Homepage data={peakList}/>} />
//                 <Route path="/forgot-password" element={<ForgotPassword/>} />
//               </Routes>
//             </AuthProvider>
//           </Router>
//         </div>
//       </Container>
    
//   )
// }

// export default App;