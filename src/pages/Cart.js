import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #A8E6CF 0%, #Dcedc1 50%, #FFF3CD 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: '#4A3F35', fontSize: '48px', marginBottom: '16px' }}>Shopping Cart</h1>
          <p style={{ color: '#8B7E74', fontSize: '18px' }}>Review your items</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col lg={8} className="mb-4 mb-lg-0">
              <div className="d_card p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 style={{ color: '#4A3F35' }}>Cart Items</h4>
                  <Button className="d_btn_outline" size="sm" style={{ borderColor: '#FF6B6B', color: '#FF6B6B' }}>Clear Cart</Button>
                </div>
                
                <div className="border-bottom pb-4 mb-4" style={{ borderColor: '#F5E6D3' }}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop"
                        alt="Product"
                        style={{ width: '100%', borderRadius: '12px' }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 style={{ marginBottom: '4px', color: '#4A3F35' }}>Premium Cotton T-Shirt</h6>
                      <p className="small mb-2" style={{ color: '#8B7E74' }}>Size: M, Color: Black</p>
                      <p style={{ fontWeight: '600', color: '#4A3F35' }}>$29.99</p>
                    </Col>
                    <Col md={3}>
                      <Form.Select style={{ width: '100px' }} className="d_input">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Form.Select>
                    </Col>
                    <Col md={2} className="text-center">
                      <h6 style={{ fontWeight: '600', color: '#4A3F35' }}>$29.99</h6>
                    </Col>
                    <Col md={1} className="text-center">
                      <Button className="d_product_action_btn" size="sm" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}>
                        <FaTrash size={12} />
                      </Button>
                    </Col>
                  </Row>
                </div>

                <div className="border-bottom pb-4 mb-4" style={{ borderColor: '#F5E6D3' }}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop"
                        alt="Product"
                        style={{ width: '100%', borderRadius: '12px' }}
                      />
                    </Col>
                    <Col md={4}>
                      <h6 style={{ marginBottom: '4px', color: '#4A3F35' }}>Classic Denim Jeans</h6>
                      <p className="small mb-2" style={{ color: '#8B7E74' }}>Size: 32, Color: Blue</p>
                      <p style={{ fontWeight: '600', color: '#4A3F35' }}>$67.99</p>
                    </Col>
                    <Col md={3}>
                      <Form.Select style={{ width: '100px' }} className="d_input">
                        <option>1</option>
                        <option>2</option>
                      </Form.Select>
                    </Col>
                    <Col md={2} className="text-center">
                      <h6 style={{ fontWeight: '600', color: '#4A3F35' }}>$67.99</h6>
                    </Col>
                    <Col md={1} className="text-center">
                      <Button className="d_product_action_btn" size="sm" style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)' }}>
                        <FaTrash size={12} />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="d_card p-4">
                <h4 className="mb-4" style={{ color: '#4A3F35' }}>Order Summary</h4>
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
                
                <Form.Group className="mb-4">
                  <Form.Label style={{ color: '#4A3F35' }}>Coupon Code</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control placeholder="Enter code" className="d_input" />
                    <Button className="d_btn">Apply</Button>
                  </div>
                </Form.Group>

                <Link to="/checkout" className="d_btn w-100 mb-3 d-flex justify-content-center align-items-center" style={{ padding: '12px', textDecoration: 'none' }}>
                  Proceed to Checkout
                </Link>
                <Link to="/" className="d-block text-center" style={{ color: '#FF9A8B', textDecoration: 'none', fontWeight: '600' }}>
                  Continue Shopping
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Cart;
