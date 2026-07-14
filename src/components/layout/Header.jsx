import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Offcanvas, Dropdown, Badge } from "react-bootstrap";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaPhoneAlt,
  FaTruck,
  FaChevronDown,
  FaTshirt,
  FaBlender,
  FaTimes,
} from "react-icons/fa";
import categories from "../../data/categories";
import "./Header.css";

const clothingCats = categories.filter((c) => c.type === "clothing");
const applianceCats = categories.filter((c) => c.type === "appliances");

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`d_header ${scrolled ? "d_header_scrolled" : ""}`}>
      {/* Top Bar */}
      <div className="d_top_bar">
        <Container fluid className="d_container_fluid d_top_bar_inner">
          <div className="d_top_bar_left">
            <span>
              <FaTruck /> Free shipping on orders over ₹1,999
            </span>
          </div>
          <div className="d_top_bar_right">
            <a href="tel:+911234567890">
              <FaPhoneAlt /> +91 12345 67890
            </a>
            <Dropdown align="end">
              <Dropdown.Toggle as="span" className="d_top_bar_lang">
                EN <FaChevronDown size={9} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">English</Dropdown.Item>
                <Dropdown.Item href="#">हिंदी</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="d_main_header">
        <Container fluid className="d_container_fluid d_main_header_inner">
          <button
            className="d_mobile_menu_btn d-lg-none"
            onClick={() => setShowMobileMenu(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <Link to="/" className="d_logo">
            <span className="d_logo_mark">D</span>
            <span className="d_logo_text">
              .Store<span className="d_logo_dot">.</span>
            </span>
          </Link>

          <div className="d_search_bar d-none d-lg-flex">
            <Dropdown>
              <Dropdown.Toggle as="button" className="d_search_cat_btn">
                All Categories <FaChevronDown size={10} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Clothing</Dropdown.Item>
                <Dropdown.Item href="#">Home Appliances</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <input type="text" placeholder="Search for products, brands and more…" />
            <button className="d_search_submit_btn" aria-label="Search">
              <FaSearch />
            </button>
          </div>

          <div className="d_header_actions">
            <button
              className="d_icon_btn d-lg-none"
              onClick={() => setSearchOpenMobile((s) => !s)}
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>
            <Link to="/login" className="d_icon_btn d-none d-md-flex">
              <FaUser />
              <span className="d_icon_label">Account</span>
            </Link>
            <Link to="/wishlist" className="d_icon_btn">
              <span className="d_icon_wrap">
                <FaHeart />
                <Badge className="d_icon_badge" bg="">3</Badge>
              </span>
              <span className="d_icon_label d-none d-md-inline">Wishlist</span>
            </Link>
            <Link to="/cart" className="d_icon_btn">
              <span className="d_icon_wrap">
                <FaShoppingCart />
                <Badge className="d_icon_badge" bg="">2</Badge>
              </span>
              <span className="d_icon_label d-none d-md-inline">Cart</span>
            </Link>
          </div>
        </Container>

        {searchOpenMobile && (
          <div className="d_mobile_search d-lg-none">
            <input type="text" placeholder="Search products…" autoFocus />
            <button aria-label="Search">
              <FaSearch />
            </button>
          </div>
        )}
      </div>

      {/* Mega Menu Nav */}
      <nav className="d_nav_bar d-none d-lg-block">
        <Container fluid className="d_container_fluid">
          <ul className="d_nav_list">
            <li className="d_nav_item d_nav_has_mega">
              <span className="d_nav_link">
                <FaTshirt size={13} /> Clothing <FaChevronDown size={10} />
              </span>
              <div className="d_mega_menu">
                <div className="d_mega_col">
                  <h6>Shop by Category</h6>
                  {clothingCats.slice(0, 8).map((c) => (
                    <NavLink key={c.id} to={`/clothing?category=${c.slug}`}>
                      {c.name}
                    </NavLink>
                  ))}
                </div>
                <div className="d_mega_col">
                  <h6>Trending</h6>
                  <NavLink to="/clothing?sort=new">New Arrivals</NavLink>
                  <NavLink to="/clothing?sort=bestseller">Best Sellers</NavLink>
                  <NavLink to="/clothing?filter=sale">On Sale</NavLink>
                  <NavLink to="/clothing?category=winter-wear">Winter Edit</NavLink>
                </div>
                <div className="d_mega_col d_mega_banner">
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=260&h=180&fit=crop&auto=format" alt="Clothing promotion" />
                  <p>Up to 50% off new season styles</p>
                </div>
              </div>
            </li>

            <li className="d_nav_item d_nav_has_mega">
              <span className="d_nav_link">
                <FaBlender size={13} /> Home Appliances <FaChevronDown size={10} />
              </span>
              <div className="d_mega_menu">
                <div className="d_mega_col">
                  <h6>Shop by Category</h6>
                  {applianceCats.slice(0, 8).map((c) => (
                    <NavLink key={c.id} to={`/appliances?category=${c.slug}`}>
                      {c.name}
                    </NavLink>
                  ))}
                </div>
                <div className="d_mega_col">
                  <h6>Popular</h6>
                  <NavLink to="/appliances?category=tv">Smart TVs</NavLink>
                  <NavLink to="/appliances?category=refrigerator">Refrigerators</NavLink>
                  <NavLink to="/appliances?filter=sale">Deals of the Day</NavLink>
                </div>
                <div className="d_mega_col d_mega_banner">
                  <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=260&h=180&fit=crop&auto=format" alt="Appliances promotion" />
                  <p>Upgrade your home this season</p>
                </div>
              </div>
            </li>

            <li className="d_nav_item"><NavLink to="/clothing?filter=sale" className="d_nav_link d_nav_link_flash">Flash Sale</NavLink></li>
            <li className="d_nav_item"><NavLink to="/about" className="d_nav_link">About</NavLink></li>
            <li className="d_nav_item"><NavLink to="/blog" className="d_nav_link">Blog</NavLink></li>
            <li className="d_nav_item"><NavLink to="/contact" className="d_nav_link">Contact</NavLink></li>
          </ul>
        </Container>
      </nav>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)} className="d_mobile_offcanvas">
        <Offcanvas.Header className="d_mobile_offcanvas_header">
          <Link to="/" className="d_logo" onClick={() => setShowMobileMenu(false)}>
            <span className="d_logo_mark">D</span>
            <span className="d_logo_text">.Store</span>
          </Link>
          <button className="d_icon_btn" onClick={() => setShowMobileMenu(false)} aria-label="Close menu">
            <FaTimes />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="d_mobile_nav_list">
            <li><NavLink to="/" onClick={() => setShowMobileMenu(false)}>Home</NavLink></li>
            <li><NavLink to="/clothing" onClick={() => setShowMobileMenu(false)}>Clothing</NavLink></li>
            <li><NavLink to="/appliances" onClick={() => setShowMobileMenu(false)}>Home Appliances</NavLink></li>
            <li><NavLink to="/about" onClick={() => setShowMobileMenu(false)}>About</NavLink></li>
            <li><NavLink to="/blog" onClick={() => setShowMobileMenu(false)}>Blog</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setShowMobileMenu(false)}>Contact</NavLink></li>
            <li><NavLink to="/login" onClick={() => setShowMobileMenu(false)}>Login / Register</NavLink></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Header;
