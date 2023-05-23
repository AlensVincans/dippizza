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

import { AdminPage } from "./pages/AdminPage.jsx";
import { AddProduct } from "./pages/AddProduct.jsx";
import { Orders } from "./pages/Orders.jsx";
import { ProductList } from "./pages/ProductList.jsx";
import Sidebar from "./components/SideBar.jsx";

function App() {
  return (
    <>
      <ProductsContext>
        <Router>
          <Navibar />
          <Sidebar />
          <Routes>
            <Route path="/" element={<Productpage />} />
            <Route path="product/:id" element={<Infoproduct />} />
            <Route path=":typeParam" element={<FoodDrink />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<Notfoundpage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route path="bucket" element={<BucketList />} />
            <Route path="order_success" element={<OrderSuccessPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add_product" element={<AddProduct />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/product_list" element={<ProductList />} />
          </Routes>
        </Router>
      </ProductsContext>
    </>
  );
}

export default App;
