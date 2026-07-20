import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaEye, FaStar, FaShoppingCart } from "react-icons/fa";
import { useShop } from "../../context/ShopContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    brand,
    salePrice,
    mrp,
    discount,
    rating,
    reviewCount,
    image,
    badge,
    stock,
  } = product;
  const { addToWishlist, removeFromWishlist, isInWishlist, openQuickView, addToCart } = useShop();

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const inWishlist = isInWishlist(id);

  return (
    <div className="d_product_card d_fade_up">
      <div className="d_product_media">
        {badge && (
          <span
            className={`d_badge_pill d_product_badge d_badge_${badge
              .toLowerCase()
              .replace(/\s+/g, "_")}`}
          >
            {badge}
          </span>
        )}
        {discount > 0 && <span className="d_badge_pill d_product_discount">-{discount}%</span>}

        <Link to={`/product/${id}`}>
          <img src={image} alt={name} loading="lazy" />
        </Link>

        <div className="d_product_hover_actions">
          <button
            type="button"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleWishlistClick}
            className={inWishlist ? "active" : ""}
          >
            <FaHeart />
          </button>
          <button
            type="button"
            aria-label="Quick view"
            title="Quick View"
            onClick={handleQuickViewClick}
          >
            <FaEye />
          </button>
        </div>

        {stock === 0 && <div className="d_product_out_of_stock">Out of Stock</div>}
      </div>

      <div className="d_product_body">
        <span className="d_product_brand">{brand}</span>
        <Link to={`/product/${id}`} className="d_product_name">
          {name}
        </Link>

        <div className="d_product_rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={i < Math.round(rating) ? "d_star_filled" : "d_star_empty"} />
          ))}
          <span>({reviewCount})</span>
        </div>

        <div className="d_product_price_row">
          <span className="d_product_price">₹{salePrice.toLocaleString("en-IN")}</span>
          {mrp > salePrice && <span className="d_product_mrp">₹{mrp.toLocaleString("en-IN")}</span>}
        </div>

        <button
          className="d_btn_add_cart"
          type="button"
          disabled={stock === 0}
          onClick={handleAddToCart}
        >
          <FaShoppingCart /> {stock === 0 ? "Notify Me" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
