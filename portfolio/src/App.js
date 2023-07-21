import './App.css';
import Home from './Pages/Home/Home'
import { Routes, Route } from 'react-router-dom';
import Bagels from './Pages/Slider/Bagels/Bagels.js';
import Neighborhood from './Pages/Slider/Neighborhood';
import Sorts from './Pages/Slider/Sorts/Sorts.js';
import VmSim from './Pages/Slider/VmSim';
import AirlineSystem from './Pages/Slider/Airline/AirlineSystem';
import Tbd from './Pages/Slider/Tbd.js'
import Portfolio from './Pages/Slider/Portfolio/Portfolio';


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

