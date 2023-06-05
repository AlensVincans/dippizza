import React, { useEffect, useState, useContext } from "react";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import { CustomContext } from "../components/ProductsContext";

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

  const saveEditedProduct = (editedData) => {
    fetch("/updateOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status_order_id: 3,
        id: editedData.id,
      }),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log(info);
        fetch("/adminOrders")
          .then((resource) => resource.json())
          .then((data) => {
            setAdminOrders(data.orders);
            console.log(data);
          });
      });
    // console.log(JSON.stringify(editedData));
  };

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
              <ListGroup.Item>
                Pasutijums: {adminOrder.product_name}
              </ListGroup.Item>
              <ListGroup.Item>
                Telefona numurs: {adminOrder.mobile}
              </ListGroup.Item>
              <ListGroup.Item>Adrese: {adminOrder.address}</ListGroup.Item>
              <ListGroup.Item>№: {adminOrder.order_receipt}</ListGroup.Item>
              <ListGroup.Item
                variant={
                  adminOrder.status_name === "Paid" ? "success" : "warning"
                }
              >
                Status: {adminOrder.status_name}
                {adminOrder.status_name === "waiting" ? (
                  <Button onClick={() => saveEditedProduct(adminOrder)}>
                    Gatavs
                  </Button>
                ) : null}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export { Orders };
