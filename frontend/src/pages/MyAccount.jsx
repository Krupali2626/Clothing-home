import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Nav, Tab, Modal } from "react-bootstrap";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
  FaHeart,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaChevronRight,
  FaCog,
  FaPlus,
  FaTrash,
  FaTimes,
  FaCheck,
  FaCamera,
  FaCheckCircle,
} from "react-icons/fa";
import "./MyAccount.css";
import ProductCard from "../components/common/ProductCard";
import { useShop } from "../context/ShopContext";
import { userAPI, orderAPI } from "../services/api";

const STATUS_STEPS = ["pending", "processing", "shipped", "delivered"];

const buildTimeline = (order) => {
  const status = String(order.status || "pending").toLowerCase();
  const history = order.statusHistory || [];
  const createdAt = order.createdAt ? new Date(order.createdAt) : null;

  if (status === "cancelled") {
    const cancelledAt = history.find((h) => h.status === "cancelled")?.at || order.updatedAt;
    return [
      { status: "Order Placed", date: createdAt ? createdAt.toLocaleString("en-IN") : "", completed: true },
      {
        status: "Cancelled",
        date: cancelledAt ? new Date(cancelledAt).toLocaleString("en-IN") : "",
        completed: true,
      },
    ];
  }

  const currentIdx = STATUS_STEPS.indexOf(status);
  return STATUS_STEPS.map((step, idx) => {
    const hist = history.find((h) => h.status === step);
    const labels = {
      pending: "Order Placed",
      processing: "Processing",
      shipped: "Shipped",
      delivered: "Delivered",
    };
    let date = "";
    if (hist?.at) date = new Date(hist.at).toLocaleString("en-IN");
    else if (step === "pending" && createdAt) date = createdAt.toLocaleString("en-IN");
    return {
      status: labels[step],
      date,
      completed: currentIdx >= idx,
    };
  });
};

const formatPaymentMethod = (method) => {
  const map = { cod: "Cash on Delivery", card: "Card", upi: "UPI", netbanking: "Net Banking" };
  return map[method] || method || "—";
};

const MyAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const { wishlist, clearWishlist, logout } = useShop();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [cancellingOrder, setCancellingOrder] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    role: "customer",
    profileImage: null,
    dateJoined: "",
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const [addresses, setAddresses] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    label: "Home",
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    isDefault: false,
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedUser({ ...editedUser, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const mapOrder = (o) => {
    const statusKey = String(o.status || "pending").toLowerCase();
    const deliveryDate = o.deliveredAt
      ? new Date(o.deliveredAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      : o.estimatedDelivery
        ? new Date(o.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : "—";

    return {
      _id: o._id,
      id: o.orderNumber || o._id,
      date: o.createdAt
        ? new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : "",
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
      status: statusKey.charAt(0).toUpperCase() + statusKey.slice(1),
      statusKey,
      total: o.totalPrice || 0,
      items: o.items?.length || 0,
      image: o.items?.[0]?.image || "",
      products:
        o.items?.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size || "",
          color: item.color || "",
          image: item.image || "",
        })) || [],
      shippingAddress: {
        name: o.shippingAddress?.fullName || "",
        address: o.shippingAddress?.street || "",
        city: o.shippingAddress?.city || "",
        state: o.shippingAddress?.state || "",
        pincode: o.shippingAddress?.pincode || "",
        phone: o.shippingAddress?.phone || "",
      },
      paymentMethod: formatPaymentMethod(o.paymentMethod),
      deliveryDate,
      trackingNumber: o.orderNumber || "",
      statusHistory: o.statusHistory || [],
      timeline: buildTimeline(o),
      canCancel: ["pending", "processing"].includes(statusKey),
    };
  };

  const fetchProfile = async () => {
    try {
      setLoadingProfile(true);
      const res = await userAPI.getProfile();
      if (res.success && res.user) {
        const u = res.user;
        const mapped = {
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          isAdmin: u.role === "admin",
          role: u.role || "customer",
          profileImage: u.avatar || null,
          dateJoined: u.createdAt
            ? new Date(u.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "—",
        };
        setUser(mapped);
        setEditedUser(mapped);
        if (u.addresses) {
          setAddresses(
            u.addresses.map((addr) => ({
              id: addr._id,
              label: addr.label || "Home",
              name: addr.fullName || "",
              address: addr.street || "",
              city: addr.city || "",
              state: addr.state || "",
              pincode: addr.pincode || "",
              phone: addr.phone || "",
              isDefault: addr.isDefault || false,
            }))
          );
        }
        if (u.paymentMethods) {
          setPaymentMethods(
            u.paymentMethods.map((pm) => ({
              id: pm._id,
              cardNumber: pm.cardNumber,
              cardName: pm.cardName,
              expiry: pm.expiry,
              type: pm.type || "VISA",
            }))
          );
        }
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoadingProfile(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const res = await orderAPI.getMyOrders();
      if (res.success && res.orders) {
        setOrders(res.orders.map(mapOrder));
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProfileEdit = () => setIsEditingProfile(true);

  const handleProfileSave = async () => {
    try {
      setLoadingProfile(true);
      const payload = {
        name: editedUser.name,
        email: editedUser.email,
        phone: editedUser.phone,
      };
      if (editedUser.profileImage) payload.avatar = editedUser.profileImage;
      const res = await userAPI.updateProfile(payload);
      if (res.success && res.user) {
        setUser({
          ...editedUser,
          isAdmin: res.user.role === "admin",
          role: res.user.role || "customer",
        });
      }
      setIsEditingProfile(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Failed to update profile: " + (err.message || "Server error"));
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleProfileCancel = () => {
    setEditedUser({ ...user });
    setIsEditingProfile(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/login");
  };

  const handleCancelOrder = async (order) => {
    if (!window.confirm("Cancel this order?")) return;
    try {
      setCancellingOrder(true);
      await orderAPI.cancelOrder(order._id);
      await fetchOrders();
      setSelectedOrder(null);
      alert("Order cancelled successfully");
    } catch (err) {
      alert("Failed to cancel order: " + (err.message || "Server error"));
    } finally {
      setCancellingOrder(false);
    }
  };

  const handleAddAddress = () => {
    setIsAddingAddress(true);
    setEditingAddressId(null);
    setNewAddress({
      label: "Home",
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
    });
  };

  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
    setNewAddress({
      label: address.label || "Home",
      fullName: address.name || "",
      phone: address.phone || "",
      street: address.address || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      isDefault: address.isDefault || false,
    });
  };

  const handleSaveAddress = async () => {
    try {
      setLoadingAddresses(true);
      if (editingAddressId) {
        await userAPI.updateAddress(editingAddressId, newAddress);
      } else {
        await userAPI.addAddress(newAddress);
      }
      await fetchProfile();
      setIsAddingAddress(false);
      setEditingAddressId(null);
    } catch (err) {
      console.error("Failed to save address:", err);
      alert("Failed to save address: " + (err.message || "Server error"));
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      setLoadingAddresses(true);
      await userAPI.deleteAddress(id);
      await fetchProfile();
    } catch (err) {
      console.error("Failed to delete address:", err);
      alert("Failed to delete address: " + (err.message || "Server error"));
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      setLoadingAddresses(true);
      await userAPI.setDefaultAddress(id);
      await fetchProfile();
    } catch (err) {
      console.error("Failed to set default address:", err);
      alert("Failed to set default address: " + (err.message || "Server error"));
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleAddPayment = () => {
    setIsAddingPayment(true);
    setNewPayment({ cardNumber: "", cardName: "", expiry: "", cvv: "" });
  };

  const handleSavePayment = async () => {
    try {
      setLoadingPayments(true);
      const digits = newPayment.cardNumber.replace(/\s/g, "");
      if (digits.length < 12) {
        alert("Please enter a valid card number");
        return;
      }
      const last4 = digits.slice(-4);
      const maskedCard = "•••• •••• •••• " + last4;
      const type = digits.startsWith("4") ? "VISA" : digits.startsWith("5") ? "MASTERCARD" : "CARD";
      await userAPI.addPaymentMethod({
        cardNumber: maskedCard,
        cardName: newPayment.cardName,
        expiry: newPayment.expiry,
        type,
      });
      await fetchProfile();
      setIsAddingPayment(false);
    } catch (err) {
      console.error("Failed to add payment method:", err);
      alert("Failed to add payment method: " + (err.message || "Server error"));
    } finally {
      setLoadingPayments(false);
    }
  };

  const handleDeletePayment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payment method?")) return;
    try {
      setLoadingPayments(true);
      await userAPI.deletePaymentMethod(id);
      await fetchProfile();
    } catch (err) {
      console.error("Failed to delete payment method:", err);
      alert("Failed to delete payment method: " + (err.message || "Server error"));
    } finally {
      setLoadingPayments(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (res.success) {
        setPasswordSuccess("Password changed successfully!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        setPasswordError(res.message || "Failed to change password");
      }
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    }
  };

  const roleBadge = user.isAdmin ? "Admin" : "Member";

  return (
    <div className="d_myaccount_page">
      <div className="d_myaccount_hero">
        <div className="container">
          <h1 className="d_myaccount_hero_title">My Account</h1>
          <p className="d_myaccount_hero_subtitle">Manage your profile, orders, and preferences</p>
        </div>
      </div>

      <div className="container d_section pt-4">
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-5 w-100 ">
            <Col lg={4} className="d_myaccount_sidebar_col">
              <div className="d_myaccount_sidebar">
                <div className="d_myaccount_sidebar_profile">
                  <div className="d_myaccount_sidebar_avatar">
                    {user.profileImage ? <img src={user.profileImage} alt="Profile" /> : <FaUser />}
                  </div>
                  <div className="d_myaccount_sidebar_user">
                    <h5>{user.name || "Loading…"}</h5>
                    <p>{user.email}</p>
                    <span className="d_myaccount_member_badge">{roleBadge}</span>
                  </div>
                </div>

                <Nav variant="pills" className="d_myaccount_sidebar_nav">
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className={`d_myaccount_sidebar_link ${activeTab === "profile" ? "active" : ""}`}>
                      <FaUser /> <span>Profile</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className={`d_myaccount_sidebar_link ${activeTab === "orders" ? "active" : ""}`}>
                      <FaBox /> <span>My Orders</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="addresses" className={`d_myaccount_sidebar_link ${activeTab === "addresses" ? "active" : ""}`}>
                      <FaMapMarkerAlt /> <span>Addresses</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment" className={`d_myaccount_sidebar_link ${activeTab === "payment" ? "active" : ""}`}>
                      <FaCreditCard /> <span>Payment Methods</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="wishlist" className={`d_myaccount_sidebar_link ${activeTab === "wishlist" ? "active" : ""}`}>
                      <FaHeart /> <span>Wishlist</span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security" className={`d_myaccount_sidebar_link ${activeTab === "security" ? "active" : ""}`}>
                      <FaLock /> <span>Change Password</span>
                    </Nav.Link>
                  </Nav.Item>
                  {user.isAdmin && (
                    <Nav.Item>
                      <Link to="/admin-panel" className="d_myaccount_sidebar_link">
                        <FaCog /> <span>Admin Panel</span>
                      </Link>
                    </Nav.Item>
                  )}
                  <div className="d_myaccount_sidebar_divider"></div>
                  <Nav.Item>
                    <button className="d_myaccount_sidebar_link d_myaccount_sidebar_logout" onClick={() => setShowLogoutModal(true)}>
                      <FaSignOutAlt /> <span>Logout</span>
                    </button>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>

            <Col lg={8}>
              <div className="d_myaccount_content">
                <Tab.Content>
                  <Tab.Pane eventKey="profile">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Profile Information</h4>
                        {!isEditingProfile ? (
                          <button className="d_myaccount_edit_btn" onClick={handleProfileEdit}>
                            <FaEdit /> Edit
                          </button>
                        ) : (
                          <div className="d-flex gap-2">
                            <button className="d_btn_primary" onClick={handleProfileSave} disabled={loadingProfile}>
                              <FaCheck /> Save
                            </button>
                            <button className="d_btn_outline" onClick={handleProfileCancel}>
                              <FaTimes /> Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d_myaccount_card_body">
                        {loadingProfile && !user.name ? (
                          <div className="text-center py-4">Loading profile…</div>
                        ) : (
                          <>
                            <div className="d_myaccount_profile_image_section mb-4">
                              <div className="d_myaccount_profile_image_wrapper">
                                <div className="d_myaccount_profile_image">
                                  {editedUser.profileImage ? (
                                    <img src={editedUser.profileImage} alt="Profile" />
                                  ) : (
                                    <FaUser />
                                  )}
                                </div>
                                {isEditingProfile && (
                                  <label className="d_myaccount_profile_image_upload">
                                    <FaCamera />
                                    <input type="file" accept="image/*" onChange={handleProfileImageChange} style={{ display: "none" }} />
                                  </label>
                                )}
                              </div>
                            </div>
                            <Row className="g-3 w-100">
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Full Name</label>
                                  {isEditingProfile ? (
                                    <input
                                      type="text"
                                      value={editedUser.name}
                                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                    />
                                  ) : (
                                    <p>{user.name}</p>
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Email Address</label>
                                  {isEditingProfile ? (
                                    <input
                                      type="email"
                                      value={editedUser.email}
                                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                    />
                                  ) : (
                                    <p>{user.email}</p>
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Phone Number</label>
                                  {isEditingProfile ? (
                                    <input
                                      type="tel"
                                      value={editedUser.phone}
                                      onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                    />
                                  ) : (
                                    <p>{user.phone || "—"}</p>
                                  )}
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Date Joined</label>
                                  <p>{user.dateJoined || "—"}</p>
                                </div>
                              </Col>
                            </Row>
                          </>
                        )}
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="orders">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>My Orders</h4>
                      </div>
                      <div className="d_myaccount_card_body">
                        {selectedOrder && (
                          <div className="d_myaccount_order_details_view mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                              <h5>Order {selectedOrder.id} Details</h5>
                              <div className="d-flex gap-2">
                                {selectedOrder.canCancel && (
                                  <button className="d_btn_outline" onClick={() => handleCancelOrder(selectedOrder)} disabled={cancellingOrder}>
                                    {cancellingOrder ? "Cancelling…" : "Cancel Order"}
                                  </button>
                                )}
                                <button className="d_btn_outline" onClick={() => setSelectedOrder(null)}>
                                  <FaTimes /> Close
                                </button>
                              </div>
                            </div>

                            <div className="d_myaccount_order_summary mb-4">
                              <Row className="g-3 w-100">
                                <Col md={6}>
                                  <p className="mb-2">
                                    <strong>Order Date:</strong> {selectedOrder.date}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Status:</strong>{" "}
                                    <span className={`d_badge_pill d_status_${selectedOrder.statusKey}`}>{selectedOrder.status}</span>
                                  </p>
                                  <p className="mb-2">
                                    <strong>Total Items:</strong> {selectedOrder.items}
                                  </p>
                                  <p>
                                    <strong>Total Amount:</strong> ₹{selectedOrder.total.toLocaleString("en-IN")}
                                  </p>
                                </Col>
                                <Col md={6}>
                                  <p className="mb-2">
                                    <strong>Tracking Number:</strong> {selectedOrder.trackingNumber}
                                  </p>
                                  <p className="mb-2">
                                    <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                                  </p>
                                  <p>
                                    <strong>{selectedOrder.statusKey === "delivered" ? "Delivered On:" : "Estimated Delivery:"}</strong>{" "}
                                    {selectedOrder.deliveryDate}
                                  </p>
                                </Col>
                              </Row>
                            </div>

                            <div className="d_myaccount_order_timeline mb-4">
                              <h6 className="mb-3">Order Timeline</h6>
                              <div className="d_myaccount_timeline">
                                {selectedOrder.timeline.map((item, index) => (
                                  <div key={index} className={`d_myaccount_timeline_item ${item.completed ? "completed" : ""}`}>
                                    <div className="d_myaccount_timeline_icon">
                                      {item.completed ? <FaCheckCircle /> : <FaBox />}
                                    </div>
                                    <div className="d_myaccount_timeline_content">
                                      <h6>{item.status}</h6>
                                      {item.date && <p>{item.date}</p>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="d_myaccount_order_products mb-4">
                              <h6 className="mb-3">Products</h6>
                              {selectedOrder.products.map((product, index) => (
                                <div key={index} className="d_myaccount_order_product">
                                  <img src={product.image} alt={product.name} />
                                  <div className="d_myaccount_order_product_info">
                                    <h6>{product.name}</h6>
                                    <p>
                                      {product.size ? `Size: ${product.size} | ` : ""}
                                      {product.color ? `Color: ${product.color} | ` : ""}
                                      Qty: {product.quantity}
                                    </p>
                                  </div>
                                  <div className="d_myaccount_order_product_price">
                                    <h6>₹{product.price.toLocaleString("en-IN")}</h6>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="d_myaccount_shipping_address">
                              <h6 className="mb-3">Shipping Address</h6>
                              <p>{selectedOrder.shippingAddress.name}</p>
                              <p>{selectedOrder.shippingAddress.address}</p>
                              <p>
                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} -{" "}
                                {selectedOrder.shippingAddress.pincode}
                              </p>
                              <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                            </div>
                          </div>
                        )}

                        <div className="d_myaccount_orders">
                          {loadingOrders ? (
                            <div className="text-center py-5">Loading orders…</div>
                          ) : orders.length === 0 ? (
                            <div className="text-center py-5">
                              <p>No orders found.</p>
                              <Link to="/clothing" className="d_btn_primary">
                                Start Shopping
                              </Link>
                            </div>
                          ) : (
                            orders.map((order) => (
                              <div key={order._id || order.id} className="d_myaccount_order">
                                <div className="d_myaccount_order_header">
                                  <div className="d_myaccount_order_info">
                                    <span className="d_myaccount_order_id">Order {order.id}</span>
                                    <span className="d_myaccount_order_date">Placed on {order.date}</span>
                                  </div>
                                  <span className={`d_myaccount_order_status d_status_${order.statusKey}`}>{order.status}</span>
                                </div>
                                <div className="d_myaccount_order_body">
                                  {order.image && <img src={order.image} alt="Order product" />}
                                  <div className="d_myaccount_order_details">
                                    <p>{order.items} items</p>
                                    <h5>Total: ₹{order.total.toLocaleString("en-IN")}</h5>
                                  </div>
                                  <button className="d_btn_primary d_myaccount_order_btn" onClick={() => setSelectedOrder(order)}>
                                    View Details <FaChevronRight size={12} />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="wishlist">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>My Wishlist</h4>
                        {wishlist.length > 0 && (
                          <button className="d_btn_outline" onClick={() => clearWishlist()}>
                            Clear All
                          </button>
                        )}
                      </div>
                      <div className="d_myaccount_card_body">
                        {wishlist.length === 0 ? (
                          <div className="d_no_results" style={{ textAlign: "center", padding: "60px 0" }}>
                            <FaHeart style={{ fontSize: "64px", color: "#ddd", marginBottom: "16px" }} />
                            <h5 style={{ marginBottom: "8px" }}>Your Wishlist is Empty</h5>
                            <p style={{ marginBottom: "24px" }}>Add some products to your wishlist to view them here.</p>
                            <Link to="/clothing" className="d_btn_primary">
                              Shop Now
                            </Link>
                          </div>
                        ) : (
                          <Row className="g-3 w-100">
                            {wishlist.map((product) => (
                              <Col xs={6} lg={4} key={product.id || product._id}>
                                <ProductCard product={product} />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="addresses">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Saved Addresses</h4>
                        {!isAddingAddress && (
                          <button className="d_btn_primary" onClick={handleAddAddress}>
                            <FaPlus /> Add New Address
                          </button>
                        )}
                      </div>
                      <div className="d_myaccount_card_body">
                        {isAddingAddress && (
                          <div className="mb-4 p-4 border rounded">
                            <h5 className="mb-3">{editingAddressId ? "Edit Address" : "Add New Address"}</h5>
                            <Row className="g-3 w-100">
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Full Name</label>
                                  <input
                                    type="text"
                                    value={newAddress.fullName}
                                    onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Phone Number</label>
                                  <input
                                    type="tel"
                                    value={newAddress.phone}
                                    onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={12}>
                                <div className="d_myaccount_field">
                                  <label>Address</label>
                                  <textarea
                                    value={newAddress.street}
                                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                                    rows="2"
                                  />
                                </div>
                              </Col>
                              <Col md={4}>
                                <div className="d_myaccount_field">
                                  <label>City</label>
                                  <input
                                    type="text"
                                    value={newAddress.city}
                                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={4}>
                                <div className="d_myaccount_field">
                                  <label>State</label>
                                  <input
                                    type="text"
                                    value={newAddress.state}
                                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={4}>
                                <div className="d_myaccount_field">
                                  <label>Pincode</label>
                                  <input
                                    type="text"
                                    value={newAddress.pincode}
                                    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={12}>
                                <div className="d_myaccount_field d-flex align-items-center gap-2">
                                  <input
                                    type="checkbox"
                                    id="defaultAddress"
                                    checked={newAddress.isDefault}
                                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                  />
                                  <label htmlFor="defaultAddress" className="mb-0">
                                    Set as default address
                                  </label>
                                </div>
                              </Col>
                              <Col md={12} className="d-flex gap-2">
                                <button className="d_btn_primary" onClick={handleSaveAddress} disabled={loadingAddresses}>
                                  <FaCheck /> Save
                                </button>
                                <button
                                  className="d_btn_outline"
                                  onClick={() => {
                                    setIsAddingAddress(false);
                                    setEditingAddressId(null);
                                  }}
                                >
                                  <FaTimes /> Cancel
                                </button>
                              </Col>
                            </Row>
                          </div>
                        )}
                        <Row className="g-3 w-100">
                          {loadingAddresses ? (
                            <div className="text-center py-5 w-100">Loading addresses…</div>
                          ) : addresses.length === 0 ? (
                            <div className="text-center py-5 w-100">No addresses found.</div>
                          ) : (
                            addresses.map((address) => (
                              <Col md={6} key={address.id}>
                                <div className={`d_myaccount_address ${address.isDefault ? "d_myaccount_address_default" : ""}`}>
                                  <div className="d_myaccount_address_header">
                                    <h5>{address.name}</h5>
                                    {address.isDefault && <span className="d_badge_pill">Default</span>}
                                  </div>
                                  <p>{address.address}</p>
                                  <p>
                                    {address.city}, {address.state} - {address.pincode}
                                  </p>
                                  <p>Phone: {address.phone}</p>
                                  <div className="d_myaccount_address_actions">
                                    <button onClick={() => handleEditAddress(address)}>
                                      <FaEdit /> Edit
                                    </button>
                                    {!address.isDefault && (
                                      <button onClick={() => handleSetDefaultAddress(address.id)}>Set as Default</button>
                                    )}
                                    <button onClick={() => handleDeleteAddress(address.id)}>
                                      <FaTrash /> Delete
                                    </button>
                                  </div>
                                </div>
                              </Col>
                            ))
                          )}
                        </Row>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="payment">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Payment Methods</h4>
                        {!isAddingPayment && (
                          <button className="d_btn_primary" onClick={handleAddPayment}>
                            <FaPlus /> Add New Card
                          </button>
                        )}
                      </div>
                      <div className="d_myaccount_card_body">
                        {isAddingPayment && (
                          <div className="mb-4 p-4 border rounded">
                            <h5 className="mb-3">Add New Card</h5>
                            <Row className="g-3 w-100">
                              <Col md={12}>
                                <div className="d_myaccount_field">
                                  <label>Card Number</label>
                                  <input
                                    type="text"
                                    value={newPayment.cardNumber}
                                    onChange={(e) => setNewPayment({ ...newPayment, cardNumber: e.target.value })}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength="19"
                                  />
                                </div>
                              </Col>
                              <Col md={6}>
                                <div className="d_myaccount_field">
                                  <label>Cardholder Name</label>
                                  <input
                                    type="text"
                                    value={newPayment.cardName}
                                    onChange={(e) => setNewPayment({ ...newPayment, cardName: e.target.value })}
                                  />
                                </div>
                              </Col>
                              <Col md={3}>
                                <div className="d_myaccount_field">
                                  <label>Expiry (MM/YY)</label>
                                  <input
                                    type="text"
                                    value={newPayment.expiry}
                                    onChange={(e) => setNewPayment({ ...newPayment, expiry: e.target.value })}
                                    placeholder="12/26"
                                    maxLength="5"
                                  />
                                </div>
                              </Col>
                              <Col md={3}>
                                <div className="d_myaccount_field">
                                  <label>CVV</label>
                                  <input
                                    type="password"
                                    value={newPayment.cvv}
                                    onChange={(e) => setNewPayment({ ...newPayment, cvv: e.target.value })}
                                    placeholder="123"
                                    maxLength="4"
                                  />
                                </div>
                              </Col>
                              <Col md={12} className="d-flex gap-2">
                                <button className="d_btn_primary" onClick={handleSavePayment} disabled={loadingPayments}>
                                  <FaCheck /> Add Card
                                </button>
                                <button className="d_btn_outline" onClick={() => setIsAddingPayment(false)}>
                                  <FaTimes /> Cancel
                                </button>
                              </Col>
                            </Row>
                          </div>
                        )}
                        <div className="d_myaccount_payment">
                          {loadingPayments ? (
                            <div className="text-center py-5">Loading payment methods…</div>
                          ) : paymentMethods.length === 0 ? (
                            <div className="text-center py-5">No payment methods found.</div>
                          ) : (
                            paymentMethods.map((pm) => (
                              <div key={pm.id} className="d_myaccount_payment_card">
                                <div className="d_myaccount_payment_card_number">{pm.cardNumber}</div>
                                <div className="d_myaccount_payment_card_details">
                                  <span className="d_myaccount_payment_card_name">{pm.cardName}</span>
                                  <span className="d_myaccount_payment_card_expiry">{pm.expiry}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div className="d_myaccount_payment_card_type">{pm.type}</div>
                                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeletePayment(pm.id)}>
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  <Tab.Pane eventKey="security">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Change Password</h4>
                      </div>
                      <div className="d_myaccount_card_body">
                        {passwordError && <div className="alert alert-danger mb-3">{passwordError}</div>}
                        {passwordSuccess && <div className="alert alert-success mb-3">{passwordSuccess}</div>}
                        <form className="d_myaccount_form" onSubmit={handlePasswordChange}>
                          <Row className="g-3 w-100">
                            <Col md={12}>
                              <div className="d_myaccount_field">
                                <label>Current Password</label>
                                <input
                                  type="password"
                                  value={passwordData.currentPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                  required
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>New Password</label>
                                <input
                                  type="password"
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                  required
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>Confirm New Password</label>
                                <input
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                  required
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <button type="submit" className="d_btn_primary">
                                Update Password
                              </button>
                            </Col>
                          </Row>
                        </form>
                      </div>
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      </div>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered className="d_logout_modal">
        <Modal.Header closeButton className="d_logout_modal_header">
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d_logout_modal_body">
          <FaSignOutAlt className="d_logout_modal_icon" />
          <h5>Are you sure you want to logout?</h5>
          <p>You will be redirected to the login page.</p>
        </Modal.Body>
        <Modal.Footer className="d_logout_modal_footer">
          <button className="d_btn_outline" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </button>
          <button className="d_btn_primary d_btn_danger" onClick={handleLogout}>
            Logout
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyAccount;
