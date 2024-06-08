import React, { useState, useEffect } from "react";
import OfferItem from "../Components/OfferItems/OfferItems";

const Item = (props) => {
  const [allProduct, setAllProduct] = useState([]);

  const fetchOff = async () => {
    await fetch("http://localhost:4000/allOffer")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };

  useEffect(() => {
    fetchOff();
  }, []);

  return (
    <div className="shop-category">
      <div className="shop-category-side flex">
        <div className=" grid grid-cols-5 gap-7 mx-28 my-9">
          {allProduct.map((item, i) => {
            return (
              <OfferItem
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                dis_price={item.dis_price}
                old_price={item.old_price}
                dis_pec={item.dis_pec}
              />
            );
          })}
        </div>
      </div>
      <div className="shop-category-more">Explore More</div>
    </div>
  );
};

export default Item;
