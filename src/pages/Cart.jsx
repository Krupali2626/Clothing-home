import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaArrowRight,
  FaChevronRight,
  FaTag,
  FaTruck,
  FaLock,
  FaUndo,
} from "react-icons/fa";
import { trendingProducts } from "../data/products";
import ProductCard from "../components/common/ProductCard";
import "./Cart.css";

// Sample cart seeded with products from data
const INITIAL_CART = trendingProducts.slice(0, 3).map((p) => ({
  ...p,
  qty: 1,
  selectedSize: p.sizes ? p.sizes[2] : null,
  selectedColor: p.colors ? p.colors[0] : null,
}));

const Cart = () => {
  const [cart, setCart] = useState(INITIAL_CART);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const updateQty = (id, delta) => {
    setCart((c) =>
      c.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id) => setCart((c) => c.filter((item) => item.id !== id));

  const subtotal = cart.reduce((sum, item) => sum + item.salePrice * item.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 1999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const handleCoupon = () => {
    if (coupon.toUpperCase() === "DSTORE10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try DSTORE10.");
    }
  };

  const suggested = trendingProducts.filter((p) => !cart.find((c) => c.id === p.id)).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div className="d_cart_empty container d_section">
        <FaShoppingCart className="d_cart_empty_icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/clothing" className="d_btn_primary">
          Start Shopping <FaArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="d_cart_page">
      {/* Breadcrumb */}
      <div className="d_cart_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>Shopping Cart</li>
        </ol>
        <h1 className="d_cart_heading">Shopping Cart <span>({cart.length} items)</span></h1>
      </div>

      <div className="container d_section pt-3">
        <Row className="g-4">
          {/* Cart Items */}
          <Col lg={8}>
            <div className="d_cart_items">
              {/* Header */}
              <div className="d_cart_header d-none d-md-grid">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span></span>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="d_cart_item">
                  <div className="d_cart_item_product">
                    <Link to={`/product/${item.id}`} className="d_cart_item_img">
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <div className="d_cart_item_details">
                      <span className="d_cart_item_brand">{item.brand}</span>
                      <Link to={`/product/${item.id}`} className="d_cart_item_name">
                        {item.name}
                      </Link>
                      {item.selectedSize && (
                        <span className="d_cart_item_variant">Size: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span className="d_cart_item_variant">Color: {item.selectedColor}</span>
                      )}
                    </div>
                  </div>

                  <div className="d_cart_item_price">
                    <span className="d_cart_label">Price</span>
                    ₹{item.salePrice.toLocaleString("en-IN")}
                  </div>

                  <div className="d_cart_item_qty">
                    <span className="d_cart_label">Qty</span>
                    <div className="d_qty_control">
                      <button onClick={() => updateQty(item.id, -1)} aria-label="Decrease">
                        <FaMinus />
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} aria-label="Increase">
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="d_cart_item_total">
                    <span className="d_cart_label">Total</span>
                    <strong>₹{(item.salePrice * item.qty).toLocaleString("en-IN")}</strong>
                  </div>

                  <button
                    className="d_cart_remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="d_coupon_wrap">
              <FaTag />
              <input
                type="text"
                placeholder="Enter coupon code (try DSTORE10)"
                value={coupon}
                onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
              />
              <button onClick={handleCoupon} className="d_btn_primary">Apply</button>
            </div>
            {couponApplied && (
              <p className="d_coupon_success">Coupon applied — 10% off!</p>
            )}
            {couponError && <p className="d_coupon_error">{couponError}</p>}
          </Col>

          {/* Summary */}
          <Col lg={4}>
            <div className="d_cart_summary">
              <h4>Order Summary</h4>

              <div className="d_summary_row">
                <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {couponApplied && (
                <div className="d_summary_row d_summary_discount">
                  <span>Coupon Discount (10%)</span>
                  <span>− ₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="d_summary_row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="d_free_badge">FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="d_free_shipping_hint">
                  Add ₹{(1999 - subtotal).toLocaleString("en-IN")} more for free shipping
                </p>
              )}
              <div className="d_summary_divider" />
              <div className="d_summary_row d_summary_total">
                <span>Total</span>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              <Link to="/login" className="d_btn_primary d_checkout_btn">
                Proceed to Checkout <FaArrowRight size={12} />
              </Link>

              <div className="d_cart_trust">
                <span><FaLock /> Secure Payment</span>
                <span><FaTruck /> Fast Delivery</span>
                <span><FaUndo /> Easy Returns</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Suggested Products */}
        {suggested.length > 0 && (
          <div className="d_cart_suggested">
            <div className="d_section_title_wrap">
              <div>
                <span className="d_section_eyebrow">You Might Like</span>
                <h2 className="d_section_title">Recommended for You</h2>
              </div>
            </div>
            <Row className="g-3">
              {suggested.map((p) => (
                <Col key={p.id} xs={6} md={4} lg={3}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
