import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaArrowRight,
  FaChevronRight,
  FaShieldAlt,
  FaTruck,
  FaUndo,
  FaCheckCircle,
  FaMinus,
  FaPlus,
  FaShareAlt,
} from "react-icons/fa";
import ProductCard from "../components/common/ProductCard";
import ReviewCard from "../components/common/ReviewCard";
import products from "../data/products";
import reviews from "../data/reviews";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  if (!product) {
    return (
      <div className="d_container_fluid d_section d_not_found">
        <h2>Product not found</h2>
        <p>The product you are looking for does not exist.</p>
        <Link to="/" className="d_btn_primary">Back to Home</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.type === product.type && p.id !== product.id)
    .slice(0, 4);

  const productReviews = reviews.slice(0, 4);

  const discount = product.discount || 0;
  const savings = product.mrp - product.salePrice;

  return (
    <div className="d_product_detail_page">
      {/* Breadcrumb */}
      <div className="d_detail_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>
            <Link to={product.type === "clothing" ? "/clothing" : "/appliances"}>
              {product.type === "clothing" ? "Clothing" : "Home Appliances"}
            </Link>
          </li>
          <li><FaChevronRight size={10} /></li>
          <li>{product.name}</li>
        </ol>
      </div>

      <div className="container d_section pt-3">
        <Row className="g-4 g-lg-5">
          {/* Image Gallery */}
          <Col lg={5}>
            <div className="d_detail_gallery">
              <div className="d_detail_main_img">
                {discount > 0 && (
                  <span className="d_detail_discount_badge">-{discount}%</span>
                )}
                {product.badge && (
                  <span className={`d_detail_badge d_badge_${product.badge.toLowerCase().replace(/\s+/g, "_")}`}>
                    {product.badge}
                  </span>
                )}
                <img
                  src={(product.images || [product.image])[selectedImg]}
                  alt={product.name}
                />
              </div>
              <div className="d_detail_thumbs">
                {(product.images || [product.image]).map((img, i) => (
                  <button
                    key={i}
                    className={`d_detail_thumb ${selectedImg === i ? "active" : ""}`}
                    onClick={() => setSelectedImg(i)}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={7}>
            <div className="d_detail_info">
              <span className="d_detail_brand">{product.brand}</span>
              <h1 className="d_detail_name">{product.name}</h1>

              <div className="d_detail_rating_row">
                <div className="d_detail_stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(product.rating) ? "d_star_filled" : "d_star_empty"}
                    />
                  ))}
                </div>
                <span className="d_detail_rating_val">{product.rating}</span>
                <span className="d_detail_review_count">({product.reviewCount} reviews)</span>
                <span className="d_detail_stock_badge">
                  {product.stock > 0 ? (
                    <><FaCheckCircle /> In Stock</>
                  ) : (
                    "Out of Stock"
                  )}
                </span>
              </div>

              <div className="d_detail_price_row">
                <span className="d_detail_price">₹{product.salePrice.toLocaleString("en-IN")}</span>
                {product.mrp > product.salePrice && (
                  <>
                    <span className="d_detail_mrp">₹{product.mrp.toLocaleString("en-IN")}</span>
                    <span className="d_detail_save">Save ₹{savings.toLocaleString("en-IN")}</span>
                  </>
                )}
              </div>

              <p className="d_detail_desc">{product.description}</p>

              {/* Sizes (clothing only) */}
              {product.sizes && (
                <div className="d_detail_option_group">
                  <label className="d_detail_option_label">
                    Size: <strong>{selectedSize || "Select"}</strong>
                  </label>
                  <div className="d_detail_size_btns">
                    {product.sizes.map((s) => (
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
              {product.colors && (
                <div className="d_detail_option_group">
                  <label className="d_detail_option_label">
                    Color: <strong>{selectedColor || "Select"}</strong>
                  </label>
                  <div className="d_detail_color_btns">
                    {product.colors.map((c) => (
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

              {/* Warranty (appliances) */}
              {product.warranty && (
                <div className="d_detail_warranty">
                  <FaShieldAlt /> {product.warranty}
                </div>
              )}

              {/* Quantity + CTA */}
              <div className="d_detail_actions">
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
                  className="d_btn_primary d_detail_cart_btn"
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart /> {product.stock === 0 ? "Notify Me" : "Add to Cart"}
                </button>
                <button
                  className={`d_detail_wishlist_btn ${wishlist ? "active" : ""}`}
                  onClick={() => setWishlist((w) => !w)}
                  aria-label="Add to wishlist"
                >
                  <FaHeart />
                </button>
                <button className="d_detail_share_btn" aria-label="Share">
                  <FaShareAlt />
                </button>
              </div>

              <Link to={product.type === "clothing" ? "/clothing" : "/appliances"} className="d_detail_buy_now">
                Buy Now <FaArrowRight size={12} />
              </Link>

              {/* Trust badges */}
              <div className="d_detail_trust">
                <div className="d_trust_badge">
                  <FaTruck />
                  <span>Free delivery above ₹1,999</span>
                </div>
                <div className="d_trust_badge">
                  <FaUndo />
                  <span>7-day easy returns</span>
                </div>
                <div className="d_trust_badge">
                  <FaShieldAlt />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Tabs: Description / Reviews */}
        <div className="d_detail_tabs mt-5">
          <div className="d_tab_nav">
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                className={`d_tab_btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "description" && "Description"}
                {tab === "reviews" && `Reviews (${product.reviewCount})`}
                {tab === "shipping" && "Shipping & Returns"}
              </button>
            ))}
          </div>

          <div className="d_tab_content">
            {activeTab === "description" && (
              <div className="d_tab_desc">
                <p>{product.description}</p>
                <ul className="d_detail_features">
                  <li>Premium quality materials for long-lasting durability</li>
                  <li>Carefully designed for comfort and performance</li>
                  <li>Easy care and maintenance</li>
                  <li>Available in multiple options to suit your preference</li>
                  {product.warranty && <li>{product.warranty}</li>}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <Row className="g-3 mb-4">
                  {productReviews.map((r) => (
                    <Col key={r.id} md={6} lg={3}>
                      <ReviewCard review={r} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="d_tab_shipping">
                <h4>Delivery</h4>
                <p>Standard delivery takes 3–5 business days. Express delivery is available at checkout for select pin codes.</p>
                <h4>Returns</h4>
                <p>We offer a 7-day easy return window. Products must be unused, in original packaging, with all tags intact.</p>
                <h4>Warranty</h4>
                <p>{product.warranty || "Please refer to the product packaging for warranty information."}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="d_section_title_wrap mt-5">
          <div>
            <span className="d_section_eyebrow">You May Also Like</span>
            <h2 className="d_section_title">Related Products</h2>
          </div>
          <Link
            to={product.type === "clothing" ? "/clothing" : "/appliances"}
            className="d_link_more"
          >
            View All <FaArrowRight size={12} />
          </Link>
        </div>
        <Row className="g-3 g-md-4">
          {related.map((p) => (
            <Col key={p.id} xs={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
