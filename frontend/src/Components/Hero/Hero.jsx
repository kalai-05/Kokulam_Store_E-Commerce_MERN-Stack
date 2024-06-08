import React, { useState, useEffect } from "react";

import "./Hero.css";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";
import p1 from "../Assets/p4.png";
import p2 from "../Assets/p5.png";
import p3 from "../Assets/p6.png";

import { Link } from "react-router-dom";

const Hero = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 4); // Assuming you have 3 images
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <div className="hero-left">
        <div>
          <p>LOWEST PRICES ON YOUR</p>

          <p>DAILY ESSENTIALS</p>
        </div>
        <h2>
          Browse through our diverse range of groceries and make your life
          healthy
        </h2>
        <Link to={"/product"}>
          <div className="hero-latest-btn">
            <div>Shop Now</div>

            <img src={arrow_icon} alt="" />
          </div>
        </Link>
        <div className=" hero-left-details">
          <div className="number">
            <h1>200+</h1>
            <h2>Manufacturers</h2>
          </div>
          <div className="number">
            <h1>2,000+</h1>
            <h2>Products</h2>
          </div>
          <div className="number">
            <h1>30,000+</h1>
            <h2>Happy Customers</h2>
          </div>
        </div>
      </div>
      <div className="hero-right ">
        <div className=" ">
          <div
            style={{ display: slideIndex === 0 ? "block" : "none" }}
            className="rounded-lg shadow-2xl"
          >
            <img src={hero_image} alt="Slide 1" width="583" height="446" />
          </div>
          <div
            style={{ display: slideIndex === 1 ? "block" : "none" }}
            className="rounded-lg shadow-2xl"
          >
            <img src={p1} alt="Slide 2" width="583" height="446" />
          </div>
          <div
            style={{ display: slideIndex === 2 ? "block" : "none" }}
            className="rounded-lg shadow-2xl"
          >
            <img src={p2} alt="Slide " width="583" height="446" />
          </div>
          <div
            style={{ display: slideIndex === 3 ? "block" : "none" }}
            className="shadow-2xl"
          >
            <img src={p3} alt="Slide 4" width="583" height="446" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
