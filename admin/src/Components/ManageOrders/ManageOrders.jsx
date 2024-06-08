import React, { useState, useEffect } from "react";
import axios from "axios";
import parcel_icon from "../../assets/parcel.png";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getOrders");
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      console.log("Updating status...");
      console.log("Order ID:", orderId);
      const response = await axios.put("http://localhost:4000/updateStatus", {
        orderID: orderId,
        status: newStatus,
      });
      console.log("Update response:", response.data);
      if (response.data.success) {
        console.log("Orders updated successfully");
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      console.log("Deleting order...");
      const response = await axios.delete(
        `http://localhost:4000/deleteOrder/${orderId}`
      );
      console.log("Delete response:", response.data);
      if (response.data.success) {
        console.log("Order deleted successfully");
        // Update the orders list after deletion
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div>
      <div className=" ml-7 mt-5 mx-auto max-w-5xl px-4 sm:px-6 lg:px-3 py-5 bg-white rounded-3xl shadow-lg">
        <div className=" mb-4">
          <div className=" mb-6 max-w-3xl sm:text-center md:mx-auto"></div>

          <h2 className=" text-3xl text-center font-bold text-black">
            Order Details
          </h2>
          <div className=" flex flex-col gap-5 mt-8 ">
            {orders.map((order, index) => {
              return (
                <div
                  key={index}
                  className=" grid   grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start  text-lg p-5 mx-5 my-4  text-[#454545] border border-black/20 "
                >
                  <div>
                    <img src={parcel_icon} alt="" className=" h-auto w-14" />
                  </div>

                  <div className=" flex flex-col">
                    <p className=" font-bold">
                      {order.items.map((e, i) => {
                        if (i === order.items.length - 1) {
                          return e.name + " X " + e.quantity;
                        } else {
                          return e.name + " X " + e.quantity + " , ";
                        }
                      })}
                    </p>
                    <p className=" mt-5">
                      {order.address.firstName + "  " + order.address.lastName}
                    </p>

                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        ", " +
                        order.address.zipcode}
                    </p>
                    <p className=" mt-9">{order.address.phone}</p>
                  </div>
                  <p>Items :{order.items.length}</p>
                  <p>Rs.{order.amount}.00</p>
                  <div>
                    <select
                      onChange={(event) =>
                        updateStatus(order._id, event.target.value)
                      }
                      value={order.status}
                      name="status"
                      className="bg-[#ffe8e4] text-black border p-2 rounded-md font-bold"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className=" bg-black/75 mt-28 text-white text-lg font-bold py-2 px-3 w-full rounded-md"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
