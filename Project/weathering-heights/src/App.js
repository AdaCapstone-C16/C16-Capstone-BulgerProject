import { useState, useEffect, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';
// Firebase 
import app from './firebase.js';

// API 
import { getBulgerListData } from './api/BulgerAPI';

// SAMPLE GET peak data
// const peaks = ref(db, 'peaks/');
// onValue(peaks, (snapshot) => {
//   const data = snapshot.val();
//   console.log("PEAAAAKSSS")
//   console.log(data);
// });

function App() {
  const [peakList, setPeakList] = useState([]);
  const [status, setStatus] = useState(true);

  // Use this to view data
  // console.log(getBulgerListData())

  // Retrieves Bulger list data from DB -> This is async
  useEffect(() => {
    const peaksData = getBulgerListData();
    setPeakList(peaksData);
    setStatus(false)
  }, []);

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
