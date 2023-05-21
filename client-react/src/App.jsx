import React from "react";
import Navibar from "./components/NaviBar.jsx";
import Productpage from "./pages/Productpage.jsx";
import LoginPage from "./pages/LoginForm.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import Infoproduct from "./pages/Infoproduct.jsx";
import { PaymentPage } from "./pages/Payment.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FoodDrink from "./pages/FoodDrink.jsx";
import { ProductsContext } from "./components/ProductsContext.jsx";
import { BucketList } from "./pages/BucketList.jsx";
import { OrderSuccessPage } from "./pages/OrderSuccess.jsx";

import {AdminPage} from "./pages/AdminPage.jsx";
import {AddProduct} from "./pages/AddProduct.jsx"
import {Orders} from "./pages/Orders.jsx"
import {History} from "./pages/History.jsx"
import {EditProduct} from "./pages/EditProduct.jsx"

function App() {
  return (
    <>
      <ProductsContext>
        <Router>
          <Routes>
            <Route path="/" element={<Navibar />}>
              <Route index element={<Productpage />} />
              <Route path="product/:id" element={<Infoproduct />} />
              <Route path=":typeParam" element={<FoodDrink />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="*" element={<Notfoundpage />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="bucket" element={<BucketList />} />
              <Route path="order_success" element={<OrderSuccessPage />} />
              <Route path="/AdminPage" element={<AdminPage />} />
              <Route path="/AddProduct" element={<AddProduct />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/History" element={<History />} />
              <Route path="/EditProduct" element={<EditProduct />} />
            </Route>
          </Routes>
        </Router>
      </ProductsContext>
    </>
  );
}

export default App;
