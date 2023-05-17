import React from "react";
import Navibar from "./components/NaviBar.jsx";
import Productpage from "./pages/Productpage.jsx";
import LoginPage from "./pages/LoginForm.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import Infoproduct from "./pages/Infoproduct.jsx";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodDrink from "./pages/FoodDrink.jsx";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navibar />}>
            <Route index element={<Productpage />} />
            <Route path="product/:id" element={<Infoproduct />} />
            <Route path=":typeParam" element={<FoodDrink />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Notfoundpage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
