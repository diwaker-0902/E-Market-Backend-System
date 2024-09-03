// const express = require("express");
// const router = express.Router();
// const isloggedin = require("../middlewares/isLoggedIn");
// const productModel = require("../models/product-model");
// // const isloggedin = require("../models/product-model");
// const userModel = require("../models/user-model");

// router.get("/", function (req, res) {
//     let error = req.flash("error");
//     res.render("index", { error, loggedin: false });
// });

// router.get("/shop", isloggedin, async function (req, res) {
//     let products = await productModel.find();
//     let success = req.flash("success");
//     res.render("shop", { products, success });
// });


// router.get("/cart", isloggedin, async function (req, res) {
//     let user = await userModel.findOne({ email: req.user.email }).populate("cart");
//     //   let success = req.flash("success");
//     // console.log(user.cart);
//     const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
//   res.render("cart", { user, bill });
// });



// router.get("/addtocart/:productid", isloggedin, async function (req, res) {
//     console.log(req.user);
//     let user = await userModel.findOne({ email: req.user.email });
//     user.cart.push(req.params.id);
//     await user.save();
//     req.flash("success", "added to cart");
//     res.redirect("/shop");
// });


// router.get("/logout", isloggedin, function (req, res) {
//     res.render("shop");
// });



// module.exports = router;







const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isloggedin, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isloggedin, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  // Check if the user has a cart and if the cart has items
  if (user && user.cart && user.cart.length > 0) {
    // Calculate the bill if the cart is not empty
    const bill =
      Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);
    res.render("cart", { user, bill });
  } else {
    // Handle empty cart: set bill to 0 or display a message
    const bill = 0; // You can customize this part as needed
    res.render("cart", { user, bill, message: "Your cart is empty" });
  }
});

router.get("/addtocart/:productid", isloggedin, async function (req, res) {
  console.log(req.user);
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid); // Changed req.params.id to req.params.productid
  await user.save();
  req.flash("success", "added to cart");
  res.redirect("/shop");
});

router.get("/logout", isloggedin, function (req, res) {
  res.render("shop");
});

module.exports = router;
