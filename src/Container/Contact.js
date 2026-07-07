import React, { useState } from 'react';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiChevronDown,
  FiChevronUp,
} from 'react-icons/fi';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <FiMapPin size={26} />, label: 'Visit Us', value: '123 Fashion Ave, Style City, NY 10001', href: null },
    { icon: <FiPhone size={26} />, label: 'Call Us', value: '+1 (212) 555-1234', href: 'tel:+12125551234' },
    { icon: <FiMail size={26} />, label: 'Email Us', value: 'hello@luxenest.com', href: 'mailto:hello@luxenest.com' },
    { icon: <FiClock size={26} />, label: 'Business Hours', value: 'Mon–Sat: 9AM – 7PM EST', href: null },
  ];

  const faqs = [
    { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at checkout.' },
    { q: 'What is your return policy?', a: 'We offer hassle-free returns within 30 days of delivery. Items must be unworn and in original packaging.' },
    { q: 'Do you offer international shipping?', a: 'Yes! We ship to 40+ countries. International shipping typically takes 7–14 business days.' },
    { q: 'Can I track my order?', a: "Absolutely. Once your order ships, you'll receive a tracking link via email." },
  ];

  return (
    <main className="z_contact_page">
      <div className="z_page_hero z_contact_hero">
        <div className="container">
          <span className="z_page_breadcrumb">Home / Contact</span>
          <h1 className="z_page_title">Get In Touch</h1>
          <p className="z_page_subtitle">We'd love to hear from you — reach out anytime</p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="z_section z_contact_info_section">
        <div className="container">
          <div className="row g-3 justify-content-center">
            {contactInfo.map((info, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="z_contact_info_card">
                  <span className="z_contact_card_icon">{info.icon}</span>
                  <p className="z_contact_card_label">{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="z_contact_card_value z_contact_card_link">{info.value}</a>
                  ) : (
                    <p className="z_contact_card_value">{info.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + FAQ */}
      <section className="z_section z_contact_main">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <div className="z_contact_form_wrap">
                <h3 className="z_contact_form_title">Send Us a Message</h3>
                <p className="z_contact_form_sub">Fill out the form below and we'll get back to you within 24 hours.</p>

                {submitted ? (
                  <div className="z_form_success">
                    <FiCheckCircle size={56} className="z_success_icon" />
                    <h4>Message Sent!</h4>
                    <p>Thank you, {formData.name}! We've received your message and will respond to <strong>{formData.email}</strong> within 24 hours.</p>
                    <button className="z_btn_primary" onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form className="z_contact_form" onSubmit={handleSubmit} noValidate>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="z_form_group">
                          <label className="z_form_label" htmlFor="contact-name">Full Name *</label>
                          <input type="text" id="contact-name" name="name" className={`z_form_input ${errors.name ? 'z_input_error' : ''}`} placeholder="John Doe" value={formData.name} onChange={handleChange} />
                          {errors.name && <span className="z_error_msg">{errors.name}</span>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="z_form_group">
                          <label className="z_form_label" htmlFor="contact-email">Email Address *</label>
                          <input type="email" id="contact-email" name="email" className={`z_form_input ${errors.email ? 'z_input_error' : ''}`} placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                          {errors.email && <span className="z_error_msg">{errors.email}</span>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="z_form_group">
                          <label className="z_form_label" htmlFor="contact-phone">Phone (Optional)</label>
                          <input type="tel" id="contact-phone" name="phone" className="z_form_input" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="z_form_group">
                          <label className="z_form_label" htmlFor="contact-subject">Subject *</label>
                          <select id="contact-subject" name="subject" className={`z_form_input z_form_select ${errors.subject ? 'z_input_error' : ''}`} value={formData.subject} onChange={handleChange}>
                            <option value="">Select a subject</option>
                            <option value="Order Inquiry">Order Inquiry</option>
                            <option value="Returns & Refunds">Returns &amp; Refunds</option>
                            <option value="Product Question">Product Question</option>
                            <option value="Wholesale">Wholesale</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.subject && <span className="z_error_msg">{errors.subject}</span>}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="z_form_group">
                          <label className="z_form_label" htmlFor="contact-message">Message *</label>
                          <textarea id="contact-message" name="message" className={`z_form_input z_form_textarea ${errors.message ? 'z_input_error' : ''}`} placeholder="Tell us how we can help you..." rows={5} value={formData.message} onChange={handleChange}></textarea>
                          {errors.message && <span className="z_error_msg">{errors.message}</span>}
                        </div>
                      </div>
                      <div className="col-12">
                        <button type="submit" className="z_btn_primary z_contact_submit">
                          Send Message <FiSend size={16} />
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* FAQ */}
            <div className="col-lg-5">
              <div className="z_faq_wrap">
                <h3 className="z_faq_title">Frequently Asked</h3>
                <div className="z_faq_list">
                  {faqs.map((faq, i) => (
                    <FaqItem key={i} question={faq.q} answer={faq.a} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`z_faq_item ${open ? 'z_faq_open' : ''}`}>
      <button className="z_faq_question" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span>{question}</span>
        <span className="z_faq_chevron">
          {open ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </span>
      </button>
      <div className={`z_faq_answer ${open ? 'z_faq_answer_open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default Contact;
