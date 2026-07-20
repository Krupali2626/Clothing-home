import React, { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaPaperPlane, FaGift, FaBolt, FaTags } from "react-icons/fa";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <div className="d_newsletter">
      <div className="d_newsletter_content">
        <span className="d_section_eyebrow">Newsletter</span>
        <h2 className="d_newsletter_title">Get 10% Off Your First Order</h2>
        <p className="d_newsletter_subtitle">
          Join our list for early access to sales, new arrivals and style guides.
        </p>

        {submitted ? (
          <div className="d_newsletter_success">🎉 Thanks! Check your inbox to confirm your subscription.</div>
        ) : (
          <Form className="d_newsletter_form" onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="d_btn_primary" type="submit">
                Subscribe <FaPaperPlane size={13} />
              </button>
            </InputGroup>
          </Form>
        )}

        <div className="d_newsletter_perks">
          <span><FaGift /> Exclusive Offers</span>
          <span><FaBolt /> Early Access</span>
          <span><FaTags /> Member Discounts</span>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
