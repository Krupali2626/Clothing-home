import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav, Tab, Table, Badge, Card } from "react-bootstrap";
import {
  FaUser,
  FaChartBar,
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaToggleOn,
  FaToggleOff,
  FaChevronRight,
  FaDollarSign,
  FaClipboardList,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import "./AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data
  const stats = [
    { id: 1, title: "Total Revenue", value: "₹2,45,890", change: "+12.5%", trend: "up", icon: FaDollarSign },
    { id: 2, title: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: FaShoppingCart },
    { id: 3, title: "Total Products", value: "456", change: "+3.1%", trend: "up", icon: FaBox },
    { id: 4, title: "Total Users", value: "892", change: "+15.3%", trend: "up", icon: FaUsers },
  ];

  const recentOrders = [
    { id: "ORD12345", customer: "John Doe", date: "20 Jul 2024", total: 1999, status: "Delivered" },
    { id: "ORD12344", customer: "Jane Smith", date: "19 Jul 2024", total: 2499, status: "Shipped" },
    { id: "ORD12343", customer: "Mike Johnson", date: "18 Jul 2024", total: 1299, status: "Processing" },
    { id: "ORD12342", customer: "Sarah Wilson", date: "17 Jul 2024", total: 3499, status: "Pending" },
    { id: "ORD12341", customer: "Tom Brown", date: "16 Jul 2024", total: 899, status: "Delivered" },
  ];

  const products = [
    { id: 1, name: "Men's Casual Shirt", category: "Clothing", price: 1299, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=60&h=60&fit=crop" },
    { id: 2, name: "Women's Summer Dress", category: "Clothing", price: 1899, stock: 32, status: "Active", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=60&h=60&fit=crop" },
    { id: 3, name: "Smart TV 43 inch", category: "Appliances", price: 24999, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop" },
    { id: 4, name: "Wireless Headphones", category: "Appliances", price: 2999, stock: 28, status: "Inactive", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop" },
    { id: 5, name: "Kids T-Shirt", category: "Clothing", price: 599, stock: 67, status: "Active", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=60&h=60&fit=crop" },
  ];

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", joined: "Jan 2024", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", joined: "Feb 2024", status: "Active" },
    { id: 3, name: "Admin User", email: "admin@store.com", role: "Admin", joined: "Dec 2023", status: "Active" },
    { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "Customer", joined: "Mar 2024", status: "Inactive" },
  ];

  return (
    <div className="d_admin_panel">
      {/* Breadcrumb */}
      <div className="d_admin_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>Admin Panel</li>
        </ol>
        <h1 className="d_cart_heading">Admin Panel</h1>
      </div>

      <div className="container d_section pt-3">
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-4">
            {/* Sidebar */}
            <Col lg={3} className="d_admin_sidebar_col">
              <div className="d_admin_sidebar">
                <div className="d_admin_sidebar_profile">
                  <div className="d_admin_sidebar_avatar">
                    <FaUser />
                  </div>
                  <div className="d_admin_sidebar_user">
                    <h5>Admin User</h5>
                    <p>admin@store.com</p>
                  </div>
                </div>

                <Nav variant="pills" className="d_admin_sidebar_nav">
                  <Nav.Item>
                    <Nav.Link eventKey="dashboard" className={`d_admin_sidebar_link ${activeTab === "dashboard" ? "active" : ""}`}>
                      <FaChartBar /> Dashboard
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="orders" className={`d_admin_sidebar_link ${activeTab === "orders" ? "active" : ""}`}>
                      <FaShoppingCart /> Orders
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="products" className={`d_admin_sidebar_link ${activeTab === "products" ? "active" : ""}`}>
                      <FaBox /> Products
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="users" className={`d_admin_sidebar_link ${activeTab === "users" ? "active" : ""}`}>
                      <FaUsers /> Users
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings" className={`d_admin_sidebar_link ${activeTab === "settings" ? "active" : ""}`}>
                      <FaCog /> Settings
                    </Nav.Link>
                  </Nav.Item>
                  <div className="d_admin_sidebar_divider"></div>
                  <Nav.Item>
                    <button className="d_admin_sidebar_link d_admin_sidebar_logout">
                      <FaSignOutAlt /> Logout
                    </button>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>

            {/* Content */}
            <Col lg={9}>
              <div className="d_admin_content">
                <Tab.Content>
                  {/* Dashboard Tab */}
                  <Tab.Pane eventKey="dashboard">
                    <div className="d_admin_stats">
                      {stats.map((stat) => (
                        <Col key={stat.id} xs={12} sm={6} lg={3}>
                          <Card className="d_stat_card">
                            <div className="d_stat_icon">
                              <stat.icon />
                            </div>
                            <div className="d_stat_info">
                              <h3>{stat.value}</h3>
                              <p>{stat.title}</p>
                              <span className={`d_stat_change ${stat.trend}`}>
                                {stat.trend === "up" ? <FaAngleUp /> : <FaAngleDown />}
                                {stat.change}
                              </span>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </div>

                    <div className="d_myaccount_card mt-4">
                      <div className="d_myaccount_card_header">
                        <h4>Recent Orders</h4>
                        <Link to="/admin-panel/orders" className="d_btn_outline">View All</Link>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentOrders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.customer}</td>
                                  <td>{order.date}</td>
                                  <td>₹{order.total.toLocaleString("en-IN")}</td>
                                  <td>
                                    <Badge className={`d_status_${order.status.toLowerCase()}`}>
                                      {order.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <div className="d_table_actions">
                                      <button className="d_table_action_btn" title="View">
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit">
                                        <FaEdit />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Orders Tab */}
                  <Tab.Pane eventKey="orders">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>All Orders</h4>
                        <div className="d_admin_filters">
                          <select className="d_admin_filter_select">
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recentOrders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.id}</td>
                                  <td>{order.customer}</td>
                                  <td>{order.date}</td>
                                  <td>₹{order.total.toLocaleString("en-IN")}</td>
                                  <td>
                                    <Badge className={`d_status_${order.status.toLowerCase()}`}>
                                      {order.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <div className="d_table_actions">
                                      <button className="d_table_action_btn" title="View">
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit">
                                        <FaEdit />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Products Tab */}
                  <Tab.Pane eventKey="products">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Products</h4>
                        <button className="d_btn_primary">
                          <FaPlus /> Add Product
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {products.map((product) => (
                                <tr key={product.id}>
                                  <td>
                                    <img src={product.image} alt={product.name} className="d_admin_product_img" />
                                  </td>
                                  <td>{product.name}</td>
                                  <td>{product.category}</td>
                                  <td>₹{product.price.toLocaleString("en-IN")}</td>
                                  <td>{product.stock}</td>
                                  <td>
                                    <Badge className={product.status === "Active" ? "d_status_active" : "d_status_inactive"}>
                                      {product.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <div className="d_table_actions">
                                      <button className="d_table_action_btn" title="View">
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit">
                                        <FaEdit />
                                      </button>
                                      <button className="d_table_action_btn d_table_action_btn_delete" title="Delete">
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Users Tab */}
                  <Tab.Pane eventKey="users">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Users</h4>
                        <button className="d_btn_primary">
                          <FaPlus /> Add User
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => (
                                <tr key={user.id}>
                                  <td>{user.name}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>{user.joined}</td>
                                  <td>
                                    <Badge className={user.status === "Active" ? "d_status_active" : "d_status_inactive"}>
                                      {user.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    <div className="d_table_actions">
                                      <button className="d_table_action_btn" title="View">
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit">
                                        <FaEdit />
                                      </button>
                                      <button className="d_table_action_btn d_table_action_btn_delete" title="Delete">
                                        <FaTrash />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Settings Tab */}
                  <Tab.Pane eventKey="settings">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Settings</h4>
                      </div>
                      <div className="d_myaccount_card_body">
                        <Row className="g-4">
                          <Col md={6}>
                            <div className="d_setting_section">
                              <h5>Store Settings</h5>
                              <div className="d_myaccount_field">
                                <label>Store Name</label>
                                <input type="text" defaultValue="D.Store" />
                              </div>
                              <div className="d_myaccount_field">
                                <label>Store Email</label>
                                <input type="email" defaultValue="info@store.com" />
                              </div>
                              <div className="d_myaccount_field">
                                <label>Phone Number</label>
                                <input type="tel" defaultValue="+91 12345 67890" />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d_setting_section">
                              <h5>Notification Settings</h5>
                              <div className="d_setting_toggle">
                                <span>Email Notifications</span>
                                <button className="d_toggle_btn d_toggle_active">
                                  <FaToggleOn />
                                </button>
                              </div>
                              <div className="d_setting_toggle">
                                <span>SMS Notifications</span>
                                <button className="d_toggle_btn d_toggle_inactive">
                                  <FaToggleOff />
                                </button>
                              </div>
                              <div className="d_setting_toggle">
                                <span>Order Alerts</span>
                                <button className="d_toggle_btn d_toggle_active">
                                  <FaToggleOn />
                                </button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <button className="d_btn_primary">Save Changes</button>
                        </div>
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

export default AdminPanel;
