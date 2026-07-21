
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  FaTruck,
  FaShippingFast,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";
import "./MyAccount.css";
import ProductCard from "../components/common/ProductCard";
import { useShop } from "../context/ShopContext";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { wishlist, clearWishlist } = useShop();

  // Logout Modal State
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Profile State
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    isAdmin: true,
    profileImage: null,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123, Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phone: "+91 98765 43210",
      isDefault: true,
    },
    {
      id: 2,
      name: "John Doe",
      address: "456, Park Avenue",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      phone: "+91 98765 43210",
      isDefault: false,
    },
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    isDefault: false,
  });

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: "•••• •••• •••• 4242",
      cardName: "John Doe",
      expiry: "12/26",
      type: "VISA",
    },
  ]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Orders State
  const [orders] = useState([
    {
      id: "ORD12345",
      date: "12 July 2024",
      status: "Delivered",
      total: 1999,
      items: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      products: [
        {
          name: "Premium Cotton T-Shirt",
          price: 999,
          quantity: 1,
          size: "M",
          color: "Navy Blue",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
        },
        {
          name: "Classic Denim Jeans",
          price: 1000,
          quantity: 1,
          size: "32",
          color: "Blue",
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=100&h=100&fit=crop",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123, Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 98765 43210",
      },
      paymentMethod: "Credit Card (•••• •••• •••• 4242)",
      deliveryDate: "15 July 2024",
      trackingNumber: "TRK123456789",
      timeline: [
        { status: "Order Placed", date: "12 July 2024, 10:30 AM", completed: true },
        { status: "Processing", date: "12 July 2024, 2:00 PM", completed: true },
        { status: "Shipped", date: "13 July 2024, 9:00 AM", completed: true },
        { status: "Out for Delivery", date: "15 July 2024, 8:00 AM", completed: true },
        { status: "Delivered", date: "15 July 2024, 12:30 PM", completed: true },
      ],
    },
    {
      id: "ORD12344",
      date: "8 July 2024",
      status: "Shipped",
      total: 2499,
      items: 1,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
      products: [
        {
          name: "Leather Jacket",
          price: 2499,
          quantity: 1,
          size: "L",
          color: "Black",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "456, Park Avenue",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001",
        phone: "+91 98765 43210",
      },
      paymentMethod: "UPI",
      deliveryDate: "11 July 2024",
      trackingNumber: "TRK987654321",
      timeline: [
        { status: "Order Placed", date: "8 July 2024, 11:00 AM", completed: true },
        { status: "Processing", date: "8 July 2024, 3:30 PM", completed: true },
        { status: "Shipped", date: "9 July 2024, 10:00 AM", completed: true },
        { status: "Out for Delivery", date: "", completed: false },
        { status: "Delivered", date: "", completed: false },
      ],
    },
    {
      id: "ORD12343",
      date: "1 July 2024",
      status: "Processing",
      total: 1299,
      items: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
      products: [
        {
          name: "Casual Shirt",
          price: 499,
          quantity: 2,
          size: "M",
          color: "White",
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
        },
        {
          name: "Summer Shorts",
          price: 301,
          quantity: 1,
          size: "30",
          color: "Khaki",
          image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop",
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123, Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 98765 43210",
      },
      paymentMethod: "Cash on Delivery",
      deliveryDate: "4 July 2024",
      trackingNumber: "TRK456123789",
      timeline: [
        { status: "Order Placed", date: "1 July 2024, 9:45 AM", completed: true },
        { status: "Processing", date: "1 July 2024, 1:15 PM", completed: true },
        { status: "Shipped", date: "", completed: false },
        { status: "Out for Delivery", date: "", completed: false },
        { status: "Delivered", date: "", completed: false },
      ],
    },
  ]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Profile Image Upload Handler
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

  // Profile Functions
  const handleProfileEdit = () => {
    setIsEditingProfile(true);
  };
  const handleProfileSave = () => {
    setUser({ ...editedUser });
    setIsEditingProfile(false);
  };
  const handleProfileCancel = () => {
    setEditedUser({ ...user });
    setIsEditingProfile(false);
  };

  // Logout Functions
  const handleLogout = () => {
    // Add actual logout logic here (clear context, redirect, etc.)
    console.log("User logged out");
    setShowLogoutModal(false);
  };

  // Address Functions
  const handleAddAddress = () => {
    setIsAddingAddress(true);
    setEditingAddressId(null);
    setNewAddress({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      isDefault: false,
    });
  };
  const handleEditAddress = (address) => {
    setEditingAddressId(address.id);
    setIsAddingAddress(true);
    setNewAddress({ ...address });
  };
  const handleSaveAddress = () => {
    if (editingAddressId) {
      // Update existing address
      setAddresses(addresses.map((addr) =>
        addr.id === editingAddressId
          ? { ...newAddress, id: editingAddressId }
          : newAddress.isDefault
          ? { ...addr, isDefault: false }
          : addr
      ));
    } else {
      // Add new address
      const newId = Date.now();
      setAddresses([
        ...addresses.map((addr) =>
          newAddress.isDefault ? { ...addr, isDefault: false } : addr
        ),
        { ...newAddress, id: newId },
      ]);
    }
    setIsAddingAddress(false);
    setEditingAddressId(null);
  };
  const handleDeleteAddress = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };
  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    })));
  };

  // Payment Methods Functions
  const handleAddPayment = () => {
    setIsAddingPayment(true);
    setNewPayment({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    });
  };
  const handleSavePayment = () => {
    // Mask card number
    const maskedCard = "•••• •••• •••• " + newPayment.cardNumber.slice(-4);
    const newId = Date.now();
    setPaymentMethods([
      ...paymentMethods,
      {
        id: newId,
        cardNumber: maskedCard,
        cardName: newPayment.cardName,
        expiry: newPayment.expiry,
        type: "VISA", // Default, could be determined from card number
      },
    ]);
    setIsAddingPayment(false);
  };
  const handleDeletePayment = (id) => {
    if (window.confirm("Are you sure you want to delete this payment method?")) {
      setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
    }
  };

  // Password Functions
  const handlePasswordChange = (e) => {
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

    // Simulate successful password change
    setPasswordSuccess("Password changed successfully!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="d_myaccount_page">
      {/* Hero Breadcrumb */}
      <div className="d_myaccount_hero">
        <div className="container">
          {/* <ol className="d_breadcrumb_dark">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>My Account</li>
          </ol> */}
          <h1 className="d_myaccount_hero_title">My Account</h1>
          <p className="d_myaccount_hero_subtitle">Manage your profile, orders, and preferences</p>
        </div>
      </div>

      <div className="container d_section pt-4">
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-5 w-100 ">
            {/* Sidebar */}
            <Col lg={4} className="d_myaccount_sidebar_col">
              <div className="d_myaccount_sidebar">
                <div className="d_myaccount_sidebar_profile">
                  <div className="d_myaccount_sidebar_avatar">
                    {user.profileImage ? (
                      <img src={user.profileImage} alt="Profile" />
                    ) : (
                      <FaUser />
                    )}
                  </div>
                  <div className="d_myaccount_sidebar_user">
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                    <span className="d_myaccount_member_badge">Super Admin</span>
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
                  {/* {user.isAdmin && (
                    <Nav.Item>
                      <Link to="/admin-panel" className="d_myaccount_sidebar_link">
                        <FaCog /> Admin Panel
                      </Link>
                    </Nav.Item>
                  )} */}
                  <div className="d_myaccount_sidebar_divider"></div>
                  <Nav.Item>
                    <button className="d_myaccount_sidebar_link d_myaccount_sidebar_logout" onClick={() => setShowLogoutModal(true)}>
                      <FaSignOutAlt /> <span>Logout</span>
                    </button>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>

            {/* Content */}
            <Col lg={8}>
              <div className="d_myaccount_content">
                <Tab.Content>
                  {/* Profile Tab */}
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
                            <button className="d_btn_primary" onClick={handleProfileSave}>
                              <FaCheck /> Save
                            </button>
                            <button className="d_btn_outline" onClick={handleProfileCancel}>
                              <FaTimes /> Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="d_myaccount_card_body">
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
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleProfileImageChange}
                                  style={{ display: "none" }}
                                />
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
                                <p>{user.phone}</p>
                              )}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d_myaccount_field">
                              <label>Date Joined</label>
                              <p>1 January 2024</p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Orders Tab */}
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
                              <button
                                className="d_btn_outline"
                                onClick={() => setSelectedOrder(null)}
                              >
                                <FaTimes /> Close
                              </button>
                            </div>

                            {/* Order Summary */}
                            <div className="d_myaccount_order_summary mb-4">
                              <Row className="g-3 w-100">
                                <Col md={6}>
                                  <p className="mb-2"><strong>Order Date:</strong> {selectedOrder.date}</p>
                                  <p className="mb-2"><strong>Status:</strong> <span className={`d_badge_pill d_status_${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
                                  <p className="mb-2"><strong>Total Items:</strong> {selectedOrder.items}</p>
                                  <p><strong>Total Amount:</strong> ₹{selectedOrder.total.toLocaleString("en-IN")}</p>
                                </Col>
                                <Col md={6}>
                                  <p className="mb-2"><strong>Tracking Number:</strong> {selectedOrder.trackingNumber}</p>
                                  <p className="mb-2"><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
                                  <p><strong>Estimated Delivery:</strong> {selectedOrder.deliveryDate}</p>
                                </Col>
                              </Row>
                            </div>

                            {/* Order Timeline */}
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

                            {/* Products */}
                            <div className="d_myaccount_order_products mb-4">
                              <h6 className="mb-3">Products</h6>
                              {selectedOrder.products.map((product, index) => (
                                <div key={index} className="d_myaccount_order_product">
                                  <img src={product.image} alt={product.name} />
                                  <div className="d_myaccount_order_product_info">
                                    <h6>{product.name}</h6>
                                    <p>Size: {product.size} | Color: {product.color} | Qty: {product.quantity}</p>
                                  </div>
                                  <div className="d_myaccount_order_product_price">
                                    <h6>₹{product.price.toLocaleString("en-IN")}</h6>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Shipping Address */}
                            <div className="d_myaccount_shipping_address">
                              <h6 className="mb-3">Shipping Address</h6>
                              <p>{selectedOrder.shippingAddress.name}</p>
                              <p>{selectedOrder.shippingAddress.address}</p>
                              <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}</p>
                              <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                            </div>
                          </div>
                        )}
                        <div className="d_myaccount_orders">
                          {orders.map((order) => (
                            <div key={order.id} className="d_myaccount_order">
                              <div className="d_myaccount_order_header">
                                <div className="d_myaccount_order_info">
                                  <span className="d_myaccount_order_id">Order {order.id}</span>
                                  <span className="d_myaccount_order_date">Placed on {order.date}</span>
                                </div>
                                <span className={`d_myaccount_order_status d_status_${order.status.toLowerCase()}`}>{order.status}</span>
                              </div>
                              <div className="d_myaccount_order_body">
                                <img src={order.image} alt="Order product" />
                                <div className="d_myaccount_order_details">
                                  <p>{order.items} items</p>
                                  <h5>Total: ₹{order.total.toLocaleString("en-IN")}</h5>
                                </div>
                                <button
                                  className="d_btn_primary d_myaccount_order_btn"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  View Details <FaChevronRight size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Wishlist Tab */}
                  <Tab.Pane eventKey="wishlist">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>My Wishlist</h4>
                        {wishlist.length > 0 && (
                          <button
                            className="d_btn_outline"
                            onClick={() => clearWishlist()}
                          >
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
                              <Col xs={6} lg={4} key={product.id}>
                                <ProductCard product={product} />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Addresses Tab */}
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
                                    value={newAddress.name}
                                    onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                                    placeholder="Enter full name"
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
                                    placeholder="Enter phone number"
                                  />
                                </div>
                              </Col>
                              <Col md={12}>
                                <div className="d_myaccount_field">
                                  <label>Address</label>
                                  <textarea
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    placeholder="Enter full address"
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
                                    placeholder="Enter city"
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
                                    placeholder="Enter state"
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
                                    placeholder="Enter pincode"
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
                                  <label htmlFor="defaultAddress" className="mb-0">Set as default address</label>
                                </div>
                              </Col>
                              <Col md={12} className="d-flex gap-2">
                                <button className="d_btn_primary" onClick={handleSaveAddress}>
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
                          {addresses.map((address) => (
                            <Col md={6} key={address.id}>
                              <div className={`d_myaccount_address ${address.isDefault ? "d_myaccount_address_default" : ""}`}>
                                <div className="d_myaccount_address_header">
                                  <h5>{address.name}</h5>
                                  {address.isDefault && <span className="d_badge_pill">Default</span>}
                                </div>
                                <p>{address.address}</p>
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <p>Phone: {address.phone}</p>
                                <div className="d_myaccount_address_actions">
                                  <button onClick={() => handleEditAddress(address)}><FaEdit /> Edit</button>
                                  {!address.isDefault && <button onClick={() => handleSetDefaultAddress(address.id)}>Set as Default</button>}
                                  <button onClick={() => handleDeleteAddress(address.id)}><FaTrash /> Delete</button>
                                </div>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Payment Tab */}
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
                                    placeholder="John Doe"
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
                                <button className="d_btn_primary" onClick={handleSavePayment}>
                                  <FaCheck /> Add Card
                                </button>
                                <button
                                  className="d_btn_outline"
                                  onClick={() => setIsAddingPayment(false)}
                                >
                                  <FaTimes /> Cancel
                                </button>
                              </Col>
                            </Row>
                          </div>
                        )}
                        <div className="d_myaccount_payment">
                          {paymentMethods.map((pm) => (
                            <div key={pm.id} className="d_myaccount_payment_card">
                              <div className="d_myaccount_payment_card_number">{pm.cardNumber}</div>
                              <div className="d_myaccount_payment_card_details">
                                <span className="d_myaccount_payment_card_name">{pm.cardName}</span>
                                <span className="d_myaccount_payment_card_expiry">{pm.expiry}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d_myaccount_payment_card_type">{pm.type}</div>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeletePayment(pm.id)}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Security Tab */}
                  <Tab.Pane eventKey="security">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Change Password</h4>
                      </div>
                      <div className="d_myaccount_card_body">
                        {passwordError && (
                          <div className="alert alert-danger mb-3">{passwordError}</div>
                        )}
                        {passwordSuccess && (
                          <div className="alert alert-success mb-3">{passwordSuccess}</div>
                        )}
                        <form className="d_myaccount_form" onSubmit={handlePasswordChange}>
                          <Row className="g-3 w-100">
                            <Col md={12}>
                              <div className="d_myaccount_field">
                                <label>Current Password</label>
                                <input
                                  type="password"
                                  placeholder="••••••••"
                                  value={passwordData.currentPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>New Password</label>
                                <input
                                  type="password"
                                  placeholder="••••••••"
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>Confirm New Password</label>
                                <input
                                  type="password"
                                  placeholder="••••••••"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                />
                              </div>
                            </Col>
                            <Col md={12}>
                              <button type="submit" className="d_btn_primary">Update Password</button>
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

      {/* Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
        className="d_logout_modal"
      >
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
