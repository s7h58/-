import React, { useEffect, useState } from "react";
import slide1 from "../image/main01.jpg";
import slide2 from "../image/main02.jpg";
import slide3 from "../image/main03.jpg";
import "../App.css";

function Slider() {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      <div className="slide-frame">
        <div className="slide">
          {slides.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`slide-${index}`}
              className={`slide-img ${current === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
