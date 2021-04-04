import './index.css'
import Card from "../js/Card.js";
import {FormValidator} from "../js/FormValidator.js";
import PopupWithImage from "../js/PopupWithImage.js";
import PopupWithForm from "../js/PopupWithForm.js";
import Section from "../js/Section.js";
import UserInfo from "../js/UserInfo.js";
import {validationForms} from "../utils/Constants.js";
import {
  cardTemplate,
  profilePopupSelector,
  profileSelectors,
  photoPopupSelector,
  photoElSelector,
  openImageSelector,
  photoPopup,
  popupImage,
  popupImageTitle,
  popUpEditButton,
  popUpAddButton,
  photoCloseButton,
  formElement,
  formPhoto,
  nameInput,
  jobInput,
  photoNameInput,
  photoLinkInput,
  photoEl,
  initialCards
} from "../utils/Constants.js"
import {info} from "autoprefixer";

const profilePopupEdit = new PopupWithForm(profilePopupSelector, (info) => userInfo.setUserInfo(info)
);
profilePopupEdit.setEventListeners()


const photoPopupAdd = new PopupWithForm(photoPopupSelector, (info) => {
  const newPhoto = createCard(info)

  cardList.addPhoto(newPhoto)
});
photoPopupAdd.setEventListeners()

const popupWithImage = new PopupWithImage(openImageSelector, popupImage, popupImageTitle)
popupWithImage.setEventListeners()


const profileValidation = new FormValidator(validationForms, formElement) // Включаем валидацию формы профиля
const photoValidation = new FormValidator(validationForms, formPhoto) // Включаем валидацию формы добавления фотографии

function createCard(item) {
  const newCard = new Card(item, cardTemplate, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    }
  })

  const newUserCard = newCard.generateCard();
  console.log(item)
  return newUserCard;
} // Функция создания карточек

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const newCard = createCard(cardItem)
    cardList.addItem(newCard);
  }

}, photoElSelector); // Отрисовка карточек при загрузке страницы
cardList.renderItems();


popUpAddButton.addEventListener('click', () => {
  photoPopupAdd.open()
  photoValidation.clearValidation();
}) // Открытие попапа по нажатию на клавишу добавить

const userInfo = new UserInfo(profileSelectors)
popUpEditButton.addEventListener('click', () => {
  profilePopupEdit.open();
  const currentInfo = userInfo.getUserInfo()
  nameInput.value = currentInfo.name
  jobInput.value = currentInfo.profession
  profileValidation.clearValidation();
}) // Открытие попапа реадктирования профиля


photoValidation.enableValidation();
profileValidation.enableValidation();



