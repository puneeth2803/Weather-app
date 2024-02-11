import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import PreviousDetails from './components/Previousdetails';
import Weather from './components/weather';


const App = () => {
  
  return (
<div>

  <BrowserRouter>
  <Header/>
      <Routes>
      <Route path='/' element={<Weather/>}></Route>
      <Route path='/previous' element={<PreviousDetails/>}></Route>
      </Routes>
    </BrowserRouter>
</div>
  );
};

export default App;