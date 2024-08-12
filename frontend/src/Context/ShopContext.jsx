import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultcart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const getDefaultwish = () => {
  let wish = {};
  for (let index = 1; index < 300 + 1; index++) {
    wish[index] = 0;
  }
  return wish;
};

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultcart());
  const [wishItems, setWishItems] = useState(getDefaultwish());

  useEffect(() => {
    fetch("https://kokulam-store-e-commerce-backend.onrender.com/allproduct")
      .then((res) => res.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/getwish", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => setWishItems(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  const addToWish = (itemId) => {
    setWishItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/addtowish", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromWish = (itemId) => {
    setWishItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("https://kokulam-store-e-commerce-backend.onrender.com/removefromwish", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    //console.log(totalItem);
    return totalItem;
  };
  const getTotalWishItem = () => {
    let totalWishItem = 0;
    for (const item in wishItems) {
      if (wishItems[item] > 0) {
        totalWishItem += wishItems[item];
      }
    }
    // console.log(totalWishItem);
    return totalWishItem;
  };

  const contextValue = {
    all_product,
    addToCart,
    addToWish,
    cartItems,
    wishItems,
    removeFromCart,
    getTotalCartItem,
    addToWish,
    getTotalWishItem,
    removeFromWish,
    getTotalCartAmount,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
