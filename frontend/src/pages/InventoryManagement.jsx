import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaBoxes,
  FaBullhorn,
  FaChartBar,
  FaCog,
  FaExclamationTriangle,
  FaHistory,
  FaList,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaSignOutAlt,
  FaTag,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { inventoryAPI, productAPI } from "../services/api";
import "./InventoryManagement.css";
import "./AdminPanel.css";

const PRODUCTS_PER_PAGE = 8;

const InventoryManagement = () => {
  const navigate = useNavigate();
  const { user: authUser, logout } = useShop();
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalUnits: 0,
    lowStock: 0,
    outOfStock: 0,
  });
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    operation: "in",
    quantity: 1,
    reason: "",
    reference: "",
  });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const load = async (nextFilter = filter) => {
    setLoading(true);
    setCurrentPage(1);
    try {
      // Inventory is always sourced from the product API, so the quantities
      // shown here are the same `stock` value used by the storefront.
      const productsRes = await productAPI.getAllProducts({ limit: 500 });
      const allProducts = productsRes.products || [];
      const activeProducts = allProducts.filter(
        (product) => product.status === "active",
      );
      const lowStock = activeProducts.filter(
        (product) =>
          product.stock > 0 &&
          product.stock <= (product.lowStockThreshold ?? 5),
      );
      const outOfStock = activeProducts.filter(
        (product) => product.stock === 0,
      );
      const visibleProducts =
        nextFilter === "low"
          ? lowStock
          : nextFilter === "out"
            ? outOfStock
            : allProducts;
      setSummary({
        totalProducts: activeProducts.length,
        totalUnits: activeProducts.reduce(
          (sum, product) => sum + (Number(product.stock) || 0),
          0,
        ),
        lowStock: lowStock.length,
        outOfStock: outOfStock.length,
      });
      setProducts(visibleProducts);
    } catch (error) {
      setNotice(error.message || "Could not load inventory.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE),
  );
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  const changeFilter = (value) => {
    setCurrentPage(1);
    setFilter(value);
    load(value);
  };
  const status = (product) =>
    product.stock === 0 ? (
      <Badge bg="danger">Out of stock</Badge>
    ) : product.stock <= product.lowStockThreshold ? (
      <Badge bg="warning" text="dark">
        Low stock
      </Badge>
    ) : (
      <Badge bg="success">In stock</Badge>
    );
  const saveAdjustment = async (event) => {
    event.preventDefault();
    setSubmitError("");
    try {
      const currentStock = Number(selected.stock) || 0;
      const quantity = Number(form.quantity);
      const nextStock =
        form.operation === "set"
          ? quantity
          : form.operation === "out"
            ? currentStock - quantity
            : currentStock + quantity;
      if (
        !Number.isInteger(quantity) ||
        quantity < 0 ||
        (form.operation !== "set" && quantity === 0)
      )
        throw new Error("Enter a valid stock quantity.");
      if (nextStock < 0)
        throw new Error("Cannot remove more stock than is available.");
      // Update Product directly—the same API that supplies this page's product list.
      const response = await productAPI.updateProduct(
        selected._id || selected.id,
        {
          stock: nextStock,
          stockReason: form.reason || "Stock updated from inventory",
        },
      );
      const threshold = response.product.lowStockThreshold ?? 5;
      const alertText =
        response.product.stock === 0
          ? " OUT OF STOCK — replenish this product now."
          : response.product.stock <= threshold
            ? ` LOW STOCK — alert level is ${threshold}.`
            : "";
      setNotice(
        `${response.product.name}: stock is now ${response.product.stock}.${alertText}`,
      );
      setSelected(null);
      await load();
    } catch (error) {
      setSubmitError(error.message || "Stock update failed.");
    }
  };
  const openHistory = async (product) => {
    try {
      const res = await inventoryAPI.getMovements(product._id);
      setSelected(product);
      setHistory(res.movements || []);
      setShowHistory(true);
    } catch (error) {
      setNotice(error.message || "Could not load history.");
    }
  };

  return ( 
    <div className="d_admin_panel d_myaccount_card">
      <Container className="d_section pt-1">
      
            <div className="inventory-page ">
              
              {notice && (
                <Alert
                  variant={
                    notice.includes("OUT OF STOCK")
                      ? "danger"
                      : notice.includes("LOW STOCK")
                        ? "warning"
                        : "info"
                  }
                  dismissible
                  onClose={() => setNotice("")}
                >
                  {notice}
                </Alert>
              )}
              {(summary.outOfStock > 0 || summary.lowStock > 0) && (
                <Alert
                  variant={summary.outOfStock > 0 ? "danger" : "warning"}
                  className="d-flex align-items-center gap-2"
                >
                  <FaExclamationTriangle />
                  <span>
                    {summary.outOfStock > 0
                      ? `${summary.outOfStock} product(s) are out of stock.`
                      : ""}
                    {summary.outOfStock > 0 && summary.lowStock > 0 ? " " : ""}
                    {summary.lowStock > 0
                      ? `${summary.lowStock} product(s) reached their low-stock alert threshold.`
                      : ""}
                  </span>
                </Alert>
              )}
              {/* <Row className="g-3 mb-4">
                {[
                  ["Products", summary.totalProducts, FaBoxes, "primary"],
                  ["Units in stock", summary.totalUnits, FaBoxes, "info"],
                  [
                    "Low stock",
                    summary.lowStock,
                    FaExclamationTriangle,
                    "warning",
                  ],
                  ["Out of stock", summary.outOfStock, FaMinus, "danger"],
                ].map(([label, value, Icon, color]) => (
                  <Col md={3} key={label}>
                    <Card className="inventory-stat">
                      <Card.Body>
                        <Icon className={`text-${color}`} />
                        <div>
                          <small>{label}</small>
                          <h3>{value}</h3>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row> */}
              <Card className="inventory-panel">
                <Card.Body className="p-0">
                  <div className="inventory-table-header">
                    <div>
                      <h5 className="mb-1">Inventory</h5>
                      <p className="mb-0 text-muted small">
                        Monitor stock health and adjust product quantities in
                        one place.
                      </p>
                    </div>
                    <div className="btn-group inventory-filter-group">
                      {[
                        ["all", "All"],
                        ["low", "Low stock"],
                        ["out", "Out of stock"],
                      ].map(([key, label]) => (
                        <Button
                          size="sm"
                          key={key}
                          variant={
                            filter === key ? "dark" : "outline-secondary"
                          }
                          onClick={() => changeFilter(key)}
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner />
                    </div>
                  ) : (
                    <div className="inventory-table-wrapper">
                      <Table
                        hover
                        align="middle"
                        className="inventory-table mb-0"
                        responsive="sm"
                      >
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Available</th>
                            <th>Threshold</th>
                            <th>Status</th>
                            <th className="text-end">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedProducts.map((product) => {
                            const productImage =
                              product.image || product.images?.[0] || "";
                            const productInitial = (product.name || "P")
                              .trim()
                              .charAt(0)
                              .toUpperCase();

                            return (
                              <tr key={product._id}>
                                <td className="inventory-product-cell">
                                  <div className="inventory-product-avatar">
                                    {productImage ? (
                                      <img
                                        src={productImage}
                                        alt={product.name || "Product image"}
                                        className="inventory-product-avatar-image"
                                        loading="lazy"
                                      />
                                    ) : (
                                      <span className="inventory-product-avatar-initial">
                                        {productInitial}
                                      </span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="inventory-product-name">
                                      {product.name}
                                    </div>
                                    <div className="inventory-product-meta small text-muted">
                                      {product.brand || "—"}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span className="inventory-category-pill">
                                    {product.category?.name ||
                                      product.category ||
                                      "—"}
                                  </span>
                                </td>
                                <td>
                                  <span className="inventory-stock-pill">
                                    {product.stock}
                                  </span>
                                </td>
                                <td>{product.lowStockThreshold ?? 5}</td>
                                <td>{status(product)}</td>
                                <td className="text-end">
                                  <div className="inventory-action-group">
                                    <Button
                                      size="sm"
                                      variant="outline-dark"
                                      className="inventory-update-button"
                                      onClick={() => {
                                        setSelected(product);
                                        setForm({
                                          operation: "in",
                                          quantity: 1,
                                          reason: "",
                                          reference: "",
                                        });
                                      }}
                                    >
                                      <FaPlus /> Update Stock
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                          {products.length === 0 && (
                            <tr>
                              <td
                                colSpan="6"
                                className="text-center py-4 text-muted"
                              >
                                No products match this filter.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      {products.length > PRODUCTS_PER_PAGE && (
                        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 px-3 py-3 border-top">
                          <small className="text-muted">
                            Showing{" "}
                            {Math.min(
                              (currentPage - 1) * PRODUCTS_PER_PAGE + 1,
                              products.length,
                            )}
                            -
                            {Math.min(
                              currentPage * PRODUCTS_PER_PAGE,
                              products.length,
                            )}{" "}
                            of {products.length}
                          </small>
                          <div className="d-flex flex-wrap align-items-center gap-2 justify-content-center">
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              disabled={currentPage === 1}
                              onClick={() =>
                                setCurrentPage((page) => Math.max(page - 1, 1))
                              }
                            >
                              Previous
                            </Button>
                            {pageNumbers.map((page) => (
                              <Button
                                key={page}
                                size="sm"
                                variant={
                                  currentPage === page
                                    ? "dark"
                                    : "outline-secondary"
                                }
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </Button>
                            ))}
                            <Button
                              size="sm"
                              variant="outline-secondary"
                              disabled={currentPage === totalPages}
                              onClick={() =>
                                setCurrentPage((page) =>
                                  Math.min(page + 1, totalPages),
                                )
                              }
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
              <Modal
                show={!!selected && !showHistory}
                onHide={() => setSelected(null)}
                centered
              >
                <Form onSubmit={saveAdjustment}>
                  <Modal.Header closeButton>
                    <Modal.Title>Update stock</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {submitError && (
                      <Alert variant="danger">{submitError}</Alert>
                    )}
                    <p className="mb-3">
                      <strong>{selected?.name}</strong>
                      <br />
                      <span className="text-muted">
                        Current stock: {selected?.stock}
                      </span>
                    </p>
                    <Form.Group className="mb-3">
                      <Form.Label>Action</Form.Label>
                      <Form.Select
                        value={form.operation}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            operation: e.target.value,
                            quantity:
                              e.target.value === "set" ? selected.stock : 1,
                          })
                        }
                      >
                        <option value="in">Add stock</option>
                        <option value="out">Remove stock</option>
                        <option value="set">Set exact stock</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {form.operation === "set"
                          ? "New total stock"
                          : "Quantity"}
                      </Form.Label>
                      <Form.Control
                        required
                        min={form.operation === "set" ? "0" : "1"}
                        type="number"
                        value={form.quantity}
                        onChange={(e) =>
                          setForm({ ...form, quantity: e.target.value })
                        }
                      />
                      <Form.Text className="text-muted">
                        {form.operation === "set"
                          ? "This replaces the current product stock."
                          : "This quantity will be added to or removed from current stock."}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Reason <span className="text-muted">(optional)</span>
                      </Form.Label>
                      <Form.Control
                        maxLength="500"
                        value={form.reason}
                        onChange={(e) =>
                          setForm({ ...form, reason: e.target.value })
                        }
                        placeholder="e.g. Supplier delivery"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Reference (optional)</Form.Label>
                      <Form.Control
                        value={form.reference}
                        onChange={(e) =>
                          setForm({ ...form, reference: e.target.value })
                        }
                        placeholder="Invoice or note number"
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="light" onClick={() => setSelected(null)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update stock</Button>
                  </Modal.Footer>
                </Form>
              </Modal>
              <Modal
                show={showHistory}
                onHide={() => {
                  setShowHistory(false);
                  setSelected(null);
                }}
                size="lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Order history — {selected?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {history.length ? (
                    <div className="d-flex flex-column gap-3">
                      {history.map((order) => (
                        <div key={order._id} className="border rounded p-3">
                          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-2">
                            <div>
                              <strong>Order ID:</strong>{" "}
                              <span className="text-primary">
                                {order.orderNumber || order._id}
                              </span>
                            </div>
                            <small className="text-muted">
                              {new Date(order.createdAt).toLocaleString()}
                            </small>
                          </div>
                          <div className="mb-2">
                            <strong>Status:</strong>{" "}
                            <span className="text-capitalize">
                              {order.status}
                            </span>
                          </div>
                          <div>
                            <strong>Products in this order:</strong>
                            <ul className="mb-0 mt-2">
                              {(order.items || []).map((item) => (
                                <li
                                  key={`${order._id}-${item.product}-${item.name}`}
                                >
                                  {item.name}{" "}
                                  <span className="text-muted">
                                    × {item.quantity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}{" "}
                    </div>
                  ) : (
                    <p className="text-muted mb-0">
                      No orders found for this product yet.
                    </p>
                  )}
                </Modal.Body>
              </Modal>
            </div>
       
      </Container>
    </div>
  );
};
export default InventoryManagement;
