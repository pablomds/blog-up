import { Routes, Route } from 'react-router';
import {PublicRoutes, PrivateRoutes} from "./Routes/Routes"
import './App.css';


function App() {

  return (
    <Routes>
      {PublicRoutes()}
      {PrivateRoutes()}
    </Routes>
  )
}

export default App
