import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaChevronRight,
  FaSearch,
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
  FaTag,
} from "react-icons/fa";
import blogs from "../data/blogs";
import "./Blog.css";

const CATEGORIES = ["All", "Fashion", "Appliances"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = [...blogs];
    if (activeCategory !== "All")
      list = list.filter((b) => b.category === activeCategory);
    if (search.trim())
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    return list;
  }, [activeCategory, search]);

  const featured = blogs[0];
  const popular = blogs.filter((b) => b.popular).slice(0, 4);

  return (
    <div className="d_blog_page">
      {/* Banner */}
      <div
        className="d_page_banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&h=300&fit=crop&auto=format)",
          height: "220px",
        }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_page_banner_content container">
          <h1>Blog & Articles</h1>
          <ol className="d_breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>Blog</li>
          </ol>
        </div>
      </div>

      <div className="container d_section">
        <Row className="g-5">
          {/* Main column */}
          <Col lg={8}>
            {/* Featured Post */}
            <Link to={`/blog/${featured.slug}`} className="d_blog_featured">
              <div className="d_blog_featured_img">
                <img src={featured.image} alt={featured.title} />
                <span className="d_badge_pill d_blog_category">{featured.category}</span>
              </div>
              <div className="d_blog_featured_body">
                <div className="d_blog_meta">
                  <span><FaCalendarAlt /> {featured.date}</span>
                  <span><FaClock /> {featured.readTime}</span>
                  <span>By {featured.author}</span>
                </div>
                <h2 className="d_blog_featured_title">{featured.title}</h2>
                <p className="d_blog_featured_excerpt">{featured.excerpt}</p>
                <span className="d_blog_read_more_btn">
                  Read Article <FaArrowRight size={12} />
                </span>
              </div>
            </Link>

            {/* Filter bar */}
            <div className="d_blog_filter_bar">
              <div className="d_blog_cats">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`d_blog_cat_btn ${activeCategory === c ? "active" : ""}`}
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="d_blog_search">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Articles grid */}
            {filtered.length === 0 ? (
              <p className="d_no_results_text">No articles found. Try a different search.</p>
            ) : (
              <Row className="g-4">
                {filtered.map((blog) => (
                  <Col key={blog.id} sm={6}>
                    <div className="d_blog_card d_fade_up">
                      <Link to={`/blog/${blog.slug}`} className="d_blog_img_wrap">
                        <img src={blog.image} alt={blog.title} loading="lazy" />
                        <span className="d_badge_pill d_blog_category">{blog.category}</span>
                      </Link>
                      <div className="d_blog_body">
                        <div className="d_blog_meta_sm">
                          <span><FaCalendarAlt /> {blog.date}</span>
                          <span><FaClock /> {blog.readTime}</span>
                        </div>
                        <Link to={`/blog/${blog.slug}`} className="d_blog_title">
                          {blog.title}
                        </Link>
                        <p className="d_blog_excerpt">{blog.excerpt}</p>
                        <div className="d_blog_tags">
                          {(blog.tags || []).map((tag) => (
                            <span key={tag} className="d_blog_tag">
                              <FaTag size={9} /> {tag}
                            </span>
                          ))}
                        </div>
                        <Link to={`/blog/${blog.slug}`} className="d_blog_read_more">
                          Read More <FaArrowRight size={11} />
                        </Link>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div className="d_blog_sidebar">
              {/* Search */}
              <div className="d_sidebar_widget">
                <h5 className="d_sidebar_title">Search</h5>
                <div className="d_sidebar_search">
                  <FaSearch />
                  <input
                    type="text"
                    placeholder="Search articles…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="d_sidebar_widget">
                <h5 className="d_sidebar_title">Categories</h5>
                <ul className="d_sidebar_cat_list">
                  {CATEGORIES.filter((c) => c !== "All").map((c) => (
                    <li key={c}>
                      <button
                        className={activeCategory === c ? "active" : ""}
                        onClick={() => setActiveCategory(c)}
                      >
                        {c}
                        <span>{blogs.filter((b) => b.category === c).length}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="d_sidebar_widget">
                <h5 className="d_sidebar_title">Popular Posts</h5>
                <ul className="d_sidebar_popular">
                  {popular.map((b) => (
                    <li key={b.id}>
                      <Link to={`/blog/${b.slug}`} className="d_sidebar_popular_item">
                        <img src={b.image} alt={b.title} />
                        <div>
                          <p>{b.title}</p>
                          <span><FaCalendarAlt size={10} /> {b.date}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="d_sidebar_widget">
                <h5 className="d_sidebar_title">Tags</h5>
                <div className="d_sidebar_tags">
                  {["Style", "Fashion", "Appliances", "Home", "Guide", "Tips", "Winter", "Summer", "Kitchen"].map(
                    (tag) => (
                      <span key={tag} className="d_tag_chip">{tag}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Blog;
