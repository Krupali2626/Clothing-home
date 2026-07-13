import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '16px' }}>Privacy Policy</h1>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Card className="p-4" style={{ border: 'none' }}>
            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>1. Information We Collect</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>2. How We Use Your Information</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              We use the information we collect to process your orders, provide customer support, and improve our services.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>3. Information Sharing</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              We do not share your personal information with third parties except as necessary to provide our services.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>4. Data Security</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              We implement appropriate security measures to protect your personal information from unauthorized access.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>5. Contact Us</h3>
            <p style={{ color: '#64748B' }}>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default PrivacyPolicy;
