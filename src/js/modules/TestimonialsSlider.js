import Swiper from 'swiper';

class TestimonialsSlider {
  constructor(swiperContainer) {
    this.swiperContainer = swiperContainer;
    this.sliderInstance = null;
  }

  init() {
    this.sliderInstance = new Swiper(this.swiperContainer, {
      loop: true,
      centeredSlides: true,
      roundLengths: true,

      navigation: {
        nextEl: '.testimonials__pagination-right',
        prevEl: '.testimonials__pagination-left',
      },

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }
}

export default TestimonialsSlider;
