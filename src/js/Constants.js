export const validationForms = {
  formSelector: '.popup__input',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__field-invalid',
  errorClass: 'popup__error'
};
const profileSelectors = {
  profileName: '.profile__name',
  profileProfession: '.profile__profession'
}
const overlay = document.querySelectorAll('.popup') // Задний план
const profilePopup = document.querySelector('.profile-popup') // Попап для редактирования информации профиля
const profilePopupSelector = '.profile-popup';
const photoPopup = document.querySelector('.photo-popup') //  Попап для редактирования фотокарточек
const photoPopupSelector = '.photo-popup'
const openImagePopup = document.querySelector('.opened-image') // Попап открытой фотографии
const openImageSelector = '.opened-image'
const popupImage = '.popup__image'
const popupImageTitle = '.popup__phototitle'
const popupButtonClose = '.popup__button-close'
const popUpEditButton = document.querySelector('.profile__button-edit') // Клавиша редактирования профиля
const popUpEditButtonSelector = '.profile__button-edit'
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
const photoElSelector = '.elements'
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

export {
  profilePopupSelector,
  profileSelectors,
  popUpEditButtonSelector,
  photoPopupSelector,
  popupButtonClose,
  photoElSelector,
  openImageSelector,
  overlay,
  profilePopup,
  photoPopup,
  openImagePopup,
  popupImage,
  popupImageTitle,
  popUpEditButton,
  popUpAddButton,
  profileCloseButton,
  photoCloseButton,
  openImageCloseButton,
  name,
  profession,
  formElement,
  formPhoto,
  nameInput,
  jobInput,
  photoNameInput,
  photoLinkInput,
  photoEl,
  initialCards
}
