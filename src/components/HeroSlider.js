import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaFire, FaStar, FaTag } from 'react-icons/fa';

const slides = [
  {
    id: 1,
    badge: '🔥 Hot Deal',
    badgeIcon: FaFire,
    title: 'Summer Collection',
    titleHighlight: '2024',
    subtitle: 'Up to 50% OFF',
    description: 'Discover our latest summer fashion trends with premium quality fabrics and modern, elegant designs.',
    buttonText: 'Shop Now',
    buttonLink: '/clothing/summer-wear',
    bg: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 60%, #5B21B6 100%)',
    decorColor: 'rgba(124,58,237,0.3)',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700&h=650&fit=crop',
    stats: [{ val: '200+', label: 'Styles' }, { val: '50%', label: 'Off' }],
  },
  {
    id: 2,
    badge: '✨ New Arrivals',
    badgeIcon: FaStar,
    title: 'Smart Home',
    titleHighlight: 'Appliances',
    subtitle: 'Biggest Sale of the Year',
    description: 'Upgrade your home with our premium collection of smart home appliances at unbeatable prices.',
    buttonText: 'Explore Now',
    buttonLink: '/appliances/tv',
    bg: 'linear-gradient(135deg, #0F0A1E 0%, #1E1B4B 50%, #312E81 100%)',
    decorColor: 'rgba(236,72,153,0.3)',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=700&h=650&fit=crop',
    stats: [{ val: '500+', label: 'Products' }, { val: '5★', label: 'Rated' }],
  },
  {
    id: 3,
    badge: '❄️ Trending',
    badgeIcon: FaFire,
    title: 'Winter',
    titleHighlight: 'Essentials',
    subtitle: 'Stay Warm & Stylish',
    description: 'Premium winter collection featuring cozy jackets, sweaters, and accessories for the cold season.',
    buttonText: 'View Collection',
    buttonLink: '/clothing/winter-wear',
    bg: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 60%, #6D28D9 100%)',
    decorColor: 'rgba(124,58,237,0.25)',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&h=650&fit=crop',
    stats: [{ val: '150+', label: 'Jackets' }, { val: '30%', label: 'Off' }],
  },
  {
    id: 4,
    badge: '🍳 Sale',
    badgeIcon: FaTag,
    title: 'Kitchen',
    titleHighlight: 'Makeover',
    subtitle: 'Modern Kitchen Gadgets',
    description: 'Transform your kitchen with our latest smart kitchen appliances, gadgets and accessories.',
    buttonText: 'Shop Kitchen',
    buttonLink: '/appliances/kitchen',
    bg: 'linear-gradient(135deg, #0F0A1E 0%, #2D1B69 50%, #4C1D95 100%)',
    decorColor: 'rgba(236,72,153,0.25)',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=700&h=650&fit=crop',
    stats: [{ val: '300+', label: 'Gadgets' }, { val: '25%', label: 'Off' }],
  },
  {
    id: 5,
    badge: '👔 Premium',
    badgeIcon: FaStar,
    title: "Men's Premium",
    titleHighlight: 'Wear',
    subtitle: 'New Arrivals Just In',
    description: "Elevate your style with our curated collection of men's premium clothing and accessories.",
    buttonText: 'Shop Men',
    buttonLink: '/clothing/men',
    bg: 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 50%, #4F46E5 100%)',
    decorColor: 'rgba(124,58,237,0.3)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=650&fit=crop',
    stats: [{ val: '400+', label: 'Items' }, { val: 'New', label: 'Season' }],
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ position: 'relative', height: '600px', overflow: 'hidden' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ height: '100%' }}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            style={{ height: '100%', background: slide.bg, position: 'relative', overflow: 'hidden' }}
          >
            {/* Background decorative blobs */}
            <div style={{
              position: 'absolute', top: '-80px', left: '-80px',
              width: '400px', height: '400px', borderRadius: '50%',
              background: slide.decorColor,
              filter: 'blur(80px)', zIndex: 0,
            }} />
            <div style={{
              position: 'absolute', bottom: '-60px', right: '30%',
              width: '300px', height: '300px', borderRadius: '50%',
              background: 'rgba(236,72,153,0.2)',
              filter: 'blur(60px)', zIndex: 0,
            }} />
            {/* Subtle dot grid pattern */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }} />

            <Container style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 2 }}>
              <Row style={{ alignItems: 'center', width: '100%' }}>
                {/* Text Column */}
                <Col lg={6} className="mb-4 mb-lg-0">
                  {/* Badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white', padding: '8px 20px', borderRadius: '50px',
                    fontSize: '13px', fontWeight: '700', marginBottom: '24px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    {slide.badge}
                  </div>

                  {/* Title */}
                  <h1 style={{
                    color: 'white', fontSize: 'clamp(36px, 5vw, 56px)',
                    fontWeight: '900', lineHeight: '1.1', marginBottom: '8px',
                  }}>
                    {slide.title}
                  </h1>
                  <h1 style={{
                    fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: '900',
                    lineHeight: '1.1', marginBottom: '16px',
                    background: 'linear-gradient(135deg, #A78BFA, #F472B6)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {slide.titleHighlight}
                  </h1>

                  {/* Subtitle pill */}
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                    color: 'white', padding: '6px 20px', borderRadius: '50px',
                    fontSize: '15px', fontWeight: '700', marginBottom: '20px',
                  }}>
                    {slide.subtitle}
                  </div>

                  <p style={{
                    color: 'rgba(255,255,255,0.75)', fontSize: '16px',
                    marginBottom: '32px', maxWidth: '460px', lineHeight: '1.8',
                  }}>
                    {slide.description}
                  </p>

                  {/* Stats */}
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '36px' }}>
                    {slide.stats.map((s, i) => (
                      <div key={i} style={{
                        background: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '14px', padding: '12px 20px', textAlign: 'center',
                        backdropFilter: 'blur(10px)',
                      }}>
                        <div style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>{s.val}</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Link to={slide.buttonLink} style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          padding: '14px 32px', borderRadius: '50px', border: 'none',
                          background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                          color: 'white', fontWeight: '700', fontSize: '15px',
                          cursor: 'pointer', transition: 'all 0.3s ease',
                          display: 'inline-flex', alignItems: 'center', gap: '10px',
                          boxShadow: '0 8px 24px rgba(124,58,237,0.45)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px) scale(1.04)';
                          e.currentTarget.style.boxShadow = '0 16px 40px rgba(124,58,237,0.55)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0) scale(1)';
                          e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.45)';
                        }}
                      >
                        {slide.buttonText} <FaArrowRight />
                      </button>
                    </Link>
                    <Link to="/clothing/all" style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          padding: '14px 32px', borderRadius: '50px',
                          border: '2px solid rgba(255,255,255,0.4)',
                          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
                          color: 'white', fontWeight: '600', fontSize: '15px',
                          cursor: 'pointer', transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.18)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                        }}
                      >
                        View All
                      </button>
                    </Link>
                  </div>
                </Col>

                {/* Image Column */}
                <Col lg={6} className="d-none d-lg-flex justify-content-center align-items-center">
                  <div style={{ position: 'relative' }}>
                    {/* Glow ring behind image */}
                    <div style={{
                      position: 'absolute', inset: '-20px',
                      background: 'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
                      borderRadius: '50%', filter: 'blur(20px)',
                    }} />
                    {/* Floating discount badge */}
                    <div style={{
                      position: 'absolute', top: '-10px', right: '-10px', zIndex: 10,
                      background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                      color: 'white', padding: '10px 16px', borderRadius: '16px',
                      fontWeight: '800', fontSize: '18px', textAlign: 'center',
                      boxShadow: '0 8px 24px rgba(124,58,237,0.5)',
                      animation: 'float 2.5s ease-in-out infinite',
                    }}>
                      {slide.stats[1].val}<br />
                      <span style={{ fontSize: '11px', fontWeight: '600', opacity: 0.9 }}>{slide.stats[1].label}</span>
                    </div>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={{
                        width: '420px', maxWidth: '90%',
                        height: '420px', objectFit: 'cover',
                        borderRadius: '32px',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                        border: '3px solid rgba(255,255,255,0.15)',
                        animation: 'float 3.5s ease-in-out infinite',
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom gradient fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px',
        background: 'linear-gradient(to top, rgba(245,243,255,0.3), transparent)',
        zIndex: 3, pointerEvents: 'none',
      }} />
    </div>
  );
};

export default HeroSlider;
