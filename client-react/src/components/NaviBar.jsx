import { React, useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logos from "../logo.svg";
import { Cart } from "./Cart";
import { CustomContext } from "./ProductsContext";
import { AuthContext } from "./AuthContext";
import { ManagerAuth } from "./ManagerAuth";

function Navibar() {
  const { order } = useContext(CustomContext);
  const { operators } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logos}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <Link to="/" className="linkColor">
              Gallo
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/food" className="linkColor">
              Pizza
            </Link>
            <Link to="/drink" className="linkColor">
              Beverages
            </Link>
            {operators && operators[0].role === "darbinieks" ? (
              <Link to="/darb/orders" className="linkColor mr-2">
                Orders
              </Link>
            ) : null}
            {operators && operators[0].role === "admin" ? (
              <Link to="/admin" className="linkColor mr-2">
                Admins
              </Link>
            ) : null}
          </Nav>
          <Nav>
            {operators ? (
              <ManagerAuth nameAuth={operators[0].name} />
            ) : (
              <Cart quality={order.length} />
            )}
            {/*   */}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navibar;
