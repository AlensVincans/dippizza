import React from "react";
import {ListGroup, Container, Row, Col} from "react-bootstrap/";


function Orders() {
  return (
    <Container>
      <Row className="justify-content-center align-items-center" style={{ height: "15vh", fontSize: "20px"}}>
        <Col className="d-flex justify-content-center">
          <ListGroup horizontal>
            <ListGroup.Item>Image</ListGroup.Item>
            <ListGroup.Item>Name <br /> Surname</ListGroup.Item>
            <ListGroup.Item>Order</ListGroup.Item>
            <ListGroup.Item>Status</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
