const overlay = document.querySelector('.popup')
const popUpOpenButton = document.querySelector('.buttons-edit')
const popUpCloseButton = document.querySelector('.buttons-close')
const name = document.querySelector('.profile__name')
const profession = document.querySelector('.profile__profession')
const formElement = document.querySelector('.popup__input')// Воспользуйтесь методом querySelector()
const nameInput = document.querySelector('.popup__field_name') // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__field_profession')// Воспользуйтесь инструментом .querySelector()
function togglePopup(evt) {
  evt.preventDefault()
  overlay.classList.toggle('popup__opened')
  nameInput.value = (name.textContent)
  jobInput.value = (profession.textContent)
}

function closePopup(evt) {
  if (evt.target === evt.currentTarget) {

    togglePopup(evt)
  } 

}
popUpOpenButton.addEventListener('click', togglePopup)
popUpCloseButton.addEventListener('click', togglePopup)
overlay.addEventListener('click', closePopup)




function formSubmitHandler(evt) {
  evt.preventDefault() // Эта строчка отменяет стандартную отправку формы.


  name.textContent = (nameInput.value)
  profession.textContent = (jobInput.value)
  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

