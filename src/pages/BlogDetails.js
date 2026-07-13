import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import GoogleAdBanner from '../components/GoogleAdBanner';
import blogs from '../data/blogs';

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));
  const relatedBlogs = blogs.filter(b => b.id !== parseInt(id)).slice(0, 3);

  if (!blog) return <div className="text-center p-5">Blog not found</div>;

  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <span style={{ color: '#F97316', fontSize: '14px', fontWeight: '500' }}>{blog.category}</span>
          <h1 style={{ color: 'white', fontSize: '42px', margin: '16px 0' }}>{blog.title}</h1>
          <p style={{ color: '#94A3B8', fontSize: '16px' }}>By {blog.author} • {blog.date}</p>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Row>
            <Col md={8} className="mb-4 mb-md-0">
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: '100%', borderRadius: '12px', marginBottom: '32px' }}
              />
              <div className="d_card p-4" style={{ border: 'none' }}>
                <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>Introduction</h3>
                <p style={{ color: '#64748B', marginBottom: '16px' }}>
                  Welcome to our latest blog post where we explore {blog.title.toLowerCase()}. This article covers everything you need to know about this exciting topic.
                </p>
                <h4 style={{ color: '#0F172A', marginBottom: '16px', marginTop: '32px' }}>Key Points</h4>
                <ul style={{ color: '#64748B' }}>
                  <li>First important point about the topic</li>
                  <li>Second key insight to consider</li>
                  <li>Third valuable piece of information</li>
                  <li>Fourth takeaway from this article</li>
                </ul>
                <h4 style={{ color: '#0F172A', marginBottom: '16px', marginTop: '32px' }}>Conclusion</h4>
                <p style={{ color: '#64748B' }}>
                  We hope you found this article helpful and informative. Stay tuned for more great content coming soon!
                </p>
              </div>
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

              <GoogleAdBanner />

              <div className="d_card p-4 mt-4">
                <h5 style={{ marginBottom: '16px' }}>Related Posts</h5>
                {relatedBlogs.map(b => (
                  <Link key={b.id} to={`/blog/${b.id}`} style={{ textDecoration: 'none' }}>
                    <div className="d-flex gap-3 mb-3">
                      <img src={b.image} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}>{b.title}</p>
                        <p className="text-muted small mb-0">{b.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default BlogDetails;
