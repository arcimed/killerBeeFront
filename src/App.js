import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "./service/appRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
   return (
    <>
      <Router>
        <Navbar/>
        <Routes />
      </Router>
      <Footer/>
    </>
  );
}
export default App;

