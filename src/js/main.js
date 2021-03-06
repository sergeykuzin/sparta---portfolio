import intersectionObserverPolyfill from 'intersection-observer/intersection-observer';
import youtubeVideoPlayer from './modules/youtubeVideoPlayer';
import testimonialsSlider from './modules/testimonialsSlider';
import FeedbackForm from './modules/FeedbackForm';
import lazyLoad from './modules/lazyLoad';

const feedbackForm = new FeedbackForm({
  formOpeningElements: '.open-feedback-form-js',
  feedbackFormWrapper: '.feedback-form',
  closeButton: '.feedback-form__close-button',
  sendButton: '.feedback-form__send-button',
  nameField: '.feedback-form__name',
  phoneField: '.feedback-form__phone',
});
feedbackForm.init();
