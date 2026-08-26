const user = require("./user.controller");
const category = require("./category.controller");
const product = require("./product.controller");
const order = require("./order.controller");
const advertisement = require("./advertisement.controller");
const contact = require("./contact.controller");
const coupon = require("./coupon.controller");
const payment = require("./payment.controller");

module.exports = {
  user,
  category,
  product,
  order,
  advertisement,
  contact,
  coupon,
  payment,
};
