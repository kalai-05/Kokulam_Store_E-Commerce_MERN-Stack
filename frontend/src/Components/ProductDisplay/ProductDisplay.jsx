import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import wishlist_red from "../Assets/wishlist_red.png";
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, addToWish } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list  ">
          <img
            src={product.image}
            alt=""
            className=" bg-white border border-black rounded-sm"
          />
          <img
            src={product.image}
            alt=""
            className=" bg-white border border-black rounded-sm"
          />
          <img
            src={product.image}
            alt=""
            className=" bg-white border border-black rounded-sm"
          />
          <img
            src={product.image}
            alt=""
            className=" bg-white  border border-black rounded-sm"
          />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img border border-black rounded-sm bg-white"
            src={product.image}
            alt=""
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            Rs.{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            Rs.{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and wi a
          round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>

        <button
          onClick={() => {
            addToCart(product.id),
              alert("Product Added Into Cart..!"),
              navigate("/product"),
              window.location.reload();
          }}
        >
          ADD TO CART
        </button>

        <button
          className="add-wish"
          onClick={() => {
            addToWish(product.id),
              alert("Product Added Into Wishlist..!"),
              navigate("/product");
          }}
        >
          ADD TO <img className="wish" src={wishlist_red} alt="" />
        </button>

        <p className="productdisplay-right-category">
          <span>Category : {product.category}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
