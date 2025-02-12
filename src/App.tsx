import { Routes, BrowserRouter as Router } from 'react-router';

import { PublicRoutes, PrivateRoutes } from "./Routes/Routes";
import { ToastProvider } from './Components/Global/Toast/Toast.tsx'
import './App.css';


function App() {

  return (
    <ToastProvider>
        <Router>
          <Routes>
            {PrivateRoutes()}
            {PublicRoutes()}
          </Routes>
        </Router>
    </ToastProvider>
  );
}

export default App
