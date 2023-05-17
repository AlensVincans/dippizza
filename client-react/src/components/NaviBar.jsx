import { React, useState, useContext } from "react";
import { Container, Nav, Navbar, Badge, Button } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import logos from "../logo.svg";
import bucket from "../bucket.svg";

function Navibar() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logos}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            Gallo
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/food">Pizza</Nav.Link>
            <Nav.Link href="/drink">Beverages</Nav.Link>
          </Nav>
          <Nav>
            <Button>
              <img
                alt=""
                src={bucket}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
              <Badge bg="danger">9</Badge>
              <span className="visually-hidden">unread messages</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Navibar;
