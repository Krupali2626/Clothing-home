import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Form, Button, Badge } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaCcStripe,
  FaMobileAlt,
  FaUniversity,
  FaArrowLeft,
  FaCheckCircle,
  FaSpinner,
  FaLock,
  FaTag,
  FaTimes,
} from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import { couponAPI } from "../services/api";
import "./Checkout.css";

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", icon: FaCcStripe, desc: "Pay when you receive" },
  { value: "upi", label: "UPI", icon: FaMobileAlt, desc: "Google Pay / PhonePe / Paytm" },
  { value: "card", label: "Card", icon: FaCreditCard, desc: "Credit / Debit card" },
  { value: "netbanking", label: "Net Banking", icon: FaUniversity, desc: "All major banks" },
];

const BANKS = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
  "Bank of Baroda",
  "Canara Bank",
  "Union Bank of India",
  "IndusInd Bank",
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, createOrder, loading, user } = useShop();
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState("");

  const [address, setAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);

  // Payment-method-specific fields
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [selectedBank, setSelectedBank] = useState("");

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code, discount, message }
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [showCouponList, setShowCouponList] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !submitted) {
      navigate("/cart");
    }
  }, [cart.length, submitted, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price || 0) * item.qty, 0);
  const shipping = subtotal >= 1999 ? 0 : 49;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = subtotal + shipping - couponDiscount;

  // Fetch available coupons (debounced to avoid infinite requests)
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const res = await couponAPI.getPublic(subtotal);
        setAvailableCoupons(res.coupons || []);
      } catch {
        // silently ignore — coupon list is non-critical
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [subtotal]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      const numeric = value.replace(/[^0-9]/g, "").slice(0, 6);
      setAddress((prev) => ({ ...prev, pincode: numeric }));
      return;
    }
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a coupon code");
      return;
    }
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await couponAPI.validate({ code, subtotal });
      setAppliedCoupon({
        code: res.coupon.code,
        discount: res.discount,
        message: res.message,
      });
      setCouponCode("");
    } catch (err) {
      setCouponError(err.message || "Invalid coupon code");
      setAppliedCoupon(null);
    } finally {
      setCouponLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleCardChange = (e) => {
    let { name, value } = e.target;
    if (name === "number") {
      // Format as XXXX XXXX XXXX XXXX
      value = value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    }
    if (name === "expiry") {
      // Format as MM/YY
      value = value.replace(/\D/g, "").slice(0, 4);
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setCard((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const newErrors = {};

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!address.phone.trim()) newErrors.phone = "Phone number is required";
    if (!address.street.trim()) newErrors.street = "Street address is required";
    if (!address.city.trim()) newErrors.city = "City is required";
    if (!address.state.trim()) newErrors.state = "State is required";
    if (!address.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{5,6}$/.test(address.pincode.trim())) newErrors.pincode = "Pincode must be 5 or 6 digits";

    // Payment method specific validation
    if (paymentMethod === "upi") {
      if (!upiId.trim()) {
        newErrors.upiId = "UPI ID is required";
      } else if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.trim())) {
        newErrors.upiId = "Enter a valid UPI ID (e.g. name@upi)";
      }
    }
    if (paymentMethod === "card") {
      const rawNumber = card.number.replace(/\s/g, "");
      if (!rawNumber) newErrors.number = "Card number is required";
      else if (rawNumber.length < 13) newErrors.number = "Enter a valid card number";
      if (!card.name.trim()) newErrors.cardName = "Name on card is required";
      if (!card.expiry.trim()) {
        newErrors.expiry = "Expiry date is required";
      } else if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
        newErrors.expiry = "Enter expiry as MM/YY";
      } else {
        const [mm, yy] = card.expiry.split("/").map(Number);
        const now = new Date
        ();
        const expDate = new Date(2000 + yy, mm - 1, 1);
        if (mm < 1 || mm > 12) newErrors.expiry = "Invalid month";
        else if (expDate < new Date(now.getFullYear(), now.getMonth(), 1))
          newErrors.expiry = "Card has expired";
      }
      if (!card.cvv.trim()) newErrors.cvv = "CVV is required";
      else if (card.cvv.length < 3) newErrors.cvv = "CVV must be 3–4 digits";
    }
    if (paymentMethod === "netbanking") {
      if (!selectedBank) newErrors.bank = "Please select your bank";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const validCart = cart.filter((item) => /^[0-9a-fA-F]{24}$/.test(item.id || ""));
    if (validCart.length !== cart.length) {
      setError("Some items in your cart are no longer available. Please remove them and try again.");
      return;
    }

    try {
      const payload = {
        items: validCart.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.salePrice || item.price || 0,
          quantity: item.qty || 1,
          size: item.selectedSize,
          color: item.selectedColor,
        })),
        shippingAddress: {
          fullName: address.fullName,
          phone: address.phone,
          street: address.street,
          city: address.city,
          state: address.state,
          pincode: address.pincode,
        },
        paymentMethod,
        couponCode: appliedCoupon ? appliedCoupon.code : undefined,
        couponDiscount: appliedCoupon ? appliedCoupon.discount : 0,
      };

      const response = await createOrder(payload);
      if (response?.success) {
        setSuccessOrder({
          orderNumber: response.order?.orderNumber || "ORD" + Date.now(),
          totalPrice: response.order?.totalPrice || total,
          paymentMethod,
          address,
          couponCode: appliedCoupon?.code || null,
          couponDiscount: appliedCoupon?.discount || 0,
        });
        setShowSuccess(true);
      }
    } catch (err) {
      setError(err.message || "Failed to place order. Please try again.");
    }
  };

  if (cart.length === 0 && !showSuccess) {
    return null;
  }

  return (
    <div className="d_checkout_page">
      <div className="container d_section">
        <div className="d_checkout_breadcrumb">
          <Link to="/cart"><FaArrowLeft size={12} /> Back to Cart</Link>
        </div>
        <h1 className="d_checkout_heading">Checkout</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <Form onSubmit={handleSubmit}>
          <Row className="g-4">
            {/* Shipping Address */}
            <Col lg={7}>
              <div className="d_checkout_section">
                <h3><FaMapMarkerAlt /> Shipping Address</h3>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="d_form_group">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control type="text" name="fullName" value={address.fullName} onChange={handleAddressChange} placeholder="John Doe" required />
                      {errors.fullName && <p className="d_field_error">{errors.fullName}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d_form_group">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" name="phone" value={address.phone} onChange={handleAddressChange} placeholder="+91 98765 43210" required />
                      {errors.phone && <p className="d_field_error">{errors.phone}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="d_form_group">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="123, Main Street" required />
                      {errors.street && <p className="d_field_error">{errors.street}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="d_form_group">
                      <Form.Label>City</Form.Label>
                      <Form.Control type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="Mumbai" required />
                      {errors.city && <p className="d_field_error">{errors.city}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="d_form_group">
                      <Form.Label>State</Form.Label>
                      <Form.Control type="text" name="state" value={address.state} onChange={handleAddressChange} placeholder="Maharashtra" required />
                      {errors.state && <p className="d_field_error">{errors.state}</p>}
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="d_form_group">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder="400001" required inputMode="numeric" pattern="[0-9]*" />
                      {errors.pincode && <p className="d_field_error">{errors.pincode}</p>}
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Payment Method */}
              <div className="d_checkout_section">
                <h3><FaCreditCard /> Payment Method</h3>
                <div className="d_payment_options">
                  {PAYMENT_METHODS.map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <label key={pm.value} className={`d_payment_option ${paymentMethod === pm.value ? "d_payment_option_selected" : ""}`}>
                        <input type="radio" name="paymentMethod" value={pm.value} checked={paymentMethod === pm.value} onChange={(e) => { setPaymentMethod(e.target.value); setErrors({}); }} />
                        <Icon className="d_payment_icon" />
                        <div className="d_payment_info">
                          <strong>{pm.label}</strong>
                          <span>{pm.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* UPI Fields */}
                {paymentMethod === "upi" && (
                  <div className="d_payment_fields">
                    <Form.Group className="d_form_group">
                      <Form.Label>UPI ID <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => { setUpiId(e.target.value); setErrors((p) => ({ ...p, upiId: undefined })); }}
                        isInvalid={!!errors.upiId}
                      />
                      <Form.Control.Feedback type="invalid">{errors.upiId}</Form.Control.Feedback>
                      <Form.Text className="text-muted">e.g. mobilenumber@upi, name@oksbi</Form.Text>
                    </Form.Group>
                  </div>
                )}

                {/* Card Fields */}
                {paymentMethod === "card" && (
                  <div className="d_payment_fields">
                    <p className="d_payment_secure"><FaLock size={11} /> Your card details are encrypted and secure</p>
                    <Row className="g-3">
                      <Col xs={12}>
                        <Form.Group className="d_form_group">
                          <Form.Label>Card Number <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="number"
                            placeholder="1234 5678 9012 3456"
                            value={card.number}
                            onChange={handleCardChange}
                            isInvalid={!!errors.number}
                            inputMode="numeric"
                            maxLength={19}
                          />
                          <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group className="d_form_group">
                          <Form.Label>Name on Card <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={card.name}
                            onChange={handleCardChange}
                            isInvalid={!!errors.cardName}
                          />
                          <Form.Control.Feedback type="invalid">{errors.cardName}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="d_form_group">
                          <Form.Label>Expiry Date <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={card.expiry}
                            onChange={handleCardChange}
                            isInvalid={!!errors.expiry}
                            inputMode="numeric"
                            maxLength={5}
                          />
                          <Form.Control.Feedback type="invalid">{errors.expiry}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group className="d_form_group">
                          <Form.Label>CVV <span className="text-danger">*</span></Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            placeholder="•••"
                            value={card.cvv}
                            onChange={handleCardChange}
                            isInvalid={!!errors.cvv}
                            inputMode="numeric"
                            maxLength={4}
                          />
                          <Form.Control.Feedback type="invalid">{errors.cvv}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                {/* Net Banking Fields */}
                {paymentMethod === "netbanking" && (
                  <div className="d_payment_fields">
                    <Form.Group className="d_form_group">
                      <Form.Label>Select Bank <span className="text-danger">*</span></Form.Label>
                      <Form.Select
                        value={selectedBank}
                        onChange={(e) => { setSelectedBank(e.target.value); setErrors((p) => ({ ...p, bank: undefined })); }}
                        isInvalid={!!errors.bank}
                      >
                        <option value="">-- Choose your bank --</option>
                        {BANKS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.bank}</Form.Control.Feedback>
                    </Form.Group>
                  </div>
                )}

                {/* COD note */}
                {paymentMethod === "cod" && (
                  <div className="d_payment_fields d_cod_note">
                    <p>💵 Pay <strong>₹{total.toLocaleString("en-IN")}</strong> in cash when your order is delivered.</p>
                  </div>
                )}
              </div>
            </Col>

            {/* Order Summary */}
            <Col lg={5}>
              <div className="d_checkout_summary">
                <h4>Order Summary</h4>
                <div className="d_checkout_items">
                  {cart.map((item) => (
                    <div key={item.id} className="d_checkout_item">
                      <img src={item.image} alt={item.name} className="d_checkout_item_img" />
                      <div className="d_checkout_item_info">
                        <p className="d_checkout_item_name">{item.name}</p>
                        {item.selectedSize && <span className="d_checkout_item_variant">Size: {item.selectedSize}</span>}
                        {item.selectedColor && <span className="d_checkout_item_variant">Color: {item.selectedColor}</span>}
                        <span className="d_checkout_item_qty">Qty: {item.qty}</span>
                      </div>
                      <span className="d_checkout_item_price">₹{((item.salePrice || item.price || 0) * item.qty).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                {/* Coupon Section */}
                <div className="d_coupon_section">
                  <div className="d_coupon_label">
                    <FaTag size={12} /> Have a coupon?
                    {availableCoupons.length > 0 && !appliedCoupon && (
                      <button
                        type="button"
                        className="d_coupon_view_all_btn"
                        onClick={() => setShowCouponList((v) => !v)}
                      >
                        {showCouponList ? "Hide offers" : `View ${availableCoupons.length} offer${availableCoupons.length > 1 ? "s" : ""}`}
                      </button>
                    )}
                  </div>

                  {appliedCoupon ? (
                    <div className="d_coupon_applied">
                      <div className="d_coupon_applied_info">
                        <FaTag size={12} />
                        <span className="d_coupon_applied_code">{appliedCoupon.code}</span>
                        <span className="d_coupon_applied_msg">{appliedCoupon.message}</span>
                      </div>
                      <button
                        type="button"
                        className="d_coupon_remove_btn"
                        onClick={handleRemoveCoupon}
                        title="Remove coupon"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="d_coupon_input_row">
                        <input
                          type="text"
                          className={`d_coupon_input${couponError ? " d_coupon_input_error" : ""}`}
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleApplyCoupon())}
                        />
                        <button
                          type="button"
                          className="d_coupon_apply_btn"
                          onClick={handleApplyCoupon}
                          disabled={couponLoading}
                        >
                          {couponLoading ? <FaSpinner className="spin" size={12} /> : "Apply"}
                        </button>
                      </div>
                      {couponError && <p className="d_coupon_error">{couponError}</p>}

                      {/* Available coupons list */}
                      {showCouponList && availableCoupons.length > 0 && (
                        <div className="d_coupon_list">
                          {availableCoupons.map((c) => (
                            <div
                              key={c._id}
                              className={`d_coupon_list_item${c.eligible ? " d_coupon_list_item_active" : " d_coupon_list_item_disabled"}`}
                            >
                              <div className="d_coupon_list_left">
                                <div className="d_coupon_list_code">
                                  <FaTag size={10} />
                                  <span>{c.code}</span>
                                </div>
                                <p className="d_coupon_list_desc">
                                  {c.description ||
                                    (c.discountType === "percentage"
                                      ? `${c.discountValue}% off${c.maxDiscountAmount ? ` up to ₹${c.maxDiscountAmount}` : ""}`
                                      : `Flat ₹${c.discountValue} off`)}
                                </p>
                                {c.minOrderAmount > 0 && (
                                  <p className="d_coupon_list_min">Min order: ₹{c.minOrderAmount.toLocaleString("en-IN")}</p>
                                )}
                                {c.validUntil && (
                                  <p className="d_coupon_list_expiry">
                                    Expires: {new Date(c.validUntil).toLocaleDateString("en-IN")}
                                  </p>
                                )}
                                {!c.eligible && (
                                  <p className="d_coupon_list_reason">{c.ineligibleReason}</p>
                                )}
                              </div>
                              <div className="d_coupon_list_right">
                                {c.eligible && c.discountPreview > 0 && (
                                  <span className="d_coupon_list_saving">Save ₹{c.discountPreview.toLocaleString("en-IN")}</span>
                                )}
                                {c.eligible ? (
                                  <button
                                    type="button"
                                    className="d_coupon_list_apply_btn"
                                    onClick={async () => {
                                      setCouponLoading(true);
                                      setCouponError("");
                                      try {
                                        const res = await couponAPI.validate({ code: c.code, subtotal });
                                        setAppliedCoupon({ code: res.coupon.code, discount: res.discount, message: res.message });
                                        setShowCouponList(false);
                                      } catch (err) {
                                        setCouponError(err.message || "Could not apply coupon");
                                      } finally {
                                        setCouponLoading(false);
                                      }
                                    }}
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
                    </>
                  )}
                </div>

                <div className="d_summary_row">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="d_summary_row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="d_free_badge">FREE</span> : `₹${shipping}`}</span>
                </div>
                {appliedCoupon && (
                  <div className="d_summary_row d_summary_discount">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>- ₹{couponDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="d_summary_divider" />
                <div className="d_summary_row d_summary_total">
                  <span>Total</span>
                  <strong>₹{total.toLocaleString("en-IN")}</strong>
                </div>

                <Button type="submit" className="d_btn_primary d_place_order_btn" disabled={loading}>
                  {loading ? (<><FaSpinner className="d_spinner" /> Placing Order...</>) : "Place Order"}
                </Button>
                <p className="d_checkout_note">By placing this order you agree to our Terms & Conditions.</p>
              </div>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Success Popup */}
      {showSuccess && successOrder && (
        <div className="d_popup_overlay" onClick={() => setShowSuccess(false)}>
          <div className="d_popup_modal" onClick={(e) => e.stopPropagation()}>
            <button className="d_popup_close" onClick={() => setShowSuccess(false)} aria-label="Close">×</button>
            <FaCheckCircle className="d_popup_icon" />
            <h2>Thank You!</h2>
            <p>Your order has been placed successfully.</p>
            <div className="d_popup_details">
              <div className="d_popup_row"><span>Order ID</span><strong>{successOrder.orderNumber}</strong></div>
              <div className="d_popup_row"><span>Total Paid</span><strong>₹{successOrder.totalPrice.toLocaleString("en-IN")}</strong></div>
              {successOrder.couponCode && (
                <div className="d_popup_row"><span>Coupon Applied</span><strong>{successOrder.couponCode} (-₹{successOrder.couponDiscount?.toLocaleString("en-IN")})</strong></div>
              )}
              <div className="d_popup_row"><span>Payment</span><strong>{successOrder.paymentMethod.toUpperCase()}</strong></div>
              <div className="d_popup_row"><span>Shipping To</span><strong>{successOrder.address.fullName}, {successOrder.address.city}</strong></div>
            </div>
            <div className="d_popup_actions">
              <Button onClick={() => { setShowSuccess(false); navigate("/my-orders"); }} className="d_btn_primary">View My Orders</Button>
              <Button onClick={() => { setShowSuccess(false); navigate("/"); }} variant="outline-secondary">Continue Shopping</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
