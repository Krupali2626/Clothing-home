
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav, Tab, Table, Badge } from "react-bootstrap";
import {
  FaUser,
  FaHome,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBox,
  FaHeart,
  FaLock,
  FaSignOutAlt,
  FaEdit,
  FaChevronRight,
  FaTruck,
  FaCog,
  FaChartBar,
  FaBoxOpen,
  FaUsers,
  FaPlus,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import "./MyAccount.css";
import products from "../data/products";
import blogs from "../data/blogs";
import ProductCard from "../components/common/ProductCard";
import { useShop } from "../context/ShopContext";

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [activeAdminTab, setActiveAdminTab] = useState("dashboard");
  const { wishlist, clearWishlist } = useShop();

  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    isAdmin: true,
  };

  const addresses = [
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
  ];

  const orders = [
    {
      id: "ORD12345",
      date: "12 July 2024",
      status: "Delivered",
      total: 1999,
      items: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
    },
    {
      id: "ORD12344",
      date: "8 July 2024",
      status: "Shipped",
      total: 2499,
      items: 1,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop",
    },
    {
      id: "ORD12343",
      date: "1 July 2024",
      status: "Processing",
      total: 1299,
      items: 3,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=100&h=100&fit=crop",
    },
  ];

  return (
    <div className="d_myaccount_page">
      {/* Breadcrumb */}
      <div className="d_myaccount_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>My Account</li>
        </ol>
        <h1 className="d_cart_heading">My Account</h1>
      </div>

      <div className="container d_section pt-3">
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-4">
            {/* Sidebar */}
            <Col lg={3} className="d_myaccount_sidebar_col">
              <div className="d_myaccount_sidebar">
                <div className="d_myaccount_sidebar_profile">
                  <div className="d_myaccount_sidebar_avatar">
                    <FaUser />
                  </div>
                  <div className="d_myaccount_sidebar_user">
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                  </div>
                </div>

                <Nav variant="pills" className="d_myaccount_sidebar_nav">
                  <Nav.Item>
                    <Nav.Link eventKey="profile" className={`d_myaccount_sidebar_link ${activeTab === "profile" ? "active" : ""}`}>
                      <FaUser /> Profile
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className={`d_myaccount_sidebar_link ${activeTab === "orders" ? "active" : ""}`}>
                      <FaBox /> My Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="addresses" className={`d_myaccount_sidebar_link ${activeTab === "addresses" ? "active" : ""}`}>
                      <FaMapMarkerAlt /> Addresses
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="payment" className={`d_myaccount_sidebar_link ${activeTab === "payment" ? "active" : ""}`}>
                      <FaCreditCard /> Payment Methods
                    </Nav.Link>
                  </Nav.Item>
               
                  <Nav.Item>
                    <Nav.Link eventKey="wishlist" className={`d_myaccount_sidebar_link ${activeTab === "wishlist" ? "active" : ""}`}>
                      <FaHeart /> Wishlist
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="security" className={`d_myaccount_sidebar_link ${activeTab === "security" ? "active" : ""}`}>
                      <FaLock /> Change Password
                    </Nav.Link>
                  </Nav.Item>
                  <div className="d_myaccount_sidebar_divider"></div>
                  <Nav.Item>
                    <button className="d_myaccount_sidebar_link d_myaccount_sidebar_logout">
                      <FaSignOutAlt /> Logout
                    </button>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>

            {/* Content */}
            <Col lg={9}>
              <div className="d_myaccount_content">
                <Tab.Content>
                  {/* Profile Tab */}
                  <Tab.Pane eventKey="profile">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Profile Information</h4>
                        <button className="d_myaccount_edit_btn">
                          <FaEdit /> Edit
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <Row className="g-3">
                          <Col md={6}>
                            <div className="d_myaccount_field">
                              <label>Full Name</label>
                              <p>{user.name}</p>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d_myaccount_field">
                              <label>Email Address</label>
                              <p>{user.email}</p>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d_myaccount_field">
                              <label>Phone Number</label>
                              <p>{user.phone}</p>
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
                                <button className="d_btn_primary d_myaccount_order_btn">
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
                          <Row className="g-3">
                            {wishlist.map((product) => (
                              <Col xs={6} md={4} lg={3} key={product.id}>
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
                        <button className="d_btn_primary">Add New Address</button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <Row className="g-3">
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
                                  <button><FaEdit /> Edit</button>
                                  {!address.isDefault && <button>Set as Default</button>}
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
                        <button className="d_btn_primary">Add New Card</button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_myaccount_payment">
                          <div className="d_myaccount_payment_card">
                            <div className="d_myaccount_payment_card_number">•••• •••• •••• 4242</div>
                            <div className="d_myaccount_payment_card_details">
                              <span className="d_myaccount_payment_card_name">John Doe</span>
                              <span className="d_myaccount_payment_card_expiry">12/26</span>
                            </div>
                            <div className="d_myaccount_payment_card_type">VISA</div>
                          </div>
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
                        <form className="d_myaccount_form">
                          <Row className="g-3">
                            <Col md={12}>
                              <div className="d_myaccount_field">
                                <label>Current Password</label>
                                <input type="password" placeholder="••••••••" />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>New Password</label>
                                <input type="password" placeholder="••••••••" />
                              </div>
                            </Col>
                            <Col md={6}>
                              <div className="d_myaccount_field">
                                <label>Confirm New Password</label>
                                <input type="password" placeholder="••••••••" />
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
    </div>
  );
};

export default MyAccount;