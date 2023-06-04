import "bootstrap/dist/css/bootstrap.min.css";
import { React, useState, useContext, useEffect } from "react";
import {
  Form,
  Row,
  InputGroup,
  Col,
  Button,
  Container,
  Card,
} from "react-bootstrap";
import { AuthContext } from "../components/AuthContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const { setOperator, operators } = useContext(AuthContext);
  const [validate, setValidate] = useState(true);
  const [formData, setFormData] = useState({ login: "", pass: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (operators) {
      navigate("/admin");
    }
  }, [operators, navigate]);

  const handleButton = () => {
    fetch("/set_operator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: formData.login,
        pass: formData.pass,
      }),
    })
      .then((res) => res.json())
      .then((userData) => {
        /*   console.log(userData); */
        if (userData.error === "User is not found") {
          return console.log(userData);
        }
        setOperator(userData.operator);
        localStorage.setItem("currentUser", JSON.stringify(userData.operator));
        navigate("/admin");
      });
  };

  /* const checkStorage = localStorage.hasOwnProperty("currentUser");
   */

  return (
    <Container>
      <Row className="justify-content-center align-items-center g-4">
        <Col xs={5}>
          <Card border="primary" style={{ width: "35rem" }}>
            <Card.Header className="text-center">Autorizācija</Card.Header>
            <Form noValidate validated={validate} /* onSubmit={handleSubmit} */>
              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  md="7"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Lietotājvards</Form.Label>
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
                      Lietotājvārds ir obligāts lauks{" "}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="7" controlId="validationCustomPass">
                  <Form.Label>Parole</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="password"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback>
                    Parole ir obligāts lauks{" "}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button onClick={handleButton} href="/">
                Pieslegties
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
