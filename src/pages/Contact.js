import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import GoogleAdBanner from '../components/GoogleAdBanner';

const Contact = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>Contact Us</h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>We'd love to hear from you!</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col md={5} className="mb-4 mb-md-0">
              <h3 style={{ color: '#4A3F35', marginBottom: '24px' }}>Get In Touch</h3>
              <div className="d_card p-4 mb-3">
                <div className="d-flex gap-3 align-items-center">
                  <FaMapMarkerAlt size={24} style={{ color: '#FF9A8B' }} />
                  <div>
                    <h6 style={{ color: '#4A3F35', marginBottom: '4px' }}>Address</h6>
                    <p style={{ color: '#8B7E74', marginBottom: 0 }}>123 Main St, City, Country</p>
                  </div>
                </div>
              </div>
              <div className="d_card p-4 mb-3">
                <div className="d-flex gap-3 align-items-center">
                  <FaPhone size={24} style={{ color: '#FF9A8B' }} />
                  <div>
                    <h6 style={{ color: '#4A3F35', marginBottom: '4px' }}>Phone</h6>
                    <p style={{ color: '#8B7E74', marginBottom: 0 }}>+1 234 567 8900</p>
                  </div>
                </div>
              </div>
              <div className="d_card p-4 mb-3">
                <div className="d-flex gap-3 align-items-center">
                  <FaEnvelope size={24} style={{ color: '#FF9A8B' }} />
                  <div>
                    <h6 style={{ color: '#4A3F35', marginBottom: '4px' }}>Email</h6>
                    <p style={{ color: '#8B7E74', marginBottom: 0 }}>support@example.com</p>
                  </div>
                </div>
              </div>
              <div className="d_card p-4">
                <div className="d-flex gap-3 align-items-center">
                  <FaClock size={24} style={{ color: '#FF9A8B' }} />
                  <div>
                    <h6 style={{ color: '#4A3F35', marginBottom: '4px' }}>Working Hours</h6>
                    <p style={{ color: '#8B7E74', marginBottom: 0 }}>Mon-Fri: 9AM - 6PM<br />Sat: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={7}>
              <div className="d_card p-4">
                <h3 style={{ color: '#4A3F35', marginBottom: '24px' }}>Send Us a Message</h3>
                <Form>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{ color: '#4A3F35' }}>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" className="d_input" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{ color: '#4A3F35' }}>Email</Form.Label>
                        <Form.Control type="email" placeholder="Your Email" className="d_input" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#4A3F35' }}>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Subject" className="d_input" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: '#4A3F35' }}>Message</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Your Message" className="d_input" />
                  </Form.Group>
                  <Button type="submit" className="d_btn w-100" style={{ padding: '12px' }}>
                    Send Message
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <GoogleAdBanner />

      <section className="d_section" style={{ backgroundColor: '#F5E6D3', padding: '0', height: '400px' }}>
        <Container className="h-100 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <h4 style={{ color: '#8B7E74' }}>Google Map Placeholder</h4>
            <p style={{ color: '#B8A99D' }}>Insert Google Maps iframe here</p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
