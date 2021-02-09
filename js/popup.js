const overlay = document.querySelector('.popup')
const profilePopup = document.querySelector('.profilepopup') // Попап для редактирования информации профиля
const photoPopup = document.querySelector('.photopopup') //  Попап для редактирования фотокарточек
const popUpEditButton = document.querySelector('.profile__button-edit') // Клавиша редактирования профиля
const popUpAddButton = document.querySelector('.profile__button-add') // Клавиша добавления фотографии
const profileCloseButton = profilePopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в профиле
const photoCloseButton = photoPopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в фото
const name = document.querySelector('.profile__name') // Ищем имя профиля на странице
const profession = document.querySelector('.profile__profession') // Ищем профессию профился на странице
const formElement = profilePopup.querySelector('.popup__input')// Форма для ввода информации о профиле
const nameInput = document.querySelector('.popup__field_name') // Строка для ввода имени профиля
const jobInput = document.querySelector('.popup__field_profession')// Строка для ввода професии профиля
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const openPopup = (popupEl) => {
  popupEl.classList.add('popup__opened');
} // Функция открытия попапа
popUpAddButton.addEventListener('click', () => {
  openPopup(photoPopup);
}) // Открытие попапа по нажатию на клавишу добавить
popUpEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = name.textContent;
  jobInput.value = profession.textContent;
}) // Открытие попапа по нажатию на клавишу редактировать

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup__opened')
} // Функция закрытия попапа
profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup)
})
photoCloseButton.addEventListener('click', () => {
  closePopup(photoPopup)
})

function submitProfileForm(evt) {
  evt.preventDefault()
  name.textContent = (nameInput.value)
  profession.textContent = (jobInput.value)
  closePopup(profilePopup)
} // Передаем значения из формы на страницу

formElement.addEventListener('submit', submitProfileForm);
