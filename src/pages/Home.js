
import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { 
  FaTruck, FaLock, FaCreditCard, FaUndo, 
  FaStar, FaArrowRight, FaInstagram, FaFacebook, FaTwitter, FaYoutube 
} from 'react-icons/fa';
import HeroSlider from '../components/HeroSlider';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BrandSlider from '../components/BrandSlider';
import ReviewCard from '../components/ReviewCard';
import Newsletter from '../components/Newsletter';
import GoogleAdBanner from '../components/GoogleAdBanner';
import categories from '../data/categories';
import products from '../data/products';
import brands from '../data/brands';
import reviews from '../data/reviews';
import blogs from '../data/blogs';

const Home = () => {
  const featuredProducts = products.slice(0, 8);
  const flashSaleProducts = products.slice(4, 12);
  const bestSellerProducts = products.slice(2, 10);
  const newArrivals = products.slice(6, 14);

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Features Section */}
      <section className="d_section d_section_white">
        <Container>
          <Row className="g-4">
            <Col md={3} sm={6}>
              <div className="d_card text-center p-5 h-100" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
                <FaTruck size={40} style={{ color: 'var(--d_accent)', marginBottom: '16px' }} />
                <h5 style={{ color: 'var(--d_heading)', fontWeight: '700', marginBottom: '8px' }}>
                  Free Shipping
                </h5>
                <p style={{ color: 'var(--d_paragraph)', marginBottom: '0', fontSize: '14px' }}>
                  On Orders Over $50
                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="d_card text-center p-5 h-100" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
                <FaLock size={40} style={{ color: 'var(--d_accent)', marginBottom: '16px' }} />
                <h5 style={{ color: 'var(--d_heading)', fontWeight: '700', marginBottom: '8px' }}>
                  Secure Payment
                </h5>
                <p style={{ color: 'var(--d_paragraph)', marginBottom: '0', fontSize: '14px' }}>
                  100% Secure Checkout
                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="d_card text-center p-5 h-100" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
                <FaUndo size={40} style={{ color: 'var(--d_accent)', marginBottom: '16px' }} />
                <h5 style={{ color: 'var(--d_heading)', fontWeight: '700', marginBottom: '8px' }}>
                  Easy Returns
                </h5>
                <p style={{ color: 'var(--d_paragraph)', marginBottom: '0', fontSize: '14px' }}>
                  30-Day Return Policy
                </p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="d_card text-center p-5 h-100" style={{ background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' }}>
                <FaCreditCard size={40} style={{ color: 'var(--d_accent)', marginBottom: '16px' }} />
                <h5 style={{ color: 'var(--d_heading)', fontWeight: '700', marginBottom: '8px' }}>
                  24/7 Support
                </h5>
                <p style={{ color: 'var(--d_paragraph)', marginBottom: '0', fontSize: '14px' }}>
                  Always Here to Help
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Flash Sale Section */}
      <section className="d_section d_section_gray">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">LIMITED TIME OFFER</span>
            <h2 className="d_section_title">Flash Sale</h2>
            <p className="d_section_desc">Hurry, these deals won't last long!</p>
          </div>
          <Row className="g-4">
            {flashSaleProducts.map(product => (
              <Col key={product.id} xl={3} lg={4} md={6} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <Link to="/clothing/all" className="d_btn_outline">
              View All Products <FaArrowRight className="ms-2" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Google Ad Banner */}
      <section className="d_section_white">
        <Container>
          <GoogleAdBanner />
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="d_section d_section_white">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">EXPLORE</span>
            <h2 className="d_section_title">Featured Categories</h2>
            <p className="d_section_desc">Browse our popular categories</p>
          </div>
          <Row className="g-4">
            {categories.slice(0, 8).map(category => (
              <Col key={category.id} xl={3} lg={4} md={6} sm={6}>
                <CategoryCard category={category} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="d_section d_section_gray">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">OUR PRODUCTS</span>
            <h2 className="d_section_title">Featured Products</h2>
            <p className="d_section_desc">Check out our best-selling items</p>
          </div>
          <Row className="g-4">
            {featuredProducts.map(product => (
              <Col key={product.id} xl={3} lg={4} md={6} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="d_section d_section_white">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">JUST IN</span>
            <h2 className="d_section_title">New Arrivals</h2>
            <p className="d_section_desc">Discover the latest products</p>
          </div>
          <Row className="g-4">
            {newArrivals.map(product => (
              <Col key={product.id} xl={3} lg={4} md={6} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Best Sellers */}
      <section className="d_section d_section_gray">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">BEST SELLERS</span>
            <h2 className="d_section_title">Our Best Sellers</h2>
            <p className="d_section_desc">Most loved by our customers</p>
          </div>
          <Row className="g-4">
            {bestSellerProducts.map(product => (
              <Col key={product.id} xl={3} lg={4} md={6} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Brands */}
      <section className="d_section d_section_white">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">TRUSTED BRANDS</span>
            <h2 className="d_section_title">Featured Brands</h2>
            <p className="d_section_desc">Discover products from top brands</p>
          </div>
          <BrandSlider brands={brands} />
        </Container>
      </section>

      {/* Customer Reviews */}
      <section className="d_section d_section_gradient" style={{ padding: '100px 0' }}>
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle" style={{ color: 'var(--d_accent)' }}>TESTIMONIALS</span>
            <h2 className="d_section_title" style={{ color: 'white' }}>What Our Customers Say</h2>
            <p className="d_section_desc" style={{ color: 'rgba(255,255,255,0.7)' }}>Real feedback from real customers</p>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={3}
            spaceBetween={30}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {reviews.map(review => (
              <SwiperSlide key={review.id}>
                <div className="d_card d_card_glass" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <div className="p-5">
                    <div className="d-flex align-items-center gap-3 mb-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--d_accent)' }}
                      />
                      <div>
                        <h6 style={{ color: 'white', marginBottom: '4px', fontWeight: '700' }}>{review.name}</h6>
                        <div className="d-flex gap-1">
                          {[1, 2, 3, 4, 5].map(i => (
                            <FaStar key={i} size={14} color={i <= review.rating ? '#F59E0B' : 'rgba(255,255,255,0.3)'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>{review.comment}</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '0' }}>{review.date}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter />

      {/* FAQ Section */}
      <section className="d_section d_section_white">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">FAQ</span>
            <h2 className="d_section_title">Frequently Asked Questions</h2>
            <p className="d_section_desc">Got questions? We've got answers.</p>
          </div>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header style={{ fontWeight: '600', color: 'var(--d_heading)' }}>
                    How long does shipping take?
                  </Accordion.Header>
                  <Accordion.Body style={{ color: 'var(--d_paragraph)' }}>
                    Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header style={{ fontWeight: '600', color: 'var(--d_heading)' }}>
                    What is your return policy?
                  </Accordion.Header>
                  <Accordion.Body style={{ color: 'var(--d_paragraph)' }}>
                    We offer a 30-day return policy. Items must be in original condition with tags attached.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header style={{ fontWeight: '600', color: 'var(--d_heading)' }}>
                    Do you offer international shipping?
                  </Accordion.Header>
                  <Accordion.Body style={{ color: 'var(--d_paragraph)' }}>
                    Yes, we ship to over 50 countries worldwide. Shipping rates vary by location.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header style={{ fontWeight: '600', color: 'var(--d_heading)' }}>
                    How can I track my order?
                  </Accordion.Header>
                  <Accordion.Body style={{ color: 'var(--d_paragraph)' }}>
                    Once your order ships, you'll receive an email with a tracking number and link.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Instagram Feed Section */}
      <section className="d_section d_section_gray">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">INSTAGRAM</span>
            <h2 className="d_section_title">Follow Us on Instagram</h2>
            <p className="d_section_desc">@chstore - Share your style!</p>
          </div>
          <Row className="g-3">
            {[
              'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop',
              'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop',
            ].map((src, i) => (
              <Col key={i} md={2} sm={4} xs={6}>
                <img
                  src={src}
                  alt={`Instagram ${i + 1}`}
                  style={{ width: '100%', borderRadius: '16px', aspectRatio: '1', objectFit: 'cover' }}
                />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-5">
            <a href="https://instagram.com" className="d_btn_outline" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="me-2" /> Follow Us
            </a>
          </div>
        </Container>
      </section>

      {/* Latest Blogs */}
      <section className="d_section d_section_white">
        <Container>
          <div className="d_section_header">
            <span className="d_section_subtitle">BLOG</span>
            <h2 className="d_section_title">Latest Articles</h2>
            <p className="d_section_desc">Read our latest fashion & lifestyle tips</p>
          </div>
          <Row className="g-4">
            {blogs.slice(0, 4).map(blog => (
              <Col key={blog.id} xl={3} lg={4} md={6} sm={6}>
                <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                  <div className="d_card h-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', borderTopLeftRadius: '18px', borderTopRightRadius: '18px' }}
                    />
                    <div className="p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span style={{ fontSize: '12px', color: 'var(--d_accent)', fontWeight: '700' }}>
                          {blog.category}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--d_paragraph)' }}>
                          {blog.date}
                        </span>
                      </div>
                      <h5 style={{ color: 'var(--d_heading)', fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>
                        {blog.title}
                      </h5>
                      <p style={{ color: 'var(--d_paragraph)', fontSize: '13px', marginBottom: '0' }}>
                        {blog.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;
