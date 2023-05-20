import React, { useContext } from "react";
import { CustomContext } from "../components/ProductsContext";
import { ListGroup } from "react-bootstrap";
import { BucketItem } from "./BucketItem";
import { Link } from "react-router-dom";
import {EmptyCart} from './EmptyCart'
import "../App.css";

function BucketList() {
  const { order = [] } = useContext(CustomContext);

  const totalPrice = order.reduce((sum, element) => {
    return sum + element.price * element.quantity;
  }, 0);

  if (order.length == 0 ) {
   return  <EmptyCart/>  
  }
  else{

  return (
    <>

      <ListGroup as="ol" numbered>
        <BucketItem />
      </ListGroup>
      <ListGroup as="ul">
        <ListGroup.Item as="li" className="text-end" active>
          <Link
            className="bucketLinkColor justify-content-center d-flex "
            to="/payment"
          >
            Order form
          </Link>
          Total price: {totalPrice}$
        </ListGroup.Item>
      </ListGroup>
    </>
  )
  }
}

export { BucketList };
