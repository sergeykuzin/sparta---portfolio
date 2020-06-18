import YoutubeVideoPlayer from './modules/YoutubeVideoPlayer';
import TestimonialsSlider from './modules/TestimonialsSlider';
import FeedbackForm from './modules/FeedbackForm';
import SendFeedback from './modules/SendFeedback';

const feedbackForm = new FeedbackForm('#feedback-form');
feedbackForm.init();

const sendFeedback = new SendFeedback({
  fieldPhone: document.querySelector('.have-questions__phone'),
  fieldName: document.querySelector('.have-questions__name'),
  sendButton: document.querySelector('.have-questions__send-button'),
});
sendFeedback.init();
