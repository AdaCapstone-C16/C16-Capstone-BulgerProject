import { useState, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
// API
import { getBulgerListData, getBulgerListCoords } from './api/BulgerAPI';
import { GetWeatherAPI } from './api/WeatherAPI';

// TODO: Will need coordinations list
// console.log(getBulgerListData())

function App() {
    // TESTING API CALLS LOGIC
    // const [peaksData, setPeaksData] = useState()
    const peaksData = getBulgerListData();
    const coords = getBulgerListCoords(peaksData)
    console.log(peaksData)
    // GetWeatherAPI(coords)


  //grab the object containing info and function relating to login/logout
  const authCtx = useContext(AuthContext);

  //Switch to re-route based on login status
  //User can technically type url + "/profile" to access so we have to redirect to auth page
  //Bottom switch with * is validation if the user enters any type of incorrect path
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
