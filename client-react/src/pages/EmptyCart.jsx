import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import imgCart from "../empty_cart_image.png";
import { Link } from 'react-router-dom';

function EmptyCart() {
  return (
    <Container>
      <Row>
        <Col md={12} className="text-center">
          <h1>Your cart is empty</h1>
          <img src={imgCart} alt="Корзина пуста" className="empty-cart-image" />
          <p className="empty-cart-message" > <br /> 
            <Link to="/food" className="empty-cart-link">Add products to your cart</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export  {EmptyCart}; // TAK DELAY !!
