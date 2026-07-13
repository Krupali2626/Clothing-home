import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  return (
    <div className="d_card h-100 p-5" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <img
          src={review.avatar}
          alt={review.name}
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--d_accent)' }}
        />
        <div>
          <h6 style={{ color: 'white', marginBottom: '4px', fontWeight: 700 }}>{review.name}</h6>
          <div className="d_stars">
            {[1, 2, 3, 4, 5].map(i => (
              <FaStar key={i} size={14} className={`d_star ${i <= review.rating ? 'filled' : ''}`} style={i <= review.rating ? {} : { color: 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </div>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.8' }}>{review.comment}</p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '0' }}>{review.date}</p>
    </div>
  );
};

export default ReviewCard;
