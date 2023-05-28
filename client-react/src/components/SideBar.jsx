import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Sidebar = () => {
  const location = useLocation();

  if (location.pathname !== '/admin') {
    return null;
  }

  return (
    <>
      <div className="d-flex">
        <div className="sidebar bg-primary" style={{ width: '120px', height: '94vh', color: 'white' }}>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/add_product" className="nav-link linkColor">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link linkColor">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/product_list" className="nav-link linkColor">
                Edit Products
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <h2>Welcome Admin!</h2>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

