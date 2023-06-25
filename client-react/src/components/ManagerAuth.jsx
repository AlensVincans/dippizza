import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Container, Row, OverlayTrigger, Col, Tooltip } from "react-bootstrap";
import { BoxArrowInRight } from "react-bootstrap-icons";

function ManagerAuth(props) {
  const { nameAuth } = props;
  const { clearOperator } = useContext(AuthContext);
  const navigate = useNavigate();
  const OverlayInfo = ({ id, children, title }) => (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id={id}>{title}</Tooltip>}
    >
      <a>{children}</a>
    </OverlayTrigger>
  );

  const handleButton = () => {
    localStorage.removeItem("currentUser");
    clearOperator();
    navigate("/");
  };


  return (
    <>
      <Container>
        <Row md="auto" sm={3}>
          <Col>Sveiki, {nameAuth}</Col>
          <Col onClick={handleButton}>
            <OverlayInfo title="Iziet" id="t-1">
              <BoxArrowInRight width={30} height={30} />
            </OverlayInfo>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export { ManagerAuth };
