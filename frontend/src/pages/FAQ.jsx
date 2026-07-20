import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight, FaQuestionCircle, FaEnvelope, FaPhoneAlt, FaHeadset } from "react-icons/fa";
import FAQSection from "../components/common/FAQSection";
import Newsletter from "../components/common/Newsletter";
import "./FAQ.css";

const contactCards = [
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Our customer support team is available round the clock to help you.",
    action: "support@dstore.example",
    actionLink: "mailto:support@dstore.example",
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    desc: "Speak directly with our team for immediate assistance.",
    action: "+91 12345 67890",
    actionLink: "tel:+911234567890",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    desc: "Send us an email and we'll respond within 24 hours.",
    action: "help@dstore.example",
    actionLink: "mailto:help@dstore.example",
  },
];

const FAQ = () => {
  return (
    <div className="d_faq_page">
      {/* Hero */}
      <div
        className="d_page_banner d_faq_banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1400&h=400&fit=crop&auto=format)",
        }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_page_banner_content container text-center">
          <h1>Frequently Asked Questions</h1>
          <ol className="d_breadcrumb justify-content-center">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>FAQ</li>
          </ol>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="d_section">
        <div className="container">
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="d_section_title_wrap justify-content-center text-center mb-5">
                <div>
                  <span className="d_section_eyebrow">
                    <FaQuestionCircle /> Got Questions?
                  </span>
                  <h2 className="d_section_title">We've Got Answers</h2>
                  <p className="d_section_subtitle mx-auto">
                    Find answers to the most common questions about shopping, shipping, returns, and more.
                  </p>
                </div>
              </div>
              <FAQSection />
            </Col>
          </Row>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="d_section d_bg_alt_section">
        <div className="container">
          <div className="d_section_title_wrap justify-content-center text-center mb-5">
            <div>
              <span className="d_section_eyebrow">Still Need Help?</span>
              <h2 className="d_section_title">Get In Touch</h2>
              <p className="d_section_subtitle mx-auto">
                If you can't find the answer you're looking for, our team is here to help.
              </p>
            </div>
          </div>
          <Row className="g-4">
            {contactCards.map((card, i) => (
              <Col key={i} md={4}>
                <div className="d_faq_contact_card">
                  <div className="d_faq_contact_icon">{card.icon}</div>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                  <a href={card.actionLink} className="d_faq_contact_link">
                    {card.action}
                  </a>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section className="container d_section pb-5">
        <div className="d_faq_cta">
          <Row className="align-items-center g-4">
            <Col lg={8}>
              <h3>Can't find what you're looking for?</h3>
              <p>Our customer support team is ready to assist you with any questions you may have.</p>
            </Col>
            <Col lg={4} className="text-lg-end">
              <Link to="/contact" className="d_btn_primary">
                Contact Us <FaChevronRight size={12} />
              </Link>
            </Col>
          </Row>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container d_section_sm pb-5">
        <Newsletter />
      </section>
    </div>
  );
};

export default FAQ;
