import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Nav, Tab, Table, Badge, Card, Modal, Form, Button } from "react-bootstrap";
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
  FaAngleUp,
  FaAngleDown,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import "./AdminPanel.css";
import "./AdminPanelForms.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data
  const stats = [
    { id: 1, title: "Total Revenue", value: "₹2,45,890", change: "+12.5%", trend: "up", icon: FaDollarSign },
    { id: 2, title: "Total Orders", value: "1,234", change: "+8.2%", trend: "up", icon: FaShoppingCart },
    { id: 3, title: "Total Products", value: "456", change: "+3.1%", trend: "up", icon: FaBox },
    { id: 4, title: "Total Users", value: "892", change: "+15.3%", trend: "up", icon: FaUsers },
  ];

  const [orders, setOrders] = useState([
    { id: "ORD12345", customer: "John Doe", date: "20 Jul 2024", total: 1999, status: "Delivered" },
    { id: "ORD12344", customer: "Jane Smith", date: "19 Jul 2024", total: 2499, status: "Shipped" },
    { id: "ORD12343", customer: "Mike Johnson", date: "18 Jul 2024", total: 1299, status: "Processing" },
    { id: "ORD12342", customer: "Sarah Wilson", date: "17 Jul 2024", total: 3499, status: "Pending" },
    { id: "ORD12341", customer: "Tom Brown", date: "16 Jul 2024", total: 899, status: "Delivered" },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Men's Casual Shirt", category: "Clothing", price: 1299, stock: 45, status: "Active", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=60&h=60&fit=crop" },
    { id: 2, name: "Women's Summer Dress", category: "Clothing", price: 1899, stock: 32, status: "Active", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=60&h=60&fit=crop" },
    { id: 3, name: "Smart TV 43 inch", category: "Appliances", price: 24999, stock: 12, status: "Active", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=60&h=60&fit=crop" },
    { id: 4, name: "Wireless Headphones", category: "Appliances", price: 2999, stock: 28, status: "Inactive", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=60&h=60&fit=crop" },
    { id: 5, name: "Kids T-Shirt", category: "Clothing", price: 599, stock: 67, status: "Active", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=60&h=60&fit=crop" },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Customer", joined: "Jan 2024", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Customer", joined: "Feb 2024", status: "Active" },
    { id: 3, name: "Admin User", email: "admin@store.com", role: "Admin", joined: "Dec 2023", status: "Active" },
    { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "Customer", joined: "Mar 2024", status: "Inactive" },
  ]);

  // Modal state
  const [modal, setModal] = useState({ type: null, mode: null, data: null });
  // type: "product" | "user" | "order", mode: "add" | "edit" | "view"

  const openModal = (type, mode, data = null) => {
    setModal({ type, mode, data });
  };

  const closeModal = () => {
    setModal({ type: null, mode: null, data: null });
  };

  // Form state for product/user
  const [form, setForm] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openAdd = (type) => {
    const empty =
      type === "product"
        ? { name: "", category: "Clothing", price: "", stock: "", status: "Active", image: "" }
        : { name: "", email: "", role: "Customer", status: "Active" };
    setForm(empty);
    openModal(type, "add");
  };

  const openEdit = (type, item) => {
    setForm({ ...item });
    openModal(type, "edit", item);
  };

  const handleSave = (type) => {
    if (type === "product") {
      const payload = {
        ...form,
        price: Number(form.price) || 0,
        stock: Number(form.stock) || 0,
        image: form.image || "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=60&h=60&fit=crop",
      };
      if (modal.data) {
        setProducts((prev) =>
          prev.map((p) => (p.id === modal.data.id ? { ...p, ...payload } : p))
        );
      } else {
        setProducts((prev) => [
          { ...payload, id: Date.now() },
          ...prev,
        ]);
      }
    } else if (type === "user") {
      if (modal.data) {
        setUsers((prev) =>
          prev.map((u) => (u.id === modal.data.id ? { ...u, ...form } : u))
        );
      } else {
        setUsers((prev) => [
          { ...form, id: Date.now(), joined: new Date().toLocaleString("en-IN", { month: "short", year: "numeric" }) },
          ...prev,
        ]);
      }
    }
    closeModal();
  };

  const handleDelete = (type, id) => {
    if (type === "product") setProducts((prev) => prev.filter((p) => p.id !== id));
    else if (type === "user") setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const isView = modal.mode === "view";

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
                              {orders.slice(0, 5).map((order) => (
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
                                      <button className="d_table_action_btn" title="View" onClick={() => openModal("order", "view", order)}>
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit" onClick={() => openModal("order", "edit", order)}>
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
                              {orders.map((order) => (
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
                                      <button className="d_table_action_btn" title="View" onClick={() => openModal("order", "view", order)}>
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit" onClick={() => openModal("order", "edit", order)}>
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
                        <button className="d_btn_primary" onClick={() => openAdd("product")}>
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
                                      <button className="d_table_action_btn" title="View" onClick={() => openModal("product", "view", product)}>
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit" onClick={() => openEdit("product", product)}>
                                        <FaEdit />
                                      </button>
                                      <button className="d_table_action_btn d_table_action_btn_delete" title="Delete" onClick={() => handleDelete("product", product.id)}>
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
                        <button className="d_btn_primary" onClick={() => openAdd("user")}>
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
                                      <button className="d_table_action_btn" title="View" onClick={() => openModal("user", "view", user)}>
                                        <FaEye />
                                      </button>
                                      <button className="d_table_action_btn" title="Edit" onClick={() => openEdit("user", user)}>
                                        <FaEdit />
                                      </button>
                                      <button className="d_table_action_btn d_table_action_btn_delete" title="Delete" onClick={() => handleDelete("user", user.id)}>
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

      {/* ============ MODAL ============ */}
      <Modal
        show={modal.type !== null}
        onHide={closeModal}
        centered
        className="d_admin_modal"
        backdrop="static"
      >
        <Modal.Header className="d_admin_modal_header">
          <Modal.Title className="d_admin_modal_title">
            {modal.mode === "add" && (modal.type === "product" ? "Add Product" : "Add User")}
            {modal.mode === "edit" && (modal.type === "product" ? "Edit Product" : "Edit User")}
            {modal.mode === "view" && (modal.type === "product" ? "Product Details" : modal.type === "user" ? "User Details" : "Order Details")}
          </Modal.Title>
          <button className="d_admin_modal_close" onClick={closeModal} aria-label="Close">
            <FaTimes />
          </button>
        </Modal.Header>

        <Modal.Body className="d_admin_modal_body">
          {/* PRODUCT FORM */}
          {modal.type === "product" && (
            isView ? (
              <div className="d_admin_view_grid">
                <img src={modal.data?.image} alt={modal.data?.name} className="d_admin_view_img" />
                <div className="d_admin_view_row"><span>Name</span><strong>{modal.data?.name}</strong></div>
                <div className="d_admin_view_row"><span>Category</span><strong>{modal.data?.category}</strong></div>
                <div className="d_admin_view_row"><span>Price</span><strong>₹{Number(modal.data?.price).toLocaleString("en-IN")}</strong></div>
                <div className="d_admin_view_row"><span>Stock</span><strong>{modal.data?.stock}</strong></div>
                <div className="d_admin_view_row"><span>Status</span><strong>{modal.data?.status}</strong></div>
              </div>
            ) : (
              <Form className="d_admin_form">
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control name="name" value={form.name || ""} onChange={handleFormChange} placeholder="Enter product name" />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Category</Form.Label>
                  <Form.Select name="category" value={form.category || ""} onChange={handleFormChange}>
                    <option>Clothing</option>
                    <option>Appliances</option>
                    <option>Footwear</option>
                    <option>Accessories</option>
                  </Form.Select>
                </Form.Group>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Price (₹)</Form.Label>
                      <Form.Control type="number" name="price" value={form.price || ""} onChange={handleFormChange} placeholder="0" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control type="number" name="stock" value={form.stock || ""} onChange={handleFormChange} placeholder="0" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" value={form.image || ""} onChange={handleFormChange} placeholder="https://..." />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={form.status || ""} onChange={handleFormChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            )
          )}

          {/* USER FORM */}
          {modal.type === "user" && (
            isView ? (
              <div className="d_admin_view_grid">
                <div className="d_admin_view_row"><span>Name</span><strong>{modal.data?.name}</strong></div>
                <div className="d_admin_view_row"><span>Email</span><strong>{modal.data?.email}</strong></div>
                <div className="d_admin_view_row"><span>Role</span><strong>{modal.data?.role}</strong></div>
                <div className="d_admin_view_row"><span>Joined</span><strong>{modal.data?.joined}</strong></div>
                <div className="d_admin_view_row"><span>Status</span><strong>{modal.data?.status}</strong></div>
              </div>
            ) : (
              <Form className="d_admin_form">
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="name" value={form.name || ""} onChange={handleFormChange} placeholder="Enter full name" />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email || ""} onChange={handleFormChange} placeholder="email@example.com" />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={form.role || ""} onChange={handleFormChange}>
                    <option>Customer</option>
                    <option>Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={form.status || ""} onChange={handleFormChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            )
          )}

          {/* ORDER VIEW/EDIT */}
          {modal.type === "order" && (
            isView ? (
              <div className="d_admin_view_grid">
                <div className="d_admin_view_row"><span>Order ID</span><strong>{modal.data?.id}</strong></div>
                <div className="d_admin_view_row"><span>Customer</span><strong>{modal.data?.customer}</strong></div>
                <div className="d_admin_view_row"><span>Date</span><strong>{modal.data?.date}</strong></div>
                <div className="d_admin_view_row"><span>Total</span><strong>₹{Number(modal.data?.total).toLocaleString("en-IN")}</strong></div>
                <div className="d_admin_view_row"><span>Status</span><strong>{modal.data?.status}</strong></div>
              </div>
            ) : (
              <Form className="d_admin_form">
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Order ID</Form.Label>
                  <Form.Control value={modal.data?.id} disabled />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Customer</Form.Label>
                  <Form.Control value={modal.data?.customer} disabled />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={modal.data?.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setOrders((prev) =>
                        prev.map((o) => (o.id === modal.data.id ? { ...o, status: newStatus } : o))
                      );
                      setModal((m) => ({ ...m, data: { ...m.data, status: newStatus } }));
                    }}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            )
          )}
        </Modal.Body>

        <Modal.Footer className="d_admin_modal_footer">
          <Button variant="light" className="d_admin_btn_cancel" onClick={closeModal}>
            {isView ? "Close" : "Cancel"}
          </Button>
          {!isView && (
            <Button className="d_admin_btn_save" onClick={() => handleSave(modal.type)}>
              <FaSave /> {modal.mode === "add" ? "Create" : "Update"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
