import { React, useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Container, Row, Col, Image, Button } from "react-bootstrap";
import { CustomContext } from "../components/ProductsContext";
import imgPizza from "../pepperoni-pizza.jpg";

function FoodDrink() {
  const [typeData, setTypeData] = useState([]);
  const { typeParam } = useParams();
  const { addToBacked = Function.prototype } = useContext(CustomContext);

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
            <Col key={item.id} md={4}>
              <Card>
                <Image src={`/uploads/${item.image}`} rounded />
                <Card.Body>
                  <Link key={item.id} to={`/product/${item.id}`}>
                    {item.name}
                  </Link>
                  <Card.Text className="text-center">
                    {item.ingredients}
                  </Card.Text>
                  <Row>
                    <Col className="text-end">Cena: {item.price}€</Col>
                  </Row>
                  <Row className="text-end">
                    <Button
                      variant="success"
                      onClick={() =>
                        addToBacked({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                        })
                      }
                    >
                      Nopirkt
                    </Button>
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

