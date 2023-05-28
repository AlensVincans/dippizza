import React, { useContext } from "react";
import { CustomContext } from "../components/ProductsContext";
import { ListGroup, Badge, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

function BucketItem() {
  const {
    order,
    removeBucket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
  } = useContext(CustomContext);

  return (
    <>
      {order.map((item) => {
        const itemPriceTotal = item.quantity * item.price;
        return (
          <ListGroup.Item
            key={item.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{item.name}</div>
              Price: {item.price}$
            </div>
            <div className="ms-2">
              <Button
                className="me-2"
                variant="danger"
                onClick={() => decQuantity(item.id)}
              >
                -
              </Button>
              <Badge bg="primary" pill>
                {item.quantity}
              </Badge>
              <Button
                className="ms-2"
                variant="success"
                onClick={() => incQuantity(item.id)}
              >
                +
              </Button>
              <span
                className="ms-2"
                onClick={() => removeBucket(item.id)}
                style={{ cursor: "pointer" }}
              >
                <XCircle color="red" size={30} />
              </span>
              <div>Total: {itemPriceTotal}$</div>
            </div>
          </ListGroup.Item>
        );
      })}
    </>
  );
}

export { BucketItem };
