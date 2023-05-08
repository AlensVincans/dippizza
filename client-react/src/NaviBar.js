import React from "react";
import {Container, Nav, Navbar, Badge, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logos from './logo.svg'
import bucket from './bucket.svg'

function Navibar() {
    return (
        <Navbar bg="primary" variant="dark">
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
            <Nav.Link href="#home">Pizza</Nav.Link>
            <Nav.Link href="#features">Beverages</Nav.Link>
            <Nav.Link href="#pricing">Actions</Nav.Link>
          </Nav>
          <Nav>
            <Button>
                <img
                alt=""
                src={bucket}
                width="30"
                height="30"
                className="d-inline-block align-top"
                 />{' '}
                <Badge bg="danger">9</Badge>
                <span className="visually-hidden">unread messages</span>
            </Button>
          </Nav>
        </Container>
      </Navbar> 
    );
  }
  
  export default Navibar;

