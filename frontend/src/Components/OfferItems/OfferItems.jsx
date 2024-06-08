import React from "react";
import { Link } from "react-router-dom";

const OfferItem = (props) => {
  return (
    <div className="relative mt-12">
      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-2 z-10 rounded-md">
        <p>{props.dis_pec}% OFF</p>
      </div>
      <div className="item shadow-md">
        <Link to={`/product/${props.id}`}>
          <img
            onClick={() => window.scrollTo(0, 0)}
            src={props.image}
            alt=""
            className="bg-white"
          />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">Rs.{props.dis_price}</div>
          <div className="item-price-old">Rs.{props.old_price}</div>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;
