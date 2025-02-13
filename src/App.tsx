import { Routes, BrowserRouter as Router } from 'react-router';
import { Toaster } from "react-hot-toast";

import { PublicRoutes, PrivateRoutes } from "@/Routes/Routes";
import '@/App.css';


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
