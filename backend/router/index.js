const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const productRoute = require("./product.route");
const orderRoute = require("./order.route");
const advertisementRoute = require("./advertisement.route");

router.use("/users", userRoute);
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/orders", orderRoute);
router.use("/advertisements", advertisementRoute);

module.exports = router;
