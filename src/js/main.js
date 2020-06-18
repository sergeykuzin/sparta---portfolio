/*
 * Youtub api
 */
const onLoadWindow = () => {
  const playButton = document.querySelector('.video-player__play-button');
  let player = null;

  player = new YT.Player('player', {
    videoId: 'NR2pM95f8Rw',
  });

  const videoPlayer = document.querySelector('.video-player-wrapper');

  videoPlayer.addEventListener('click', () => {
    document.querySelector('.video-player-wrapper #player').style.display = 'block';
    playButton.style.display = 'none';
    player.playVideo();
  });
};

window.addEventListener('load', onLoadWindow);

/*
 * Slider
 */

const reviewTextWrapper = document.querySelector('.testimonials__item-reviewer-text');
const reviewTextButton = document.querySelector('.testimonials__toggle-text');

reviewTextButton.addEventListener('click', () => {
  if (!reviewTextWrapper.style.overflow || reviewTextWrapper.style.overflow === 'hidden') {
    reviewTextWrapper.style.overflow = 'auto';
  } else {
    reviewTextWrapper.style.overflow = 'hidden';
  }
});

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

/*
 * feedbakc-form
 *
 * */

class FeedbackForm {
  constructor(cssSelector) {
    this.domElementsCausingForm = document.querySelectorAll(cssSelector);
    this.domReference = document.querySelector('.feedback-form');
    this.closeButton = document.querySelector('.feedback-form__close-button');
    this.sendButton = document.querySelector('.feedback-form button[type="submit"]');
    this.nameField = document.querySelector('.feedback-form input[name="name"]');
    this.phoneField = document.querySelector('.feedback-form input[name="phone"]');
  }

  init() {
    this.addEventListener();
  }

  addEventListener() {
    this.domElementsCausingForm.forEach((domElement) => {
      domElement.addEventListener('click', this.open.bind(this));
    });

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.domReference.addEventListener('click', this.onClick.bind(this));
    this.sendButton.addEventListener('click', this.send.bind(this));
  }

  open() {
    this.domReference.style.display = 'flex';
  }

  close() {
    this.domReference.style.display = 'none';
  }

  send(event) {
    event.preventDefault();
    if (this.isCorrectlyEnteredData()) {
      window.alert('Отправлено');
      this.clearInputFields();
      this.close();
      return;
    }
    window.alert('Введите контактную информацию');
  }

  isCorrectlyEnteredData() {
    return this.nameField.value.trim() && this.phoneField.value.trim();
  }

  clearInputFields() {
    this.nameField.value = '';
    this.phoneField.value = '';
  }

  onClick({ target }) {
    if (target.classList.contains('feedback-form')) this.close();
  }
}

const feedbackForm = new FeedbackForm('#feedback-form');
feedbackForm.init();
