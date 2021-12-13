import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Ingredients from './pages/Ingredients';
import Freezbe from './pages/Freezbe';
import Process from './pages/Process';
import NotFound from './pages/NotFound';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/Ingredients" element={<Ingredients/>}></Route>
          <Route path="/Freezbe" element={<Freezbe/>}></Route>
          <Route path="/Process" element={<Process/>}></Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

