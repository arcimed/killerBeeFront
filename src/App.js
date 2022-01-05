import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Routes from "./service/appRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
   return (
    <>
      <Router>
        <Navbar/>
        <ToastContainer />
        <Routes />
      </Router>
      <Footer/>
    </>
  );
}
export default App;

