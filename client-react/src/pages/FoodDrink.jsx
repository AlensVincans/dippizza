import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import imgPizza from "../pepperoni-pizza.jpg";

function FoodDrink() {
  const [typeData, setTypeData] = useState([]);
  const { typeParam } = useParams();
  console.log(typeParam);

  useEffect(() => {
    fetch(`/food_drink/${typeParam}`)
      .then((res) => res.json())
      .then((data) => {
        setTypeData(data.products);
        console.log(data);
      });
  }, [typeParam]);

  return (
    <>
      <Container>
        <Row className="justify-content-md-center g-4">
          {typeData.map((item) => (
            <Col key={item.id} sm={6}>
              <Card>
                <Image src={imgPizza} rounded />
                <Card.Body>
                  <Link key={item.id} to={`/product/${item.id}`}>
                    {item.name}
                  </Link>
                  <Card.Text className="text-center">
                    {item.ingredients}
                  </Card.Text>
                  <Row>
                    <Col className="text-end">Price: {item.price}$</Col>
                  </Row>
                  <Row className="text-end">
                    <Button variant="success">Buy</Button>
                  </Row>
                </Card.Body>

                <Card.Footer className="text-center">
                  <small className="text-muted">{item.food_drink}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default FoodDrink;
