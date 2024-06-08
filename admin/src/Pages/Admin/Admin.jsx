import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import AddOffers from "../../Components/AddOffers/AddOffers";
import ManageOrders from "../../Components/ManageOrders/ManageOrders";
import EditProduct from "../../Components/ListProduct/EditProduct";

const Admin = () => {
  return (
    <div className="admin">
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/listproduct" element={<ListProduct />} />
          <Route path="/addoffers" element={<AddOffers />} />
          <Route path="/order" element={<ManageOrders />} />
          <Route path="/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Admin;
