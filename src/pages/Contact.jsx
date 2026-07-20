import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaChevronRight,
  FaPaperPlane,
  FaCheckCircle,
  FaWhatsapp,
  FaFacebookMessenger,
} from "react-icons/fa";
import "./Contact.css";

const contactDetails = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Visit Us",
    lines: ["221B Commerce Street", "Surat, Gujarat — 395003"],
  },
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    lines: ["+91 12345 67890", "Mon – Sat, 9am – 7pm"],
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    lines: ["support@dstore.example", "We reply within 24 hours"],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    lines: ["Monday – Saturday", "9:00 AM – 7:00 PM IST"],
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Please select a subject";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="d_contact_page">
      {/* Banner */}
      <div
        className="d_page_banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1400&h=300&fit=crop&auto=format)",
          height: "220px",
        }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_page_banner_content container">
          <h1>Contact Us</h1>
          <ol className="d_breadcrumb">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>Contact Us</li>
          </ol>
        </div>
      </div>

      {/* Contact Info Cards */}
      <section className="d_section_sm">
        <div className="container">
          <Row className="g-3">
            {contactDetails.map((c, i) => (
              <Col key={i}  xs={12} sm={6} md={6} lg={3}>
                <div className="d_contact_info_card">
                  <div className="d_contact_icon">{c.icon}</div>
                  <h6>{c.title}</h6>
                  {c.lines.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Form + Map */}
      <section className="d_section">
        <div className="container">
          <Row className="g-5">
            {/* Form */}
            <Col lg={7}>
              <span className="d_section_eyebrow">Get in Touch</span>
              <h2 className="d_section_title mb-4">Send Us a Message</h2>

              {submitted ? (
                <div className="d_contact_success">
                  <FaCheckCircle />
                  <div>
                    <h4>Message Received!</h4>
                    <p>
                      Thanks for reaching out, {form.name.split(" ")[0]}. Our team will
                      get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <Form className="d_contact_form" onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Full Name *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Arjun Kapoor"
                          value={form.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                          className="d_form_input"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Email Address *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                          className="d_form_input"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={handleChange}
                          className="d_form_input"
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group>
                        <Form.Label>Subject *</Form.Label>
                        <Form.Select
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          isInvalid={!!errors.subject}
                          className="d_form_input"
                        >
                          <option value="">Select a topic</option>
                          <option>Order Enquiry</option>
                          <option>Return / Refund</option>
                          <option>Product Question</option>
                          <option>Technical Support</option>
                          <option>Partnership</option>
                          <option>Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors.subject}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Message *</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="message"
                          rows={5}
                          placeholder="Tell us how we can help…"
                          value={form.message}
                          onChange={handleChange}
                          isInvalid={!!errors.message}
                          className="d_form_input"
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12}>
                      <button type="submit" className="d_btn_primary">
                        Send Message <FaPaperPlane size={13} />
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Col>

            {/* Map + Quick Contact */}
            <Col lg={5}>
              <div className="d_map_wrap">
                <iframe
                  title="D.Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59462.00768975978!2d72.78457!3d21.19594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e59411d1563%3A0xfe4558290938b042!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="d_quick_contact_cards">
                <h5>Reach Us Directly</h5>
                <a href="https://wa.me/911234567890" className="d_quick_contact_btn d_whatsapp_btn" target="_blank" rel="noreferrer">
                  <FaWhatsapp /> Chat on WhatsApp
                </a>
                <a href="https://facebook.com" className="d_quick_contact_btn d_messenger_btn" target="_blank" rel="noreferrer">
                  <FaFacebookMessenger /> Message on Facebook
                </a>
                <a href="mailto:support@dstore.example" className="d_quick_contact_btn d_email_btn">
                  <FaEnvelope /> Email Support
                </a>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default Contact;
