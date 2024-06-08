import React from "react";
import "./DiscriptionBox.css";

const DiscriptionBox = () => {
  return (
    <div className="discriptionbox">
      <div className="discriptionbox-navigation">
        <div className="discriptionbox-nav-box">Description</div>
        <div className="discriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="discriptionbox-dis">
        <p>
          An e-commerce website is an online platform that facilitat buying and
          selling of products or services over the internei serves as a virtual
          marketplace where businesses and indivio showcase their products,
          interact with customers, and conduc transactions without the need for
          a physical presence. E-com websites have gained immense popularity due
          to their conveni accessibility, and the global reach they offer
        </p>
        <p>
          E-commerce websites typically display products or services a detailed
          descriptions, images, prices, and any available var (e.g., sizes,
          colors). Each product usually has its own dedi with relevant
          information.
        </p>
      </div>
    </div>
  );
};

export default DiscriptionBox;
