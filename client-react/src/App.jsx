import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductsContext } from "./components/ProductsContext.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import { PrivateRoute } from "./components/PrivateRoute.jsx";

import Navibar from "./components/NaviBar.jsx";
import LoginPage from "./pages/LoginForm.jsx";
import Notfoundpage from "./pages/Notfoundpage.jsx";
import Infoproduct from "./pages/Infoproduct.jsx";
import Productpage from "./pages/Productpage.jsx";
import { PaymentPage } from "./pages/Payment.jsx";
import { BucketList } from "./pages/BucketList.jsx";
import { OrderSuccessPage } from "./pages/OrderSuccess.jsx";
import FoodDrink from "./pages/FoodDrink.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { AddProduct } from "./pages/AddProduct.jsx";
import { Orders } from "./pages/Orders.jsx";
import { ProductList } from "./pages/ProductList.jsx";
import Sidebar from "./components/SideBar.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <ProductsContext>
          <Router>
            <Navibar />
            <Routes>
              <Route path="/" element={<Productpage />} />
              <Route path="product/:id" element={<Infoproduct />} />
              <Route path=":typeParam" element={<FoodDrink />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="bucket" element={<BucketList />} />
              <Route path="order_success" element={<OrderSuccessPage />} />
              <Route path="login" element={<LoginPage />} />

              <Route element={<PrivateRoute roles={["admin", "moderator"]} />}>
                <Route element={<Sidebar />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/add_product" element={<AddProduct />} />
                  <Route path="/admin/orders" element={<Orders />} />
                  <Route path="/admin/product_list" element={<ProductList />} />
                </Route>
              </Route>
              <Route path="*" element={<Notfoundpage />} />
            </Routes>
          </Router>
        </ProductsContext>
      </AuthProvider>
    </>
  );
}

export default App;
