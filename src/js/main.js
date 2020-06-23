import intersectionObserverPolyfill from 'intersection-observer/intersection-observer';
import YoutubeVideoPlayer from './modules/YoutubeVideoPlayer';
import testimonialsSlider from './modules/testimonialsSlider';
import FeedbackForm from './modules/FeedbackForm';
import LazyLoad from './modules/LazyLoad';

const feedbackForm = new FeedbackForm({
  formOpeningElements: '.open-feedback-form-js',
  feedbackFormWrapper: '.feedback-form',
  closeButton: '.feedback-form__close-button',
  sendButton: '.feedback-form__send-button',
  nameField: '.feedback-form__name',
  phoneField: '.feedback-form__phone',
});
feedbackForm.init();
