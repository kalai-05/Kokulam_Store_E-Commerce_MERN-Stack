import React from "react";
import "./PopularItem.css";
import { Link } from "react-router-dom";

const PopularItem = (props) => {
  return (
    <div className="popularitem">
      <Link to={`/product`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
      </Link>
      <p>{props.name}</p>
      <div className="popularitem-prices">
        <div className="popularitem-price-new">{props.new_price}</div>
        <div className="popularitem-price-old">{props.old_price}</div>
      </div>
    </div>
  );
};

export default PopularItem;
