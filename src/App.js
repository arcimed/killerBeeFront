import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Ingredients from './pages/Ingredients';
import Freezbe from './pages/Freezbe';
import Process from './pages/Process';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Ingredients" element={<Ingredients/>}></Route>
          <Route path="/Freezbe" element={<Freezbe/>}></Route>
          <Route path="/Process" element={<Process/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}
export default App;

