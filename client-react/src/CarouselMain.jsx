import { Carousel, Row } from "react-bootstrap";
import React from "react";
import imgPizza from "./pepperoni-pizza.jpg";

function CarouselMain() {
  return (
    <div style={{ width: "500px", height: "350px", margin: "0 auto" }}>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={imgPizza} alt="First slide" />
          <Carousel.Caption>
            <h3>Actions 1</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={imgPizza} alt="Second slide" />
          <Carousel.Caption>
            <h3>Actions 2</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={imgPizza} alt="Third slide" />
          <Carousel.Caption>
            <h3>Actions 3</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselMain;
