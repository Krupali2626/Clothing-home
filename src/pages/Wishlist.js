import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  const wishlistProducts = products.slice(0, 4);

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>Wishlist</h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>Your favorite items</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row className="g-4">
            {wishlistProducts.map(product => (
              <Col key={product.id} lg={3} md={4} sm={6}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Link to="/" className="d_btn_outline d-inline-flex justify-content-center align-items-center" style={{ textDecoration: 'none' }}>
              Continue Shopping
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Wishlist;
