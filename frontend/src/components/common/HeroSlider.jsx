import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import "./HeroSlider.css";

const slides = [
  {
    id: 1,
    eyebrow: "New Season",
    title: "Elevate Your Everyday Style",
    subtitle: "Fresh drops across men's, women's & kids fashion",
    cta: "Shop Clothing",
    link: "/clothing",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop&auto=format",
    accent: "#F97316",
  },
  {
    id: 2,
    eyebrow: "Flash Sale · Ends Soon",
    title: "Up to 50% Off Home Appliances",
    subtitle: "Refrigerators, ACs, TVs and more at unbeatable prices",
    cta: "Shop Appliances",
    link: "/appliances",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&h=600&fit=crop&auto=format",
    accent: "#eb5325",
  },
  {
    id: 3,
    eyebrow: "Winter Edit",
    title: "Layer Up in Premium Comfort",
    subtitle: "Jackets, sweaters & boots built for the cold",
    cta: "Explore Winter Wear",
    link: "/clothing?category=winter-wear",
    image: "https://images.unsplash.com/photo-1520975867021-76d17493b3f0?w=1400&h=600&fit=crop&auto=format",
    accent: "#22C55E",
  },
  {
    id: 4,
    eyebrow: "Kitchen Refresh",
    title: "Smart Kitchen, Simplified Living",
    subtitle: "Mixers, purifiers & cooktops for the modern home",
    cta: "Shop Kitchen",
    link: "/appliances?category=kitchen",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1400&h=600&fit=crop&auto=format",
    accent: "#F97316",
  },
  {
    id: 5,
    eyebrow: "Member Exclusive",
    title: "Free Shipping on Every Order",
    subtitle: "No minimums this week — new members save an extra 10%",
    cta: "Start Shopping",
    link: "/clothing",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&h=600&fit=crop&auto=format",
    accent: "#eb5325",
  },
];

const HeroSlider = () => {
  return (
    <div className="d_hero_slider">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="d_hero_swiper container"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div
              className="d_hero_slide"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d_hero_slide_overlay" />
              <div className="d_hero_slide_content">
                <span className="d_hero_eyebrow" style={{ color: s.accent }}>
                  {s.eyebrow}
                </span>
                <h1 className="d_hero_title">{s.title}</h1>
                <p className="d_hero_subtitle">{s.subtitle}</p>
                <Link
                  to={s.link}
                  className="d_btn_primary d_hero_cta"
                  style={{
                    background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                  }}
                >
                  {s.cta} <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
