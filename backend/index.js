const port = process.env.PORT || 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { sendWelcomeEmail } = require("./mail");

app.use(express.json());
app.use(cors());

//database connection with mongodb

mongoose.connect(
  "mongodb+srv://kandypan7:kandy01K@cluster0.rcx5nls.mongodb.net/KOKULAM-NEW"
);

//API creation

app.get("/", (req, res) => {
  res.send("Express App Is Running");
});

//Image storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//crating upload en point
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
//Schema for creating product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//remove the product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});
// PUT route for updating product details
// PUT route for updating product details
app.put("/updateProduct/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, image, category, new_price, old_price } = req.body;

    // Update product details in the database
    await Product.findByIdAndUpdate(productId, {
      name,
      image,
      category,
      new_price,
      old_price,
    });

    res.json({
      success: true,
      message: "Product details updated successfully",
    });
  } catch (error) {
    console.error("Error updating product details:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

app.get("/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//get the all product
app.get("/allproduct", async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
});

//offers details
const Offers = mongoose.model("Offers", {
  id: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  dis_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  dis_pec: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});
app.post("/addOffer", async (req, res) => {
  let Offer = await Offers.find({});
  let id;
  if (Offer.length > 0) {
    let last_product_array = Offer.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const Offe = new Offers({
    id: id,
    name: req.body.name,
    image: req.body.image,
    old_price: req.body.old_price,
    dis_price: req.body.dis_price,
    dis_pec: req.body.dis_pec,
  });
  console.log(Offe);
  await Offe.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//remove the product
app.post("/removeOffer", async (req, res) => {
  await Offers.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//get the all product
app.get("/allOffer", async (req, res) => {
  let Offer = await Offers.find({});
  console.log("All Offers Fetched");
  res.send(Offer);
});

//update offer
app.put("/updateOffer/:id", async (req, res) => {
  try {
    const offerId = req.params.id;
    const { dis_pec } = req.body;

    await Offers.findOneAndUpdate({ id: offerId }, { dis_pec });

    res.json({ success: true, message: "Offer updated successfully" });
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

//user image

const userIMg = multer.diskStorage({
  destination: "./upload/userImages",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const userUpload = multer({ storage: userIMg });

//crating user image upload en point
app.use("/userImages", express.static("upload/userImages"));
app.post("/userImg", userUpload.single("user"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/userImages/${req.file.filename}`,
  });
});

//shema creating for user model

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: false, // Unique index on phoneNumber
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  cartData: {
    type: Object,
    default: {},
  },
  wishData: {
    type: Object,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

//creating End point the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      message: "Existing User Found With Same Email.",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  let wish = {};
  for (let i = 0; i < 300; i++) {
    wish[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    wishData: wish,
    image: req.body.image,
  });
  await user.save();
  sendWelcomeEmail(user.email, user.name);

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});
//user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else res.json({ success: false, errors: "Wrong PassWord" });
  } else {
    res.json({ success: false, errors: "Wrong Email" });
  }
});
//creating end point for new collection
app.get("/newcollection", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New colloction fetchd");
  res.send(newcollection);
});
// creating popular category
app.get("/popular", async (req, res) => {
  let products = await Product.find({ category: "dairy" });
  let popular = products.slice(0, 4);
  console.log("popular fetchd");
  res.send(popular);
});
//middleware to fetch
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please Authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.send({ errors: "Please Authenticate using  a valid token" });
    }
  }
};
//end point of cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  let cartData = await userData.cartData;

  if (!cartData[req.body.id]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] += 1;
  }
  await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData });
  res.send("Added");
});
//end point for wish
app.post("/addtowish", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  userData.wishData[req.body.itemId] = 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { wishData: userData.wishData }
  );
  res.send("Added");
});
//end point remove product from cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
///remove from wish end point
app.post("/removefromwish", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  if (userData.wishData[req.body.itemId] > 0)
    userData.wishData[req.body.itemId] -= 1;
  await Users.findByIdAndUpdate(
    { _id: req.user.id },
    { wishData: userData.wishData }
  );
  res.send("Removed");
});
//end point get cat product
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});
// end point of wish
app.post("/getwish", fetchUser, async (req, res) => {
  console.log("Get Wish");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.wishData);
});

// Endpoint to get details of the current logged-in user
app.get("/me", fetchUser, async (req, res) => {
  try {
    // Fetch user details using the user ID from the token payload
    const user = await Users.findById(req.user.id);

    // Send the user details in the response
    res.json({
      success: true,
      user: {
        //id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        phoneNumber: user.phoneNumber,
        // Include any other user details you want to send
      },
    });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching user details:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});
//  endpoint for deactivating user account and logging out
app.delete("/deleteUser", fetchUser, async (req, res) => {
  try {
    // Fetch the logged-in user's ID from the token payload
    const userId = req.user.id;

    // Delete the user from the database
    await Users.findByIdAndDelete(userId);

    res.json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

// Backend endpoint for updating user details
app.put("/updateUser/:id", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phoneNumber, email, image } = req.body;

    // Update user details in the database
    await Users.findByIdAndUpdate(userId, {
      name,
      phoneNumber,
      email,
      image,
    });

    res.json({ success: true, message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

//Under Order ManageMent

//order Schema
const Order = mongoose.model("OrderDetails", {
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Processing" },
  payment: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
});

//end point of cart
app.post("/addOrder", fetchUser, async (req, res) => {
  try {
    const orderPro = new Order({
      userId: req.user.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await orderPro.save();

    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData: {} });
    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
    });
  }
});

// end point for user order
app.get("/getUserOrder", fetchUser, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
    console.log(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

//listing orders for admin side
app.get("/getOrders", async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
    console.log(orders);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

//update order status
app.put("/updateStatus", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderID, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
});

// DELETE route for deleting an order by ID
app.delete("/deleteOrder/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Sever Running On Port " + port);
  } else {
    console("Error :" + error);
  }
});
