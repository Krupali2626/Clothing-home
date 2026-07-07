import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../Container/CartContext';
import {
  FiSearch,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg z_navbar sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand z_brand" to="/">
          <HiSparkles className="z_brand_icon" />
          <span className="z_brand_text">LuxeNest</span>
        </Link>

        {/* Mobile: Cart + Hamburger */}
        <div className="d-flex align-items-center gap-3 d-lg-none">
          <Link to="/cart" className="z_cart_btn_mobile">
            <FiShoppingBag size={22} />
            {totalItems > 0 && <span className="z_cart_badge">{totalItems}</span>}
          </Link>
          <button
            className="z_hamburger_btn"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse z_nav_collapse ${navOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto z_nav_links">
            <li className="nav-item">
              <Link
                className={`nav-link z_nav_link ${isActive('/') ? 'z_nav_link_active' : ''}`}
                to="/"
                onClick={() => setNavOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link z_nav_link ${isActive('/shop') ? 'z_nav_link_active' : ''}`}
                to="/shop"
                onClick={() => setNavOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li className="nav-item z_nav_dropdown">
              <span className="nav-link z_nav_link z_nav_dropdown_toggle">
                Categories <FiChevronDown size={14} className="z_dropdown_arrow" />
              </span>
              <div className="z_dropdown_menu">
                <Link to="/shop?category=clothing" className="z_dropdown_item" onClick={() => setNavOpen(false)}>Clothing</Link>
                <Link to="/shop?category=home-appliances" className="z_dropdown_item" onClick={() => setNavOpen(false)}>Home Appliances</Link>
                <Link to="/shop?category=accessories" className="z_dropdown_item" onClick={() => setNavOpen(false)}>Accessories</Link>
                <Link to="/shop?category=furniture" className="z_dropdown_item" onClick={() => setNavOpen(false)}>Furniture</Link>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link z_nav_link ${isActive('/about') ? 'z_nav_link_active' : ''}`}
                to="/about"
                onClick={() => setNavOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link z_nav_link ${isActive('/contact') ? 'z_nav_link_active' : ''}`}
                to="/contact"
                onClick={() => setNavOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side Actions */}
          <div className="z_nav_actions d-flex align-items-center gap-3">
            <button className="z_search_btn" aria-label="Search">
              <FiSearch size={18} />
            </button>
            <Link to="/cart" className="z_cart_btn d-none d-lg-flex">
              <FiShoppingBag size={20} />
              {totalItems > 0 && <span className="z_cart_badge">{totalItems}</span>}
            </Link>
            <Link to="/shop" className="z_nav_cta btn">Shop Now</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
