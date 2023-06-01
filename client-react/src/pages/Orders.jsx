import React, { useEffect, useState } from "react";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";

function Orders() {
  const [adminOrders, setAdminOrders] = useState([]);

  useEffect(() => {
    fetch("/adminOrders")
      .then((resource) => resource.json())
      .then((data) => {
        setAdminOrders(data.orders);
        console.log(data);
      });
  }, []);

  return (
    <Container>
      {adminOrders.map((adminOrder) => (
        <Row
          key={adminOrder.id}
          className="justify-content-center align-items-center"
          xs
          lg="1"
          style={{ height: "15vh", fontSize: "20px" }}
        >
          <Col className="d-flex justify-content-center">
            <ListGroup horizontal>
              {/*  <ListGroup.Item>Image</ListGroup.Item> */}
              <ListGroup.Item>
                {adminOrder.first_name} <br /> {adminOrder.last_name}
              </ListGroup.Item>
              <ListGroup.Item>Order: {adminOrder.product_name}</ListGroup.Item>
              <ListGroup.Item>Mobile: {adminOrder.mobile}</ListGroup.Item>
              <ListGroup.Item>Address: {adminOrder.address}</ListGroup.Item>
              <ListGroup.Item>№: {adminOrder.order_receipt}</ListGroup.Item>
              <ListGroup.Item variant="warning">
                Status: {adminOrder.status_name}
                <Button>Check</Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export { Orders };
