import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowRight,
  FaTag,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa";
import BlogCard from "../components/common/BlogCard";
import blogs from "../data/blogs";
import "./BlogPost.css";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="d_container_fluid d_section d_not_found">
        <h2>Post not found</h2>
        <Link to="/blog" className="d_btn_primary">Back to Blog</Link>
      </div>
    );
  }

  const related = blogs
    .filter((b) => b.slug !== slug && b.category === post.category)
    .slice(0, 4);

  const popular = blogs.filter((b) => b.popular && b.slug !== slug).slice(0, 4);

  return (
    <div className="d_blogpost_page">
      {/* Hero */}
      <div
        className="d_blogpost_hero"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_blogpost_hero_content container">
          <ol className="d_breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>{post.category}</li>
          </ol>
          <span className="d_badge_pill d_blogpost_cat_badge">{post.category}</span>
          <h1 className="d_blogpost_hero_title">{post.title}</h1>
          <div className="d_blogpost_meta">
            <span><FaUser /> {post.author}</span>
            <span><FaCalendarAlt /> {post.date}</span>
            <span><FaClock /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="container d_section">
        <Row className="g-5">
          {/* Article Body */}
          <Col lg={8}>
            <article className="d_article">
              <p className="d_article_lead">{post.excerpt}</p>

              <p>
                Whether you're looking to upgrade your lifestyle or make a smarter purchase decision,
                this guide covers all the essentials. Our editorial team has put together a comprehensive
                overview based on hands-on experience, customer feedback, and industry research.
              </p>

              <h2>Why This Matters</h2>
              <p>
                In today's fast-moving market, making an informed choice is more important than ever.
                Trends shift quickly and new products launch constantly. Understanding what to look for
                and what to avoid can save you both time and money.
              </p>

              <img src={post.image} alt={post.title} className="d_article_img" />

              <h2>Key Things to Know</h2>
              <ul className="d_article_list">
                <li>Quality and durability should always be your first consideration.</li>
                <li>Check reviews from verified buyers before making a purchase.</li>
                <li>Compare specifications across similar products in the category.</li>
                <li>Look for warranty, return policy, and after-sales support.</li>
                <li>Consider the long-term value, not just the upfront price.</li>
              </ul>

              <p>
                {post.content}
              </p>

              <h2>Final Thoughts</h2>
              <p>
                The right choice is always the one that fits your specific needs and budget. Use this
                guide as a starting point, and don't hesitate to reach out to our customer support team
                if you need personalised recommendations.
              </p>

              {/* Tags */}
              <div className="d_article_tags">
                {(post.tags || []).map((tag) => (
                  <span key={tag} className="d_article_tag">
                    <FaTag size={10} /> {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="d_article_share">
                <span>Share this article:</span>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Share on Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Share on Twitter">
                  <FaTwitter />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
                  <FaLinkedinIn />
                </a>
                <button aria-label="Copy link" onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                  <FaLink />
                </button>
              </div>

              {/* Author card */}
              <div className="d_author_card">
                <img src={post.authorAvatar} alt={post.author} />
                <div>
                  <strong>{post.author}</strong>
                  <p>
                    Our editorial team brings together fashion experts and tech enthusiasts to help
                    you make smarter shopping decisions — every day.
                  </p>
                </div>
              </div>
            </article>

            {/* Related Posts */}
            {related.length > 0 && (
              <div className="d_related_posts">
                <div className="d_section_title_wrap">
                  <div>
                    <span className="d_section_eyebrow">Keep Reading</span>
                    <h2 className="d_section_title">Related Articles</h2>
                  </div>
                  <Link to="/blog" className="d_link_more">
                    View All <FaArrowRight size={12} />
                  </Link>
                </div>
                <Row className="g-3">
                  {related.map((b) => (
                    <Col key={b.id} sm={6}>
                      <BlogCard blog={b} />
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <div className="d_blog_sidebar">
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

              <div className="d_sidebar_widget d_sidebar_cta">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=180&fit=crop&auto=format"
                  alt="Shop Now"
                  className="d_sidebar_cta_img"
                />
                <h5>New Season Arrivals</h5>
                <p>Fresh styles just landed — shop the latest collection now.</p>
                <Link to="/clothing" className="d_btn_primary w-100 justify-content-center">
                  Shop Now <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlogPost;
