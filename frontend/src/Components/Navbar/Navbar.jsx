import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import list_icon from "../Assets/list.svg";
import wishlist from "../Assets/wishlist.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menu, setMenu] = useState("home");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const { getTotalCartItem, getTotalWishItem } = useContext(ShopContext);

  const menuRef = useRef();

  const list_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  // State to store user details
  const [user, setUser] = useState(null);
  // State to track loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch user detail

    fetchUserDetails(); // Call the fetchUserDetails function when the component mounts
  }, []);
  const fetchUserDetails = async () => {
    try {
      // Make a GET request to the /me endpoint of your backend
      const response = await axios.get("https://kokulam-store-e-commerce-backend.onrender.com/me", {
        headers: {
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
      });

      // Update the user state with the fetched user details
      setUser(response.data.user);
      setLoading(false); // Set loading to false
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false); // Set loading to false even if an error occurs
    }
  };

  return (
    <div className="navbar flex justify-around shadow-[0_1px_3px_-2px_black] p-4">
      <div className="nav-logo flex items-center gap-2.5">
        <p className=" text-neutral-900 text-[38px] font-semibold font-Aclonica">
          Kokulam
        </p>
      </div>
      <img
        className="nav-toggle"
        onClick={list_toggle}
        src={list_icon}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("home");
          }}
        >
          <Link to="/">Home</Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("product");
          }}
        >
          <Link className="drop-down-cat flex" to="/product">
            Product
          </Link>
          {menu === "product" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("offers");
          }}
        >
          <Link to="/offers">Offers</Link>
          {menu === "offers" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("contact");
          }}
        >
          <Link to="/contact">Contact</Link>
          {menu === "contact" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("about");
          }}
        >
          <Link to="/about">About Us</Link>
          {menu === "about" ? <hr /> : <></>}
        </li>
      </ul>
      <div
        onClick={() => {
          setMenu("login");
        }}
        className="nav-login-cart"
      >
        {localStorage.getItem("auth-token") ? (
          <div className="user-icon">
            <div>
              {user ? (
                // If user details are available, display them
                <div className="relative inline-block text-left">
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full capitalize rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {user.name}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 13.707a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isOpen && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div className="py-1" role="none">
                        <Link to={"/myprofile"}>
                          <button
                            onClick={toggleDropdown}
                            className="block px-4 py-2 w-full text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            MY PROFILE
                          </button>
                        </Link>
                        <button
                          onClick={() => {
                            localStorage.removeItem("auth-token");
                            window.location.replace("/");
                          }}
                          className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          LOG OUT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // If user details are not available, display an error message
                <div>
                  <Link to="/login">
                    <button className="login-btn">LOGIN</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login">
            <button className="login-btn">LOGIN</button>
          </Link>
        )}
        {localStorage.getItem("auth-token") ? (
          <Link to="/cart">
            <img className="nav_icon" src={cart_icon} alt="" />
          </Link>
        ) : (
          <Link to="/login">
            <img className="nav_icon" src={cart_icon} alt="" />
          </Link>
        )}
        <Link to="/cart">
          <div className="nav-cart-count">{getTotalCartItem()}</div>{" "}
        </Link>

        {localStorage.getItem("auth-token") ? (
          <Link to="/wish">
            <img className="nav_icon" src={wishlist} alt="" />
          </Link>
        ) : (
          <Link to="/login">
            <img className="nav_icon" src={wishlist} alt="" />
          </Link>
        )}
        <Link to="/wish">
          <div className="nav-cart-count">{getTotalWishItem()}</div>{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
