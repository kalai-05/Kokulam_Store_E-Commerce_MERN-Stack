import React from "react";
import "./CSS/ShopCategory.css";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

import Item from "../Components/Item/Item";
import Sidebar from "../Components/Sidebar/Sidebar";

const AllProduct = (props) => {
  const { all_product } = useContext(ShopContext);
  return (
    <div className="main">
      <div className="shop-category">
        <div className="shop-category-side flex">
          <div className="flex max-h-48 ">
            <Sidebar />
          </div>
          <div className="shopcategory-product">
            {all_product.map((item, i) => {
              return (
                <Item
                  key={i}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            })}
          </div>
        </div>
        <div className="shop-category-more">Explore More</div>
      </div>
    </div>
  );
};

export default AllProduct;
