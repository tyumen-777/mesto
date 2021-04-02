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


const profilePopupEdit = new PopupWithForm(profilePopupSelector, submitProfileForm);
profilePopupEdit.setEventListeners()


const popupWithImage = new PopupWithImage(openImageSelector, popupImage, popupImageTitle)
popupWithImage.setEventListeners()


const photoPopupAdd = new PopupWithForm(photoPopupSelector, submitPhotoAdd);
photoPopupAdd.setEventListeners()

const profileValidation = new FormValidator(validationForms, formElement) // Включаем валидацию формы профиля
const photoValidation = new FormValidator(validationForms, formPhoto) // Включаем валидацию формы добавления фотографии

function createCard(item) {
  const newCard = new Card(item, cardTemplate, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    }
  })
  const newUserCard = newCard.generateCard();
  return newUserCard;
} // Функция создания карточек

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const newCard =  createCard(cardItem)

    cardList.addItem(newCard);

  }
  //   const newCard = new Card(cardItem, cardTemplate, {
  //     handleCardClick: (name, link) => {
  //       popupWithImage.open(name, link)
  //     }
  //   });
  //   const cardElement = newCard.generateCard();
  //   cardList.addItem(cardElement);
  // }
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



function submitProfileForm() {

  const info = {
    name: nameInput.value,
    profession: jobInput.value
  }
  userInfo.setUserInfo(info)

  profilePopupEdit.close()
} // Передаем значения из формы на страницу
function submitPhotoAdd() {

  const inputTitle = photoNameInput.value;
  const inputLink = photoLinkInput.value;

  const photoItem = ({name: inputTitle, link: inputLink})
  photoEl.prepend(createCard(photoItem));

  formPhoto.reset()
  photoPopupAdd.close()
} // Передаем значения из формы добавления фотографий






formElement.addEventListener('submit', submitProfileForm);

photoValidation.enableValidation();
profileValidation.enableValidation();



