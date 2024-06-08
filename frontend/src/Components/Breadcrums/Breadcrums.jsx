import React from "react";
import "./Breadcrums.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <div>
      <Link to={"/product"} className="breadcrum">
        HOME <img src={arrow_icon} alt="" /> PRODUCT
        <img src={arrow_icon} alt="" />
        {product.name} <img src={arrow_icon} alt="" /> {product.name}
      </Link>
    </div>
  );
};

export default Breadcrums;
