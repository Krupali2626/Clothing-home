import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FaArrowRight, FaBolt } from "react-icons/fa";

import HeroSlider from "../components/common/HeroSlider";
import CategoryCard from "../components/common/CategoryCard";
import ProductCard from "../components/common/ProductCard";
import BrandSlider from "../components/common/BrandSlider";
import ReviewCard from "../components/common/ReviewCard";
import Newsletter from "../components/common/Newsletter";
import FAQSection from "../components/common/FAQSection";
import BlogCard from "../components/common/BlogCard";
import FlashSaleTimer from "../components/common/FlashSaleTimer";
import GoogleAdBanner from "../components/common/GoogleAdBanner";

import { useShop } from "../context/ShopContext";
import reviews from "../data/reviews";
import blogs from "../data/blogs";

import "./Home.css";

const SectionHeader = ({ eyebrow, title, subtitle, to }) => (
  <div className="d_section_title_wrap">
    <div>
      <span className="d_section_eyebrow">{eyebrow}</span>
      <h2 className="d_section_title">{title}</h2>
      {subtitle && <p className="d_section_subtitle">{subtitle}</p>}
    </div>
    {to && (
      <Link to={to} className="d_link_more">
        View All <FaArrowRight size={12} />
      </Link>
    )}
  </div>
);

const Home = () => {
  const { products, categories: apiCategories, fetchProducts, fetchCategories } = useShop();

  // Fetch products and categories from API on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Use API categories if available
  const displayCategories = apiCategories.length > 0 ? apiCategories.slice(0, 10) : [];

  const featuredReviews = reviews.slice(0, 6);
  const latestBlogs = blogs.slice(0, 4);
  const trendingProducts = products.slice(0, 6);
  const flashSaleProducts = products.filter((p) => p.discount >= 15).slice(0, 6);
  const latestProducts = products.slice(0, 6);
  const bestSellerProducts = products.slice(0, 6);
  const featuredCategories = displayCategories;

  return (
    <main className="d_home_page ">
      {/* Top Banner Ad */}
      <div className=" d_section_sm pb-0">
        <GoogleAdBanner size="leaderboard" label="Top Banner · 728 × 90" />
      </div>

      {/* Hero Slider */}
      <section className=" d_hero_section">
        <HeroSlider />
      </section>

      {/* Featured Categories */}
      <section className=" d_section">
       <div className="container">
         <SectionHeader
          eyebrow="Browse"
          title="Featured Categories"
          subtitle="From everyday essentials to home upgrades — find it all in one place."
          to="/clothing"
        />
        <Row className="g-3 g-md-4">
          {featuredCategories.map((cat) => (
            <Col key={cat.id} xs={6} sm={4} md={3} lg={2}>
              <CategoryCard category={cat} />
            </Col>
          ))}
        </Row>
       </div>
      </section>

      {/* Trending Products */}
      <section className=" d_section d_bg_alt">
       <div className="container">
         <SectionHeader
          eyebrow="Popular right now"
          title="Trending Products"
          subtitle="Handpicked styles and appliances everyone's adding to cart."
          to="/clothing?sort=trending"
        />
        <Row className="g-3 g-md-4">
          {trendingProducts.map((p) => (
            <Col key={p.id} xs={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
       </div>
      </section>

      {/* In-feed Ad */}
      <div className=" d_section_sm">
        <div className="container">
          <GoogleAdBanner size="banner" label="Between Products · Responsive" />
        </div>
      </div>

      {/* Flash Sale */}
      <section className=" d_section">
       <div className="container">
         <div className="d_flash_sale_banner ">
          <div className="d_flash_sale_heading">
            <span className="d_section_eyebrow" style={{ color: "var(--d-accent-light)" }}>
              <FaBolt /> Limited Time
            </span>
            <h2 className="d_section_title" style={{ color: "var(--d-white)" }}>
              Flash Sale
            </h2>
          </div>
          <FlashSaleTimer />
          <Link to="/clothing?filter=sale" className="d_btn_primary">
            Shop All Deals <FaArrowRight size={12} />
          </Link>
        </div>
        <Row className="g-3 g-md-4 mt-1">
          {flashSaleProducts.map((p) => (
            <Col key={p.id} xs={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
       </div>
      </section>

      {/* Latest Products */}
      <section className=" d_section d_bg_alt">
<div className="container">
          <SectionHeader
          eyebrow="Just Arrived"
          title="Latest Products"
          subtitle="The newest additions across clothing and home appliances."
          to="/appliances?sort=new"
        />
        <Row className="g-3 g-md-4">
          {latestProducts.map((p) => (
            <Col key={p.id} xs={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
</div>
      </section>

      {/* Best Sellers */}
      <section className=" d_section">
      <div className="container">
          <SectionHeader
          eyebrow="Customer Favorites"
          title="Best Sellers"
          subtitle="Top-rated picks loved by thousands of shoppers."
          to="/appliances?sort=bestseller"
        />
        <Row className="g-3 g-md-4">
          {bestSellerProducts.map((p) => (
            <Col key={p.id} xs={6} md={4} lg={3}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      </div>
      </section>

      {/* Featured Brands */}
      <section className=" d_section d_bg_alt">
       <div className="container">
         <SectionHeader eyebrow="Trusted Names" title="Featured Brands" />
        <BrandSlider />
       </div>
      </section>

      {/* Special Offers */}
      <section className=" d_section">
    <div className="container">
          <SectionHeader eyebrow="Deals" title="Special Offers" />
        <Row className="g-4">
          <Col md={6}>
            <Link to="/clothing?filter=sale" className="d_offer_card">
              <div>
                <span className="d_badge_pill" style={{ background: "var(--d-accent)", color: "#fff" }}>
                  Up to 40% Off
                </span>
                <h3>Clothing Clearance</h3>
                <p>Season-end styles at their lowest prices.</p>
              </div>
              <FaArrowRight />
            </Link>
          </Col>
          <Col md={6}>
            <Link to="/appliances?filter=sale" className="d_offer_card d_offer_card_blue">
              <div>
                <span className="d_badge_pill" style={{ background: "var(--d-secondary)", color: "#fff" }}>
                  Up to 25% Off
                </span>
                <h3>Appliance Bundle Deals</h3>
                <p>Save more when you upgrade multiple appliances.</p>
              </div>
              <FaArrowRight />
            </Link>
          </Col>
        </Row>
    </div>
      </section>

      {/* Customer Reviews */}
      <section className=" d_section d_bg_alt">
    <div className="container">
          <SectionHeader
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Real feedback from real D.Store shoppers."
        />
        <Row className="g-3 g-md-4">
          {featuredReviews.map((r) => (
            <Col key={r.id} md={4}>
              <ReviewCard review={r} />
            </Col>
          ))}
        </Row>
    </div>
      </section>

      {/* Newsletter */}
      <section className="container d_section_sm">
        <Newsletter />
      </section>

      {/* FAQ */}
      <section className="container d_section">
        <Row className="justify-content-center">
          <Col lg={8}>
            <SectionHeader eyebrow="Need Help?" title="Frequently Asked Questions" />
            <FAQSection />
          </Col>
        </Row>
      </section>

      {/* Latest Blogs */}
      <section className=" d_section d_bg_alt">
      <div className="container">
          <SectionHeader
          eyebrow="From the Blog"
          title="Latest Articles"
          subtitle="Style guides, buying tips and home inspiration."
          to="/blog"
        />
        <Row className="g-3 g-md-4">
          {latestBlogs.map((b) => (
            <Col key={b.id} sm={6} lg={3}>
              <BlogCard blog={b} />
            </Col>
          ))}
        </Row>
      </div>
      </section>

      {/* Bottom Banner Ad */}
      <div className="container d_section_sm pt-0">
        <GoogleAdBanner size="leaderboard" label="Bottom Banner · 728 × 90" />
      </div>
    </main>
  );
};

export default Home;
