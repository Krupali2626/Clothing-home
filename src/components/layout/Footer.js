
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="d_footer">
      <Container>
        <Row className="g-5">
          <Col lg={3} md={6}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
                CH<span style={{ background: 'linear-gradient(135deg, #A78BFA, #F472B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Store</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: '1.8' }}>
                Your one-stop destination for premium clothing and home appliances. Experience quality, style, and convenience.
              </p>
            </div>
            <div className="d-flex gap-3">
              <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <FaFacebook size={18} />
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <FaInstagram size={18} />
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <FaTwitter size={18} />
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', textDecoration: 'none', transition: 'all 0.3s ease' }}>
                <FaYoutube size={18} />
              </a>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h5 style={{ color: 'white', fontWeight: '700', marginBottom: '24px', fontSize: '16px' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Home</Link>
              </li>
              <li className="mb-3">
                <Link to="/about" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>About Us</Link>
              </li>
              <li className="mb-3">
                <Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Blog</Link>
              </li>
              <li className="mb-3">
                <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Contact</Link>
              </li>
              <li className="mb-3">
                <Link to="/faq" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>FAQ</Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 style={{ color: 'white', fontWeight: '700', marginBottom: '24px', fontSize: '16px' }}>Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/clothing/men" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Men</Link>
              </li>
              <li className="mb-3">
                <Link to="/clothing/women" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Women</Link>
              </li>
              <li className="mb-3">
                <Link to="/clothing/kids" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Kids</Link>
              </li>
              <li className="mb-3">
                <Link to="/appliances/tv" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Appliances</Link>
              </li>
              <li className="mb-3">
                <Link to="/clothing/accessories" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Accessories</Link>
              </li>
            </ul>
          </Col>

          <Col lg={2} md={6}>
            <h5 style={{ color: 'white', fontWeight: '700', marginBottom: '24px', fontSize: '16px' }}>Information</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/privacy-policy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Privacy Policy</Link>
              </li>
              <li className="mb-3">
                <Link to="/terms-conditions" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Terms & Conditions</Link>
              </li>
              <li className="mb-3">
                <Link to="/refund-policy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Refund Policy</Link>
              </li>
              <li className="mb-3">
                <Link to="/shipping-policy" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Shipping Policy</Link>
              </li>
              <li className="mb-3">
                <Link to="/track-order" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.3s ease' }}>Track Order</Link>
              </li>
            </ul>
          </Col>

          <Col lg={3} md={12}>
            <h5 style={{ color: 'white', fontWeight: '700', marginBottom: '24px', fontSize: '16px' }}>Contact Us</h5>
            <ul className="list-unstyled" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <li className="mb-3 d-flex gap-3">
                <FaMapMarkerAlt size={18} style={{ color: 'var(--d_accent)' }} />
                <span style={{ fontSize: '14px' }}>123 Main St, New York, NY 10001</span>
              </li>
              <li className="mb-3 d-flex gap-3">
                <FaPhone size={18} style={{ color: 'var(--d_accent)' }} />
                <span style={{ fontSize: '14px' }}>+1 234 567 8900</span>
              </li>
              <li className="mb-3 d-flex gap-3">
                <FaEnvelope size={18} style={{ color: 'var(--d_accent)' }} />
                <span style={{ fontSize: '14px' }}>support@chstore.com</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

        <Row className="align-items-center">
          <Col md={6} className="mb-3 mb-md-0">
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '0' }}>
              © 2024 CHStore. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <button
              onClick={scrollToTop}
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
                border: 'none',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
                transition: 'transform 0.3s ease'
              }}
            >
              <FaArrowUp />
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
