// ProductDetail.js (React.js)

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import upload_are from "../../assets/upload_area.svg";

const ProductDetail = () => {
  //const [product, setProduct] = useState(null);
  let navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "vegetables",
    new_price: "",
    old_price: "",
  });
  const { id } = useParams();

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const Update_Product = async () => {
    try {
      console.log(productDetails);

      const updateResponse = await axios.put(
        `http://localhost:4000/updateProduct/${id}`,
        productDetails
      );

      if (updateResponse.data.success) {
        alert(" updated .....!");
        navigate("/listproduct");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`
        );
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      {productDetails ? (
        <div className="add-product capitalize">
          <h1 className=" text-center text-black font-bold text-2xl  ">
            Update Product Details
          </h1>
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input
              value={productDetails.name}
              onChange={changeHandler}
              type="text"
              name="name"
              placeholder="Type Here"
            />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                value={productDetails.old_price}
                onChange={changeHandler}
                type="text"
                name="old_price"
                placeholder="Type Here"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                value={productDetails.new_price}
                onChange={changeHandler}
                type="text"
                name="new_price"
                placeholder="Type Here"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select
              value={productDetails.category}
              onChange={changeHandler}
              name="category"
              className="add-product-selector"
            >
              <option value="vegetables"> Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="beverages"> Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="bakery">Bakery</option>
              <option value="others">Others</option>
            </select>
          </div>

          <button
            onClick={() => {
              Update_Product();
            }}
            className="addproduct-btn  bg-black text-white text-xl font-bold py-2 px-6 rounded-md"
          >
            UPDATE
          </button>
          <Link to={"/listproduct"}>
            <button className="addproduct-btn ml-5  bg-black text-white text-xl font-bold py-2 px-6 rounded-md">
              CANCEL
            </button>
          </Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
