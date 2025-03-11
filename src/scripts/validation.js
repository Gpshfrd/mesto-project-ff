export function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach(form => {
    setEventListeners(form, validationConfig)
  })
}

function setEventListeners(form, validationConfig) {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const submitButton = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, submitButton, validationConfig);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputs, submitButton, validationConfig);
    })
  })
}

function isValid(form, input, validationConfig) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

function toggleButtonState(inputs, button, validationConfig) {
  const hasInvalidInput = inputs.some((input) => {return !input.validity.valid});

  if (hasInvalidInput) {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(validationConfig.inactiveButtonClass);
  }
}

function showInputError(form, input, validationConfig) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = input.validationMessage;
  if (input.validationMessage == "undefined") {
    error.textContent = input.dataset.error_message;
  }
  error.classList.add(validationConfig.errorClass);
  input.classList.add(validationConfig.inputErrorClass);
}

function hideInputError(form, input, validationConfig) {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  error.classList.remove(validationConfig.errorClass);
  input.classList.remove(validationConfig.inputErrorClass);
}

export function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const button = form.querySelector(validationConfig.submitButtonSelector);

  inputs.forEach((input) => {
    hideInputError(form, input, validationConfig);
  });

  button.disabled = true;
  button.classList.add(validationConfig.inactiveButtonClass);
}
