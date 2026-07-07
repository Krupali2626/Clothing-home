import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaEnvelope,
} from 'react-icons/fa';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };
  return (
    <footer className="z_footer">
      {/* Newsletter Strip */}
      <div className="z_footer_newsletter">
        <div className="container">
          <div className="z_newsletter_wrapper">
            <div className="z_newsletter_icon_wrapper">
              <div className="z_newsletter_icon_bg"></div>
              <FaEnvelope size={40} className="z_newsletter_icon" />
            </div>
            <div className="z_newsletter_content">
              <div className="z_newsletter_badge">
                <HiSparkles size={14} />
                <span>Join Now</span>
              </div>
              <h4 className="z_newsletter_heading">Get Exclusive Deals</h4>
              <p className="z_newsletter_sub">Subscribe and save up to 30% on your first order</p>
            </div>
            <form className="z_newsletter_form" onSubmit={handleSubscribe}>
              <div className="z_newsletter_input_wrapper">
                {isSubscribed ? (
                  <div className="z_newsletter_success">
                    <FiCheckCircle size={20} />
                    <span>Subscribed successfully!</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      className="z_newsletter_input"
                      placeholder="Enter your email address"
                      aria-label="Email for newsletter"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="z_newsletter_btn" type="submit">
                      Subscribe
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="z_footer_main">
        <div className="container">
          <div className="row g-4">
            {/* Brand Column */}
            <div className="col-lg-4 col-md-6">
              <div className="z_footer_brand">
                <HiSparkles className="z_brand_icon" />
                <span className="z_brand_text">LuxeNest</span>
              </div>
              <p className="z_footer_brand_desc">
                Elevating everyday living with premium clothing and home appliances.
                Quality you can feel, style you can see.
              </p>
              <div className="z_social_links">
                <a href="#!" className="z_social_link" aria-label="Facebook">
                  <FaFacebook size={16} />
                </a>
                <a href="#!" className="z_social_link" aria-label="Instagram">
                  <FaInstagram size={16} />
                </a>
                <a href="#!" className="z_social_link" aria-label="Twitter">
                  <FaTwitter size={16} />
                </a>
                <a href="#!" className="z_social_link" aria-label="Pinterest">
                  <FaPinterest size={16} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="z_footer_heading">Quick Links</h6>
              <ul className="z_footer_links">
                <li><Link to="/" className="z_footer_link">Home</Link></li>
                <li><Link to="/shop" className="z_footer_link">Shop</Link></li>
                <li><Link to="/about" className="z_footer_link">About Us</Link></li>
                <li><Link to="/contact" className="z_footer_link">Contact</Link></li>
                <li><Link to="/cart" className="z_footer_link">Cart</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="col-lg-2 col-md-6 col-6">
              <h6 className="z_footer_heading">Categories</h6>
              <ul className="z_footer_links">
                <li><Link to="/shop?category=clothing" className="z_footer_link">Clothing</Link></li>
                <li><Link to="/shop?category=home-appliances" className="z_footer_link">Home Appliances</Link></li>
                <li><Link to="/shop?category=accessories" className="z_footer_link">Accessories</Link></li>
                <li><Link to="/shop?category=furniture" className="z_footer_link">Furniture</Link></li>
                <li><Link to="/shop" className="z_footer_link">New Arrivals</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h6 className="z_footer_heading">Contact Us</h6>
              <ul className="z_footer_contact_list">
                <li className="z_footer_contact_item">
                  <FiMapPin className="z_contact_icon" size={16} />
                  <span>123 Fashion Ave, Style City, NY 10001</span>
                </li>
                <li className="z_footer_contact_item">
                  <FiPhone className="z_contact_icon" size={16} />
                  <a href="tel:+12125551234" className="z_footer_link">+1 (212) 555-1234</a>
                </li>
                <li className="z_footer_contact_item">
                  <FiMail className="z_contact_icon" size={16} />
                  <a href="mailto:hello@luxenest.com" className="z_footer_link">hello@luxenest.com</a>
                </li>
                <li className="z_footer_contact_item">
                  <FiClock className="z_contact_icon" size={16} />
                  <span>Mon–Sat: 9AM – 7PM EST</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="z_footer_bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="z_footer_copy">© 2025 LuxeNest. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="z_payment_icons">
                <span className="z_payment_badge">VISA</span>
                <span className="z_payment_badge">MC</span>
                <span className="z_payment_badge">AMEX</span>
                <span className="z_payment_badge">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
