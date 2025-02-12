import { Routes, BrowserRouter as Router } from 'react-router';

import { PublicRoutes, PrivateRoutes } from "./Routes/Routes";
import { Toaster } from "react-hot-toast";
import './App.css';


function App() {

  return (
    <Router>
      <Toaster />
      <Routes>
        {PrivateRoutes()}
        {PublicRoutes()}
      </Routes>
    </Router>
  );
}

export default App
