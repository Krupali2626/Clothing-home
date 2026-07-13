import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const BrandSlider = ({ brands }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={5}
      spaceBetween={30}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      loop
      breakpoints={{
        320: { slidesPerView: 2 },
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 }
      }}
    >
      {brands.map(brand => (
        <SwiperSlide key={brand.id}>
          <div className="d_card text-center p-4" style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={brand.logo}
              alt={brand.name}
              style={{ maxHeight: '60px', maxWidth: '100%', filter: 'grayscale(100%)', transition: 'filter 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
              onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BrandSlider;
