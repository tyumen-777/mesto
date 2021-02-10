//const overlay = document.querySelector('.popup') // Задний план
const profilePopup = document.querySelector('.profilepopup') // Попап для редактирования информации профиля
const photoPopup = document.querySelector('.photopopup') //  Попап для редактирования фотокарточек
const popUpEditButton = document.querySelector('.profile__button-edit') // Клавиша редактирования профиля
const popUpAddButton = document.querySelector('.profile__button-add') // Клавиша добавления фотографии
const profileCloseButton = profilePopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в профиле
const photoCloseButton = photoPopup.querySelector('.popup__button-close') // Клавиша закрытия попапа в фото
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
//const likeButton = photoTemplate.querySelector('.elements__button-like')
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

  newEl.querySelector('.elements__button-like').addEventListener('click' , function (evt){
    evt.preventDefault();
    const buttonLike = document.querySelector('.elements__button-like');
    buttonLike.classList.toggle('elements__button-like-active')
  })


  return newEl
}

render();


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
function addPhoto(evt) {
  evt.preventDefault()

  const inputTitle = photoNameInput.value;
  const inputLink = photoLinkInput.value;

  const photoItem = getEl({name: inputTitle , link: inputLink})
  photoEl.prepend(photoItem);

  photoNameInput.value = ''
  photoLinkInput.value = ''



  closePopup(photoPopup)

} // Передаем значения из формы добавления фотографий



formElement.addEventListener('submit', submitProfileForm);
formPhoto.addEventListener('submit', addPhoto);

//console.log(likeButton)
