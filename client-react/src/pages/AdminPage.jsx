import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  return (
    <Container>
      <Row className="mt-5 justify-content-start">
        <Col md={3}>
          <Card className="p-5 bg-secondary">
            <Link to="/addProduct" className="btn btn-primary btn-block mb-5">
              Add Products
            </Link>
            <Link to="/orders" className="btn btn-primary btn-block mb-5">
              Orders
            </Link>
            <Link to="/productList" className="btn btn-primary btn-block">
              Edit Product
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export { AdminPage };

