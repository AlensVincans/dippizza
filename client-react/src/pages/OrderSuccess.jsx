import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { CustomContext } from "../components/ProductsContext";

const OrderSuccessPage = () => {
  const { users } = useContext(CustomContext);
  console.log(users);
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
              <strong>{users.first_name} cпасибо за покупку!</strong>
              <br />
              Ваш заказ успешно оплачен и будет готов в ближайшее время.
              <br /> <br />
              Номер вашего заказа: {users.order_receipt_id}.
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
