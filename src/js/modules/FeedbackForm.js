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

export default FeedbackForm;
