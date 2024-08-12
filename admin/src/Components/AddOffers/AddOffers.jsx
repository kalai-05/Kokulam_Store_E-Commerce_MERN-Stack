import React, { useState, useEffect } from "react";
import "./Addoffers.css";
import cross_icon from "../../assets/cross_icon.png";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AddOffers = () => {
  const [allproduct, setAllProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedProductDetails, setSelectedProductDetails] = useState({});

  const [discount, setDiscount] = useState({
    name: "",
    image: "",
    old_price: "",
    dis_pec: "",
    dis_price: "",
  });

  const CalcDiscountedPrice = (percentage, old_price) => {
    const discount = parseFloat(percentage);
    const price = parseFloat(old_price);
    if (!isNaN(discount) && !isNaN(price)) {
      const discountedPrice = price - (price * discount) / 100;
      return discountedPrice.toFixed(2);
    }
    return "";
  };

  const handleUpdate = async (id) => {
    const newDiscount = prompt("Enter the new discount percentage:");
    if (newDiscount !== null) {
      const response = await fetch(`https://kokulam-store-e-commerce-backend.onrender.com/updateOffer/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dis_pec: newDiscount }),
      });

      const data = await response.json();
      if (data.success) {
        // Recalculate the discounted price based on the new discount percentage
        const discountedPrice = CalcDiscountedPrice(
          newDiscount,
          selectedProductDetails.old_price // Ensure you are using the old price here
        );

        // Update the discount state correctly
        setDiscount((prevDiscount) => ({
          ...prevDiscount,
          dis_pec: newDiscount,
          dis_price: discountedPrice,
        }));

        alert("Offer Updated");
        fetchOff();
      } else {
        alert("Failed to update offer");
      }
    }
  };

  const generatePromoPDF = () => {
    const doc = new jsPDF();
    const title = "Kokulam Promotions Summary";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    doc.autoTable({
      head: [["Product", "Old Price", "Discount Percentage", "Discount Price"]],
      body: allproduct.map((product) => [
        product.name,
        product.old_price,
        product.dis_pec,
        product.dis_price,
      ]),
    });
    doc.save("kokulam_promoinfo.pdf");
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    let updatedDiscount = { ...discount, [name]: value };
    if (name === "dis_pec") {
      // Ensure the discount percentage is within the range of 0 to 100
      let percentage = parseFloat(value);
      if (isNaN(percentage)) {
        percentage = 0;
      } else if (percentage < 0) {
        percentage = 0;
      } else if (percentage > 100) {
        percentage = 100;
      }

      updatedDiscount = { ...updatedDiscount, [name]: percentage };

      // If the discount percentage is changed, calculate the discounted price
      const discountedPrice = CalcDiscountedPrice(
        percentage,
        selectedProductDetails.new_price
      );
      updatedDiscount = { ...updatedDiscount, dis_price: discountedPrice };
    }
    setDiscount(updatedDiscount);
  };

  const fetchInfo = async () => {
    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/allproduct")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleSelectChange = (event) => {
    const selectedProductName = event.target.value;
    setSelectedProduct(selectedProductName);
    const product = products.find((p) => p.name === selectedProductName);
    setSelectedProductDetails(product);
  };

  const Add_Offer = async () => {
    if (!selectedProductDetails.name || !discount.dis_pec) {
      alert("Please select a product and enter a discount percentage.");
      return;
    }

    let dis = discount;

    // Check if the selected product already has an ongoing promotion
    const isProductInOffer = allproduct.some(
      (product) => product.name === selectedProductDetails.name
    );
    if (isProductInOffer) {
      alert("Product already has an ongoing promotion");
      return;
    }

    console.log(dis);

    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/addOffer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: selectedProductDetails.name,
        image: selectedProductDetails.image,
        old_price: selectedProductDetails.new_price,
        dis_pec: dis.dis_pec,
        dis_price: dis.dis_price,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Offer Added ");
          window.location.reload();
          // Fetch all offers again to update the list with the newly added offer
          fetchOff();
        } else {
          alert("Failed to add offer");
        }
      });
  };

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

  const remove_product = async (id) => {
    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/removeOffer", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchOff();
  };

  return (
    <div className=" w-[75%] items-center ml-10 bg-white my-10 p-10 rounded-lg">
      <div>
        <h1 className=" text-center text-4xl">Manage Offers</h1>
        <select
          className=" mb-2 mt-10 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
          onChange={handleSelectChange}
          value={selectedProduct}
          name="name"
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product._id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>

        {selectedProductDetails && (
          <div>
            <input
              hidden
              type="text"
              className=" mb-2 mt-10 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
              value={selectedProductDetails.name}
              name="name"
              onChange={changeHandler}
              placeholder="product not selected...."
            />
            <input
              disabled
              type="text"
              className=" mb-2 mt-10 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
              value={selectedProductDetails.new_price}
              placeholder="Initial Price"
              onChange={changeHandler}
              name="old_price"
            />

            <div className=" flex flex-row gap-10 ">
              <input
                type="text"
                className=" mb-2 mt-10 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                onChange={changeHandler}
                name="dis_pec"
                placeholder="Select discount percentage"
              />

              <input
                onChange={changeHandler}
                name="dis_price"
                type="text"
                className=" mb-2 mt-10 w-full rounded-md border border-gray-400  py-2 pl-2 pr-4 sm:mb-0"
                value={discount.dis_price}
                placeholder="Discounted price"
                disabled
              />
            </div>
            <button
              onClick={() => {
                Add_Offer();
              }}
              className="addproduct-btn  bg-black text-white text-xl font-bold py-2 px-6 rounded-md "
            >
              ADD
            </button>
            <button
              className="addproduct-btn bg-black text-white text-xl font-bold py-2 px-6 rounded-md  ml-6"
              onClick={generatePromoPDF}
            >
              PRINT
            </button>
          </div>
        )}
      </div>

      <div className=" mt-11">
        <h1 className=" text-3xl font-bold text-center">All Offers List</h1>
        <div className="listproduct-format-main font-extrabold grid-cols-[3fr_1fr_1fr_1fr_1fr]">
          <p>Product</p>
          <p>Old Price </p>
          <p>Discount Percentage </p>
          <p>Discount Price </p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproduct  items-center">
          <hr />
          {allproduct.map((product, index) => {
            return (
              <div key={index}>
                <div className="listproduct-format-main items-center grid-cols-[3fr_1fr_1fr_1fr_1fr]">
                  <p>{product.name}</p>
                  <p>Rs. {product.old_price}</p>
                  <p>{product.dis_pec} %</p>
                  <p>Rs.{product.dis_price}</p>
                  <img
                    onClick={() => {
                      remove_product(product.id);
                    }}
                    className="listproduct-remove-icon w-9"
                    src={cross_icon}
                    alt=""
                  />
                  <p>
                    <button
                      onClick={() => handleUpdate(product.id)}
                      className="addproduct-btn bg-black text-white text-xl font-bold py-2 px-6 rounded-md  ml-6"
                    >
                      UPDATE
                    </button>
                  </p>
                </div>
                <hr key={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddOffers;
