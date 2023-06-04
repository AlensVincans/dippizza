import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Sidebar = ({ children }) => {
  /*   const location = useLocation();

  if (location.pathname !== "/admin") {
    return null;
  }
 */
  return (
    <>
      <div className="d-flex">
        <div
          className="sidebar bg-primary"
          style={{ width: "120px", height: "94vh", color: "white" }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/add_product" className="nav-link linkColor">
                Pievienot produktu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link linkColor">
                Pasūtījumi
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/product_list" className="nav-link linkColor">
                Rediģēt produktus
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
