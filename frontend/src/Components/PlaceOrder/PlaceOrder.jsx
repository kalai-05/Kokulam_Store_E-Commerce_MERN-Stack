import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, all_product, cartItems } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const orderPlaced = async (e) => {
    e.preventDefault();
    let orderItems = [];
    all_product.map((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item.id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(),
    };
    let res = await axios.post("https://kokulam-store-e-commerce-backend.onrender.com/addOrder", orderData, {
      headers: {
        "auth-token": `${localStorage.getItem("auth-token")}`,
      },
    });
    if (res.data.success) {
      navigate("/orderDone");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      alert("Your Cart Is Empty...!!");
      navigate("/cart");
    }
  }, [localStorage.getItem("auth-token")]);

  return (
    <form
      onSubmit={orderPlaced}
      className=" flex items-start justify-between gap-12 mt-24"
    >
      <div className=" w-full max-w-3xl ml-28 ">
        <p className=" text-2xl font-bold mb-12">Delivery Information</p>
        <div className=" flex gap-3">
          <input
            required
            value={data.firstName}
            name="firstName"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            value={data.lastName}
            name="lastName"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          value={data.email}
          name="email"
          onChange={onChangeHandle}
          className=" mb-4 w-full p-2 border border-black rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
          required
          value={data.street}
          name="street"
          onChange={onChangeHandle}
          className=" mb-4 w-full p-2 border border-black rounded"
          type="text"
          placeholder="Street"
        />
        <div className=" flex gap-3">
          <input
            required
            value={data.city}
            name="city"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="City"
          />
          <input
            required
            value={data.state}
            name="state"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="State"
          />
        </div>
        <div className=" flex gap-3">
          <input
            required
            value={data.zipcode}
            name="zipcode"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            value={data.country}
            name="country"
            onChange={onChangeHandle}
            className=" mb-4 w-full p-2 border border-black rounded"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          value={data.phone}
          name="phone"
          onChange={onChangeHandle}
          className=" mb-4 w-full p-2 border border-black rounded"
          type="text"
          placeholder="Phone Number"
        />
      </div>
      <div className=" w-full">
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
          <button type=" submit" className=" rounded">
            PLACE ORDER
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
