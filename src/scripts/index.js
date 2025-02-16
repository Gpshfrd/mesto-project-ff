import "../pages/index.css";
import { initialCards } from "./cards.js";
import { closeModal, openModal } from "../components/modal.js";
import { createCard, likeCard, removeCard } from "../components/card.js";

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

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  let cardNameInput = popupAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  let cardURLInput = popupAddCard.querySelector(".popup__input_type_url");
  let newCard = { name: cardNameInput.value, link: cardURLInput.value };
  let card = createCard(
    newCard.name,
    newCard.link,
    removeCard,
    likeCard,
    openImage
  );
  cardsList.prepend(card);
  closeModal(popupAddCard);
  cardNameInput.value = "";
  cardURLInput.value = "";
}

function openImage(cardImg) {
  popupImagePicture.src = "";
  openModal(popupImage);
  popupImagePicture.src = cardImg.src;
  popupImagePicture.alt = cardImg.alt;
  popupImageContent.append(cardImg.alt);
}

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImage);
  popupImageContent.textContent = "";
});

popupEdit.addEventListener("submit", handleFormSubmit);

popupAddCard.addEventListener("submit", handleNewCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
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

// Вывод первых шести карточек на страницу
initialCards.forEach((card) => {
  let newCard = createCard(
    card.name,
    card.link,
    removeCard,
    likeCard,
    openImage
  );
  cardsList.prepend(newCard);
});
