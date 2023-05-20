import React from "react";
import { Container, Card, Button } from "react-bootstrap";

const OrderSuccessPage = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <div>
        <Card className="text-center" style={{ width: "357px" }}>
          <Card.Header as="h5" className="bg-primary text-white">
            Успешный заказ
          </Card.Header>
          <Card.Body style={{ background: "#C7F6D3" }}>
            <Card.Text>
              <strong>Спасибо за покупку!</strong>
              <br />
              Ваш заказ успешно оплачен и будет готов в ближайшее время.
              <br /> <br />
              Номер вашего заказа: 123243.
            </Card.Text>
            <Button variant="primary" href="/">
              Вернуться на главную
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export { OrderSuccessPage };
