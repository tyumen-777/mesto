import './index.css'
import Card from "../js/Card.js";
import Api from "../js/Api.js"
import {FormValidator} from "../js/FormValidator.js";
import PopupWithImage from "../js/PopupWithImage.js";
import PopupWithForm from "../js/PopupWithForm.js";
import PopupWithSubmit from "../js/PopupWithSubmit.js";
import Section from "../js/Section.js";
import UserInfo from "../js/UserInfo.js";
import {validationForms} from "../utils/Constants.js";
import {
  popupDeleteConfirm,
  userId,
  profileAvatarInput,
  profileAvatar,
  name,
  profession,
  formAvatar,
  updateAvatarPopupSelector,
  updateAvatarPopup,
  updateImageButton,
  updateImageButtonSelector,
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

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: 'ed089852-ab21-42a0-b909-11eeabdb931a',
})

api.getUserInfo().then((data => {
  name.textContent = data.name
  profession.textContent = data.about;
  profileAvatar.src = data.avatar;
})) // Получаем данные пользователя с сервера


const profilePopupEdit = new PopupWithForm(profilePopupSelector, (info) => {
  profilePopupEdit.renderLoading(true)
  api.editUserInfo(info.name, info.profession)
    .finally(() => {
      userInfo.setUserInfo(info)
      profilePopupEdit.renderLoading(false)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
});
profilePopupEdit.setEventListeners() // Попапа редактирования информации о пользователе


const photoPopupAdd = new PopupWithForm(photoPopupSelector, (info) => {
  photoPopupAdd.renderLoading(true)
  api.addCard(info.name, info.link)
    .then(info => {
      const newPhoto = createCard(info)
      cardList.addPhoto(newPhoto)
      photoPopupAdd.renderLoading(false)
    }).catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
});
photoPopupAdd.setEventListeners() // Попап добавления фотографии

const popupWithImage = new PopupWithImage(openImageSelector, popupImage, popupImageTitle)
popupWithImage.setEventListeners() // Попап открытой фотографии

const popUpEditAvatar = new PopupWithForm(updateAvatarPopupSelector, () => {
  popUpEditAvatar.renderLoading(true)
  profileAvatar.src = profileAvatarInput.value

  api.editUserAvatar(profileAvatarInput.value)
    .finally(() => {
      popUpEditAvatar.renderLoading(false)
    }).catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

});
popUpEditAvatar.setEventListeners(); // Попап редактирования аватара

const popUpDeleteConfirm = new PopupWithSubmit(popupDeleteConfirm, (evt, card) => {
  deleteConfirm(evt, card)
})
popUpDeleteConfirm.setEventListeners()

const profileValidation = new FormValidator(validationForms, formElement) // Включаем валидацию формы профиля
const photoValidation = new FormValidator(validationForms, formPhoto) // Включаем валидацию формы добавления фотографии
const avatarUpdateValidation = new FormValidator(validationForms, formAvatar) // Включаем валидацию формы обновления аватара

api.getInitialCards().then((item) => {
  cardList.renderItems(item)
}) // Получение карточек с сервера

function createCard(item) {
  const newCard = new Card(item, cardTemplate, {
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link)
    }, likeCardHandler: () => {
      const likedCard = newCard.likedCard();
      const resultApi = likedCard ? api.dislikeCard(newCard.getIdCard()) : api.likeCard(newCard.getIdCard());

      resultApi.then(data => {
        newCard.setLikes(data.likes);
        newCard.renderLikes()

      }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
    }, deleteCardHandler: () => {
      popUpDeleteConfirm.open(newCard)

    }
  }, userId, item._id)


  const newUserCard = newCard.generateCard();
  return newUserCard;
} // Генерация изначальных карточек


const cardList = new Section({
  renderer: (cardItem) => {
    const newCard = createCard(cardItem)
    cardList.addItem(newCard);
  }
}, photoElSelector); // Отрисовка карточек при загрузке страницы


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

const deleteConfirm = (evt, newCard) => {
  evt.preventDefault();
  api.removeCard(newCard.getIdCard())
    .then(response => {
      newCard.removeCard()
    }).finally(() => {
    popUpDeleteConfirm.close()
  }).catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
}


updateImageButton.addEventListener('click', () => {
  popUpEditAvatar.open()
  avatarUpdateValidation.clearValidation()
})

photoValidation.enableValidation();
profileValidation.enableValidation();
avatarUpdateValidation.enableValidation()


