class SendFeedback {
  constructor(params) {
    this.fieldName = params.fieldName;
    this.fieldPhone = params.fieldPhone;
    this.sendButton = params.sendButton;
  }

  init() {
    this.addEventListener();
  }

  addEventListener() {
    this.sendButton.addEventListener('click', this.send.bind(this));
  }

  send(event) {
    event.preventDefault();
    if (this.isCorrectlyEnteredData()) {
      window.alert('Отправлено');
      this.clearInputFields();
      return;
    }
    window.alert('Введите контактную информацию');
  }

  isCorrectlyEnteredData() {
    return this.fieldName.value.trim() && this.fieldPhone.value.trim();
  }

  clearInputFields() {
    this.fieldName.value = '';
    this.fieldPhone.value = '';
  }
}

export default SendFeedback;
