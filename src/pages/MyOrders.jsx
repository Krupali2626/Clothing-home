import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaBoxOpen, FaTruck, FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import { trendingProducts } from "../data/products";
import "./MyOrders.css";

const STATUSES = ["All", "Delivered", "Shipped", "Processing", "Cancelled"];

const sampleOrders = trendingProducts.slice(0, 6).map((p, i) => ({
  orderId: `DST-2026-${1000 + i}`,
  product: p,
  qty: 1 + (i % 2),
  status: ["Delivered", "Shipped", "Processing", "Delivered", "Cancelled", "Delivered"][i],
  date: `2026-0${(i % 6) + 1}-1${i + 1}`,
  total: p.salePrice * (1 + (i % 2)),
  tracking: `IN${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
}));

const STATUS_ICONS = {
  Delivered: <FaCheckCircle className="d_status_icon d_status_delivered" />,
  Shipped: <FaTruck className="d_status_icon d_status_shipped" />,
  Processing: <FaBoxOpen className="d_status_icon d_status_processing" />,
  Cancelled: <FaTimesCircle className="d_status_icon d_status_cancelled" />,
};

const MyOrders = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = sampleOrders.filter((o) => {
    const matchStatus = activeStatus === "All" || o.status === activeStatus;
    const matchSearch =
      !search.trim() ||
      o.orderId.toLowerCase().includes(search.toLowerCase()) ||
      o.product.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="d_orders_page">
      {/* Breadcrumb */}
      <div className="d_orders_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>My Orders</li>
        </ol>
        <h1 className="d_cart_heading">My Orders</h1>
      </div>

      <div className="container d_section pt-3">
        {/* Toolbar */}
        <div className="d_orders_toolbar">
          <div className="d_orders_status_tabs">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`d_orders_tab ${activeStatus === s ? "active" : ""}`}
                onClick={() => setActiveStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="d_orders_search">
            <FaSearch />
            <input
              type="text"
              placeholder="Search orders or products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="d_orders_empty">
            <FaBoxOpen />
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="d_orders_list">
            {filtered.map((order) => (
              <div key={order.orderId} className="d_order_card">
                <div className="d_order_header">
                  <div className="d_order_header_left">
                    <span className="d_order_id">Order #{order.orderId}</span>
                    <span className="d_order_date">{order.date}</span>
                  </div>
                  <div className={`d_order_status_badge d_status_${order.status.toLowerCase()}`}>
                    {STATUS_ICONS[order.status]}
                    {order.status}
                  </div>
                </div>

                <div className="d_order_body">
                  <div className="d_order_product">
                    <Link to={`/product/${order.product.id}`} className="d_order_product_img">
                      <img src={order.product.image} alt={order.product.name} />
                    </Link>
                    <div className="d_order_product_info">
                      <span className="d_product_brand">{order.product.brand}</span>
                      <Link to={`/product/${order.product.id}`} className="d_order_product_name">
                        {order.product.name}
                      </Link>
                      <span className="d_order_qty">Qty: {order.qty}</span>
                    </div>
                  </div>
                  <div className="d_order_total_col">
                    <span className="d_order_total_label">Order Total</span>
                    <strong className="d_order_total_val">
                      ₹{order.total.toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>

                <div className="d_order_footer">
                  {order.status === "Shipped" && (
                    <span className="d_tracking_info">
                      <FaTruck /> Tracking: <strong>{order.tracking}</strong>
                    </span>
                  )}
                  <div className="d_order_actions">
                    {order.status === "Delivered" && (
                      <>
                        <Link to={`/product/${order.product.id}`} className="d_order_action_btn">
                          Buy Again
                        </Link>
                        <button className="d_order_action_btn">Write Review</button>
                      </>
                    )}
                    {(order.status === "Processing" || order.status === "Shipped") && (
                      <button className="d_order_action_btn d_cancel_btn">Cancel Order</button>
                    )}
                    {order.status === "Delivered" && (
                      <button className="d_order_action_btn">Return Item</button>
                    )}
                    <Link to="/contact" className="d_order_action_btn">Get Help</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
