import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import parcelIcon from "../Assets/parcel.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AiOutlineInfoCircle } from "react-icons/ai";
import upload_are from "../Assets/upload_area.svg";

const UserProfile = () => {
  // State to store user details
  const [user, setUser] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  const { id } = useParams;

  const createPdf = () => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please log in to generate PDF.");
      return;
    }

    if (!user) {
      alert("User details are not available.");
      return;
    }

    const doc = new jsPDF();
    const title = "My Info";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    const data = [];
    data.push(["Name", user.name]);
    data.push(["Email", user.email]);
    data.push(["Phone Number", user.phoneNumber]);
    const imgData = user.image;
    const imgWidth = 50; // Adjust as needed
    const imgHeight = 50; // Adjust as needed
    const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
    const imgY = 20; // Adjust as needed
    doc.addImage(imgData, "JPEG", imgX, imgY, imgWidth, imgHeight);

    doc.autoTable({
      head: [["Attribute", "Details"]],
      body: data,
      startY: imgY + imgHeight + 10,
    });

    doc.save("My_Info.pdf");
  };

  const fetchUserDetails = async () => {
    try {
      // Make a GET request to the /me endpoint of your backend
      const response = await axios.get("http://localhost:4000/me", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      });

      // Update the user state with the fetched user details
      setUser(response.data.user);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  //order visible

  useEffect(() => {
    // Function to fetch user detail
    fetchUserDetails(); // Call the fetchUserDetails function when the component mounts
    if (localStorage.getItem("auth-token")) {
      fetchOrders();
    }
  }, [localStorage.getItem("auth-token")]);

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getUserOrder", {
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });
      setOrders(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  //order pdf genar
  const orderPdf = () => {
    if (!localStorage.getItem("auth-token")) {
      alert("Please log in to generate PDF.");
      return;
    }

    const doc = new jsPDF();
    const title = "My Orders";
    const titleX = doc.internal.pageSize.getWidth() / 2;
    doc.text(title, titleX, 10, { align: "center" });

    const data = orders.map((order) => {
      return [
        order.items.map((item) => `${item.name} X ${item.quantity}`).join(", "),
        `Rs.${order.amount}.00`,
        `Items: ${order.items.length}`,
        order.status,
      ];
    });

    doc.autoTable({
      head: [["Items", "Amount", "Items Count", "Status"]],
      body: data,
    });

    doc.save("My_Orders.pdf");
  };

  // delete user
  // const history = useHistory();
  const handleDeactivate = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/deleteUser`, {
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      if (response.data.success) {
        logoutUser();
      } else {
        console.error("Failed to delete user:", response.data.error);
        alert("Failed to delete account. Please try again later.");
      }
    } catch (error) {
      console.error("Error during deactivation:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const logoutUser = () => {
    alert("Your Account Deactivated....!!!!");
    localStorage.removeItem("auth-token");
    window.location.href = "/";
  };

  return (
    <div className=" pt-10 pb-10 sm:pt-10 sm:pb-16 lg:pb-16 ">
      <div className=" mx-auto max-w-5xl px-4 sm:px-6 lg:px-3 py-5 bg-white rounded-3xl shadow-lg">
        <div className=" mb-4">
          <div className=" mb-6 max-w-3xl sm:text-center md:mx-auto">
            {localStorage.getItem("auth-token") ? (
              <div>
                {user ? (
                  // If user details are available, display them
                  <div>
                    <div className=" flex items-center justify-between mb-5">
                      <h2 className=" mb-4 font-bold capitalize tracking-tight text-black text-2xl sm:text-3xl">
                        Welcome , {user.name}
                      </h2>
                      <button
                        className=" bg-black/65 text-white text-xl font-bold py-1 px-6 rounded-md  left-0"
                        onClick={createPdf}
                      >
                        My Info
                      </button>
                    </div>

                    <div className=" flex justify-between items-center">
                      <div>
                        <p className=" text-left capitalize font-medium text-lg">
                          Name: {user.name}
                        </p>
                        <p className=" text-left  font-medium text-lg">
                          Email: {user.email}
                        </p>
                        <p className=" text-left capitalize font-medium text-lg">
                          Phone Number: {user.phoneNumber}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="file-input">
                          {user.image == null ? (
                            <img
                              src={upload_are}
                              className=" w-auto h-40 mb-4 shadow-md"
                              alt=""
                            />
                          ) : (
                            <img
                              src={user.image}
                              className=" w-auto h-40 mb-4 shadow-md"
                              alt=""
                            />
                          )}
                        </label>

                        <Link to={`/editProfile/${user.id}`}>
                          <button className=" bg-black/65 font-bold text-lg rounded-md text-white px-3 py-1">
                            Edit Profile
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className=" items-center flex  gap-2">
                      <AiOutlineInfoCircle className=" h-auto w-7 text-red-600" />
                      <button
                        className="text-red-600"
                        onClick={() => {
                          handleDeactivate();
                        }}
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                ) : (
                  // If user details are not available, display an error message
                  <div>Error fetching user </div>
                )}
              </div>
            ) : (
              <div>Error fetching user</div>
            )}
          </div>
        </div>
      </div>

      {/*  My OrderS UI */}
      <div>
        <div className=" mt-5 mx-auto max-w-5xl px-4 sm:px-6 lg:px-3 py-5 bg-white rounded-3xl shadow-lg">
          <div className=" mb-4">
            <div className=" mb-6 max-w-3xl sm:text-center md:mx-auto justify-between flex">
              {" "}
              <h2 className=" text-3xl  font-bold text-black">My Orders</h2>
              <button
                className=" bg-black/65 text-white text-xl font-bold py-1 px-6 rounded-md  left-0"
                onClick={orderPdf}
              >
                Print My Order Details
              </button>
            </div>

            <div className=" flex flex-col gap-5 mt-8 ">
              {orders.map((order, index) => {
                return (
                  <div
                    key={index}
                    className=" grid grid-cols-6 items-center  text-lg px-3 py-5 text-[#454545] border border-black/20 "
                  >
                    <img src={parcelIcon} alt="" className=" h-auto w-14" />
                    <p>
                      {order.items.map((e, i) => {
                        if (i === order.items.length - 1) {
                          return e.name + " X " + e.quantity;
                        } else {
                          return e.name + " X " + e.quantity + " , ";
                        }
                      })}
                    </p>
                    <p>Rs.{order.amount}.00</p>
                    <p>Items :{order.items.length}</p>
                    <p>
                      <span className=" text-rose-600 p-1">&#x25cf;</span>
                      <b className=" text-[#454545] font-semibold">
                        {order.status}
                      </b>
                    </p>
                    <button
                      onClick={fetchOrders}
                      className=" text-white bg-black/65 font-semibold text-lg rounded-md"
                    >
                      Track Order
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
