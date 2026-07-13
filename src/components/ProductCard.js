import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaExchangeAlt, FaStar, FaShoppingCart, FaTruck, FaCheckCircle } from 'react-icons/fa';

const GRADIENT = 'linear-gradient(135deg, #FF9A8B 0%, #FFECD2 100%)';
const GRADIENT_SHADOW = '0 12px 32px rgba(255,154,139,0.4)';
const GRADIENT_PASTEL_BLUE = 'linear-gradient(135deg, #C7CEEA 0%, #B5D7E5 100%)';

const ActionButton = ({ title, icon: Icon }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '40px', height: '40px', borderRadius: '50%',
        background: hovered ? GRADIENT : 'white',
        border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: hovered ? '0 4px 16px rgba(255,154,139,0.35)' : '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        color: hovered ? '#4A3F35' : '#7B6F64',
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
      }}
    >
      <Icon size={16} />
    </button>
  );
};

const ProductCard = ({ product }) => {
  const rating = Math.floor(product.rating);
  const [cardHovered, setCardHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const fallbackImage = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop';

  return (
    <div
      className="d_product_card"
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      style={{
        background: 'white',
        borderRadius: '18px',
        boxShadow: cardHovered
          ? '0 24px 50px rgba(255,154,139,0.15)'
          : '0 8px 24px rgba(255,154,139,0.07)',
        overflow: 'hidden',
        transition: 'all 0.35s ease',
        transform: cardHovered ? 'translateY(-8px)' : 'translateY(0)',
        border: cardHovered ? '2px solid #F5D5AE' : '2px solid #F5E6D3',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', background: '#FFF3CD' }}>
        <img
          src={imgError ? fallbackImage : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            transition: 'transform 0.6s ease',
            transform: cardHovered ? 'scale(1.12)' : 'scale(1)',
          }}
        />

        {/* Badge left-top */}
        {product.badge && (
          <span style={{
            position: 'absolute', top: '12px', left: '12px',
            background: GRADIENT_PASTEL_BLUE,
            color: '#4A3F35', padding: '6px 16px', borderRadius: '50px',
            fontSize: '11px', fontWeight: '700', zIndex: 10,
            boxShadow: '0 4px 12px rgba(199,206,234,0.5)',
          }}>
            {product.badge}
          </span>
        )}

        {/* Discount right-top — hides when actions appear */}
        {product.discount > 0 && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
            color: 'white', padding: '6px 16px', borderRadius: '50px',
            fontSize: '11px', fontWeight: '700',
            zIndex: cardHovered ? 5 : 10,
            opacity: cardHovered ? 0 : 1,
            transition: 'opacity 0.25s ease',
            boxShadow: '0 4px 12px rgba(255,107,107,0.4)',
          }}>
            -{product.discount}%
          </span>
        )}

        {/* Action buttons */}
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          display: 'flex', flexDirection: 'column', gap: '8px',
          opacity: cardHovered ? 1 : 0,
          transform: cardHovered ? 'translateX(0)' : 'translateX(14px)',
          transition: 'all 0.3s ease',
          zIndex: 20,
        }}>
          <ActionButton title="Add to Wishlist" icon={FaHeart} />
          <ActionButton title="Quick View" icon={FaEye} />
          <ActionButton title="Compare" icon={FaExchangeAlt} />
        </div>

        {/* Bottom image overlay on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(255,154,139,0.12), transparent)',
          opacity: cardHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '22px' }}>
        <span style={{
          color: '#FF9A8B', fontWeight: '700', fontSize: '11px',
          textTransform: 'uppercase', letterSpacing: '1px',
        }}>
          {product.brand}
        </span>

        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h5 style={{
            fontSize: '16px', fontWeight: '700', color: '#4A3F35',
            margin: '10px 0 12px', lineHeight: '1.4',
            transition: 'color 0.2s',
            color: cardHovered ? '#FF6B6B' : '#4A3F35',
          }}>
            {product.name}
          </h5>
        </Link>

        {/* Stars */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <FaStar key={i} size={14} color={i <= rating ? '#FFB84D' : '#E5E7EB'} />
          ))}
          <span style={{ color: '#8B7E74', fontSize: '12px', marginLeft: '6px' }}>
            ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          {product.discount > 0 && (
            <span style={{ color: '#B8A99D', fontSize: '15px', textDecoration: 'line-through', fontWeight: '500' }}>
              ${product.price.toFixed(2)}
            </span>
          )}
          <span style={{
            fontSize: '24px', fontWeight: '800',
            background: GRADIENT,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            ${product.discountedPrice.toFixed(2)}
          </span>
        </div>

        {/* Stock + Shipping */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
          {product.inStock && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6BCB77', fontWeight: '600' }}>
              <FaCheckCircle size={13} /> In Stock
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6BCB77', fontWeight: '600' }}>
            <FaTruck size={13} /> Free Shipping
          </div>
        </div>

        {/* Add to Cart */}
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            width: '100%', padding: '14px 24px',
            borderRadius: '50px', border: 'none',
            background: GRADIENT,
            color: '#4A3F35', fontWeight: '700', fontSize: '14px',
            cursor: 'pointer', transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transform: btnHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
            boxShadow: btnHovered ? GRADIENT_SHADOW : '0 4px 16px rgba(255,154,139,0.25)',
          }}
        >
          <FaShoppingCart size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
