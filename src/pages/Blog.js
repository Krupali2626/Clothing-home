import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GoogleAdBanner from '../components/GoogleAdBanner';
import blogs from '../data/blogs';

const Blog = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '16px' }}>Blog</h1>
          <p style={{ color: '#94A3B8', fontSize: '18px' }}>Latest news and updates</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col md={8}>
              <Row className="g-4">
                {blogs.map(blog => (
                  <Col key={blog.id} md={6}>
                    <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                      <Card className="h-100" style={{ border: 'none' }}>
                        <Card.Img variant="top" src={blog.image} style={{ height: '220px', objectFit: 'cover' }} />
                        <Card.Body>
                          <span style={{ fontSize: '12px', color: '#F97316', fontWeight: '500' }}>{blog.category}</span>
                          <Card.Title style={{ fontSize: '18px', margin: '8px 0' }}>{blog.title}</Card.Title>
                          <Card.Text style={{ color: '#64748B', fontSize: '14px' }}>
                            {blog.excerpt}
                          </Card.Text>
                          <p className="text-muted small mb-0">{blog.date}</p>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col md={4}>
              <div className="d_card p-4 mb-4">
                <h5 style={{ marginBottom: '16px' }}>Categories</h5>
                {['Fashion', 'Appliances', 'Technology', 'Tips'].map(cat => (
                  <div key={cat} className="d-flex justify-content-between border-bottom py-2">
                    <span style={{ color: '#64748B' }}>{cat}</span>
                    <span style={{ color: '#94A3B8' }}>{Math.floor(Math.random() * 20) + 5}</span>
                  </div>
                ))}
              </div>
              
              <div className="d_card p-4 mb-4">
                <h5 style={{ marginBottom: '16px' }}>Recent Posts</h5>
                {blogs.slice(0, 3).map(blog => (
                  <Link key={blog.id} to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
                    <div className="d-flex gap-3 mb-3">
                      <img src={blog.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}>{blog.title}</p>
                        <p className="text-muted small mb-0">{blog.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <GoogleAdBanner size="vertical" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Blog;
