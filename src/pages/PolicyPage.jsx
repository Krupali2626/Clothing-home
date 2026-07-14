import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaArrowRight } from "react-icons/fa";
import "./PolicyPage.css";

const POLICIES = {
  "/privacy-policy": {
    title: "Privacy Policy",
    lastUpdated: "January 2026",
    sections: [
      {
        heading: "Information We Collect",
        content:
          "We collect information you provide directly, such as your name, email address, shipping address, phone number, and payment details when you create an account or place an order. We also collect usage data, including pages visited, products viewed, and search queries.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use your information to process orders, personalise your shopping experience, send transactional emails, provide customer support, improve our services, and comply with legal obligations. We do not sell your personal information to third parties.",
      },
      {
        heading: "Data Security",
        content:
          "We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your information. However, no method of transmission over the internet is 100% secure.",
      },
      {
        heading: "Cookies",
        content:
          "We use cookies to keep you signed in, remember your preferences, and analyse how our site is used. You can disable cookies in your browser settings, though some features may not function correctly.",
      },
      {
        heading: "Your Rights",
        content:
          "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact us at support@dstore.example and we will respond within 30 days.",
      },
      {
        heading: "Contact Us",
        content:
          "For privacy-related questions, reach out to our Data Protection Team at privacy@dstore.example or write to us at 221B Commerce Street, Surat, Gujarat, India — 395003.",
      },
    ],
  },
  "/terms-conditions": {
    title: "Terms & Conditions",
    lastUpdated: "January 2026",
    sections: [
      {
        heading: "Acceptance of Terms",
        content:
          "By accessing or using D.Store, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you may not use our services.",
      },
      {
        heading: "Use of Our Services",
        content:
          "You must be at least 18 years old to use our services. You agree to use D.Store only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the platform.",
      },
      {
        heading: "Product Listings & Pricing",
        content:
          "We make every effort to display accurate product information and pricing. However, errors may occur. We reserve the right to correct any errors and to cancel orders placed at incorrect prices.",
      },
      {
        heading: "Intellectual Property",
        content:
          "All content on D.Store — including text, images, logos, and software — is the property of D.Store or its licensors and is protected by applicable intellectual property laws.",
      },
      {
        heading: "Limitation of Liability",
        content:
          "To the maximum extent permitted by law, D.Store shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.",
      },
      {
        heading: "Changes to Terms",
        content:
          "We may update these Terms from time to time. We will notify you of significant changes via email or a prominent notice on our site. Continued use of D.Store after changes constitutes acceptance.",
      },
    ],
  },
  "/refund-policy": {
    title: "Refund Policy",
    lastUpdated: "January 2026",
    sections: [
      {
        heading: "7-Day Return Window",
        content:
          "You may return most items within 7 days of delivery. To be eligible, products must be unused, in their original condition and packaging, with all tags and accessories included.",
      },
      {
        heading: "Non-Returnable Items",
        content:
          "The following items are non-returnable: personalised or custom products, perishable goods, intimate apparel, and items explicitly marked as final sale at the time of purchase.",
      },
      {
        heading: "How to Initiate a Return",
        content:
          "Log in to your account and visit My Orders. Select the item you wish to return, choose a reason, and submit your request. Our team will review it within 24–48 hours and arrange a pickup.",
      },
      {
        heading: "Refund Processing",
        content:
          "Once we receive and inspect the returned item, we will process your refund within 5–7 business days. Refunds are credited to your original payment method or as store credit, per your preference.",
      },
      {
        heading: "Damaged or Defective Items",
        content:
          "If you receive a damaged or defective item, contact us within 48 hours of delivery with photos. We will arrange an immediate replacement or full refund at no cost to you.",
      },
      {
        heading: "Appliance Installation Issues",
        content:
          "For home appliances that develop faults within the warranty period, we coordinate with the manufacturer for free repair or replacement as applicable under warranty terms.",
      },
    ],
  },
  "/shipping-policy": {
    title: "Shipping Policy",
    lastUpdated: "January 2026",
    sections: [
      {
        heading: "Free Shipping",
        content:
          "We offer free standard shipping on all orders above ₹1,999. Orders below this threshold are charged a flat ₹99 shipping fee.",
      },
      {
        heading: "Delivery Timelines",
        content:
          "Standard delivery takes 3–5 business days for most cities. Express delivery (1–2 business days) is available at checkout for select pin codes. Remote locations may take 6–8 business days.",
      },
      {
        heading: "Order Processing",
        content:
          "Orders placed before 2 PM IST on business days are typically dispatched the same day. Orders placed after 2 PM or on weekends and holidays are dispatched the next business day.",
      },
      {
        heading: "Order Tracking",
        content:
          "Once your order is shipped, you will receive a confirmation email and SMS with a tracking link. You can also track your order anytime from the My Orders section of your account.",
      },
      {
        heading: "Large Appliance Delivery",
        content:
          "Large appliances like refrigerators, washing machines, and air conditioners are delivered by a specialised logistics team. Delivery includes ground-floor placement and basic installation where applicable.",
      },
      {
        heading: "Shipping Restrictions",
        content:
          "We currently ship across India. Some remote or restricted areas may not be serviceable. The checkout page will indicate if delivery to your pin code is unavailable.",
      },
    ],
  },
};

const PolicyPage = () => {
  const { pathname } = useLocation();
  const policy = POLICIES[pathname];

  if (!policy) {
    return (
      <div className="d_container_fluid d_section d_not_found text-center">
        <h2>Page not found</h2>
        <Link to="/" className="d_btn_primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="d_policy_page">
      {/* Banner */}
      <div className="d_policy_banner">
        <div className="container d_policy_banner_content">
          <ol className="d_breadcrumb_dark">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>{policy.title}</li>
          </ol>
          <h1>{policy.title}</h1>
          <p>Last updated: {policy.lastUpdated}</p>
        </div>
      </div>

      <div className="container d_section">
        <div className="d_policy_layout">
          {/* TOC sidebar */}
          <aside className="d_policy_toc d-none d-lg-block">
            <div className="d_policy_toc_inner">
              <h5>On this page</h5>
              <ul>
                {policy.sections.map((s, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`}>{s.heading}</a>
                  </li>
                ))}
              </ul>

              <div className="d_policy_help_cta">
                <p>Still have questions?</p>
                <Link to="/contact" className="d_btn_primary">
                  Contact Us <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="d_policy_content">
            {policy.sections.map((s, i) => (
              <section key={i} id={`section-${i}`} className="d_policy_section">
                <h2>{s.heading}</h2>
                <p>{s.content}</p>
              </section>
            ))}

            <div className="d_policy_footer_cta">
              <p>Have questions about our {policy.title.toLowerCase()}?</p>
              <Link to="/contact" className="d_btn_primary">
                Get in Touch <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
