import React from "react";
import "./Navbar.css";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <p>Kokulam</p>
      <img className="nav-profile" src={navProfile} alt="" />
    </div>
  );
};

export default Navbar;
