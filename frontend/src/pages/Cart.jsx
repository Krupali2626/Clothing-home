import React, { useState, useEffect } from "react";
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
  FaSpinner,
  FaTimes,
} from "react-icons/fa";
import { trendingProducts } from "../data/products";
import ProductCard from "../components/common/ProductCard";
import { useShop } from "../context/ShopContext";
import { couponAPI } from "../services/api";
import "./Cart.css";

const Cart = () => {
  const { cart, updateCartQty, removeFromCart } = useShop();

  // ── Coupon state ──────────────────────────────────────────────────────────
  const [couponInput, setCouponInput] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount, message }
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showCouponList, setShowCouponList] = useState(false);

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.salePrice || item.price || 0) * item.qty,
    0
  );
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const shipping = subtotal >= 1999 ? 0 : 99;
  const total = subtotal - couponDiscount + shipping;

  // ── Fetch coupons from backend (debounced to avoid infinite requests) ─────
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await couponAPI.getPublic(subtotal);
        setAvailableCoupons(res.coupons || []);
      } catch {
        // non-critical — silently ignore
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [subtotal]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const applyCode = async (code) => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await couponAPI.validate({ code: trimmed, subtotal });
      setAppliedCoupon({
        code: res.coupon.code,
        discount: res.discount,
        message: res.message,
      });
      setCouponInput("");
      setShowCouponList(false);
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code");
    } finally {
      setCouponLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  const suggested = trendingProducts
    .filter((p) => !cart.find((c) => c.id === p.id))
    .slice(0, 4);

  // ── Empty cart ─────────────────────────────────────────────────────────────
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
        <h1 className="d_cart_heading">
          Shopping Cart <span>({cart.length} items)</span>
        </h1>
      </div>

      <div className="container d_section pt-3">
        <Row className="g-4">
          {/* ── Cart Items ─────────────────────────────────────────────────── */}
          <Col lg={8}>
            <div className="d_cart_items">
              <div className="d_cart_header d-none d-md-grid">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span></span>
              </div>

              {cart.map((item) => {
                const hasStockLimit = Number.isFinite(Number(item.stock));
                const maxStock = hasStockLimit ? Number(item.stock) : null;
                const isAtMaxStock = hasStockLimit && item.qty >= maxStock;
                return <div key={item.id} className="d_cart_item">
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
                    ₹{(item.salePrice || item.price || 0).toLocaleString("en-IN")}
                  </div>

                  <div className="d_cart_item_qty">
                    <span className="d_cart_label">Qty</span>
                    <div className="d_qty_control">
                      <button onClick={() => updateCartQty(item.id, -1)} aria-label="Decrease">
                        <FaMinus />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.id, 1)}
                        aria-label="Increase"
                        disabled={isAtMaxStock}
                        title={isAtMaxStock ? `Only ${maxStock} item(s) available` : "Increase"}
                      >
                        <FaPlus />
                      </button>
                      {isAtMaxStock && <small className="d_cart_stock_limit">Maximum available stock: {maxStock}</small>}
                    </div>
                  </div>

                  <div className="d_cart_item_total">
                    <span className="d_cart_label">Total</span>
                    <strong>
                      ₹{((item.salePrice || item.price || 0) * item.qty).toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <button
                    className="d_cart_remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>;
              })}
            </div>

            {/* ── Coupon ──────────────────────────────────────────────────── */}
            {appliedCoupon ? (
              <div className="d_coupon_wrap d_coupon_wrap_applied">
                <FaTag className="text-success" />
                <div className="d_coupon_applied_text">
                  <strong>{appliedCoupon.code}</strong>
                  <span>{appliedCoupon.message}</span>
                </div>
                <button
                  className="d_coupon_remove_inline"
                  onClick={removeCoupon}
                  title="Remove coupon"
                  aria-label="Remove coupon"
                >
                  <FaTimes size={13} />
                </button>
              </div>
            ) : (
              <>
                <div className="d_coupon_wrap">
                  <FaTag />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponError("");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyCode(couponInput)}
                  />
                  <button
                    onClick={() => applyCode(couponInput)}
                    className="d_btn_primary shadow-none"
                    disabled={couponLoading}
                  >
                    {couponLoading ? <FaSpinner className="spin" size={12} /> : "Apply"}
                  </button>
                </div>

                {/* Available coupons from backend */}
                {availableCoupons.length > 0 && (
                  <div className="d_cart_coupon_offers">
                    <button
                      type="button"
                      className="d_coupon_view_all_btn"
                      onClick={() => setShowCouponList((v) => !v)}
                    >
                      <FaTag size={10} />
                      {showCouponList
                        ? "Hide available offers"
                        : `View ${availableCoupons.length} available offer${availableCoupons.length > 1 ? "s" : ""}`}
                    </button>

                    {showCouponList && (
                      <div className="d_coupon_list">
                        {availableCoupons.map((c) => (
                          <div
                            key={c._id}
                            className={`d_coupon_list_item${
                              c.eligible
                                ? " d_coupon_list_item_active"
                                : " d_coupon_list_item_disabled"
                            }`}
                          >
                            <div className="d_coupon_list_left">
                              <div className="d_coupon_list_code">
                                <FaTag size={10} />
                                <span>{c.code}</span>
                              </div>
                              <p className="d_coupon_list_desc">
                                {c.description ||
                                  (c.discountType === "percentage"
                                    ? `${c.discountValue}% off${
                                        c.maxDiscountAmount
                                          ? ` up to ₹${c.maxDiscountAmount}`
                                          : ""
                                      }`
                                    : `Flat ₹${c.discountValue} off`)}
                              </p>
                              {c.minOrderAmount > 0 && (
                                <p className="d_coupon_list_min">
                                  Min order: ₹{c.minOrderAmount.toLocaleString("en-IN")}
                                </p>
                              )}
                              {c.validUntil && (
                                <p className="d_coupon_list_expiry">
                                  Expires:{" "}
                                  {new Date(c.validUntil).toLocaleDateString("en-IN")}
                                </p>
                              )}
                              {!c.eligible && (
                                <p className="d_coupon_list_reason">{c.ineligibleReason}</p>
                              )}
                            </div>
                            <div className="d_coupon_list_right">
                              {c.eligible && c.discountPreview > 0 && (
                                <span className="d_coupon_list_saving">
                                  Save ₹{c.discountPreview.toLocaleString("en-IN")}
                                </span>
                              )}
                              {c.eligible ? (
                                <button
                                  type="button"
                                  className="d_coupon_list_apply_btn"
                                  onClick={() => applyCode(c.code)}
                                  disabled={couponLoading}
                                >
                                  Apply
                                </button>
                              ) : (
                                <span className="d_coupon_list_na">N/A</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {couponError && <p className="d_coupon_error">{couponError}</p>}
          </Col>

          {/* ── Order Summary ───────────────────────────────────────────────── */}
          <Col lg={4}>
            <div className="d_cart_summary">
              <h4>Order Summary</h4>

              <div className="d_summary_row">
                <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {appliedCoupon && (
                <div className="d_summary_row d_summary_discount">
                  <span>Coupon ({appliedCoupon.code})</span>
                  <span>− ₹{couponDiscount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="d_summary_row">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="d_free_badge">FREE</span>
                  ) : (
                    `₹${shipping}`
                  )}
                </span>
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

              <Link to="/checkout" className="d_btn_primary d_checkout_btn">
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

        {/* ── Suggested Products ─────────────────────────────────────────────── */}
        {suggested.length > 0 && (
          <div className="d_cart_suggested">
            <div className="d_section_title_wrap">
              <div>
                <span className="d_section_eyebrow">You May Also Like</span>
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
