import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

const overlay = document.querySelectorAll('.popup') // Задний план
const profilePopup = document.querySelector('.profile-popup') // Попап для редактирования информации профиля
const photoPopup = document.querySelector('.photo-popup') //  Попап для редактирования фотокарточек
const openImagePopup = document.querySelector('.opened-image') // Попап открытой фотографии
const popUpEditButton = document.querySelector('.profile__button-edit') // Клавиша редактирования профиля
const popUpAddButton = document.querySelector('.profile__button-add') // Клавиша добавления фотографии
const profileCloseButton = profilePopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в профиле
const photoCloseButton = photoPopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в фото
const openImageCloseButton = openImagePopup.querySelector('.popup__button-close') // Клавиша закрытия открытой фотографии
const name = document.querySelector('.profile__name') // Ищем имя профиля на странице
const profession = document.querySelector('.profile__profession') // Ищем профессию профился на странице
const formElement = profilePopup.querySelector('.popup__input')// Форма для ввода информации о профиле
const formPhoto = photoPopup.querySelector('.popup__input') // Форма для сохранения фотографий
const nameInput = document.querySelector('.popup__field_name') // Строка для ввода имени профиля
const jobInput = document.querySelector('.popup__field_profession')// Строка для ввода професии профиля
const photoNameInput = photoPopup.querySelector('.popup__field') //
const photoLinkInput = photoPopup.querySelector('.popup__field_link') //
const photoEl = document.querySelector('.elements') // Секция фотокарточек
//const errorInput = document.querySelector('.photo__input')
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
const validationForms = {
  formSelector: '.popup__input',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__field-invalid',
  errorClass: 'popup__error'
};


initialCards.forEach((item) => {
  //const card = new Card(item, '.elements-template' );
  //const cardElement = card.generateCard();
  photoEl.append(createCard(item));
})

const handlePopupOpen = (popupEl) => {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keydown' , closeEsc)
} // Функция открытия попапа
popUpAddButton.addEventListener('click', () => {
  handlePopupOpen(photoPopup);

  photoValidation.clearValidation();
}) // Открытие попапа по нажатию на клавишу добавить
popUpEditButton.addEventListener('click', () => {
  handlePopupOpen(profilePopup);
  nameInput.value = name.textContent;
  jobInput.value = profession.textContent;

  profileValidation.clearValidation();
})

const handlePopupClose = (popupEl) => {
  popupEl.classList.remove('popup__opened')
  document.removeEventListener('keydown', closeEsc);

} // Функция закрытия попапа
profileCloseButton.addEventListener('click', () => {
  handlePopupClose(profilePopup)
}) //Закрытие попапа с редактированием профиля
photoCloseButton.addEventListener('click', () => {
  handlePopupClose(photoPopup)
  formPhoto.reset()
})
openImageCloseButton.addEventListener('click', () => {
  handlePopupClose(openImagePopup)
})
const profileValidation = new FormValidator(validationForms, formElement)
const photoValidation = new FormValidator(validationForms, formPhoto)


function submitProfileForm(evt) {
  evt.preventDefault()
  name.textContent = (nameInput.value)
  profession.textContent = (jobInput.value)
  handlePopupClose(profilePopup)
} // Передаем значения из формы на страницу
function submitPhotoAdd(evt) {
  evt.preventDefault()

  const inputTitle = photoNameInput.value;
  const inputLink = photoLinkInput.value;

  //const newCard = new Card({name: inputTitle, link: inputLink}, '.elements-template')
  //const newUserCard = newCard.generateCard();
  const photoItem = ({name: inputTitle, link: inputLink})
  photoEl.prepend(createCard(photoItem));


  // photoEl.prepend(photoItem);

  formPhoto.reset()


  handlePopupClose(photoPopup)

} // Передаем значения из формы добавления фотографий
function createCard(item) {
  const newCard = new Card(item, '.elements-template')
  const newUserCard = newCard.generateCard();
  return newUserCard;
} // Функция создания карточек

function closeEsc(evt) {
  if (evt.key === "Escape") {
    handlePopupClose(document.querySelector('.popup__opened'))
  }
} // Закрываем форму по нажатию на клавишу ESC


overlay.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup__opened')) {
      handlePopupClose(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      handlePopupClose(popup)
    }
  })
}) // Закрываем попап по overlay

formElement.addEventListener('submit', submitProfileForm);
formPhoto.addEventListener('submit', submitPhotoAdd);

photoValidation.enableValidation();
profileValidation.enableValidation();
