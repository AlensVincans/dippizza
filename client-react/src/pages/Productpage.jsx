import React, { useContext, useEffect } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { CustomContext } from "../components/ProductsContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
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
      });
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <CarouselMain />
      <div style={{ marginTop: "1px", margin: "300px" }}>
        <Outlet />
        <Row xs={1} sm={3} className="justify-content-md-center g-4">
          {productData.map((product) => (
            <Col key={product.id} style={{ marginBottom: "20px" }}>
              <Card>
                <Card.Img variant="top" src={`/uploads/${product.image}`} />
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
      <div
        style={{
          fontSize: "20px",
          textAlign: "left",
          marginLeft: "300px",
          marginRight: "300px",
        }}
      >
        <p>
          Pica ir viens no populārākajiem un iecienītākajiem ēdieniem visā
          pasaulē. Varbūt nav neviena cilvēka, kurš to vismaz reizi mūžā nebūtu
          izmēģinājis. Tas ir gan bērnu, gan pieaugušo cienasts. Tas ir ļoti
          sātīgs un garšīgs ēdiens, tāpēc visbiežāk to pērk svētku galdā vai
          parastās sanāksmēs ar draugiem. Populārs ēdiens tiek pagatavots ar
          daudzām dažādām sastāvdaļām atraimē gaumei. Patiesībā tāpēc pica ir
          tik populāra. Katrā planētas stūrī tas tiek izveidots pēc īpašas
          receptes, atšķirībā no pārējās.
          <br /> <br />
          Mūsu ēdienkartē ir vairāk nekā 20 picu iespējas. Starp klasiskajiem
          "Margarita" ir vispopulārākā. Pildījums, kas pārklāts ar mocarellas
          sieru, kas ir izkusis, un svaigiem tomātiem.
          <br /> <br />
          <strong style={{ fontWeight: "bold" }}>
            Nāciet uz mūsu picēriju Picas ielā 21
          </strong>
          .
          <br /> <br /> <br />
        </p>
      </div>
    </div>
  );
}

export default Productpage;
