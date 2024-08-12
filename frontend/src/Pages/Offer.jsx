import React, { useState, useEffect } from "react";
import "./CSS/Product.css";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DiscriptionBox from "../Components/DiscriptionBox/DiscriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Offer = () => {
  const [all_product, setAllProduct] = useState([]);

  const fetchOff = async () => {
    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/allOffer")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };

  useEffect(() => {
    fetchOff();
  }, []);
  const { productId } = useParams();

  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div className="product">
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Offer;
