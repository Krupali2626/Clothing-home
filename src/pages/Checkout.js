import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>Checkout</h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>Complete your order</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <div className="d_card p-4 mb-4">
                <h4 className="mb-4" style={{ color: '#4A3F35' }}>Billing Details</h4>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>First Name</Form.Label>
                      <Form.Control placeholder="First Name" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Last Name</Form.Label>
                      <Form.Control placeholder="Last Name" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Email</Form.Label>
                      <Form.Control type="email" placeholder="Email" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Phone</Form.Label>
                      <Form.Control placeholder="Phone" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Address</Form.Label>
                      <Form.Control placeholder="Street Address" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>City</Form.Label>
                      <Form.Control placeholder="City" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Zip Code</Form.Label>
                      <Form.Control placeholder="Zip Code" className="d_input" />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className="d_card p-4 mb-4">
                <h4 className="mb-4" style={{ color: '#4A3F35' }}>Shipping Address</h4>
                <Form.Check type="checkbox" label="Same as billing address" defaultChecked style={{ color: '#4A3F35' }} />
              </div>

              <div className="d_card p-4">
                <h4 className="mb-4" style={{ color: '#4A3F35' }}>Payment Method</h4>
                <Form.Check type="radio" name="payment" label="Credit Card" defaultChecked style={{ color: '#4A3F35' }} />
                <Row className="g-3 mt-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Card Number</Form.Label>
                      <Form.Control placeholder="1234 5678 9012 3456" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>Expiry Date</Form.Label>
                      <Form.Control placeholder="MM/YY" className="d_input" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ color: '#4A3F35' }}>CVV</Form.Label>
                      <Form.Control placeholder="123" className="d_input" />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Check type="radio" name="payment" label="PayPal" className="mt-3" style={{ color: '#4A3F35' }} />
              </div>
            </Col>
            <Col lg={4}>
              <div className="d_card p-4">
                <h4 className="mb-4" style={{ color: '#4A3F35' }}>Order Summary</h4>
                <div className="border-bottom pb-3 mb-3" style={{ borderColor: '#F5E6D3' }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: '#8B7E74' }}>Premium Cotton T-Shirt x 1</span>
                    <span style={{ color: '#4A3F35' }}>$29.99</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span style={{ color: '#8B7E74' }}>Classic Denim Jeans x 1</span>
                    <span style={{ color: '#4A3F35' }}>$67.99</span>
                  </div>
                </div>
                <Row className="mb-3">
                  <Col style={{ color: '#8B7E74' }}>Subtotal</Col>
                  <Col className="text-end" style={{ color: '#4A3F35' }}>$97.98</Col>
                </Row>
                <Row className="mb-3">
                  <Col style={{ color: '#8B7E74' }}>Shipping</Col>
                  <Col className="text-end" style={{ color: '#6BCB77', fontWeight: '600' }}>Free</Col>
                </Row>
                <Row className="mb-3">
                  <Col style={{ color: '#8B7E74' }}>Tax</Col>
                  <Col className="text-end" style={{ color: '#4A3F35' }}>$9.80</Col>
                </Row>
                <hr style={{ borderColor: '#F5E6D3' }} />
                <Row className="mb-4">
                  <Col style={{ fontWeight: '600', color: '#4A3F35' }}>Total</Col>
                  <Col className="text-end" style={{ fontWeight: '700', fontSize: '20px', background: 'linear-gradient(135deg, #FF9A8B 0%, #FFECD2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>$107.78</Col>
                </Row>
                <Button className="d_btn w-100" style={{ padding: '12px' }}>
                  Place Order
                </Button>
                <Link to="/cart" className="d-block text-center mt-3" style={{ color: '#FF9A8B', textDecoration: 'none', fontWeight: '600' }}>
                  Return to Cart
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Checkout;
