import React from "react";
import {Container, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logos from './logo.svg'

function Navibar() {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img
              alt=""
              src={logos}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Gallo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar> 
    );
  }
  
  export default Navibar;

