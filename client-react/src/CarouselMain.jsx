import { Carousel } from "react-bootstrap";
import React from "react";
import Action1 from "./action1.png";
import Action2 from "./action2.png";
import Action3 from "./action3.png";

function CarouselMain() {
  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Carousel style={{ width: "100%" }}>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Action1}
            alt="First slide"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Piedāvājums 30€+</h3>
            <p>Pasūtiet uz 30 eiro un saņemiet bezmaksas piegādi</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Action2}
            alt="Second slide"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Piedavajums Dzeriens</h3>
            <p>Pasūtiet 2 dažādas picas un saņemiet Pepsi 1L bez maksas</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            className="d-block w-100"
            src={Action3}
            alt="Third slide"
            style={{ height: "500px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Piedāvājums 1+1</h3>
            <p>
            Pasūtiet 2 vienādas picas un saņemiet trešo bez maksas
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>     <br></br> <br></br> <br></br> 
    </div > 
  );
}

export default CarouselMain;
