import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import brands from "../../data/brands";
import "./BrandSlider.css";

const BrandSlider = () => {
  return (
    <div className="d_brand_slider">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{ delay: 2200, disableOnInteraction: false }}
        loop
        breakpoints={{
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
          1200: { slidesPerView: 6 },
        }} 
        className=" container"
      >
        {brands.map((b) => (
          <SwiperSlide key={b.id}>
            <div className="d_brand_logo_card">
              <img src={b.logo} alt={b.name} loading="lazy" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrandSlider;
