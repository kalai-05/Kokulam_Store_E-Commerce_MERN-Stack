import React, { useContext, useRef, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import veg from "../Assets/vegetables.png";
import fruits from "../Assets/fruits.png";
import dairy from "../Assets/dairy-products.png";
import snacks from "../Assets/snack.png";
import Beverages from "../Assets/soft-drink.png";
import Bakery from "../Assets/bakery-shop.png";
import other from "../Assets/other.png";

const Sidebar = () => {
  return (
    <div className="sidebar h-[100vh] border-r-2">
      <h1>Choose Category</h1>
      <Link to={"/vegetable"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={veg} alt="" />
          <p>Vegetables</p>
        </div>
      </Link>
      <Link to={"/fruit"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={fruits} alt="" />
          <p>Fruits</p>
        </div>
      </Link>
      <Link to={"/dairys"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={dairy} alt="" />
          <p>Dairy</p>
        </div>
      </Link>
      <Link to={"/beverage"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={Beverages} alt="" />
          <p>Beverages</p>
        </div>
      </Link>{" "}
      <Link to={"/snack"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={snacks} alt="" />
          <p>Snacks</p>
        </div>
      </Link>
      <Link to={"/bakerys"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={Bakery} alt="" />
          <p>Bakery Item</p>
        </div>
      </Link>
      <Link to={"/other"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={other} alt="" />
          <p>Other Items</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
