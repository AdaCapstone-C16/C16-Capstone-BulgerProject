import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//this is the only piece out of these imports that we "made":
import { AuthContextProvider } from './store/auth-context';

import './index.css';
import App from './App';

ReactDOM.render(
  <AuthContextProvider> 
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>,  
document.getElementById('root'));

//by wrapping our index.js jsx in this custom tag, 
//we can now access logged in info in other places