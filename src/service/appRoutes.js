import React from "react";
import { Route, Routes} from "react-router";
import Cookies from 'js-cookie';

import Ingredients from '../pages/Ingredients';
import Freezbe from '../pages/Freezbe';
import Process from '../pages/Process';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';

function PrivateRoute({ children }) {
  return Cookies.get('user')? children : <Home/>
}
const appRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
      <Route path="/Ingredients" element={<PrivateRoute><Ingredients/></PrivateRoute>}></Route>
      <Route path="/Freezbe" element={<PrivateRoute><Freezbe/></PrivateRoute>}></Route>
      <Route path="/Process" element={<PrivateRoute><Process/></PrivateRoute>}></Route>
    </Routes>

  );
};

export default appRoutes;