import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaHeart,
  FaShoppingCart,
  FaTrash,
  FaArrowRight,
  FaStar,
  FaChevronRight,
  FaShareAlt,
} from "react-icons/fa";
import { latestProducts } from "../data/products";
import ProductCard from "../components/common/ProductCard";
import { useShop } from "../context/ShopContext";
import "./Wishlist.css";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, addToCart } = useShop();
  const suggested = latestProducts.filter((p) => !wishlist.find((i) => i.id === p.id)).slice(0, 4);

  if (wishlist.length === 0) {
    return (
      <div className="d_wishlist_empty container d_section">
        <FaHeart className="d_wishlist_empty_icon" />
        <h2>Your wishlist is empty</h2>
        <p>Save your favourite products here to revisit them later.</p>
        <Link to="/clothing" className="d_btn_primary">
          Explore Products <FaArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="d_wishlist_page">
      {/* Breadcrumb */}
      <div className="d_wishlist_breadcrumb container">
        <ol className="d_breadcrumb_dark">
          <li><Link to="/">Home</Link></li>
          <li><FaChevronRight size={10} /></li>
          <li>Wishlist</li>
        </ol>
        <div className="d_wishlist_title_row">
          <h1 className="d_cart_heading">
            My Wishlist <span>({wishlist.length} items)</span>
          </h1>
          <div className="d_wishlist_actions">
            <button className="d_wishlist_action_btn" aria-label="Share wishlist">
              <FaShareAlt /> Share List
            </button>
            <button
              className="d_wishlist_action_btn d_wishlist_clear"
              onClick={clearWishlist}
            >
              <FaTrash /> Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="container d_section pt-3">
        <Row className="g-3 g-md-4">
          {wishlist.map((product) => (
            <Col key={product.id} xs={6} sm={4} md={4} lg={3}>
              <div className="d_wishlist_card">
                {/* Remove button */}
                <button
                  className="d_wishlist_remove_btn"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label="Remove from wishlist"
                >
                  <FaTrash />
                </button>

                {/* Badge */}
                {product.badge && (
                  <span className={`d_badge_pill d_wishlist_badge d_badge_${product.badge.toLowerCase().replace(/\s+/g, "_")}`}>
                    {product.badge}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="d_badge_pill d_wishlist_discount_badge ">
                    -{product.discount}%
                  </span>
                )}

                {/* Image */}
                <Link to={`/product/${product.id}`} className="d_wishlist_img_link">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </Link>

                {/* Info */}
                <div className="d_wishlist_info">
                  <span className="d_product_brand">{product.brand}</span>
                  <Link to={`/product/${product.id}`} className="d_wishlist_name">
                    {product.name}
                  </Link>

                  <div className="d_product_rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.round(product.rating) ? "d_star_filled" : "d_star_empty"}
                      />
                    ))}
                    <span>({product.reviewCount})</span>
                  </div>

                  <div className="d_product_price_row">
                    <span className="d_product_price">
                      ₹{product.salePrice.toLocaleString("en-IN")}
                    </span>
                    {product.mrp > product.salePrice && (
                      <span className="d_product_mrp">
                        ₹{product.mrp.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <button
                    className="d_btn_add_cart d_wishlist_cart_btn"
                    type="button"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart />
                    {product.stock === 0 ? "Notify Me" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Suggested */}
        {suggested.length > 0 && (
          <div className="d_cart_suggested">
            <div className="d_section_title_wrap">
              <div>
                <span className="d_section_eyebrow">Discover More</span>
                <h2 className="d_section_title">You May Also Like</h2>
              </div>
              <Link to="/clothing" className="d_link_more">
                View All <FaArrowRight size={12} />
              </Link>
            </div>
            <Row className="g-3">
              {suggested.map((p) => (
                <Col key={p.id} xs={6} sm={4} md={4} lg={3}>
                  <ProductCard product={p} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
