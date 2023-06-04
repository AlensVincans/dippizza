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
            Veiksmīgs pasūtījums
          </Card.Header>
          <Card.Body style={{ background: "#C7F6D3" }}>
            <Card.Text>
              <strong>{users.first_name} paldies par pirkumu!</strong>
              <br />
                Jūsu pasūtījums tiks saņemts un drīz būs gatavs.
              <br /> <br />
              Jūsu pasūtījuma numurs: {users.order_receipt_id}.
            </Card.Text>
            <Button variant="primary" href="/">
              Atpakaļ uz sākumlapu
            </Button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export { OrderSuccessPage };
