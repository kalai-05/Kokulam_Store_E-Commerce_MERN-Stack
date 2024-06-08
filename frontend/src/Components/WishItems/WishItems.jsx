import React, { useContext } from "react";
import "./WishItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/delete.png";

const WishItems = () => {
  const { all_product, wishItems, removeFromWish } = useContext(ShopContext);
  return (
    <div className="main-wish">
      <h1>Your Wishlist Products</h1>

      <div className="wishitems-main">
        {all_product.map((e) => {
          if (wishItems[e.id] > 0) {
            return (
              <div key={e.id} className="wishitems">
                <div className="wishitems-formate wishitems-fomate-main">
                  <img src={e.image} alt="" className="wishicon-product-icon" />
                  <h2>{e.name}</h2>
                  <div className="under-img">
                    <p>${e.new_price}</p>
                    <p className="">${e.old_price}</p>

                    <img
                      className="wishitems-remove-icon"
                      src={remove_icon}
                      onClick={() => {
                        removeFromWish(e.id);
                      }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default WishItems;
