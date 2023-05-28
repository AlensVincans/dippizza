import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CustomContext } from "../components/ProductsContext";

const PaymentPage = () => {
  const dateTime = Date.now();
  const [paymentMethod, setPaymentMethod] = useState("internet");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    email: "",
    order_receipt_id: dateTime,
  });
  const {
    clearBucket,
    addUser = Function.prototype,
    addOrderReceiptId,
    order,
  } = useContext(CustomContext);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmits = (event) => {
    event.preventDefault();

    console.log(order);

    setFormData((prevData) => ({
      ...prevData,
      order_receipt_id: dateTime,
    }));

    addOrderReceiptId(formData, dateTime);

    fetch("/create_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Обработка ответа от сервера
        console.log(data);
        addUser(formData);
        navigate("/order_success");
      })
      .catch((error) => {
        // Обработка ошибки
        console.error(error);
      });

    fetch("/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_receipt: formData.order_receipt_id,
        orders_data: order,
        status_order_id: 2,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clearBucket();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div>
        <h1>Payment Page</h1>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              required
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Surname</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Surname"
              required
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              required
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-5">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter E-mail"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="internet"
              checked={paymentMethod === "internet"}
              onChange={handlePaymentMethodChange}
            />
            <Form.Check
              type="radio"
              label="Cash Payment"
              name="paymentMethod"
              value="onDelivery"
              checked={paymentMethod === "onDelivery"}
              onChange={handlePaymentMethodChange}
              className="mb-4"
            />
          </Form.Group>

          {paymentMethod === "internet" && (
            <div>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Card Number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formExpiration">
                <Form.Label>Expire Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" required />
              </Form.Group>

              <Form.Group controlId="formSecurityCode" className="mb-5">
                <Form.Label>CVV Code</Form.Label>
                <Form.Control type="text" placeholder="CVV" required />
              </Form.Group>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={handleSubmits}>
              Order
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export { PaymentPage };
