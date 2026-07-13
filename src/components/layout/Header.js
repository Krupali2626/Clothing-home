
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Offcanvas, Dropdown } from 'react-bootstrap';
import { FaSearch, FaHeart, FaShoppingCart, FaUser, FaBars, FaTimes, FaPhoneAlt, FaEnvelope, FaAngleDown, FaTruckMoving } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 return (
  <div className="d_navbar_wrapper">
      {/* Top Bar */}
      <div className="d_navbar_top" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)' }}>
        <Container>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-4">
              <div className="d-flex align-items-center gap-2">
                <FaTruckMoving size={14} />
                <span>Free Shipping on Orders Over $50</span>
              </div>
              <div className="d-flex align-items-center gap-2 d-none d-md-flex">
                <FaPhoneAlt size={14} />
                <span>+1 234 567 8900</span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <span className="d-none d-sm-block">Store Locations</span>
              <span className="d-none d-sm-block">Track Order</span>
              <Dropdown>
                <Dropdown.Toggle as="a" href="#" className="text-white text-decoration-none">
                <span>USD</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>USD</Dropdown.Item>
                  <Dropdown.Item>EUR</Dropdown.Item>
                  <Dropdown.Item>GBP</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as="a" href="#" className="text-white text-decoration-none">
                <span>EN</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>EN</Dropdown.Item>
                  <Dropdown.Item>ES</Dropdown.Item>
                  <Dropdown.Item>FR</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navbar */}
<header
  className={`d_navbar ${scrolled ? 'sticky' : ''}`}
  style={{
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }}
>     
   <Container>
          <div className="d-flex align-items-center justify-content-between gap-4">
            <Link to="/" className="d-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--d_primary)' }}>
                CH<span style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Store</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-grow-1 max-w-md mx-4 d-none d-lg-flex">
              <div className="d-flex align-items-center gap-2" style={{ background: 'var(--d_background)', borderRadius: '50px', padding: '8px 20px', border: '2px solid var(--d_border)' }}>
                <FaSearch style={{ color: 'var(--d_paragraph)' }} />
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  style={{ border: 'none', background: 'transparent', outline: 'none', flexGrow: 1, fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="d-none d-xl-flex align-items-center gap-5">
              <Dropdown>
                <Dropdown.Toggle as="a" href="#" style={{ textDecoration: 'none', color: 'var(--d_primary)', fontWeight: '600', fontSize: '14px' }}>
                <span>Clothing</span> <FaAngleDown size={10} className="ms-1" />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ borderRadius: '18px', border: 'none', boxShadow: 'var(--d_shadow)', padding: '16px' }}>
                  <div className="row g-4" style={{ minWidth: '500px' }}>
                    <div className="col-6">
                      <h6 style={{ fontWeight: '700', marginBottom: '12px', color: 'var(--d_primary)' }}>Men</h6>
                      <div className="d-flex flex-column gap-2">
                        <Link to="/clothing/men" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>T-Shirts</Link>
                        <Link to="/clothing/men" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Shirts</Link>
                        <Link to="/clothing/men" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Jeans</Link>
                        <Link to="/clothing/men" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Jackets</Link>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 style={{ fontWeight: '700', marginBottom: '12px', color: 'var(--d_primary)' }}>Women</h6>
                      <div className="d-flex flex-column gap-2">
                        <Link to="/clothing/women" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Dresses</Link>
                        <Link to="/clothing/women" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Tops</Link>
                        <Link to="/clothing/women" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Kurtis</Link>
                        <Link to="/clothing/women" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Sarees</Link>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as="a" href="#" style={{ textDecoration: 'none', color: 'var(--d_primary)', fontWeight: '600', fontSize: '14px' }}>
                <span>Home Appliances</span> <FaAngleDown size={10} className="ms-1" />
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ borderRadius: '18px', border: 'none', boxShadow: 'var(--d_shadow)', padding: '16px' }}>
                  <div className="row g-4" style={{ minWidth: '500px' }}>
                    <div className="col-6">
                      <h6 style={{ fontWeight: '700', marginBottom: '12px', color: 'var(--d_primary)' }}>Kitchen</h6>
                      <div className="d-flex flex-column gap-2">
                        <Link to="/appliances/kitchen" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Refrigerators</Link>
                        <Link to="/appliances/kitchen" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Microwave</Link>
                        <Link to="/appliances/kitchen" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Mixer Grinders</Link>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 style={{ fontWeight: '700', marginBottom: '12px', color: 'var(--d_primary)' }}>Home</h6>
                      <div className="d-flex flex-column gap-2">
                        <Link to="/appliances/tv" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Televisions</Link>
                        <Link to="/appliances/air-conditioner" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>ACs</Link>
                        <Link to="/appliances/washing-machine" style={{ color: 'var(--d_paragraph)', textDecoration: 'none', fontSize: '14px' }}>Washing Machines</Link>
                      </div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Link to="/blog" style={{ textDecoration: 'none', color: 'var(--d_primary)', fontWeight: '600', fontSize: '14px' }}>Blog</Link>
              <Link to="/about" style={{ textDecoration: 'none', color: 'var(--d_primary)', fontWeight: '600', fontSize: '14px' }}>About</Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'var(--d_primary)', fontWeight: '600', fontSize: '14px' }}>Contact</Link>
            </nav>

            {/* Actions */}
            <div className="d-flex align-items-center gap-3">
              <Link to="/wishlist" style={{ color: 'var(--d_primary)', textDecoration: 'none', position: 'relative' }}>
                <FaHeart size={20} />
              </Link>
              <Link to="/cart" style={{ color: 'var(--d_primary)', textDecoration: 'none', position: 'relative' }}>
                <FaShoppingCart size={20} />
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', color: 'white', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700' }}>3</span>
              </Link>
              <Link to="/login" style={{ color: 'var(--d_primary)', textDecoration: 'none' }}>
                <FaUser size={20} />
              </Link>
              <button
                className="d-xl-none"
                style={{ border: 'none', background: 'none', color: 'var(--d_primary)', fontSize: '24px' }}
                onClick={() => setMobileMenuOpen(true)}
              >
                <FaBars />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <Offcanvas show={mobileMenuOpen} onHide={() => setMobileMenuOpen(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontWeight: '700', color: 'var(--d_primary)' }}>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="d-flex flex-column gap-3">
            <Link to="/" className="text-decoration-none" style={{ color: 'var(--d_primary)', fontWeight: '600', fontSize: '16px', padding: '10px 0' }}>
              Home
            </Link>
            <h6 style={{ marginBottom: '8px', color: 'var(--d_paragraph)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
              Clothing
            </h6>
            <Link to="/clothing/men" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Men</Link>
            <Link to="/clothing/women" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Women</Link>
            <Link to="/clothing/kids" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Kids</Link>
            <h6 style={{ marginBottom: '8px', color: 'var(--d_paragraph)', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', marginTop: '16px' }}>
              Home Appliances
            </h6>
            <Link to="/appliances/tv" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Televisions</Link>
            <Link to="/appliances/refrigerator" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Refrigerators</Link>
            <Link to="/appliances/washing-machine" className="text-decoration-none" style={{ color: 'var(--d_paragraph)', fontSize: '14px', padding: '8px 0' }}>Washing Machines</Link>
            <div style={{ marginTop: '24px' }}>
              <Link to="/about" className="text-decoration-none" style={{ color: 'var(--d_primary)', fontWeight: '600', fontSize: '16px', padding: '10px 0' }}>
                About
              </Link>
              <Link to="/blog" className="text-decoration-none" style={{ color: 'var(--d_primary)', fontWeight: '600', fontSize: '16px', padding: '10px 0' }}>
                Blog
              </Link>
              <Link to="/contact" className="text-decoration-none" style={{ color: 'var(--d_primary)', fontWeight: '600', fontSize: '16px', padding: '10px 0' }}>
                Contact
              </Link>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Header;
