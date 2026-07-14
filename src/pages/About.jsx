import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import {
  FaChevronRight,
  FaArrowRight,
  FaUsers,
  FaStar,
  FaShippingFast,
  FaLeaf,
  FaQuoteLeft,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import Newsletter from "../components/common/Newsletter";
import "./About.css";

const stats = [
  { value: "2.4M+", label: "Happy Customers" },
  { value: "18,000+", label: "Products Listed" },
  { value: "120+", label: "Brand Partners" },
  { value: "4.8★", label: "Average Rating" },
];

const values = [
  {
    icon: <FaUsers />,
    title: "Customer First",
    desc: "Every decision we make starts with the customer. From returns to support, we put your experience at the centre.",
  },
  {
    icon: <FaStar />,
    title: "Uncompromising Quality",
    desc: "We partner only with brands that meet our rigorous quality standards — so you always get what you paid for.",
  },
  {
    icon: <FaShippingFast />,
    title: "Reliable Delivery",
    desc: "Our logistics network spans 500+ cities, ensuring your order arrives on time, every time.",
  },
  {
    icon: <FaLeaf />,
    title: "Sustainable Practices",
    desc: "We are actively reducing packaging waste and partnering with eco-conscious suppliers to protect our planet.",
  },
];

const team = [
  {
    name: "Arjun Kapoor",
    role: "Founder & CEO",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Priya Menon",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&auto=format",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Rohit Sharma",
    role: "VP of Operations",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Neha Iyer",
    role: "Head of Marketing",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&auto=format",
    linkedin: "#",
    twitter: "#",
  },
];

const testimonials = [
  {
    quote:
      "D.Store completely changed how I shop. The quality is consistently great and the delivery is always on time.",
    name: "Kavya R.",
    location: "Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "I bought a refrigerator and the entire experience — from selection to installation — was seamless. Highly recommend.",
    name: "Mihir P.",
    location: "Ahmedabad",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&auto=format",
  },
];

const About = () => {
  return (
    <div className="d_about_page">
      {/* Hero */}
      <div
        className="d_page_banner d_about_banner"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=400&fit=crop&auto=format)",
        }}
      >
        <div className="d_page_banner_overlay" />
        <div className="d_page_banner_content container text-center">
          <h1>Our Story</h1>
          <ol className="d_breadcrumb justify-content-center">
            <li><Link to="/">Home</Link></li>
            <li><FaChevronRight size={10} /></li>
            <li>About Us</li>
          </ol>
        </div>
      </div>

      {/* Mission */}
      <section className="d_section">
        <div className="container">
          <Row className="align-items-center g-5">
            <Col lg={6}>
              <span className="d_section_eyebrow">Who We Are</span>
              <h2 className="d_section_title mb-3">
                Built for India's Modern Shoppers
              </h2>
              <p className="d_about_para">
                D.Store was founded in 2019 with a simple belief: everyone deserves access to
                quality products at honest prices. We started as a small team of four in Surat,
                Gujarat, frustrated by the gap between premium retail and affordable shopping.
              </p>
              <p className="d_about_para">
                Today we are a fast-growing platform serving over 2.4 million customers across
                India, offering everything from contemporary fashion to smart home appliances —
                all curated, quality-checked, and delivered with care.
              </p>
              <Link to="/clothing" className="d_btn_primary mt-2">
                Explore Products <FaArrowRight size={12} />
              </Link>
            </Col>
            <Col lg={6}>
              <div className="d_about_img_grid">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=420&fit=crop&auto=format"
                  alt="Fashion products"
                  className="d_about_img_main"
                />
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=280&h=200&fit=crop&auto=format"
                  alt="Appliances"
                  className="d_about_img_sm"
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Stats */}
      <section className="d_about_stats_section">
        <div className="container">
          <Row className="g-3">
            {stats.map((s, i) => (
              <Col key={i} xs={6} md={3}>
                <div className="d_stat_card">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Values */}
      <section className="d_section">
        <div className="container">
          <div className="d_section_title_wrap justify-content-center text-center mb-4">
            <div>
              <span className="d_section_eyebrow">What Drives Us</span>
              <h2 className="d_section_title">Our Core Values</h2>
            </div>
          </div>
          <Row className="g-4">
            {values.map((v, i) => (
              <Col key={i} sm={6} lg={3}>
                <div className="d_value_card">
                  <div className="d_value_icon">{v.icon}</div>
                  <h4 className="d_value_title">{v.title}</h4>
                  <p className="d_value_desc">{v.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Team */}
      <section className="d_section d_bg_alt_section">
        <div className="container">
          <div className="d_section_title_wrap justify-content-center text-center mb-4">
            <div>
              <span className="d_section_eyebrow">The People</span>
              <h2 className="d_section_title">Meet the Team</h2>
              <p className="d_section_subtitle mx-auto">
                A passionate group of designers, engineers and storytellers building the future of retail.
              </p>
            </div>
          </div>
          <Row className="g-4 justify-content-center">
            {team.map((member, i) => (
              <Col key={i} xs={6} sm={6} md={3}>
                <div className="d_team_card">
                  <div className="d_team_img_wrap">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <h5 className="d_team_name">{member.name}</h5>
                  <span className="d_team_role">{member.role}</span>
                  <div className="d_team_socials">
                    <a href={member.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a>
                    <a href={member.twitter} aria-label="Twitter"><FaTwitter /></a>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Testimonials */}
      <section className="d_section">
        <div className="container">
          <div className="d_section_title_wrap justify-content-center text-center mb-4">
            <div>
              <span className="d_section_eyebrow">Customer Love</span>
              <h2 className="d_section_title">What People Are Saying</h2>
            </div>
          </div>
          <Row className="g-4 justify-content-center">
            {testimonials.map((t, i) => (
              <Col key={i} md={6}>
                <div className="d_about_testimonial">
                  <FaQuoteLeft className="d_quote_icon" />
                  <p className="d_testimonial_quote">{t.quote}</p>
                  <div className="d_testimonial_user">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.location}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container d_section_sm pb-5">
        <Newsletter />
      </section>
    </div>
  );
};

export default About;
