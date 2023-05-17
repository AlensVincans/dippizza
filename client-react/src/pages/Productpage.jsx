import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imgPizza from "../pepperoni-pizza.jpg";
import CarouselMain from "../CarouselMain.jsx";
import Infoproduct from "./Infoproduct.jsx";
import { Link, Outlet } from "react-router-dom";

function Productpage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        console.log(data);
      });
  }, []);

  return (
    <div style={{ paddingTop: "5px", margin: "20px" }}>
      <CarouselMain />
      <Outlet />
      <Row xs={1} sm={3} className="justify-content-md-center g-4">
        {data.map((item) => (
          <Col key={item.id}>
            <Card>
              <Card.Img variant="top" src={imgPizza} />
              <Card.Body>
                <Link key={item.id} to={`/product/${item.id}`}>
                  {item.name}
                </Link>
                <Card.Text>{item.ingredients}</Card.Text>
                <Row>
                  <Col className="text-end">Price: {item.price}$</Col>
                </Row>
                <Row className="text-end">
                  <Button variant="success">Buy</Button>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <small className="text-muted">{item.food_drink}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Productpage;
