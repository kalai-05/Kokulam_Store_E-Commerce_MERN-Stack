import React from "react";
import myGif from "../Components/Assets/order.png";
import { useNavigate } from "react-router-dom";

const OrderDone = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-[70vh]">
      <center className=" bg-white mx-60 shadow-md mt-28 rounded-xl py-7">
        <img
          src={myGif}
          alt="My GIF"
          className="  text-center w-auto h-[400px]"
        />
        <p className=" font-bold text-center text-xl">
          Order Placed Successfully
        </p>
        <button
          onClick={() => {
            navigate("/product"), window.location.reload();
          }}
          className=" bg-black/65 text-white text-xl font-bold py-1 px-6 mt-9 rounded-md "
        >
          Continue To Shopping
        </button>
      </center>
    </div>
  );
};

export default OrderDone;
