import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Col, Container, Form, Modal, Row, Spinner, Table } from "react-bootstrap";
import { FaArrowLeft, FaBoxes, FaExclamationTriangle, FaHistory, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { inventoryAPI, productAPI } from "../services/api";
import "./InventoryManagement.css";

const InventoryManagement = () => {
  const [summary, setSummary] = useState({ totalProducts: 0, totalUnits: 0, lowStock: 0, outOfStock: 0 });
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ operation: "in", quantity: 1, reason: "", reference: "" });
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const load = async (nextFilter = filter) => {
    setLoading(true);
    try {
      // Inventory is always sourced from the product API, so the quantities
      // shown here are the same `stock` value used by the storefront.
      const productsRes = await productAPI.getAllProducts({ limit: 500 });
      const allProducts = productsRes.products || [];
      const activeProducts = allProducts.filter((product) => product.status === "active");
      const lowStock = activeProducts.filter((product) => product.stock > 0 && product.stock <= (product.lowStockThreshold ?? 5));
      const outOfStock = activeProducts.filter((product) => product.stock === 0);
      const visibleProducts = nextFilter === "low" ? lowStock : nextFilter === "out" ? outOfStock : allProducts;
      setSummary({
        totalProducts: activeProducts.length,
        totalUnits: activeProducts.reduce((sum, product) => sum + (Number(product.stock) || 0), 0),
        lowStock: lowStock.length,
        outOfStock: outOfStock.length,
      });
      setProducts(visibleProducts);
    } catch (error) { setNotice(error.message || "Could not load inventory."); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeFilter = (value) => { setFilter(value); load(value); };
  const status = (product) => product.stock === 0 ? <Badge bg="danger">Out of stock</Badge> : product.stock <= product.lowStockThreshold ? <Badge bg="warning" text="dark">Low stock</Badge> : <Badge bg="success">In stock</Badge>;
  const saveAdjustment = async (event) => {
    event.preventDefault();
    setSubmitError("");
    try {
      const currentStock = Number(selected.stock) || 0;
      const quantity = Number(form.quantity);
      const nextStock = form.operation === "set" ? quantity : form.operation === "out" ? currentStock - quantity : currentStock + quantity;
      if (!Number.isInteger(quantity) || quantity < 0 || (form.operation !== "set" && quantity === 0)) throw new Error("Enter a valid stock quantity.");
      if (nextStock < 0) throw new Error("Cannot remove more stock than is available.");
      // Update Product directly—the same API that supplies this page's product list.
      const response = await productAPI.updateProduct(selected._id || selected.id, { stock: nextStock, stockReason: form.reason || "Stock updated from inventory" });
      const threshold = response.product.lowStockThreshold ?? 5;
      const alertText = response.product.stock === 0
        ? " OUT OF STOCK — replenish this product now."
        : response.product.stock <= threshold
          ? ` LOW STOCK — alert level is ${threshold}.`
          : "";
      setNotice(`${response.product.name}: stock is now ${response.product.stock}.${alertText}`);
      setSelected(null);
      await load();
    } catch (error) { setSubmitError(error.message || "Stock update failed."); }
  };
  const openHistory = async (product) => {
    try { const res = await inventoryAPI.getMovements(product._id); setSelected(product); setHistory(res.movements || []); setShowHistory(true); }
    catch (error) { setNotice(error.message || "Could not load history."); }
  };

  return <Container className="inventory-page py-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div><Link className="text-decoration-none small" to="/admin-panel"><FaArrowLeft /> Admin panel</Link><h2 className="mt-2 mb-0">Stock management</h2><p className="text-muted mb-0">Track inventory, low stock, and every adjustment.</p></div>
    </div>
    {notice && <Alert variant={notice.includes("OUT OF STOCK") ? "danger" : notice.includes("LOW STOCK") ? "warning" : "info"} dismissible onClose={() => setNotice("")}>{notice}</Alert>}
    {(summary.outOfStock > 0 || summary.lowStock > 0) && <Alert variant={summary.outOfStock > 0 ? "danger" : "warning"} className="d-flex align-items-center gap-2">
      <FaExclamationTriangle />
      <span>{summary.outOfStock > 0 ? `${summary.outOfStock} product(s) are out of stock.` : ""}{summary.outOfStock > 0 && summary.lowStock > 0 ? " " : ""}{summary.lowStock > 0 ? `${summary.lowStock} product(s) reached their low-stock alert threshold.` : ""}</span>
    </Alert>}
    <Row className="g-3 mb-4">
      {[["Products", summary.totalProducts, FaBoxes, "primary"], ["Units in stock", summary.totalUnits, FaBoxes, "info"], ["Low stock", summary.lowStock, FaExclamationTriangle, "warning"], ["Out of stock", summary.outOfStock, FaMinus, "danger"]].map(([label, value, Icon, color]) => <Col md={3} key={label}><Card className="inventory-stat"><Card.Body><Icon className={`text-${color}`} /><div><small>{label}</small><h3>{value}</h3></div></Card.Body></Card></Col>)}
    </Row>
    <Card><Card.Body>
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3"><h5 className="mb-0">Inventory</h5><div className="btn-group">{[["all", "All"], ["low", "Low stock"], ["out", "Out of stock"]].map(([key, label]) => <Button size="sm" key={key} variant={filter === key ? "dark" : "outline-secondary"} onClick={() => changeFilter(key)}>{label}</Button>)}</div></div>
      {loading ? <div className="text-center py-5"><Spinner /></div> : <div className="table-responsive"><Table hover align="middle" className="mb-0"><thead><tr><th>Product</th><th>Category</th><th>Available</th><th>Threshold</th><th>Status</th><th className="text-end">Actions</th></tr></thead><tbody>{products.map((product) => <tr key={product._id}><td><strong>{product.name}</strong><div className="small text-muted">{product.brand || "—"}</div></td><td>{product.category?.name || product.category || "—"}</td><td className="fw-bold">{product.stock}</td><td>{product.lowStockThreshold ?? 5}</td><td>{status(product)}</td><td className="text-end"><Button size="sm" variant="outline-primary" onClick={() => { setSelected(product); setForm({ operation: "in", quantity: 1, reason: "", reference: "" }); }}><FaPlus /> Adjust</Button>{" "}<Button size="sm" variant="outline-secondary" onClick={() => openHistory(product)} title="History"><FaHistory /></Button></td></tr>)}{products.length === 0 && <tr><td colSpan="6" className="text-center py-4 text-muted">No products match this filter.</td></tr>}</tbody></Table></div>}
    </Card.Body></Card>
    <Modal show={!!selected && !showHistory} onHide={() => setSelected(null)} centered><Form onSubmit={saveAdjustment}><Modal.Header closeButton><Modal.Title>Update stock</Modal.Title></Modal.Header><Modal.Body>{submitError && <Alert variant="danger">{submitError}</Alert>}<p className="mb-3"><strong>{selected?.name}</strong><br /><span className="text-muted">Current stock: {selected?.stock}</span></p><Form.Group className="mb-3"><Form.Label>Action</Form.Label><Form.Select value={form.operation} onChange={(e) => setForm({ ...form, operation: e.target.value, quantity: e.target.value === "set" ? selected.stock : 1 })}><option value="in">Add stock</option><option value="out">Remove stock</option><option value="set">Set exact stock</option></Form.Select></Form.Group><Form.Group className="mb-3"><Form.Label>{form.operation === "set" ? "New total stock" : "Quantity"}</Form.Label><Form.Control required min={form.operation === "set" ? "0" : "1"} type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} /><Form.Text className="text-muted">{form.operation === "set" ? "This replaces the current product stock." : "This quantity will be added to or removed from current stock."}</Form.Text></Form.Group><Form.Group className="mb-3"><Form.Label>Reason <span className="text-muted">(optional)</span></Form.Label><Form.Control maxLength="500" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} placeholder="e.g. Supplier delivery" /></Form.Group><Form.Group><Form.Label>Reference (optional)</Form.Label><Form.Control value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} placeholder="Invoice or note number" /></Form.Group></Modal.Body><Modal.Footer><Button variant="light" onClick={() => setSelected(null)}>Cancel</Button><Button type="submit">Update stock</Button></Modal.Footer></Form></Modal>
    <Modal show={showHistory} onHide={() => { setShowHistory(false); setSelected(null); }} size="lg"><Modal.Header closeButton><Modal.Title>Stock history — {selected?.name}</Modal.Title></Modal.Header><Modal.Body>{history.length ? <Table responsive><thead><tr><th>Date</th><th>Action</th><th>Change</th><th>Stock after</th><th>Reason</th></tr></thead><tbody>{history.map((item) => <tr key={item._id}><td>{new Date(item.createdAt).toLocaleString()}</td><td className="text-capitalize">{item.type}</td><td className={item.quantity > 0 ? "text-success" : "text-danger"}>{item.quantity > 0 ? "+" : ""}{item.quantity}</td><td>{item.resultingStock}</td><td>{item.reason || "—"}</td></tr>)}</tbody></Table> : <p className="text-muted mb-0">No stock movements recorded yet.</p>}</Modal.Body></Modal>
  </Container>;
};
export default InventoryManagement;
