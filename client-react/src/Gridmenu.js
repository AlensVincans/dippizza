import {Card, Col, Row, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import imgPizza from './pepperoni-pizza.jpg'



function Gridmenu() {
    const [data ,setData] = useState([])

    useEffect(() => {
      fetch("/products")
      .then(res => res.json())
      .then(data => {
          setData(data.result_pizza);
          console.log(data);
        });
    }, []);


  return (
    <Row xs={2} md={3} className="justify-content-md-center" >  
      {data.map((item, index) => (
        <Col key={index} >
          <Card>
            <Card.Img variant="top" src={imgPizza}/>
            <Card.Body>              
              <Card.Link href="#test">{item[1]}</Card.Link>
              <Card.Text>
                {item[2]}
              </Card.Text>
              <Button variant="primary">Buy</Button>             
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );}

export default Gridmenu;
