import "../pages/index.css";
import { initialCards } from "./cards.js";
import { closeModal, openModal } from "../components/modal.js";
import {
  createCard,
  likeCard,
  removeCard,
  openImage,
} from "../components/card.js";

// Tемплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

// Константы для редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");

const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__description");

//Константы для добавления карточки
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");

// Константы для открытия картинки карточки
export const popupImage = document.querySelector(".popup_type_image");
export const popupImageCloseButton = popupImage.querySelector(".popup__close");
export const popupImagePicture = popupImage.querySelector(".popup__image");
export const popupImageContent = popupImage.querySelector(".popup__caption");

// Вывести первые шесть карточек на страницу
initialCards.forEach((card) => {
  createCard(card.name, card.link, removeCard, likeCard, openImage);
});

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImage);
  popupImageContent.textContent = "";
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileProfession.innerHTML;
}

popupEdit.addEventListener("submit", handleFormSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  let cardNameInput = popupAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  let cardURLInput = popupAddCard.querySelector(".popup__input_type_url");
  let newCard = { name: cardNameInput.value, link: cardURLInput.value };
  createCard(newCard.name, newCard.link, removeCard, likeCard, openImage);
  closeModal(popupAddCard);
  cardNameInput.value = "";
  cardURLInput.value = "";
}

popupAddCard.addEventListener("submit", handleNewCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.innerHTML;
  jobInput.value = profileProfession.innerHTML;
  openModal(popupEdit);
});

popupEditCloseButton.addEventListener("click", () => {
  closeModal(popupEdit);
});

addCardButton.addEventListener("click", () => {
  openModal(popupAddCard);
});

popupAddCardCloseButton.addEventListener("click", () => {
  closeModal(popupAddCard);
});
