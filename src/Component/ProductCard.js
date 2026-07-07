import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Container/CartContext';
import { FiHeart, FiShoppingBag, FiCheck, FiEye } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="z_product_card">
      {/* Badges */}
      <div className="z_product_badges">
        {product.isNew && <span className="z_badge z_badge_new">NEW</span>}
        {discount && <span className="z_badge z_badge_sale">-{discount}%</span>}
        {product.isBestSeller && <span className="z_badge z_badge_best">BEST SELLER</span>}
      </div>

      {/* Wishlist */}
      <button
        className={`z_wishlist_btn ${wishlist ? 'z_wishlist_active' : ''}`}
        onClick={() => setWishlist(!wishlist)}
        aria-label="Add to wishlist"
      >
        {wishlist ? <FaHeart size={15} /> : <FiHeart size={15} />}
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="z_product_image_wrap">
        <div className="z_product_image" style={{ background: product.bgColor || '#f5f0eb' }}>
          {product.image && !imgError ? (
            <img
              src={product.image}
              alt={product.name}
              className="z_product_img"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="z_product_img_fallback" style={{ background: product.bgColor }}>
              <FiShoppingBag size={48} color="#ccc" />
            </div>
          )}
        </div>
        <div className="z_product_hover_overlay">
          <span className="z_quick_view">
            <FiEye size={14} style={{ marginRight: 6 }} />
            Quick View
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="z_product_info">
        <span className="z_product_category">{product.category}</span>
        <h6 className="z_product_name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h6>

        {/* Rating */}
        <div className="z_product_rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`z_star ${star <= Math.floor(product.rating) ? 'z_star_filled' : ''}`}
            >★</span>
          ))}
          <span className="z_rating_count">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="z_product_price_row">
          <span className="z_product_price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="z_product_original_price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className={`z_add_to_cart_btn ${added ? 'z_added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? (
            <><FiCheck size={15} /> Added!</>
          ) : (
            <><FiShoppingBag size={15} /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
