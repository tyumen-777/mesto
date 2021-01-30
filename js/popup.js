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

}

function closePopup(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup(evt)
  }

}
function openPopup() {
  overlay.classList.add('popup__opened')
  nameInput.value = (name.textContent)
  jobInput.value = (profession.textContent)
}


function formSubmitHandler(evt) {
  evt.preventDefault()
  name.textContent = (nameInput.value)
  profession.textContent = (jobInput.value)
  closePopup(evt)
}

formElement.addEventListener('submit', formSubmitHandler);
popUpOpenButton.addEventListener('click', openPopup)
popUpCloseButton.addEventListener('click', closePopup)
overlay.addEventListener('click', closePopup)

