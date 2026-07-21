import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
  FaArrowRight,
  FaTruck,
  FaLock,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="d_footer">
      {/* Trust strip */}
      <div className="d_footer_trust">
        <Container fluid className="d_container_fluid d_footer_trust_inner">
          <div className="d_trust_item">
            <FaTruck /> <div><strong>Free Shipping</strong><span>On orders over ₹1,999</span></div>
          </div>
          <div className="d_trust_item">
            <FaUndo /> <div><strong>Easy Returns</strong><span>7 day return policy</span></div>
          </div>
          <div className="d_trust_item">
            <FaLock /> <div><strong>Secure Payment</strong><span>100% protected checkout</span></div>
          </div>
          <div className="d_trust_item">
            <FaHeadset /> <div><strong>24/7 Support</strong><span>Dedicated help center</span></div>
          </div>
        </Container>
      </div>

      <div className="d_footer_main">
        <Container fluid className="d_container_fluid">
          <Row className="g-4">
            <Col lg={4} md={6} className="mb-3">
              <Link to="/" className="d_logo d_footer_logo">
                <span className="d_logo_mark">D</span>
                <span className="d_logo_text">.Store</span>
              </Link>
              <p className="d_footer_about">
                Premium clothing and home appliances curated for modern living.
                Quality products, honest prices, and a shopping experience built
                around you.
              </p>
              <ul className="d_footer_contact_list">
                <li><FaMapMarkerAlt /> 221B Commerce Street, Surat, Gujarat, India</li>
                <li><FaPhoneAlt /> +91 12345 67890</li>
                <li><FaEnvelope /> support@dstore.example</li>
              </ul>
              <div className="d_footer_social">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
              </div>
            </Col>

            <Col xs={6} md={6} lg={2}>
              <h6 className="d_footer_heading">Quick Links</h6>
              <ul className="d_footer_links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/faq">FAQs</Link></li>
              </ul>
            </Col>

            <Col xs={6} md={6} lg={2}>
              <h6 className="d_footer_heading">Categories</h6>
              <ul className="d_footer_links">
                <li><Link to="/clothing?category=men">Men's Fashion</Link></li>
                <li><Link to="/clothing?category=women">Women's Fashion</Link></li>
                <li><Link to="/appliances?category=kitchen">Kitchen Appliances</Link></li>
                <li><Link to="/appliances?category=tv">Television</Link></li>
                <li><Link to="/appliances?category=refrigerator">Refrigerators</Link></li>
              </ul>
            </Col>

            <Col md={6} lg={2}>
              <h6 className="d_footer_heading">Information</h6>
              <ul className="d_footer_links">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions">Terms &amp; Conditions</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
                <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                <li><Link to="/my-orders">Track My Order</Link></li>
              </ul>
            </Col>
          </Row>

          <div className="d_footer_newsletter_mini">
            <div>
              <h6 className="d_footer_heading mb-1">Stay in the loop</h6>
              <p>Subscribe for new arrivals, exclusive deals and style tips.</p>
            </div>
            <InputGroup className="d_footer_newsletter_input">
              <Form.Control placeholder="Enter your email" aria-label="Newsletter email" />
              <button className="d_btn_primary" type="button">
                Subscribe <FaArrowRight size={12} />
              </button>
            </InputGroup>
          </div>
        </Container>
      </div>

      <div className="d_footer_bottom">
        <Container fluid className="d_container_fluid d_footer_bottom_inner">
          <p>© {new Date().getFullYear()} D.Store. All rights reserved.</p>
          <div className="d_payment_icons">
            <FaCcVisa /> <FaCcMastercard /> <FaCcPaypal /> <FaCcAmex />
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
