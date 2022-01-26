//This form handles displaying login/logout based on current state of login
//This form also talks to firebase to populate new user data or to sign them in
//import { configure } from '@testing-library/react';
import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //access granting, grab token etc. 
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //under the hood DOM stuff
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

const submitHandler = (event) =>{
  event.preventDefault()

  //grab the user input and store from the passed event
  const enteredEmail = emailInputRef.current.value;
  const enteredPassword = passwordInputRef.current.value;

  //optional add validation

  //fires after submitting the form
  setIsLoading(true);
  let url;

  //determine which firebase endpoint needs to be communicated with
  if(isLogin){
    //log user in
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`;
  }
  else{
    url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
    //this will send a sign-up request
  }
  
  //Now actuall make the request 
  //fetch returns a promise
  fetch(url,
  {
    method: 'POST', //override GET method
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
  ).then(res => {
    setIsLoading(false);
    if(res.ok){
      return res.json();
    }
    else{
      //this returns a promise so to get access to the data we do:
      return res.json().then(data => {
        //show error modal
        // console.log(data);
        let errorMessage = 'Authentication Failed!'; 
        //can further this and create more robut error messages by inspecting
        // if(data && data.error && data.error.message){
        //   errorMessage = data.error.message;
        // }
        throw new Error(errorMessage);
      });
    }
  }).then((data) => {
    const expirationTime = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    authCtx.login(data.idToken, expirationTime.toISOString());
    history.replace('/');//login with the token
  }).catch((err) => {
    alert(err.message);
  });
};

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          {/* if user is not in the process of logging in, show these buttons */}
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {/* if user IS in the process of logging in, show this text */}
          {isLoading && <p>Processing request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;



//Steps:
//1) import and set up UseRef with constants 
//2) setup a submit handler w/ email & password variables to hold these values
//3) plug the submit handler into the form tag
//4) save the input tag values (email & password) as the variables you created
//5) use promises and make a fetch request while overriding it from the default get
//6) pass it a payload with the variables 
//7) handle any errors by digging into the json that should be returned