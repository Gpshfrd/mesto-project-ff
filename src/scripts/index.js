import '../pages/index.css';
import { initialCards } from './cards.js';
import { closePopup, openPopup } from './modal.js';



// Tемплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");

const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__description");

const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");

const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupImagePicture = popupImage.querySelector(".popup__image");
export const popupImageContent = popupImage.querySelector(".popup__caption");

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileProfession.innerHTML;
}

popupEdit.addEventListener('submit', handleFormSubmit); 

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  let cardNameInput = popupAddCard.querySelector(".popup__input_type_card-name");
  let cardURLInput = popupAddCard.querySelector(".popup__input_type_url");
  let newCard = {name: cardNameInput.value, link: cardURLInput.value};
  createCard(newCard.name, newCard.link, removeCard, likeCard);
  closePopup(popupAddCard);
  cardNameInput.value = "";
  cardURLInput.value = "";
}

popupAddCard.addEventListener('submit', handleNewCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileProfession.innerHTML;
  openPopup(popupEdit);
});

popupEditCloseButton.addEventListener("click", () => {
  closePopup(popupEdit);
})

addCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
})

popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
})

// Функция создания карточки
function createCard(cardDesc, cardImgLink, removeFunc, likeFunc, imageFunc) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");

  cardImg.addEventListener("click", () => {
    openPopup(popupImage);
    popupImagePicture.src = cardImg.src;
    popupImagePicture.alt = cardImg.alt;
    popupImageContent.append(cardImg.alt);
  });  

  popupImageCloseButton.addEventListener("click", () => {
    closePopup(popupImage);
    popupImageContent.textContent = "";
  })

  cardImg.src = cardImgLink;
  cardImg.alt = cardDesc;
  cardTitle.textContent = cardDesc;

  deleteButton.addEventListener("click", () => removeFunc(card));

  likeButton.addEventListener("click", () => likeFunc(likeButton));

  cardsList.prepend(card);

  return card;
}

// Функция удаления карточки
function removeCard(card) {
  console.log(card);
  card.remove();
}

// Вывести первые шесть карточек на страницу
initialCards.forEach((card) => {
  createCard(card.name, card.link, removeCard, likeCard);
});

// Функция лайка карточки
function likeCard(likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}