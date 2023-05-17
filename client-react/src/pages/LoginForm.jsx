import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState } from "react";
import {
  Form,
  Row,
  InputGroup,
  Col,
  Button,
  Container,
  Card,
} from "react-bootstrap";

function LoginPage() {
  const [validate, setValidate] = useState(false);
  const [formData, setFormData] = useState({ login: "", pass: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleButton = () => {
    if (formData.login === "admin" && formData.pass === "admin") {
      alert("Chiki-Piki");
    } else if (formData.login === "manager" && formData.pass === "manager") {
      alert("Chiki-Manager");
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    console.log(form.preventDefault);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidate(true);
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center g-4">
        <Col xs={5}>
          <Card border="primary" style={{ width: "35rem" }}>
            <Card.Header className="text-center">Authentication</Card.Header>
            <Form noValidate validated={validate} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="7"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Username</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      required
                      type="text"
                      placeholder="login"
                      name="login"
                      value={formData.login}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback>
                      Username is a required field{" "}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="7" controlId="validationCustomPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>
                    Password is a required field{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button onClick={handleButton} href="/">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
