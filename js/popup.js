const overlay = document.querySelector('.popup') // Задний план
const profilePopup = document.querySelector('.profilepopup') // Попап для редактирования информации профиля
const photoPopup = document.querySelector('.photopopup') //  Попап для редактирования фотокарточек
const openImagePopup = document.querySelector('.openedimage') // Попап открытой фотографии
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
const photoTemplate = document.querySelector('.elements-template')
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


function render() {
  const html = initialCards
    .map(getEl)
  photoEl.append(...html)
}

function getEl(item) {
  const newEl = photoTemplate.content.cloneNode(true)
  const imgEl = newEl.querySelector('.elements__photo')
  const titleEl = newEl.querySelector('.elements__paragraph')

  imgEl.src = item.link
  imgEl.alt = item.name
  titleEl.textContent = item.name


  const likeButton = newEl.querySelector('.elements__button-like');
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button-like-active')
  }) // Функция лайка


  const removeButton = newEl.querySelector('.elements__button-delete');
  removeButton.addEventListener('click', handleCardDelete); //Функция удаления


  const imageLink = document.querySelector('.popup__image')
  const titleLink = document.querySelector('.popup__phototitle')


  imgEl.addEventListener('click', () => {
    handlePopupOpen(openImagePopup)
    imageLink.src = imgEl.src
    titleLink.textContent = titleEl.textContent
  }) // Открытие изображений


  return newEl;
}

function handleCardDelete(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.card');
  targetItem.remove();
}


const handlePopupOpen = (popupEl) => {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keydown' , closeEsc)
} // Функция открытия попапа
popUpAddButton.addEventListener('click', () => {
  handlePopupOpen(photoPopup);
}) // Открытие попапа по нажатию на клавишу добавить
popUpEditButton.addEventListener('click', () => {
  handlePopupOpen(profilePopup);
  nameInput.value = name.textContent;
  jobInput.value = profession.textContent;
})

const handlePopupClose = (popupEl) => {
  popupEl.classList.remove('popup__opened')
  document.removeEventListener('keydown', closeEsc);
} // Функция закрытия попапа
profileCloseButton.addEventListener('click', () => {
  handlePopupClose(profilePopup)
})
photoCloseButton.addEventListener('click', () => {
  handlePopupClose(photoPopup)
})
openImageCloseButton.addEventListener('click', () => {
  handlePopupClose(openImagePopup)
})


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

  const photoItem = getEl({name: inputTitle, link: inputLink})
  photoEl.prepend(photoItem);

  formPhoto.reset()


  handlePopupClose(photoPopup)

} // Передаем значения из формы добавления фотографий

function closeEsc(evt) {
  if (evt.key === "Escape") {
    handlePopupClose(document.querySelector('.popup__opened'))
  }
} // Закрываем форму по нажатию на клавишу ESC

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    handlePopupClose(evt.target)
  }
}

formElement.addEventListener('submit', submitProfileForm);
formPhoto.addEventListener('submit', submitPhotoAdd);
profilePopup.addEventListener('mousedown' , closeOverlay);
photoPopup.addEventListener('mousedown' , closeOverlay);
openImagePopup.addEventListener('mousedown' , closeOverlay);

render();

