import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  return (
    <div className="d_blog_card d_fade_up">
      <Link to={`/blog/${blog.slug}`} className="d_blog_img_wrap">
        <img src={blog.image} alt={blog.title} loading="lazy" />
        <span className="d_badge_pill d_blog_category">{blog.category}</span>
      </Link>
      <div className="d_blog_body">
        <span className="d_blog_date">
          <FaCalendarAlt /> {blog.date}
        </span>
        <Link to={`/blog/${blog.slug}`} className="d_blog_title">
          {blog.title}
        </Link>
        <p className="d_blog_excerpt">{blog.excerpt}</p>
        <Link to={`/blog/${blog.slug}`} className="d_blog_read_more">
          Read More <FaArrowRight size={11} />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
