import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  FaList,
  FaBullhorn,
} from "react-icons/fa";
import "./AdminPanel.css";
import "./AdminPanelForms.css";
import {
  productAPI,
  categoryAPI,
  orderAPI,
  userAPI,
  statsAPI,
  settingsAPI,
  advertisementAPI,
} from "../services/api";
import { useShop } from "../context/ShopContext";

const formatStatus = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "Pending");
const toStatusKey = (s) => String(s || "pending").toLowerCase();

const formatPct = (n) => {
  const v = Number(n) || 0;
  return `${v >= 0 ? "+" : ""}${v}%`;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useShop();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingAds, setLoadingAds] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");

  const [adminProfile, setAdminProfile] = useState({
    name: authUser?.name || "Admin",
    email: authUser?.email || "",
  });

  const [stats, setStats] = useState([
    { id: 1, title: "Total Revenue", value: "₹0", change: "0%", trend: "up", icon: FaDollarSign },
    { id: 2, title: "Total Orders", value: "0", change: "0%", trend: "up", icon: FaShoppingCart },
    { id: 3, title: "Total Products", value: "0", change: "0%", trend: "up", icon: FaBox },
    { id: 4, title: "Total Users", value: "0", change: "0%", trend: "up", icon: FaUsers },
  ]);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [settings, setSettings] = useState({
    storeName: "D.Store",
    storeEmail: "info@store.com",
    storePhone: "+91 12345 67890",
    emailNotifications: true,
    smsNotifications: false,
    orderAlerts: true,
  });

  const [modal, setModal] = useState({ type: null, mode: null, data: null });
  const [form, setForm] = useState({});

  const mapOrder = (o) => ({
    _id: o._id,
    id: o.orderNumber || o._id,
    orderNumber: o.orderNumber,
    customer: o.user?.name || o.customer || "Unknown",
    email: o.user?.email || o.email || "",
    date: o.createdAt
      ? new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
      : o.date || "",
    total: o.totalPrice ?? o.total ?? 0,
    status: toStatusKey(o.status),
    items: o.items || [],
    itemCount: Array.isArray(o.items) ? o.items.length : o.items || 0,
    shippingAddress: o.shippingAddress || null,
    paymentMethod: o.paymentMethod || "",
    paymentStatus: o.paymentStatus || "",
    statusHistory: o.statusHistory || [],
    estimatedDelivery: o.estimatedDelivery || null,
    createdAt: o.createdAt,
  });

  const loadProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await productAPI.getAllProducts({ limit: 200 });
      setProducts(res.products || []);
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await categoryAPI.getAllCategories();
      setCategories(res.categories || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const res = await statsAPI.getStats();
      if (res.success && res.stats) {
        const s = res.stats;
        setStats([
          {
            id: 1,
            title: "Total Revenue",
            value: `₹${(s.totalRevenue || 0).toLocaleString("en-IN")}`,
            change: formatPct(s.revenueChange),
            trend: (s.revenueChange || 0) >= 0 ? "up" : "down",
            icon: FaDollarSign,
          },
          {
            id: 2,
            title: "Total Orders",
            value: (s.totalOrders || 0).toLocaleString("en-IN"),
            change: formatPct(s.ordersChange),
            trend: (s.ordersChange || 0) >= 0 ? "up" : "down",
            icon: FaShoppingCart,
          },
          {
            id: 3,
            title: "Total Products",
            value: (s.totalProducts || 0).toLocaleString("en-IN"),
            change: formatPct(s.productsChange),
            trend: (s.productsChange || 0) >= 0 ? "up" : "down",
            icon: FaBox,
          },
          {
            id: 4,
            title: "Total Users",
            value: (s.totalUsers || 0).toLocaleString("en-IN"),
            change: formatPct(s.usersChange),
            trend: (s.usersChange || 0) >= 0 ? "up" : "down",
            icon: FaUsers,
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to load stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  const loadOrders = async (status = orderStatusFilter) => {
    try {
      setLoadingOrders(true);
      const res = await orderAPI.getAllOrders(status && status !== "all" ? { status } : {});
      if (res.success && res.orders) {
        setOrders(res.orders.map(mapOrder));
      }
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await userAPI.getAllUsers();
      if (res.success && res.users) {
        setUsers(
          res.users.map((u) => ({
            id: u._id,
            name: u.name,
            email: u.email,
            phone: u.phone || "",
            role: u.role === "admin" ? "Admin" : "Customer",
            joined: u.createdAt
              ? new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
              : "",
            status: u.status === "active" ? "Active" : "Inactive",
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load users:", err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadAds = async () => {
    try {
      setLoadingAds(true);
      const res = await advertisementAPI.getAllAdvertisements();
      setAds(res.advertisements || []);
    } catch (err) {
      console.error("Failed to load ads:", err);
    } finally {
      setLoadingAds(false);
    }
  };

  const loadSettings = async () => {
    try {
      const res = await settingsAPI.getSettings();
      if (res.success && res.settings) {
        setSettings({
          storeName: res.settings.storeName || "D.Store",
          storeEmail: res.settings.storeEmail || "",
          storePhone: res.settings.storePhone || "",
          emailNotifications: !!res.settings.emailNotifications,
          smsNotifications: !!res.settings.smsNotifications,
          orderAlerts: !!res.settings.orderAlerts,
        });
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  };

  const loadAdminProfile = async () => {
    try {
      const res = await userAPI.getProfile();
      if (res.success && res.user) {
        setAdminProfile({ name: res.user.name, email: res.user.email });
      }
    } catch (err) {
      console.error("Failed to load admin profile:", err);
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadStats();
    loadOrders();
    loadUsers();
    loadAds();
    loadSettings();
    loadAdminProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = (type, mode, data = null) => setModal({ type, mode, data });
  const closeModal = () => setModal({ type: null, mode: null, data: null });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const openAdd = (type) => {
    if (type === "product") {
      setForm({
        name: "",
        category: categories[0]?._id || "",
        price: "",
        discountPrice: "",
        stock: "",
        status: "active",
        image: "",
        type: "clothing",
        brand: "",
        gender: "",
        description: "",
        colors: "",
        sizes: "",
        featured: false,
        bestSeller: false,
        flashSale: false,
      });
    } else if (type === "user") {
      setForm({ name: "", email: "", phone: "", password: "", role: "Customer", status: "Active" });
    } else if (type === "ad") {
      setForm({
        title: "",
        subtitle: "",
        image: "",
        link: "",
        position: "hero",
        type: "general",
        priority: 0,
        status: "active",
      });
    }
    openModal(type, "add");
  };

  const openEdit = (type, item) => {
    if (type === "product") {
      const looksLikeObjectId = /^[0-9a-fA-F]{24}$/.test(item.category || "");
      const categoryId = looksLikeObjectId
        ? item.category
        : categories.find((c) => c.slug === item.category || c.name === item.category)?._id || item.category || "";
      setForm({
        ...item,
        category: categoryId,
        image: item.image || (item.images && item.images[0]) || "",
        colors: Array.isArray(item.colors) ? item.colors.join(", ") : item.colors || "",
        sizes: Array.isArray(item.sizes) ? item.sizes.join(", ") : item.sizes || "",
        description: item.description || "",
        featured: !!item.featured,
        bestSeller: !!item.bestSeller,
        flashSale: !!item.flashSale,
      });
    } else if (type === "ad") {
      setForm({
        title: item.title || "",
        subtitle: item.subtitle || "",
        image: item.image || "",
        link: item.link || "",
        position: item.position || "hero",
        type: item.type || "general",
        priority: item.priority || 0,
        status: item.status || "active",
      });
    } else {
      setForm({ ...item });
    }
    openModal(type, "edit", item);
  };

  const parseList = (val) =>
    String(val || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSave = async (type) => {
    try {
      if (type === "product") {
        const payload = {
          name: form.name,
          price: Number(form.price) || 0,
          discountPrice: Number(form.discountPrice) || 0,
          stock: Number(form.stock) || 0,
          status: form.status || "active",
          category: form.category,
          type: form.type || "clothing",
          brand: form.brand || "",
          gender: form.gender || "",
          description: form.description || "",
          images: form.image ? [form.image] : [],
          colors: parseList(form.colors),
          sizes: parseList(form.sizes),
          featured: !!form.featured,
          bestSeller: !!form.bestSeller,
          flashSale: !!form.flashSale,
        };
        if (modal.data && (modal.data.id || modal.data._id)) {
          await productAPI.updateProduct(modal.data.id || modal.data._id, payload);
        } else {
          await productAPI.createProduct(payload);
        }
        await loadProducts();
        await loadStats();
      } else if (type === "user") {
        const payload = {
          name: form.name,
          email: form.email,
          phone: form.phone || "",
          role: form.role === "Admin" ? "admin" : "customer",
          status: form.status === "Active" ? "active" : "inactive",
        };
        if (modal.data && modal.data.id) {
          await userAPI.updateUser(modal.data.id, payload);
        } else {
          if (!form.password || form.password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
          }
          await userAPI.createUser({ ...payload, password: form.password });
        }
        await loadUsers();
        await loadStats();
      } else if (type === "ad") {
        const payload = {
          title: form.title,
          subtitle: form.subtitle || "",
          image: form.image || "",
          link: form.link || "",
          position: form.position || "hero",
          type: form.type || "general",
          priority: Number(form.priority) || 0,
          status: form.status || "active",
        };
        if (modal.data && (modal.data._id || modal.data.id)) {
          await advertisementAPI.updateAdvertisement(modal.data._id || modal.data.id, payload);
        } else {
          await advertisementAPI.createAdvertisement(payload);
        }
        await loadAds();
      }
      closeModal();
    } catch (err) {
      console.error("Failed to save:", err);
      alert("Failed to save: " + (err.message || "Server error"));
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      if (type === "product") await productAPI.deleteProduct(id);
      else if (type === "user") await userAPI.deleteUser(id);
      else if (type === "category") await categoryAPI.deleteCategory(id);
      else if (type === "ad") await advertisementAPI.deleteAdvertisement(id);
      else if (type === "order") await orderAPI.deleteOrder(id);

      if (type === "product") {
        await loadProducts();
        await loadStats();
      } else if (type === "user") {
        await loadUsers();
        await loadStats();
      } else if (type === "category") {
        await loadCategories();
        await loadProducts();
      } else if (type === "ad") await loadAds();
      else if (type === "order") {
        await loadOrders();
        await loadStats();
      }
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete: " + (err.message || "Server error"));
    }
  };

  const handleOrderStatusChange = async (orderMongoId, newStatus) => {
    try {
      const status = toStatusKey(newStatus);
      await orderAPI.updateOrderStatus(orderMongoId, status);
      await loadOrders();
      await loadStats();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update order status: " + (err.message || "Server error"));
    }
  };

  const openCategoryModal = (mode, data = null) => {
    const empty = { name: "", slug: "", type: "clothing", image: "", description: "", status: "active" };
    setForm(mode === "add" ? empty : { ...data });
    openModal("category", mode, data);
  };

  const handleCategorySave = async () => {
    if (!form.name?.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      const payload = {
        name: form.name,
        slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        type: form.type || "clothing",
        image: form.image || "",
        description: form.description || "",
        status: form.status || "active",
      };
      if (modal.mode === "edit" && modal.data?._id) {
        await categoryAPI.updateCategory(modal.data._id, payload);
      } else {
        await categoryAPI.createCategory(payload);
      }
      await loadCategories();
      await loadProducts();
      closeModal();
    } catch (err) {
      console.error("Failed to save category:", err);
      alert("Failed to save category: " + (err.message || "Server error"));
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSavingSettings(true);
      const res = await settingsAPI.updateSettings(settings);
      if (res.success) alert("Settings saved successfully");
    } catch (err) {
      alert("Failed to save settings: " + (err.message || "Server error"));
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isView = modal.mode === "view";

  const renderOrdersTable = (list) => (
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
          {loadingOrders ? (
            <tr>
              <td colSpan={6} className="text-center">
                Loading orders…
              </td>
            </tr>
          ) : list.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center">
                No orders found.
              </td>
            </tr>
          ) : (
            list.map((order) => (
              <tr key={order._id || order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>₹{Number(order.total).toLocaleString("en-IN")}</td>
                <td>
                  <Badge className={`d_status_${order.status}`}>{formatStatus(order.status)}</Badge>
                </td>
                <td>
                  <div className="d_table_actions">
                    <button className="d_table_action_btn" title="View" onClick={() => openModal("order", "view", order)}>
                      <FaEye />
                    </button>
                    <button className="d_table_action_btn" title="Edit" onClick={() => openModal("order", "edit", order)}>
                      <FaEdit />
                    </button>
                    <button
                      className="d_table_action_btn d_table_action_btn_delete"
                      title="Delete"
                      onClick={() => handleDelete("order", order._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );

  return (
    <div className="d_admin_panel">
      <div className="d_admin_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <FaChevronRight size={10} />
          </li>
          <li>Admin Panel</li>
        </ol>
        <h1 className="d_cart_heading">Admin Panel</h1>
      </div>

      <div className="container d_section pt-3">
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Row className="g-4">
            <Col lg={3} className="d_admin_sidebar_col">
              <div className="d_admin_sidebar">
                <div className="d_admin_sidebar_profile">
                  <div className="d_admin_sidebar_avatar">
                    <FaUser />
                  </div>
                  <div className="d_admin_sidebar_user">
                    <h5>{adminProfile.name}</h5>
                    <p>{adminProfile.email}</p>
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
                    <Nav.Link eventKey="categories" className={`d_admin_sidebar_link ${activeTab === "categories" ? "active" : ""}`}>
                      <FaList /> Categories
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="users" className={`d_admin_sidebar_link ${activeTab === "users" ? "active" : ""}`}>
                      <FaUsers /> Users
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="ads" className={`d_admin_sidebar_link ${activeTab === "ads" ? "active" : ""}`}>
                      <FaBullhorn /> Advertisements
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="settings" className={`d_admin_sidebar_link ${activeTab === "settings" ? "active" : ""}`}>
                      <FaCog /> Settings
                    </Nav.Link>
                  </Nav.Item>
                  <div className="d_admin_sidebar_divider"></div>
                  <Nav.Item>
                    <button type="button" className="d_admin_sidebar_link d_admin_sidebar_logout" onClick={handleLogout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>

            <Col lg={9}>
              <div className="d_admin_content">
                <Tab.Content>
                  {/* Dashboard */}
                  <Tab.Pane eventKey="dashboard">
                    {loadingStats ? (
                      <div className="text-center py-5">Loading stats…</div>
                    ) : (
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
                    )}

                    <div className="d_myaccount_card mt-4">
                      <div className="d_myaccount_card_header">
                        <h4>Recent Orders</h4>
                        <button type="button" className="d_btn_outline" onClick={() => setActiveTab("orders")}>
                          View All
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">{renderOrdersTable(orders.slice(0, 5))}</div>
                    </div>
                  </Tab.Pane>

                  {/* Orders */}
                  <Tab.Pane eventKey="orders">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>All Orders</h4>
                        <div className="d_admin_filters">
                          <select
                            className="d_admin_filter_select"
                            value={orderStatusFilter}
                            onChange={(e) => {
                              const val = e.target.value;
                              setOrderStatusFilter(val);
                              loadOrders(val);
                            }}
                          >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                      <div className="d_myaccount_card_body">{renderOrdersTable(orders)}</div>
                    </div>
                  </Tab.Pane>

                  {/* Products */}
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
                              {loadingProducts ? (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    Loading products…
                                  </td>
                                </tr>
                              ) : products.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    No products found.
                                  </td>
                                </tr>
                              ) : (
                                products.map((product) => (
                                  <tr key={product.id}>
                                    <td>
                                      <img src={product.image} alt={product.name} className="d_admin_product_img" />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₹{(product.salePrice || product.price || 0).toLocaleString("en-IN")}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                      <Badge className={(product.status || "active") === "active" ? "d_status_active" : "d_status_inactive"}>
                                        {formatStatus(product.status || "active")}
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
                                        <button
                                          className="d_table_action_btn d_table_action_btn_delete"
                                          title="Delete"
                                          onClick={() => handleDelete("product", product.id)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Categories */}
                  <Tab.Pane eventKey="categories">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Categories</h4>
                        <button className="d_btn_primary" onClick={() => openCategoryModal("add")}>
                          <FaPlus /> Add Category
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {categories.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="text-center">
                                    No categories found.
                                  </td>
                                </tr>
                              ) : (
                                categories.map((cat) => (
                                  <tr key={cat.id || cat._id}>
                                    <td>
                                      <img src={cat.image} alt={cat.name} className="d_admin_product_img" />
                                    </td>
                                    <td>{cat.name}</td>
                                    <td>{cat.slug}</td>
                                    <td>{cat.type}</td>
                                    <td>
                                      <Badge className={(cat.status || "active") === "active" ? "d_status_active" : "d_status_inactive"}>
                                        {formatStatus(cat.status || "active")}
                                      </Badge>
                                    </td>
                                    <td>
                                      <div className="d_table_actions">
                                        <button className="d_table_action_btn" title="Edit" onClick={() => openCategoryModal("edit", cat)}>
                                          <FaEdit />
                                        </button>
                                        <button
                                          className="d_table_action_btn d_table_action_btn_delete"
                                          title="Delete"
                                          onClick={() => handleDelete("category", cat._id || cat.id)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Users */}
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
                              {loadingUsers ? (
                                <tr>
                                  <td colSpan={6} className="text-center">
                                    Loading users…
                                  </td>
                                </tr>
                              ) : users.length === 0 ? (
                                <tr>
                                  <td colSpan={6} className="text-center">
                                    No users found.
                                  </td>
                                </tr>
                              ) : (
                                users.map((user) => (
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
                                        <button
                                          className="d_table_action_btn d_table_action_btn_delete"
                                          title="Delete"
                                          onClick={() => handleDelete("user", user.id)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Ads */}
                  <Tab.Pane eventKey="ads">
                    <div className="d_myaccount_card">
                      <div className="d_myaccount_card_header">
                        <h4>Advertisements</h4>
                        <button className="d_btn_primary" onClick={() => openAdd("ad")}>
                          <FaPlus /> Add Ad
                        </button>
                      </div>
                      <div className="d_myaccount_card_body">
                        <div className="d_table_wrapper">
                          <Table className="d_admin_table">
                            <thead>
                              <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Position</th>
                                <th>Type</th>
                                <th>Priority</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loadingAds ? (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    Loading ads…
                                  </td>
                                </tr>
                              ) : ads.length === 0 ? (
                                <tr>
                                  <td colSpan={7} className="text-center">
                                    No advertisements found.
                                  </td>
                                </tr>
                              ) : (
                                ads.map((ad) => (
                                  <tr key={ad._id}>
                                    <td>
                                      {ad.image ? (
                                        <img src={ad.image} alt={ad.title} className="d_admin_product_img" />
                                      ) : (
                                        "—"
                                      )}
                                    </td>
                                    <td>{ad.title}</td>
                                    <td>{ad.position}</td>
                                    <td>{ad.type}</td>
                                    <td>{ad.priority}</td>
                                    <td>
                                      <Badge className={ad.status === "active" ? "d_status_active" : "d_status_inactive"}>
                                        {formatStatus(ad.status)}
                                      </Badge>
                                    </td>
                                    <td>
                                      <div className="d_table_actions">
                                        <button className="d_table_action_btn" title="Edit" onClick={() => openEdit("ad", ad)}>
                                          <FaEdit />
                                        </button>
                                        <button
                                          className="d_table_action_btn d_table_action_btn_delete"
                                          title="Delete"
                                          onClick={() => handleDelete("ad", ad._id)}
                                        >
                                          <FaTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </Tab.Pane>

                  {/* Settings */}
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
                                <input
                                  type="text"
                                  value={settings.storeName}
                                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                                />
                              </div>
                              <div className="d_myaccount_field">
                                <label>Store Email</label>
                                <input
                                  type="email"
                                  value={settings.storeEmail}
                                  onChange={(e) => setSettings({ ...settings, storeEmail: e.target.value })}
                                />
                              </div>
                              <div className="d_myaccount_field">
                                <label>Phone Number</label>
                                <input
                                  type="tel"
                                  value={settings.storePhone}
                                  onChange={(e) => setSettings({ ...settings, storePhone: e.target.value })}
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="d_setting_section">
                              <h5>Notification Settings</h5>
                              <div className="d_setting_toggle">
                                <span>Email Notifications</span>
                                <button
                                  type="button"
                                  className={`d_toggle_btn ${settings.emailNotifications ? "d_toggle_active" : "d_toggle_inactive"}`}
                                  onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                                >
                                  {settings.emailNotifications ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                              </div>
                              <div className="d_setting_toggle">
                                <span>SMS Notifications</span>
                                <button
                                  type="button"
                                  className={`d_toggle_btn ${settings.smsNotifications ? "d_toggle_active" : "d_toggle_inactive"}`}
                                  onClick={() => setSettings({ ...settings, smsNotifications: !settings.smsNotifications })}
                                >
                                  {settings.smsNotifications ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                              </div>
                              <div className="d_setting_toggle">
                                <span>Order Alerts</span>
                                <button
                                  type="button"
                                  className={`d_toggle_btn ${settings.orderAlerts ? "d_toggle_active" : "d_toggle_inactive"}`}
                                  onClick={() => setSettings({ ...settings, orderAlerts: !settings.orderAlerts })}
                                >
                                  {settings.orderAlerts ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <div className="mt-4">
                          <button className="d_btn_primary" onClick={handleSaveSettings} disabled={savingSettings}>
                            {savingSettings ? "Saving…" : "Save Changes"}
                          </button>
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

      {/* Modal */}
      <Modal show={modal.type !== null} onHide={closeModal} centered className="d_admin_modal" backdrop="static" size="lg">
        <Modal.Header className="d_admin_modal_header">
          <Modal.Title className="d_admin_modal_title">
            {modal.mode === "add" &&
              (modal.type === "product"
                ? "Add Product"
                : modal.type === "user"
                  ? "Add User"
                  : modal.type === "ad"
                    ? "Add Advertisement"
                    : "Add")}
            {modal.mode === "edit" &&
              (modal.type === "product"
                ? "Edit Product"
                : modal.type === "user"
                  ? "Edit User"
                  : modal.type === "order"
                    ? "Update Order"
                    : modal.type === "ad"
                      ? "Edit Advertisement"
                      : "Edit Category")}
            {modal.mode === "view" &&
              (modal.type === "product"
                ? "Product Details"
                : modal.type === "user"
                  ? "User Details"
                  : "Order Details")}
          </Modal.Title>
          <button className="d_admin_modal_close" onClick={closeModal} aria-label="Close">
            <FaTimes />
          </button>
        </Modal.Header>

        <Modal.Body className="d_admin_modal_body">
          {/* PRODUCT */}
          {modal.type === "product" &&
            (isView ? (
              <div className="d_admin_view_grid">
                <img src={modal.data?.image} alt={modal.data?.name} className="d_admin_view_img" />
                <div className="d_admin_view_row">
                  <span>Name</span>
                  <strong>{modal.data?.name}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Category</span>
                  <strong>{modal.data?.category}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Price</span>
                  <strong>₹{Number(modal.data?.price || 0).toLocaleString("en-IN")}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Stock</span>
                  <strong>{modal.data?.stock}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Status</span>
                  <strong>{modal.data?.status}</strong>
                </div>
                {modal.data?.description && (
                  <div className="d_admin_view_row">
                    <span>Description</span>
                    <strong>{modal.data.description}</strong>
                  </div>
                )}
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
                    {categories.length === 0 && <option value="">No categories</option>}
                    {categories.map((c) => (
                      <option key={c.id || c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} name="description" value={form.description || ""} onChange={handleFormChange} />
                </Form.Group>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Price (₹)</Form.Label>
                      <Form.Control type="number" name="price" value={form.price || ""} onChange={handleFormChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Discount Price (₹)</Form.Label>
                      <Form.Control type="number" name="discountPrice" value={form.discountPrice || ""} onChange={handleFormChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control type="number" name="stock" value={form.stock || ""} onChange={handleFormChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Type</Form.Label>
                      <Form.Select name="type" value={form.type || "clothing"} onChange={handleFormChange}>
                        <option value="clothing">Clothing</option>
                        <option value="appliance">Appliance</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                {form.type === "clothing" && (
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select name="gender" value={form.gender || ""} onChange={handleFormChange}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Form.Select>
                  </Form.Group>
                )}
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control name="brand" value={form.brand || ""} onChange={handleFormChange} />
                </Form.Group>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Colors (comma separated)</Form.Label>
                      <Form.Control name="colors" value={form.colors || ""} onChange={handleFormChange} placeholder="Red, Blue, Black" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d_admin_form_group">
                      <Form.Label>Sizes (comma separated)</Form.Label>
                      <Form.Control name="sizes" value={form.sizes || ""} onChange={handleFormChange} placeholder="S, M, L, XL" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control name="image" value={form.image || ""} onChange={handleFormChange} placeholder="https://..." />
                </Form.Group>
                <Row className="g-3 mb-2">
                  <Col md={4}>
                    <Form.Check type="checkbox" name="featured" label="Featured" checked={!!form.featured} onChange={handleFormChange} />
                  </Col>
                  <Col md={4}>
                    <Form.Check type="checkbox" name="bestSeller" label="Best Seller" checked={!!form.bestSeller} onChange={handleFormChange} />
                  </Col>
                  <Col md={4}>
                    <Form.Check type="checkbox" name="flashSale" label="Flash Sale" checked={!!form.flashSale} onChange={handleFormChange} />
                  </Col>
                </Row>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={form.status || "active"} onChange={handleFormChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            ))}

          {/* CATEGORY */}
          {modal.type === "category" && (
            <Form className="d_admin_form">
              <Form.Group className="d_admin_form_group">
                <Form.Label>Category Name</Form.Label>
                <Form.Control name="name" value={form.name || ""} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Slug</Form.Label>
                <Form.Control name="slug" value={form.slug || ""} onChange={handleFormChange} />
              </Form.Group>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Type</Form.Label>
                    <Form.Select name="type" value={form.type || "clothing"} onChange={handleFormChange}>
                      <option value="clothing">Clothing</option>
                      <option value="appliance">Appliance</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={form.status || "active"} onChange={handleFormChange}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" value={form.image || ""} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" value={form.description || ""} onChange={handleFormChange} />
              </Form.Group>
            </Form>
          )}

          {/* USER */}
          {modal.type === "user" &&
            (isView ? (
              <div className="d_admin_view_grid">
                <div className="d_admin_view_row">
                  <span>Name</span>
                  <strong>{modal.data?.name}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Email</span>
                  <strong>{modal.data?.email}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Role</span>
                  <strong>{modal.data?.role}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Joined</span>
                  <strong>{modal.data?.joined}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Status</span>
                  <strong>{modal.data?.status}</strong>
                </div>
              </div>
            ) : (
              <Form className="d_admin_form">
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control name="name" value={form.name || ""} onChange={handleFormChange} />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={form.email || ""} onChange={handleFormChange} />
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control name="phone" value={form.phone || ""} onChange={handleFormChange} />
                </Form.Group>
                {modal.mode === "add" && (
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={form.password || ""} onChange={handleFormChange} />
                  </Form.Group>
                )}
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={form.role || "Customer"} onChange={handleFormChange}>
                    <option>Customer</option>
                    <option>Admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={form.status || "Active"} onChange={handleFormChange}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            ))}

          {/* AD */}
          {modal.type === "ad" && (
            <Form className="d_admin_form">
              <Form.Group className="d_admin_form_group">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={form.title || ""} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Subtitle</Form.Label>
                <Form.Control name="subtitle" value={form.subtitle || ""} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="image" value={form.image || ""} onChange={handleFormChange} />
              </Form.Group>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Link</Form.Label>
                <Form.Control name="link" value={form.link || ""} onChange={handleFormChange} placeholder="/clothing" />
              </Form.Group>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Position</Form.Label>
                    <Form.Select name="position" value={form.position || "hero"} onChange={handleFormChange}>
                      <option value="hero">Hero</option>
                      <option value="top-banner">Top Banner</option>
                      <option value="in-feed">In Feed</option>
                      <option value="sidebar">Sidebar</option>
                      <option value="bottom-banner">Bottom Banner</option>
                      <option value="popup">Popup</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Type</Form.Label>
                    <Form.Select name="type" value={form.type || "general"} onChange={handleFormChange}>
                      <option value="general">General</option>
                      <option value="clothing">Clothing</option>
                      <option value="appliance">Appliance</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="d_admin_form_group">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control type="number" name="priority" value={form.priority || 0} onChange={handleFormChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="d_admin_form_group">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={form.status || "active"} onChange={handleFormChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}

          {/* ORDER */}
          {modal.type === "order" && (
            <div>
              <div className="d_admin_view_grid mb-3">
                <div className="d_admin_view_row">
                  <span>Order ID</span>
                  <strong>{modal.data?.id}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Customer</span>
                  <strong>
                    {modal.data?.customer} ({modal.data?.email})
                  </strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Date</span>
                  <strong>{modal.data?.date}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Total</span>
                  <strong>₹{Number(modal.data?.total || 0).toLocaleString("en-IN")}</strong>
                </div>
                <div className="d_admin_view_row">
                  <span>Payment</span>
                  <strong>
                    {modal.data?.paymentMethod || "—"} / {modal.data?.paymentStatus || "—"}
                  </strong>
                </div>
              </div>

              {Array.isArray(modal.data?.items) && modal.data.items.length > 0 && (
                <div className="mb-3">
                  <h6>Items</h6>
                  {modal.data.items.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center gap-3 mb-2">
                      {item.image && <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: "cover" }} />}
                      <div>
                        <strong>{item.name}</strong>
                        <div className="small text-muted">
                          Qty: {item.quantity}
                          {item.size ? ` · Size: ${item.size}` : ""}
                          {item.color ? ` · Color: ${item.color}` : ""} · ₹{Number(item.price || 0).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {modal.data?.shippingAddress && (
                <div className="mb-3">
                  <h6>Shipping Address</h6>
                  <p className="mb-0">{modal.data.shippingAddress.fullName}</p>
                  <p className="mb-0">{modal.data.shippingAddress.street}</p>
                  <p className="mb-0">
                    {modal.data.shippingAddress.city}, {modal.data.shippingAddress.state} - {modal.data.shippingAddress.pincode}
                  </p>
                  <p className="mb-0">Phone: {modal.data.shippingAddress.phone}</p>
                </div>
              )}

              {!isView && (
                <Form.Group className="d_admin_form_group">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={modal.data?.status || "pending"}
                    onChange={async (e) => {
                      const newStatus = e.target.value;
                      await handleOrderStatusChange(modal.data._id, newStatus);
                      setModal((m) => ({ ...m, data: { ...m.data, status: newStatus } }));
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              )}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer className="d_admin_modal_footer">
          <Button variant="light" className="d_admin_btn_cancel" onClick={closeModal}>
            {isView || modal.type === "order" ? "Close" : "Cancel"}
          </Button>
          {!isView && modal.type !== "order" && (
            <Button
              className="d_admin_btn_save"
              onClick={() => (modal.type === "category" ? handleCategorySave() : handleSave(modal.type))}
            >
              <FaSave /> {modal.mode === "add" ? "Create" : "Update"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminPanel;
