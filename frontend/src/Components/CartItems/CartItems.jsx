import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CartItems = (props) => {
  const { product } = props;
  const {
    getTotalCartAmount,
    all_product,
    cartItems,
    removeFromCart,
    addToCart,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const createPdf = () => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please log in to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    const title = "Your Cart Details";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    const data = [];
    all_product.forEach((item) => {
      let Quantity = cartItems[item.id];
      if (Quantity > 0) {
        let total = item.new_price * Quantity;
        data.push([item.name, Quantity, item.new_price, total]);
      }
    });

    doc.autoTable({
      head: [["Title", "Quantity", "Unit Price", "Total Price"]],
      body: data,
    });

    doc.save("cart_details.pdf");
  };

  return (
    <div className="main-cart">
      <div className=" flex items-center justify-between mx-[150px]">
        <center>Your Cart List</center>
        <button
          className=" bg-black text-white text-xl font-bold py-2 px-6 rounded-md  left-0"
          onClick={createPdf}
        >
          Print Cart details
        </button>
      </div>

      <div className="cartitems">
        <div className="cartitems-fomate-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-formate cartitems-fomate-main">
                  <img src={e.image} alt="" className="carticon-product-icon" />
                  <p>{e.name}</p>
                  <p>Rs.{e.new_price}</p>
                  <div className=" flex items-center gap-2">
                    <button
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      className="cartitems-quantity"
                    >
                      -
                    </button>
                    {cartItems[e.id]}
                    <button
                      onClick={() => {
                        addToCart(e.id);
                      }}
                      className="cartitems-quantity"
                    >
                      +
                    </button>
                  </div>

                  <p>Rs.{e.new_price * cartItems[e.id]}</p>
                  <img
                    className="cartitems-remove-icon w-[15px] cursor-pointer mx-10 my-0"
                    src={remove_icon}
                    onClick={() => {
                      removeFromCart(e.id);
                    }}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total </h3>
                <h3>Rs.{getTotalCartAmount()}</h3>
              </div>
            </div>
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="catritems-promobox">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
