import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import edit from "../../assets/pen.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const ListProduct = () => {
  const [allproduct, setAllProduct] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setAllProduct(data);
      });
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    const title = "Kokulam Inventory Info";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    doc.autoTable({
      head: [["Title", "Old Price", "New Price", "Category"]],
      body: allproduct.map((product) => [
        product.name,
        product.old_price,
        product.new_price,
        product.category,
      ]),
    });
    doc.save("kokulam_product_details.pdf");
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <div className="list-product">
      <h1 className=" text-3xl font-bold">All Product List</h1>

      <button
        className=" bg-black text-white text-xl font-bold py-2 px-6 rounded-md "
        onClick={generatePDF}
      >
        Print product details
      </button>
      <div className="listproduct-format-main font-extrabold">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Action</p>
      </div>
      <div className="listproduct-allproduct ">
        <hr />
        {allproduct.map((product, index) => {
          return (
            <div key={index}>
              <div className="listproduct-format-main">
                <img
                  src={product.image}
                  alt=""
                  className="listproduct-product-icon"
                />
                <p>{product.name}</p>
                <p>Rs.{product.old_price}</p>
                <p>Rs.{product.new_price}</p>
                <p>{product.category}</p>
                <div className=" flex flex-col items-center gap-3">
                  <img
                    onClick={() => {
                      remove_product(product.id);
                    }}
                    className="w-7 cursor-pointer transition-all hover:scale-110 duration-400"
                    src={cross_icon}
                    alt=""
                  />
                  <Link to={`/editProduct/${product._id}`}>
                    <img
                      className=" w-7 cursor-pointer transition-all hover:scale-110 duration-200 "
                      src={edit}
                      alt=""
                    />
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
