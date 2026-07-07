import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiRefreshCw,
  FiUsers,
  FiZap,
  FiArrowRight,
} from 'react-icons/fi';
import { MdOutlineDiamond } from 'react-icons/md';
import { TbShirt, TbHome, TbAward } from 'react-icons/tb';
import { HiSparkles } from 'react-icons/hi';

function About() {
  const teamMembers = [
    { name: 'Aria Chen', role: 'Founder & CEO', icon: <TbAward size={36} />, bio: 'Visionary designer with 15+ years in fashion and retail.' },
    { name: 'Marcus Webb', role: 'Head of Product', icon: <TbHome size={36} />, bio: 'Tech enthusiast driving our smart home appliances line.' },
    { name: 'Priya Nair', role: 'Creative Director', icon: <HiSparkles size={36} />, bio: 'Crafting the LuxeNest aesthetic, one collection at a time.' },
    { name: 'Tobias King', role: 'Customer Experience', icon: <FiUsers size={36} />, bio: 'Obsessed with making every customer interaction exceptional.' },
  ];

  const values = [
    { icon: <FiRefreshCw size={32} />, title: 'Sustainability', desc: 'Every product is sourced responsibly. We partner with suppliers who share our commitment to the planet.' },
    { icon: <MdOutlineDiamond size={32} />, title: 'Quality First', desc: 'We rigorously test every item before it reaches your door. No compromises, ever.' },
    { icon: <FiUsers size={32} />, title: 'Community', desc: "LuxeNest is more than a store — it's a community of people who believe in living beautifully." },
    { icon: <FiZap size={32} />, title: 'Innovation', desc: "From smart appliances to trend-forward fashion, we're always a step ahead." },
  ];

  return (
    <main className="z_about_page">

      {/* Page Hero */}
      <div className="z_page_hero z_about_hero">
        <div className="container">
          <span className="z_page_breadcrumb">Home / About</span>
          <h1 className="z_page_title">Our Story</h1>
          <p className="z_page_subtitle">Where fashion meets functional living</p>
        </div>
      </div>

      {/* Mission */}
      <section className="z_section z_about_mission">
        <div className="container">
          <div className="row align-items-center g-5 m-0">
            <div className="col-lg-6">
              <div className="z_about_visual">
                <div className="z_about_blob">
                  <HiSparkles size={56} className="z_about_big_icon" />
                  <div className="z_about_floating z_about_float1"><TbShirt size={28} /></div>
                  <div className="z_about_floating z_about_float2"><TbHome size={28} /></div>
                  <div className="z_about_floating z_about_float3"><TbAward size={28} /></div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <span className="z_section_tag">Who We Are</span>
              <h2 className="z_section_title">Built for the Modern Lifestyle</h2>
              <p className="z_about_text">
                LuxeNest was founded in 2019 with a simple belief: your wardrobe and your home should
                tell the same beautiful story. We bridged the gap between premium fashion and smart
                home living — all in one destination.
              </p>
              <p className="z_about_text">
                From handpicked cashmere sweaters to intelligent kitchen appliances, every product
                in our collection is chosen with intention. We work with artisans, ethical manufacturers,
                and leading tech brands to bring you only the best.
              </p>
              <div className="z_about_milestones">
                <div className="z_milestone">
                  <span className="z_milestone_num">2019</span>
                  <span className="z_milestone_label">Founded</span>
                </div>
                <div className="z_milestone">
                  <span className="z_milestone_num">50+</span>
                  <span className="z_milestone_label">Brand Partners</span>
                </div>
                <div className="z_milestone">
                  <span className="z_milestone_num">10K+</span>
                  <span className="z_milestone_label">Customers</span>
                </div>
                <div className="z_milestone">
                  <span className="z_milestone_num">4.9★</span>
                  <span className="z_milestone_label">Avg. Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="z_section z_about_values">
        <div className="container">
          <div className="z_section_header text-center">
            <span className="z_section_tag">What Drives Us</span>
            <h2 className="z_section_title">Our Core Values</h2>
          </div>
          <div className="row g-4">
            {values.map((val, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="z_value_card">
                  <span className="z_value_icon">{val.icon}</span>
                  <h5 className="z_value_title">{val.title}</h5>
                  <p className="z_value_desc">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="z_section z_about_team">
        <div className="container">
          <div className="z_section_header text-center">
            <span className="z_section_tag">The People</span>
            <h2 className="z_section_title">Meet Our Team</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {teamMembers.map((member, i) => (
              <div className="col-6 col-md-4 col-lg-3" key={i}>
                <div className="z_team_card">
                  <div className="z_team_avatar">{member.icon}</div>
                  <h6 className="z_team_name">{member.name}</h6>
                  <span className="z_team_role">{member.role}</span>
                  <p className="z_team_bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="z_about_cta">
        <div className="container text-center">
          <h2 className="z_about_cta_title">Ready to Experience LuxeNest?</h2>
          <p className="z_about_cta_desc">Browse our curated collections and find something you'll love.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/shop" className="z_btn_primary">
              Shop Now <FiArrowRight size={16} />
            </Link>
            <Link to="/contact" className="z_btn_ghost">Get in Touch</Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default About;
