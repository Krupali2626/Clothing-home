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
} from "react-icons/fa";
import { useShop } from "../context/ShopContext";
import "./Checkout.css";

const PAYMENT_METHODS = [
  { value: "cod", label: "Cash on Delivery", icon: FaCcStripe, desc: "Pay when you receive" },
  { value: "upi", label: "UPI", icon: FaMobileAlt, desc: "Google Pay / PhonePe / Paytm" },
  { value: "card", label: "Card", icon: FaCreditCard, desc: "Credit / Debit card" },
  { value: "netbanking", label: "Net Banking", icon: FaUniversity, desc: "All major banks" },
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

  useEffect(() => {
    if (cart.length === 0 && !submitted) {
      navigate("/cart");
    }
  }, [cart.length, submitted, navigate]);

  const subtotal = cart.reduce((sum, item) => sum + (item.salePrice || item.price || 0) * item.qty, 0);
  const shipping = subtotal >= 1999 ? 0 : 49;
  const total = subtotal + shipping;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      const numeric = value.replace(/[^0-9]/g, "").slice(0, 6);
      setAddress((prev) => ({ ...prev, pincode: numeric }));
      return;
    }
    setAddress((prev) => ({ ...prev, [name]: value }));
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
      };

      const response = await createOrder(payload);
      if (response?.success) {
        setSuccessOrder({
          orderNumber: response.order?.orderNumber || "ORD" + Date.now(),
          totalPrice: response.order?.totalPrice || total,
          paymentMethod,
          address,
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
                        <input type="radio" name="paymentMethod" value={pm.value} checked={paymentMethod === pm.value} onChange={(e) => setPaymentMethod(e.target.value)} />
                        <Icon className="d_payment_icon" />
                        <div className="d_payment_info">
                          <strong>{pm.label}</strong>
                          <span>{pm.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
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

                <div className="d_summary_row">
                  <span>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="d_summary_row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="d_free_badge">FREE</span> : `₹${shipping}`}</span>
                </div>
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
