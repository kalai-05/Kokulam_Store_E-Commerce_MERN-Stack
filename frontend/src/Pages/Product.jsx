import React, { useContext } from "react";
import "./CSS/Product.css";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DiscriptionBox from "../Components/DiscriptionBox/DiscriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));
  return (
    <div className="product">
      <Breadcrums product={product} />
      <ProductDisplay product={product} />
      <DiscriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
