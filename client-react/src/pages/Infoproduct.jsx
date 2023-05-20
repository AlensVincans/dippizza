import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  Image,
  Button,
  Form,
  Collapse,
} from "react-bootstrap";
import { CustomContext } from "../components/ProductsContext";
import imgPizza from "../pepperoni-pizza.jpg";
import { useParams } from "react-router-dom";

function Infoproduct() {
  const [info, setData] = useState([]);
  const { id } = useParams();
  const { addToBacked = Function.prototype } = useContext(CustomContext);

  const [cheeseMenuOpen, setCheeseMenuOpen] = useState(false);
  const [salamiMenuOpen, setSalamiMenuOpen] = useState(false);
  const [tomatoMenuOpen, setTomatoMenuOpen] = useState(false);
  const [ananiasMenuOpen, setAnaniasMenuOpen] = useState(false);

  const [cheeseCount, setCheeseCount] = useState(0);
  const [salamiCount, setSalamiCount] = useState(0);
  const [tomatoCount, setTomatoCount] = useState(0);
  const [ananiasCount, setAnaniasCount] = useState(0);

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
        //console.log(data);
      });
  }, [id]);

  const incrementCounter = (menu) => {
    switch (menu) {
      case "cheese":
        setCheeseCount(cheeseCount + 1);
        break;
      case "salami":
        setSalamiCount(salamiCount + 1);
        break;
      case "tomato":
        setTomatoCount(tomatoCount + 1);
        break;
      case "ananias":
        setAnaniasCount(ananiasCount + 1);
        break;
      default:
        break;
    }
  };

  const decrementCounter = (menu) => {
    switch (menu) {
      case "cheese":
        if (cheeseCount > 0) {
          setCheeseCount(cheeseCount - 1);
        }
        break;
      case "salami":
        if (salamiCount > 0) {
          setSalamiCount(salamiCount - 1);
        }
        break;
      case "tomato":
        if (tomatoCount > 0) {
          setTomatoCount(tomatoCount - 1);
        }
        break;
      case "ananias":
        if (ananiasCount > 0) {
          setAnaniasCount(ananiasCount - 1);
        }
        break;
      default:
        break;
    }
  };

  const calculateTotal = () => {
    return cheeseCount + salamiCount + tomatoCount + ananiasCount;
  };

  const total =
    info.reduce((accumulator, item) => accumulator + item.price, 0) +
    calculateTotal();

  return (
    <>
      <Container>
        {info.map((item) => (
          <Row className="justify-content-md-center g-4">
            <Col key={item.id} sm={6}>
              <Card>
                <Image src={imgPizza} rounded />
                <Card.Body>
                  <Card.Title className="text-center">{item.name}</Card.Title>
                  <Card.Text className="text-center">
                    {item.ingredients}
                  </Card.Text>
                  <Row>
                    <Col className="text-end">Price: {item.price}$</Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-center">
                  <small className="text-muted">{item.food_drink}</small>
                </Card.Footer>
              </Card>
            </Col>

            <Col sm={3}>
              <Card border="primary" style={{ width: "25rem" }}>
                <Card.Header>Order settings</Card.Header>
                <Card.Body>
                  <Card.Title>Add Ingredients:</Card.Title>
                  <Card.Text>
                    <Form>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Cheese"
                        onChange={() => {
                          setCheeseMenuOpen(!cheeseMenuOpen);
                          if (cheeseMenuOpen) {
                            setCheeseCount(0);
                          }
                        }}
                      />

                      <Collapse in={cheeseMenuOpen}>
                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => decrementCounter("cheese")}
                            >
                              -
                            </Button>
                          </Col>
                          <Col>{cheeseCount}</Col>
                          <Col>
                            <Button
                              variant="success"
                              onClick={() => incrementCounter("cheese")}
                            >
                              +
                            </Button>
                          </Col>
                          <Col>Price: 2$</Col>
                        </Row>
                      </Collapse>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Salami"
                        onChange={() => {
                          setSalamiMenuOpen(!salamiMenuOpen);
                          if (salamiMenuOpen) {
                            setSalamiCount(0);
                          }
                        }}
                      />
                      <Collapse in={salamiMenuOpen}>
                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => decrementCounter("salami")}
                            >
                              -
                            </Button>
                          </Col>
                          <Col>{salamiCount}</Col>
                          <Col>
                            <Button
                              variant="success"
                              onClick={() => incrementCounter("salami")}
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </Collapse>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Tomato"
                        onChange={() => {
                          setTomatoMenuOpen(!tomatoMenuOpen);
                          if (tomatoMenuOpen) {
                            setTomatoCount(0);
                          }
                        }}
                      />
                      <Collapse in={tomatoMenuOpen}>
                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => decrementCounter("tomato")}
                            >
                              -
                            </Button>
                          </Col>
                          <Col>{tomatoCount}</Col>
                          <Col>
                            <Button
                              variant="success"
                              onClick={() => incrementCounter("tomato")}
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </Collapse>
                      <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Ananias"
                        onChange={() => {
                          setAnaniasMenuOpen(!ananiasMenuOpen);
                          if (ananiasMenuOpen) {
                            setAnaniasCount(0);
                          }
                        }}
                      />
                      <Collapse in={ananiasMenuOpen}>
                        <Row>
                          <Col>
                            <Button
                              variant="danger"
                              onClick={() => decrementCounter("ananias")}
                            >
                              -
                            </Button>
                          </Col>
                          <Col>{ananiasCount}</Col>
                          <Col>
                            <Button
                              variant="success"
                              onClick={() => incrementCounter("ananias")}
                            >
                              +
                            </Button>
                          </Col>
                        </Row>
                      </Collapse>
                      <Row className="justify-content-md-center">
                        <Col xs="auto">Total: {total}$</Col>
                      </Row>
                      <Row className="justify-content-md-end">
                        <Col xs="auto">
                          <Button
                            className="text-end"
                            variant="success"
                            onClick={() =>
                              addToBacked({
                                id: item.id,
                                name: item.name,
                                price: total,
                                dop_ingredients: [
                                  {
                                    cheeseMenuOpen: cheeseMenuOpen,
                                    salamiMenuOpen: salamiMenuOpen,
                                    tomatoMenuOpen: tomatoMenuOpen,
                                    ananiasMenuOpen: ananiasMenuOpen,
                                  },
                                ],
                              })
                            }
                          >
                            Buy
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
}

export default Infoproduct;
