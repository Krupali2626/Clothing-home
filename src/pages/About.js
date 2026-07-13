import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleAdBanner from '../components/GoogleAdBanner';

const About = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>About Us</h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>Your trusted partner for fashion and home essentials</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-4 mb-md-0">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=450&fit=crop"
                alt="About Us"
                style={{ width: '100%', borderRadius: '18px' }}
              />
            </Col>
            <Col md={6}>
              <h2 style={{ color: '#4A3F35', marginBottom: '24px' }}>Our Story</h2>
              <p style={{ color: '#8B7E74', marginBottom: '16px' }}>
                Founded in 2020, CHStore has grown from a small boutique to a leading online destination for premium clothing and home appliances. We believe in quality, style, and affordability.
              </p>
              <p style={{ color: '#8B7E74' }}>
                Our mission is to bring you the latest trends in fashion and the best in home appliances, all in one place. We carefully curate our products to ensure the highest standards.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <GoogleAdBanner />

      <section className="d_section d_section_white">
        <Container>
          <h2 className="d_section_title">Why Choose Us</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="d_card h-100 text-center p-4">
                <h3 style={{ color: '#FF9A8B', fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>50K+</h3>
                <h5 style={{ color: '#4A3F35', marginBottom: '8px' }}>Happy Customers</h5>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>Satisfied shoppers worldwide</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d_card h-100 text-center p-4">
                <h3 style={{ color: '#FF9A8B', fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>10K+</h3>
                <h5 style={{ color: '#4A3F35', marginBottom: '8px' }}>Products</h5>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>Wide range of items</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d_card h-100 text-center p-4">
                <h3 style={{ color: '#FF9A8B', fontSize: '48px', fontWeight: '700', marginBottom: '8px' }}>500+</h3>
                <h5 style={{ color: '#4A3F35', marginBottom: '8px' }}>Brands</h5>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>Trusted brands</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="d_section d_section_gray">
        <Container>
          <h2 className="d_section_title">Our Core Values</h2>
          <Row className="g-4">
            <Col md={4}>
              <div className="d_card h-100 p-4">
                <h4 style={{ color: '#4A3F35', marginBottom: '16px' }}>Quality First</h4>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>We never compromise on quality. Every product is carefully inspected.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d_card h-100 p-4">
                <h4 style={{ color: '#4A3F35', marginBottom: '16px' }}>Customer Satisfaction</h4>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>Your happiness is our top priority. We're here to help 24/7.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="d_card h-100 p-4">
                <h4 style={{ color: '#4A3F35', marginBottom: '16px' }}>Innovation</h4>
                <p style={{ color: '#8B7E74', marginBottom: 0 }}>Always updating our collection with the latest trends and technology.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <GoogleAdBanner />
    </>
  );
};

export default About;
