import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Newsletter = () => {
  return (
    <section className="d_section_gradient" style={{ padding: '60px 0' }}>
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h3 style={{ color: 'white', marginBottom: '10px', fontWeight: 700 }}>Subscribe to Newsletter</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 0 }}>Get exclusive offers and updates</p>
          </Col>
          <Col md={6}>
            <Form className="d-flex gap-2 flex-wrap">
              <Form.Control
                type="email"
                placeholder="Enter your email"
                className="d_input"
                style={{ maxWidth: '400px' }}
              />
              <button type="submit" className="d_btn" style={{ whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
