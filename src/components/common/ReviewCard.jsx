import React from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import "./ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <div className="d_review_card d_fade_up">
      <FaQuoteRight className="d_review_quote_icon" />
      <div className="d_review_rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={i < review.rating ? "d_star_filled" : "d_star_empty"} />
        ))}
      </div>
      <p className="d_review_comment">{review.comment}</p>
      <div className="d_review_user">
        <img src={review.avatar} alt={review.name} loading="lazy" />
        <div>
          <strong>{review.name}</strong>
          <span>Verified Buyer · {review.product}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
