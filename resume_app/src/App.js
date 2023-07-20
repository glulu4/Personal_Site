import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home/Home.js'
import { Routes, Route } from 'react-router-dom';
import Bagels from './Pages/Slider/Projects/Bagels/Bagels';
import Neighborhood from './Pages/Slider/Projects/Neighborhood';
import Sorts from './Pages/Slider/Projects/Sorts/Sorts.js';
import VmSim from './Pages/Slider/Projects/VmSim';
import AirlineSystem from './Pages/Slider/Projects/Airline/AirlineSystem';
import Tbd from './Pages/Slider/Projects/Tbd.js'
import Portfolio from './Pages/Slider/Projects/Portfolio/Portfolio';


function App() {
  return (
  
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/airline" element={<AirlineSystem />} />
        <Route path="/vmsim" element={<VmSim />} />
        <Route path="/sorting-algorithms" element={<Sorts />} />
        <Route path="/neighborhood" element={<Neighborhood />} />
        <Route path="/bagels" element={<Bagels />} />

        <Route path="/tbd" element={<Tbd />} />
        <Route path="/portfolio" element={<Portfolio />} />


      </Routes>
    

  );
}

export default App;
