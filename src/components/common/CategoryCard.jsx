import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ category }) => {
  const base = category.type === "clothing" ? "/clothing" : "/appliances";
  return (
    <Link to={`${base}?category=${category.slug}`} className="d_category_card d_fade_up">
      <div className="d_category_img_wrap">
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>
      <h4 className="d_category_name">{category.name}</h4>
      <span className="d_category_count">{category.count} products</span>
    </Link>
  );
};

export default CategoryCard;
