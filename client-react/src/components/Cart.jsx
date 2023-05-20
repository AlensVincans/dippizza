import React from "react";
import { Badge } from "react-bootstrap";
import bucket from "../bucket.svg";
import { Link } from "react-router-dom";

function Cart(props) {
  const { quality } = props;

  return (
    <>
      <Link to="/bucket">
        <img
          alt=""
          src={bucket}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        <Badge bg="danger">{quality}</Badge>
        <span className="visually-hidden">unread messages</span>
      </Link>
    </>
  );
}

export { Cart };
