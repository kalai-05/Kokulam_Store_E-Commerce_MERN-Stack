import React from "react";
import "./Footer.css";
import instagram_icon from "../Assets/instagram_icon.png";
import face_icon from "../Assets/facebook.svg";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import {
  AiFillAccountBook,
  AiFillFacebook,
  AiFillGoogleSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <p>Kokulam</p>
      </div>
      <ul className="footer-links">
        <li>Home</li>
        <li>Products</li>
        <li>Offers</li>
        <li>About us</li>
        <li>Contact us</li>
      </ul>
      <div className="footer-social-icon">
        <div className="footer-icons">
          <AiFillInstagram className=" items-center h-auto w-[40px]" />
        </div>
        <div className="footer-icons">
          <AiFillFacebook className=" items-center h-auto w-[40px]" />
        </div>
        <div className="footer-icons">
          <AiFillGoogleSquare className=" items-center h-auto w-[40px]" />
        </div>
      </div>
      <div className="footer-copy">
        <hr />
        <p>Copyright @2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
