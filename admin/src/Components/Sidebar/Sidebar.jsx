import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_icon from "../../assets/Product_list_icon.svg";
import parcel_Icon from "../../assets/parcel.png";
import addOffer from "../../assets/offer.png";
import listOffer from "../../assets/listOffer.png";

const Sidebar = () => {
  return (
    <div className="sidebar border h-[100vh]">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" className=" left-1 h-9 w-16" />
          <p className=" capitalize">ADD PRODUCTS</p>
        </div>
      </Link>
      <Link to={"/listProduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_icon} alt="" className=" left-1 h-9 w-16" />
          <p className=" capitalize">PRODUCTS LIST</p>
        </div>
      </Link>
      <Link to={"/addoffers"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={listOffer} alt="" className=" left-1 h-9 w-16" />
          <p className=" capitalize">MANAGE OFFERS</p>
        </div>
      </Link>
      <Link to={"/order"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item ">
          <img
            src={parcel_Icon}
            alt=""
            className=" left-1 w-16 h-9 mr-[-7px]"
          />
          <p className=" capitalize">ORDERS MANAGE</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
