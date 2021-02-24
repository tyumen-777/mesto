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
const photoNameInput = photoPopup.querySelector('.popup__field_title') //
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


  const buttonLike = newEl.querySelector('.elements__button-like');
  buttonLike.addEventListener('click', (evt) => {
    evt.target.classList.toggle('elements__button-like-active')
  }) // Функция лайка


  const removeButton = newEl.querySelector('.elements__button-delete');
  removeButton.addEventListener('click', buttonDelete); //Функция удаления


  const imageLink = document.querySelector('.popup__image')
  const titleLink = document.querySelector('.popup__phototitle')


  imgEl.addEventListener('click', () => {
    openPopup(openImagePopup)
    imageLink.src = imgEl.src
    titleLink.textContent = titleEl.textContent
  })


  return newEl;
}



function buttonDelete(event) {
  const targetEl = event.target;
  const targetItem = targetEl.closest('.card');
  targetItem.remove();
}


const openPopup = (popupEl) => {
  popupEl.classList.add('popup__opened');
  document.addEventListener('keydown' , closeEsc)
} // Функция открытия попапа
popUpAddButton.addEventListener('click', () => {
  openPopup(photoPopup);
}) // Открытие попапа по нажатию на клавишу добавить
popUpEditButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = name.textContent;
  jobInput.value = profession.textContent;
}) // Открытие попапа по нажатию на клавишу редактировать
// openPhoto.addEventListener('click' , () => {
//   openPopup(openImagePopup)
// })

const closePopup = (popupEl) => {
  popupEl.classList.remove('popup__opened')
  document.removeEventListener('keydown', closeEsc);
} // Функция закрытия попапа
profileCloseButton.addEventListener('click', () => {
  closePopup(profilePopup)
})
photoCloseButton.addEventListener('click', () => {
  closePopup(photoPopup)
})
openImageCloseButton.addEventListener('click', () => {
  closePopup(openImagePopup)
})


function submitProfileForm(evt) {
  evt.preventDefault()
  name.textContent = (nameInput.value)
  profession.textContent = (jobInput.value)
  closePopup(profilePopup)
} // Передаем значения из формы на страницу
function addPhoto(evt) {
  evt.preventDefault()

  const inputTitle = photoNameInput.value;
  const inputLink = photoLinkInput.value;

  const photoItem = getEl({name: inputTitle, link: inputLink})
  photoEl.prepend(photoItem);

  photoNameInput.value = ''
  photoLinkInput.value = ''


  closePopup(photoPopup)

} // Передаем значения из формы добавления фотографий

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup__opened'))
  }
} // Закрываем форму по нажатию на клавишу ESC

function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

formElement.addEventListener('submit', submitProfileForm);
formPhoto.addEventListener('submit', addPhoto);
profilePopup.addEventListener('mousedown' , closeOverlay);
photoPopup.addEventListener('mousedown' , closeOverlay);
openImagePopup.addEventListener('mousedown' , closeOverlay);
render();

