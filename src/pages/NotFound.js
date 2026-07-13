import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="d_section d-flex align-items-center" style={{ minHeight: '70vh' }}>
      <Container className="text-center">
        <h1 style={{ fontSize: '120px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>404</h1>
        <h3 style={{ color: '#1E293B', marginBottom: '16px' }}>Page Not Found</h3>
        <p style={{ color: '#64748B', marginBottom: '32px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button className="d_btn_primary" style={{ padding: '12px 32px' }}>
            Go Back Home
          </Button>
        </Link>
      </Container>
    </section>
  );
};

export default NotFound;
