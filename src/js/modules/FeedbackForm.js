class FeedbackForm {
  constructor(params) {
    this.formOpeningElements = document.querySelectorAll(params.formOpeningElements);
    this.feedbackFormWrapper = document.querySelector(params.feedbackFormWrapper);
    this.closeButton = document.querySelector(params.closeButton);
    this.sendButton = document.querySelector(params.sendButton);
    this.nameField = document.querySelector(params.nameField);
    this.phoneField = document.querySelector(params.phoneField);
  }

  init() {
    this.addEventListener();
  }

  addEventListener() {
    this.formOpeningElements.forEach((domElement) => {
      domElement.addEventListener('click', this.open.bind(this));
    });

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.feedbackFormWrapper.addEventListener('click', this.onClick.bind(this));
    this.sendButton.addEventListener('click', this.send.bind(this));
  }

  open() {
    this.feedbackFormWrapper.style.display = 'flex';
  }

  close() {
    this.feedbackFormWrapper.style.display = 'none';
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

export default FeedbackForm;
