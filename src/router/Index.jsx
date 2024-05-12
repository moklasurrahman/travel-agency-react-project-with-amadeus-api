import React from 'react'
import { Error } from './Error'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from '../pages/Home';
import Flights from '../pages/Flights';
import Navbar from '../components/Navbar';

const Index = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/flights" element={<Flights/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Index