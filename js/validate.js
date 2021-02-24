const validationForms = {
  formSelector: '.popup__input',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'popup__field-invalid',
  errorClass: 'popup__error'
};


const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
}
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(errorClass)
  errorElement.classList.remove(inputErrorClass)
  errorElement.textContent = ""
}



const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  }else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}


const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass)
    buttonElement.setAttribute('disabled', true);
  }else {
    buttonElement.classList.remove(inactiveButtonClass)
    buttonElement.removeAttribute('disabled');
  }
}




const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector)



  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input",() => {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass)
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    })

  })
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
}


const enableValidation = ({
                            formSelector,
                            inputSelector,
                            submitButtonSelector,
                            inactiveButtonClass,
                            inputErrorClass,
                            errorClass
                          }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
  });
}

enableValidation(validationForms);
