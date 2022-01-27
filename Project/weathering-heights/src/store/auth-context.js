//This file holds the token and 
//creates an object that holds info concerning login 
//and the functions to log in or out
//we access login/logout functionality in other components using this object 
//we wrapped the index.js jsx in this so that it works throughout our app

//To persist user login sessions on the UI end, we store the token in local storage and check it
//This is to ensure that re-rendering the page doesn't log the user out

//To add auto-logout, we first expect an expirationTime variable in loginHandler function
//There are two steps to this: 
//1) create a function to calculate this dynamically 
//2) Handle reloading the page to recalculate it correctly

//We also have to make sure we handle differing situations with our token in storage
//In retrieveStoredToken we need to check how much time has elapsed and reset and return a null value if it's over the limit
//If under the limit, we return the token and time remaining in the session


import React, { useState, useEffect, useCallback  } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
    token: '', 
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();//current time
    const adjExpirationTime = new Date(expirationTime).getTime(); //make the string a date object
    const remainingDuration = adjExpirationTime - currentTime; //calculate
    
    return remainingDuration;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

//named export
export const AuthContextProvider = (props) => {
    
    const tokenData = retrieveStoredToken();

    let initialToken;
    if (tokenData) {
        initialToken = tokenData.token;
    }
    
    //check local storage to see if there is already a token there (think reloading) 
    //and if so, authenticate automatically
    // const initialToken = localStorage.getItem('token');
    
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;
    //if token is any string that is not empty, this will return true 
    //if token is a string that is empty, this will return false

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
        }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);
        console.log(token)
        //persisting user login session is done by tapping into local storage instead of cookies
        //Just like fetch, the localStorage function is provided by the browser
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        //upon login, start the timer
        const remainingTime = calculateRemainingTime(expirationTime);
        //set the timeout 
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
    useEffect(() => {
        if (tokenData) {
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
        }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>);
    //We are returning this wrapper so that other components 
    //that rely on the user being logged in can have access
};

export default AuthContext;