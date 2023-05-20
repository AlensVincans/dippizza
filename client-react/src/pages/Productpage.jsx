import React, { useContext, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { CustomContext } from "../components/ProductsContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import imgPizza from "../pepperoni-pizza.jpg";
import CarouselMain from "../CarouselMain.jsx";

function Productpage() {
  const {
    setProducts,
    addToBacked = Function.prototype,
    productData,
  } = useContext(CustomContext);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((productData) => {
        setProducts(productData.products);
        console.log(productData);
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div style={{ paddingTop: "5px", margin: "20px" }}>
      <CarouselMain />
      <Outlet />
      <Row xs={1} sm={3} className="justify-content-md-center g-4">
        {productData.map((product) => (
          <Col key={product.id}>
            <Card>
              <Card.Img variant="top" src={imgPizza} />
              <Card.Body>
                <Link key={product.id} to={`/product/${product.id}`}>
                  {product.name}
                </Link>
                <Card.Text>{product.ingredients}</Card.Text>
                <Row>
                  <Col className="text-end">Price: {product.price}$</Col>
                </Row>
                <Row className="text-end">
                  <Button
                    variant="success"
                    onClick={() =>
                      addToBacked({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                      })
                    }
                  >
                    Buy
                  </Button>
                </Row>
              </Card.Body>
              <Card.Footer className="text-end">
                <small className="text-muted">{product.food_drink}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Productpage;
