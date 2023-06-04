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
    address: "",
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

    // Check if required fields are filled
    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.mobile === "" ||
      formData.email === "" ||
      formData.address === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

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
      <div style={{ width: "300px" }}>
        <h1>Apmaksas Lapa</h1>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>Vārds</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ievadiet vārdu"
              required
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Uzvārds</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ievadiet uzvārdu"
              required
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Telefona numurs</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ievadiet telefona numuru"
              required
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>E-pasts</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ievadiet e-pastu"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mb-4">
            <Form.Label>Adrese</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ievadiet adresu"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Apmaksas veids</Form.Label>
            <Form.Check
              type="radio"
              label="Tiešsaistes maksājums"
              name="paymentMethod"
              value="internet"
              checked={paymentMethod === "internet"}
              onChange={handlePaymentMethodChange}
              required
            />
            <Form.Check
              type="radio"
              label="Skaidra nauda"
              name="paymentMethod"
              value="onDelivery"
              checked={paymentMethod === "onDelivery"}
              onChange={handlePaymentMethodChange}
              className="mb-3"
              required
            />
          </Form.Group>

          {paymentMethod === "internet" && (
            <div>
              <Form.Group controlId="formCardNumber">
                <Form.Label>Kartes numurs</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ievadiet kartes numuru"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formExpiration">
                <Form.Label>Derīguma termiņš</Form.Label>
                <div className="d-flex">
                  <Form.Control type="text" placeholder="MM" required />
                  <div style={{ width: "1rem" }}></div> {/* Add space */}
                  <Form.Control type="text" placeholder="YY" required />
                </div>
              </Form.Group>

              <Form.Group controlId="formSecurityCode" className="mb-5">
                <Form.Label>CVV Kods</Form.Label>
                <Form.Control type="text" placeholder="CVV" required />
              </Form.Group>
            </div>
          )}

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" onClick={handleSubmits}>
              Apstiprināt
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export { PaymentPage };
