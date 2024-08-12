import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import login_img from "../Components/Assets/login.png";

const LoginSignup = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    emailError: "",
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData({
        ...formData,
        [name]: value,
        emailError: validateEmail(value) ? "" : "Invalid email format",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseDate;
    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseDate = data));

    if (responseDate.success) {
      localStorage.setItem(
        "auth-token",
        responseDate.token,
        alert("Login Successfully Done .... !")
      );
      window.location.replace("/");
    } else {
      alert(responseDate.errors);
    }
  };

  const signup = async () => {
    console.log("Sign Up Function Executed", formData);

    let responseDate;
    await fetch("https://kokulam-store-e-commerce-backend.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseDate = data));

    if (responseDate.success) {
      localStorage.setItem(
        "auth-token",
        responseDate.token,
        alert("Sign Up Successfully Done .... !")
      );
      window.location.replace("/");
    } else {
      alert("Existing User Found With Same Email.... !");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container shadow-lg">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
            />
          ) : null}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
          />
          {formData.emailError && (
            <span className="error">{formData.emailError}</span>
          )}
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          disabled={formData.emailError}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click Here
            </span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      <img className="login_img" src={login_img} alt="" />
    </div>
  );
};

export default LoginSignup;
