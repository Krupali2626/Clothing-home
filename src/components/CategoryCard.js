import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/clothing/${category.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div className="d_card text-center" style={{ cursor: 'pointer', padding: '24px' }}>
        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <img
            src={category.image}
            alt={category.name}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          />
        </div>
        <h5 style={{ color: 'var(--d_heading)', fontSize: '16px', fontWeight: 700, marginBottom: 0 }}>
          {category.name}
        </h5>
      </div>
    </Link>
  );
};

export default CategoryCard;
