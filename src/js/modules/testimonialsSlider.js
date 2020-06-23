import Swiper from 'swiper';

const testimonialsSlider = new Swiper('.slider-wrapper', {
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
