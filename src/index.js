import './pages/index.css'
import Card from "./js/Card.js";
import {FormValidator} from "./js/FormValidator.js";
import PopupWithImage from "./js/PopupWithImage.js";
import PopupWithForm from "./js/PopupWithForm.js";
import Section from "./js/Section.js";
import UserInfo from "./js/UserInfo.js";
import {validationForms} from "./js/Constants.js";
import {
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
} from "./js/Constants.js"


const profilePopupEdit = new PopupWithForm(profilePopupSelector, submitProfileForm);
profilePopupEdit.setEventListeners()


const popupWithImage = new PopupWithImage(openImageSelector, popupImage, popupImageTitle)
popupWithImage.setEventListeners()


const photoPopupAdd = new PopupWithForm(photoPopupSelector, submitPhotoAdd);
photoPopupAdd.setEventListeners()

const profileValidation = new FormValidator(validationForms, formElement) // Включаем валидацию формы профиля
const photoValidation = new FormValidator(validationForms, formPhoto) // Включаем валидацию формы добавления фотографии

const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const newCard = new Card(cardItem, '.elements-template', {
      handleCardClick: (name, link) => {
        popupWithImage.openPopup(name, link)
      }
    });
    const cardElement = newCard.generateCard();
    cardList.addItem(cardElement);
  }
}, photoElSelector); // Отрисовка карточек при загрузке страницы
cardList.renderItems();


popUpAddButton.addEventListener('click', () => {
  photoPopupAdd.openPopup()
  photoValidation.clearValidation();
}) // Открытие попапа по нажатию на клавишу добавить

const userInfo = new UserInfo(profileSelectors)
popUpEditButton.addEventListener('click', () => {
  profilePopupEdit.openPopup();
  const currentInfo = userInfo.getUserInfo()
  nameInput.value = currentInfo.name
  jobInput.value = currentInfo.profession
  profileValidation.clearValidation();
}) // Открытие попапа реадктирования профиля

const handlePopupClose = (popupEl) => {
  popupEl.classList.remove('popup__opened')
  document.removeEventListener('keydown', closeEsc);

} // Функция закрытия попапа

photoCloseButton.addEventListener('click', () => {
  handlePopupClose(photoPopup)
  formPhoto.reset()
})

function submitProfileForm() {

  const info = {
    name: nameInput.value,
    profession: jobInput.value
  }
  userInfo.setUserInfo(info)

  profilePopupEdit.closePopup()
} // Передаем значения из формы на страницу
function submitPhotoAdd() {

  const inputTitle = photoNameInput.value;
  const inputLink = photoLinkInput.value;

  const photoItem = ({name: inputTitle, link: inputLink})
  photoEl.prepend(createCard(photoItem));

  formPhoto.reset()
  photoPopupAdd.closePopup()
} // Передаем значения из формы добавления фотографий


function createCard(item) {
  const newCard = new Card(item, '.elements-template', {
    handleCardClick: (name, link) => {
      popupWithImage.openPopup(name, link)
    }
  })
  const newUserCard = newCard.generateCard();
  return newUserCard;
} // Функция создания карточек

function closeEsc(evt) {
  if (evt.key === "Escape") {
    handlePopupClose(document.querySelector('.popup__opened'))
  }
} // Закрываем форму по нажатию на клавишу ESC


formElement.addEventListener('submit', submitProfileForm);

photoValidation.enableValidation();
profileValidation.enableValidation();



