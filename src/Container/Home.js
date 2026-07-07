import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Component/ProductCard';
import { products } from './productsData';
import {
  FiTruck,
  FiRefreshCw,
  FiShield,
  FiStar,
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import {
  MdOutlineCheckroom,
  MdOutlineBlender,
  MdOutlineChair,
  MdOutlineDiamond,
} from 'react-icons/md';
import { HiSparkles } from 'react-icons/hi';
import { TbShirt, TbHome, TbShoppingBag, TbArmchair } from 'react-icons/tb';

function Home() {
  const featuredProducts = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderBanners = [
    {
      id: 1,
      tag: "Limited Time",
      title: "Summer Sale - Up to 50% Off!",
      desc: "Don't miss out on our biggest sale of the year. Grab your favorites before they're gone!",
      buttonText: "Shop Now",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop"
    },
    {
      id: 2,
      tag: "New Collection",
      title: "Fall Fashion 2025",
      desc: "Discover the latest trends in clothing and home decor for the upcoming season.",
      buttonText: "Explore",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=500&fit=crop"
    },
    {
      id: 3,
      tag: "Exclusive",
      title: "Home Appliance Sale",
      desc: "Upgrade your home with our premium selection of smart appliances at amazing prices.",
      buttonText: "View Offers",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=500&fit=crop"
    },
    {
      id: 4,
      tag: "Best Sellers",
      title: "Customer Favorites",
      desc: "Our most loved products that you shouldn't miss. Quality guaranteed!",
      buttonText: "See All",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=500&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderBanners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderBanners.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const trustBadges = [
    { icon: <FiTruck size={28} />, title: 'Free Shipping', sub: 'On orders over $75' },
    { icon: <FiRefreshCw size={28} />, title: 'Easy Returns', sub: '30-day hassle-free' },
    { icon: <FiShield size={28} />, title: 'Secure Payment', sub: '100% protected' },
    { icon: <FiStar size={28} />, title: 'Premium Quality', sub: 'Curated collections' },
  ];

  const categoryList = [
    { label: 'Clothing', icon: <TbShirt size={32} />, color: '#f5e6f0', tag: 'clothing', count: '120+ Items' },
    { label: 'Home Appliances', icon: <TbHome size={32} />, color: '#e3f0f5', tag: 'home-appliances', count: '80+ Items' },
    { label: 'Accessories', icon: <TbShoppingBag size={32} />, color: '#f5ede0', tag: 'accessories', count: '60+ Items' },
    { label: 'Furniture', icon: <TbArmchair size={32} />, color: '#f0e8f5', tag: 'furniture', count: '45+ Items' },
  ];

  return (
    <main className="z_home">

      {/* ===== HERO SECTION ===== */}
      <section className="z_hero">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-lg-6 z_hero_content">
              <span className="z_hero_tag">New Season 2025</span>
              <h1 className="z_hero_title">
                Style Meets <br />
                <span className="z_hero_highlight">Smart Living</span>
              </h1>
              <p className="z_hero_desc">
                Discover premium clothing and smart home appliances crafted for modern lifestyles.
                Elevate every moment — from what you wear to how you live.
              </p>
              <div className="z_hero_actions">
                <Link to="/shop" className="z_btn_primary">Explore Collection</Link>
                <Link to="/about" className="z_btn_ghost">Our Story</Link>
              </div>
              <div className="z_hero_stats">
                <div className="z_stat">
                  <span className="z_stat_num">10K+</span>
                  <span className="z_stat_label">Happy Customers</span>
                </div>
                <div className="z_stat_divider"></div>
                <div className="z_stat">
                  <span className="z_stat_num">500+</span>
                  <span className="z_stat_label">Products</span>
                </div>
                <div className="z_stat_divider"></div>
                <div className="z_stat">
                  <span className="z_stat_num">4.9★</span>
                  <span className="z_stat_label">Avg. Rating</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex z_hero_visual_col">
              <div className="z_hero_visual">
                <div className="z_hero_card z_hero_card_1">
                  <span className="z_hero_card_icon"><MdOutlineCheckroom size={36} /></span>
                  <span className="z_hero_card_label">New Arrivals</span>
                </div>
                <div className="z_hero_card z_hero_card_2">
                  <span className="z_hero_card_icon"><MdOutlineBlender size={36} /></span>
                  <span className="z_hero_card_label">Smart Home</span>
                </div>
                <div className="z_hero_card z_hero_card_3">
                  <span className="z_hero_card_icon"><MdOutlineChair size={36} /></span>
                  <span className="z_hero_card_label">Furniture</span>
                </div>
                <div className="z_hero_center_blob">
                  <HiSparkles size={32} className="z_hero_blob_icon" />
                  <span className="z_hero_blob_text">LuxeNest</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="z_hero_scroll_hint">
          <span>Scroll to explore</span>
          <span className="z_scroll_arrow">↓</span>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="z_trust_bar">
        <div className="container">
          <div className="row justify-content-center g-3">
            {trustBadges.map((badge, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="z_trust_badge">
                  <span className="z_trust_icon">{badge.icon}</span>
                  <div>
                    <p className="z_trust_title">{badge.title}</p>
                    <p className="z_trust_sub">{badge.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="z_section z_categories_section">
        <div className="container">
          <div className="z_section_header text-center">
            <span className="z_section_tag">Browse By</span>
            <h2 className="z_section_title">Shop Categories</h2>
          </div>
          <div className="row g-3 justify-content-center">
            {categoryList.map((cat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <Link to={`/shop?category=${cat.tag}`} className="z_category_card" style={{ '--cat-color': cat.color }}>
                  <div className="z_category_icon_wrap">
                    <span className="z_category_react_icon">{cat.icon}</span>
                  </div>
                  <h6 className="z_category_label">{cat.label}</h6>
                  <p className="z_category_count">{cat.count}</p>
                  <span className="z_category_arrow"><FiArrowRight size={16} /></span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SELLERS ===== */}
      <section className="z_section z_products_section z_bestsellers_section">
        <div className="container">
          <div className="z_section_header d-flex justify-content-between align-items-end flex-wrap gap-2">
            <div>
              <span className="z_section_tag">Top Picks</span>
              <h2 className="z_section_title">Best Sellers</h2>
            </div>
            <Link to="/shop" className="z_see_all_link">View All <FiArrowRight size={14} /></Link>
          </div>
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROMO BANNER ===== */}
      <section className="z_promo_banner">
        <div className="container">
          <div className="z_promo_inner">
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <div className="z_promo_badge">
                  <FiClock size={16} />
                  <span>Limited Time Offer</span>
                </div>
                <h2 className="z_promo_title">Up to 40% Off Home Appliances</h2>
                <p className="z_promo_desc">
                  Smart home upgrades that fit your budget. Shop our handpicked selection of premium appliances.
                </p>
                <div className="z_promo_features">
                  <div className="z_promo_feature">
                    <FiCheckCircle size={18} />
                    <span>Free Shipping</span>
                  </div>
                  <div className="z_promo_feature">
                    <FiCheckCircle size={18} />
                    <span>2-Year Warranty</span>
                  </div>
                  <div className="z_promo_feature">
                    <FiCheckCircle size={18} />
                    <span>Easy Returns</span>
                  </div>
                </div>
                <Link to="/shop?category=home-appliances" className="z_promo_btn">
                  Shop Appliances <FiArrowRight size={16} style={{ marginLeft: 8 }} />
                </Link>
              </div>
              <div className="col-lg-5 d-none d-lg-flex justify-content-center">
                <div className="z_promo_visual">
                  <div className="z_promo_decor_1"></div>
                  <div className="z_promo_decor_2"></div>
                  <div className="z_promo_decor_3"></div>
                  
                  <div className="z_promo_main_card">
                    <MdOutlineBlender size={56} />
                  </div>
                  
                  <div className="z_promo_mini_card z_promo_mini_1">
                    <MdOutlineCheckroom size={32} />
                  </div>
                  
                  <div className="z_promo_mini_card z_promo_mini_2">
                    <MdOutlineDiamond size={32} />
                  </div>
                  
                  <div className="z_promo_mini_card z_promo_mini_3">
                    <MdOutlineChair size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="z_section z_products_section">
        <div className="container">
          <div className="z_section_header d-flex justify-content-between align-items-end flex-wrap gap-2">
            <div>
              <span className="z_section_tag">Just In</span>
              <h2 className="z_section_title">New Arrivals</h2>
            </div>
            <Link to="/shop" className="z_see_all_link">View All <FiArrowRight size={14} /></Link>
          </div>
          <div className="row g-4">
            {newArrivals.map((product) => (
              <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ADVERTISEMENT SLIDER ===== */}
      <div className="container">
        <div className="z_ad_slider">
          <div className="z_ad_slider_wrapper">
            {sliderBanners.map((banner, index) => (
              <div 
                key={banner.id}
                className={`z_ad_slide ${index === currentSlide ? 'z_ad_slide_active' : ''}`}
                style={{
                  backgroundImage: `url('${banner.image}')`
                }}
              >
                <div className="z_ad_slide_overlay"></div>
                <div className="z_ad_slide_content">
                  <span className="z_ad_tag">{banner.tag}</span>
                  <h3 className="z_ad_title">{banner.title}</h3>
                  <p className="z_ad_desc">{banner.desc}</p>
                  <Link to="/shop" className="z_ad_btn">
                    {banner.buttonText} <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button className="z_ad_slider_btn z_ad_slider_prev" onClick={prevSlide}>
            <FiChevronLeft size={24} />
          </button>
          <button className="z_ad_slider_btn z_ad_slider_next" onClick={nextSlide}>
            <FiChevronRight size={24} />
          </button>

          {/* Indicators */}
          <div className="z_ad_slider_indicators">
            {sliderBanners.map((_, index) => (
              <button
                key={index}
                className={`z_ad_slider_indicator ${index === currentSlide ? 'z_ad_slider_indicator_active' : ''}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== TESTIMONIALS ===== */}
      <section className="z_section z_testimonials_section">
        <div className="container">
          <div className="z_section_header text-center">
            <span className="z_section_tag">What People Say</span>
            <h2 className="z_section_title">Customer Reviews</h2>
          </div>
          <div className="row g-4">
            {[
              { name: 'Sarah M.', review: "Absolutely love the quality of the Cashmere Turtleneck! It's so soft and the fit is perfect. Will definitely order again.", rating: 5, product: 'Cashmere Turtleneck' },
              { name: 'James K.', review: 'The Robot Vacuum is a game changer. Saves me so much time and works flawlessly on all floor types.', rating: 5, product: 'Robot Vacuum Plus' },
              { name: 'Priya L.', review: 'Fast shipping, beautiful packaging and the Silk Dress exceeded my expectations. LuxeNest is my go-to store now!', rating: 5, product: 'Silk Evening Dress' },
            ].map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="z_testimonial_card">
                  <div className="z_testimonial_stars">
                    {[...Array(t.rating)].map((_, si) => (
                      <FiStar key={si} size={14} className="z_testimonial_star_icon" />
                    ))}
                  </div>
                  <p className="z_testimonial_text">"{t.review}"</p>
                  <div className="z_testimonial_author">
                    <div className="z_testimonial_avatar_icon">
                      <FiStar size={20} />
                    </div>
                    <div>
                      <p className="z_testimonial_name">{t.name}</p>
                      <p className="z_testimonial_product">Purchased: {t.product}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;
