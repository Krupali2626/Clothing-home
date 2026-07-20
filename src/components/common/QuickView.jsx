
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
  FaTimes,
  FaMinus,
  FaPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { useShop } from "../../context/ShopContext";
import "./QuickView.css";

const QuickView = () => {
  const { quickViewProduct, closeQuickView, addToWishlist, isInWishlist, removeFromWishlist, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!quickViewProduct) return null;

  const handleWishlist = () => {
    if (isInWishlist(quickViewProduct.id)) {
      removeFromWishlist(quickViewProduct.id);
    } else {
      addToWishlist(quickViewProduct);
    }
  };

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
    closeQuickView();
  };

  return (
    <div className="d_quickview_overlay" onClick={closeQuickView}>
      <div className="d_quickview_modal" onClick={(e) => e.stopPropagation()}>
        <button className="d_quickview_close" onClick={closeQuickView} aria-label="Close quick view">
          <FaTimes />
        </button>

        <Row className="g-4">
          <Col md={5}>
            <div className="d_quickview_image">
              {quickViewProduct.discount > 0 && (
                <span className="d_badge_pill d_quickview_discount">-{quickViewProduct.discount}%</span>
              )}
              {quickViewProduct.badge && (
                <span className={`d_badge_pill d_quickview_badge d_badge_${quickViewProduct.badge.toLowerCase().replace(/\s+/g, "_")}`}>
                  {quickViewProduct.badge}
                </span>
              )}
              <img src={quickViewProduct.image} alt={quickViewProduct.name} />
            </div>
          </Col>

          <Col md={7}>
            <div className="d_quickview_info">
              <span className="d_quickview_brand">{quickViewProduct.brand}</span>
              <h2 className="d_quickview_name">{quickViewProduct.name}</h2>

              <div className="d_quickview_rating_row">
                <div className="d_quickview_stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(quickViewProduct.rating) ? "d_star_filled" : "d_star_empty"}
                    />
                  ))}
                </div>
                <span className="d_quickview_rating_val">{quickViewProduct.rating}</span>
                <span className="d_quickview_review_count">({quickViewProduct.reviewCount} reviews)</span>
                <span className="d_quickview_stock_badge">
                  {quickViewProduct.stock > 0 ? (
                    <><FaCheckCircle /> In Stock</>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </div>

              <div className="d_quickview_price_row">
                <span className="d_quickview_price">₹{quickViewProduct.salePrice.toLocaleString("en-IN")}</span>
                {quickViewProduct.mrp > quickViewProduct.salePrice && (
                  <span className="d_quickview_mrp">₹{quickViewProduct.mrp.toLocaleString("en-IN")}</span>
                )}
              </div>

              <p className="d_quickview_desc">{quickViewProduct.description}</p>

              {/* Sizes */}
              {quickViewProduct.sizes && (
                <div className="d_quickview_option_group">
                  <label className="d_quickview_option_label">
                    Size: <strong>{selectedSize || "Select"}</strong>
                  </label>
                  <div className="d_quickview_size_btns">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        className={`d_size_btn ${selectedSize === s ? "active" : ""}`}
                        onClick={() => setSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {quickViewProduct.colors && (
                <div className="d_quickview_option_group">
                  <label className="d_quickview_option_label">
                    Color: <strong>{selectedColor || "Select"}</strong>
                  </label>
                  <div className="d_quickview_color_btns">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c}
                        className={`d_color_btn ${selectedColor === c ? "active" : ""}`}
                        onClick={() => setSelectedColor(c)}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="d_quickview_actions">
                <div className="d_qty_control">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="d_btn_primary d_quickview_cart_btn"
                  disabled={quickViewProduct.stock === 0}
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart /> {quickViewProduct.stock === 0 ? "Notify Me" : "Add to Cart"}
                </button>
                <button
                  className={`d_quickview_wishlist_btn ${isInWishlist(quickViewProduct.id) ? "active" : ""}`}
                  onClick={handleWishlist}
                  aria-label="Add to wishlist"
                >
                  <FaHeart />
                </button>
              </div>

              <Link
                to={`/product/${quickViewProduct.id}`}
                className="d_quickview_view_full"
                onClick={closeQuickView}
              >
                View Full Details <FaArrowRight size={12} />
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default QuickView;
