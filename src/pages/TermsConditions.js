import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsConditions = () => {
  return (
    <>
      <section style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '80px 0', textAlign: 'center' }}>
        <Container>
          <h1 style={{ color: 'white', fontSize: '48px', marginBottom: '16px' }}>Terms & Conditions</h1>
        </Container>
      </section>

      <section className="d_section">
        <Container>
          <Card className="p-4" style={{ border: 'none' }}>
            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>1. Acceptance of Terms</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              By using our website, you agree to be bound by these Terms & Conditions.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>2. Use of the Website</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              You agree to use our website only for lawful purposes and in accordance with these terms.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>3. Products and Pricing</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              We reserve the right to modify product information and prices at any time without notice.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>4. Orders and Payments</h3>
            <p style={{ color: '#64748B', marginBottom: '24px' }}>
              All orders are subject to acceptance and availability. We accept various payment methods.
            </p>

            <h3 style={{ color: '#0F172A', marginBottom: '20px' }}>5. Limitation of Liability</h3>
            <p style={{ color: '#64748B' }}>
              We shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website.
            </p>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default TermsConditions;
