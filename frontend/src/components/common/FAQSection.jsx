import React from "react";
import { Accordion } from "react-bootstrap";
import "./FAQSection.css";

const faqs = [
  {
    q: "What is your return and exchange policy?",
    a: "We offer a 7-day easy return window on most clothing and appliance items. Products must be unused, in original packaging, with tags intact.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 3–5 business days across most cities, with express delivery available at checkout for select pin codes.",
  },
  {
    q: "Do you offer installation for appliances?",
    a: "Yes, large appliances like refrigerators, washing machines and ACs include free standard installation booked directly from your order details page.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "COD is available on orders under ₹15,000 for most serviceable locations. You'll see the option at checkout if it applies to your address.",
  },
  {
    q: "How can I track my order?",
    a: "Once shipped, you'll receive a tracking link via email and SMS. You can also check live status anytime from the My Orders section of your account.",
  },
];

const FAQSection = () => {
  return (
    <Accordion defaultActiveKey="0" className="d_faq_accordion">
      {faqs.map((f, i) => (
        <Accordion.Item eventKey={String(i)} key={i} className="d_faq_item">
          <Accordion.Header>{f.q}</Accordion.Header>
          <Accordion.Body>{f.a}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FAQSection;
