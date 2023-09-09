import React, { useState } from "react";
import clear from "./clear.svg";
import "./Carousel.css";

const Carousel = (time, temp,key) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - e.nativeEvent.offsetX;
    if (deltaX > 0) {
      setCurrentSlide((prevSlide) => Math.max(prevSlide - 1, 0));
      console.log("detal.", (prevSlide) => Math.max(prevSlide - 1, 0));
    } else {
      setCurrentSlide((prevSlide) =>
        Math.min(prevSlide + 1, totalSlides.length - 1)
      );
    }
  };

  const totalSlides = [
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={0 === currentSlide ? "slide active" : "slide"}
    >
      <div>{time }</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={1 === currentSlide ? "slide active" : "slide"}
    >
      <div>{time}</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{ temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={2 === currentSlide ? "slide active" : "slide"}
    >
      <div>{temp }</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={3 === currentSlide ? "slide active" : "slide"}
    >
      <div>{ time}</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={4}
      className={4 === currentSlide ? "slide active" : "slide"}
    >
      <div>{time}</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={5 === currentSlide ? "slide active" : "slide"}
    >
      <div>{time}</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
    <div
      onMouseMove={handleMouseMove}
      key={key}
      className={6 === currentSlide ? "slide active" : "slide"}
    >
      <div>{time}</div>
      <div>
        <img src={clear} alt="" />
      </div>
      <div>{temp}&deg;C</div>
    </div>,
  ];

  return (
    <div className="carousel">{totalSlides.map((slide, index) => slide)}</div>
  );
};

export default Carousel;
