import React from "react";
import "./Popular.css";
import data_product from "../Assets/populat_cat";
import PopularItem from "../PopularItem/PopularItem";
const Popular = () => {
  return (
    <div className="popular">
      <h1>SHOP BY CATEGORY</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => {
          return (
            <PopularItem
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
