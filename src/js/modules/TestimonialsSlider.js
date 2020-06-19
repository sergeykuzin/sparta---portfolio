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

const reviewTextWrapper = document.querySelector('.testimonials__item-reviewer-text');
const reviewTextButton = document.querySelector('.testimonials__toggle-text');

reviewTextButton.addEventListener('click', () => {
  if (!reviewTextWrapper.style.overflow || reviewTextWrapper.style.overflow === 'hidden') {
    reviewTextWrapper.style.overflow = 'auto';
  } else {
    reviewTextWrapper.style.overflow = 'hidden';
  }
});

/*
const nextSlideButton = document.querySelector('.testimonials__pagination-right');
const prevSlideButton = document.querySelector('.testimonials__pagination-left');
const slides = document.querySelectorAll('.testimonials__item');
const slidesWrapper = document.querySelector('.testimonials__list');
const dots = document.querySelectorAll('.testimonials__pagination-dot');

const moveSlides = () => {
  const slideWidth = slidesWrapper.offsetWidth;
  slides.forEach((slide, index) => {
    if (slide.dataset.slideActive === 'true') {
      const activeSlideIndex = index;
      const slideMove = slideWidth * activeSlideIndex;
      slidesWrapper.style.transform = `translateX(-${slideMove}px)`;
    }
  });
};

const moveDots = () => {
  let activeSlideIndex = null;

  slides.forEach((slide, index) => {
    if (slide.dataset.slideActive === 'true') {
      activeSlideIndex = index;
    }
  });

  dots.forEach((dot) => {
    if (dot.dataset.dotActive === 'true') {
      dot.dataset.dotActive = 'false';
      dot.classList.remove('testimonials__pagination-dot--active');
      dots[activeSlideIndex].dataset.dotActive = 'true';
      dots[activeSlideIndex].classList.add('testimonials__pagination-dot--active');
    }
  });
};

const onClickNextSlideButton = () => {
  let isSkipIteration = false;

  slides.forEach((slide, index) => {
    if (isSkipIteration) {
      return;
    }
    if (slide.dataset.slideActive === 'true') {
      slide.dataset.slideActive = 'false';

      if (index === slides.length - 1) {
        slides[0].dataset.slideActive = 'true';
        isSkipIteration = true;
        return;
      }

      slide.nextElementSibling.dataset.slideActive = 'true';
      isSkipIteration = true;
    }
  });

  moveSlides();
  moveDots();
};

const onClickPrevSlideButton = () => {
  let isSkipIteration = false;

  slides.forEach((slide, index) => {
    if (isSkipIteration) {
      return;
    }
    if (slide.dataset.slideActive === 'true') {
      slide.dataset.slideActive = 'false';

      if (index === 0) {
        slides[slides.length - 1].dataset.slideActive = 'true';
        isSkipIteration = true;
        return;
      }

      slide.previousElementSibling.dataset.slideActive = 'true';
      isSkipIteration = true;
    }
  });

  moveSlides();
  moveDots();
};

nextSlideButton.addEventListener('click', onClickNextSlideButton);
prevSlideButton.addEventListener('click', onClickPrevSlideButton);
*/
