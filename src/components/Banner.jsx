import React from 'react';
import ac from '../assets/assasins creed 3.jpg';
import cod from '../assets/COD mw3.jpg';
import farCry from '../assets/far cry 3.jpg';
import resEvil from '../assets/Resident evil 4.jpg';
import wolf from '../assets/wolfenstein.jpg';
// Import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const Banner = () => {
  return (
    <div className='h-full flex justify-center items-center '>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow]}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3} // Show 3 slides at the same time
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        navigation
        loop={true} // Enable infinite looping
        autoplay={{ delay: 3000 }} // Autoplay with 3-second delay
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        style={{ maxWidth: '1000px', maxHeight: '600px' }} // Limit the Swiper size to match your images
      >
        <SwiperSlide>
          <img src={ac} alt="Assassin's Creed 3" className='slide-img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={cod} alt="Call of Duty MW3" className='slide-img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={resEvil} alt="Resident Evil 4" className='slide-img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={wolf} alt="Wolfenstein" className='slide-img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={farCry} alt="Far Cry 3" className='slide-img' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
