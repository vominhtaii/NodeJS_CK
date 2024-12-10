import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../../Asset/images/slide1.jpg';
import slide2 from '../../Asset/images/slide2.jpg';
import slide3 from '../../Asset/images/slide3.jpg';
import slide4 from '../../Asset/images/slide4.jpg';
import React from 'react';
import './Slider.css';

const SliderCommponent = () => {
  return (
    <div className="carousel-container">
      <Carousel interval={3000}>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://cf.shopee.vn/file/vn-50009109-727a24a85a60935da5ccb9008298f681"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://cf.shopee.vn/file/vn-50009109-b850047513facece14eab68739be6902"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://cf.shopee.vn/file/vn-50009109-b40ff0ff3bcaf8afc43dc0e54e5f3bdd"
            alt="Fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default SliderCommponent;
