import { Routes, BrowserRouter as Router } from 'react-router';
import { Provider } from 'react-redux';

import store from './Redux/store';
import { PublicRoutes, PrivateRoutes } from "./Routes/Routes";
import { ToastProvider } from './Components/Global/Toast/Toast.tsx'
import './App.css';


function App() {

  return (
    <ToastProvider>
        <Router>
          <Routes>
            {PublicRoutes()}
            {PrivateRoutes()}
          </Routes>
        </Router>
    </ToastProvider>
  );
}

export default App
