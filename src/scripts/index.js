import "../pages/index.css";
import { initialCards } from "./cards.js";
import { closeModal, openModal } from "../components/modal.js";
import { createCard, likeCard, removeCard } from "../components/card.js";
import { enableValidation, clearValidation } from "./validation.js";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Tемплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const cardsList = document.querySelector(".places__list");

// Список всех попапов
const popupList = document.querySelectorAll(".popup");

// Константы для редактирования профиля
const editButton = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const nameInput = popupEdit.querySelector(".popup__input_type_name");
const jobInput = popupEdit.querySelector(".popup__input_type_description");
const profileForm = popupEdit.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__description");

//Константы для добавления карточки
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const addCardForm = popupAddCard.querySelector(".popup__form");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");

// Константы для открытия картинки карточки
const popupImage = document.querySelector(".popup_type_image");
const popupImageCloseButton = popupImage.querySelector(".popup__close");
const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageContent = popupImage.querySelector(".popup__caption");

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = popupAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardURLInput = popupAddCard.querySelector(".popup__input_type_url");
  const newCard = { name: cardNameInput.value, link: cardURLInput.value };
  const card = createCard(
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
  popupImageContent.textContent = cardImg.alt;
}

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImage);
  popupImageContent.textContent = "";
});

popupEdit.addEventListener("submit", handleEditFormSubmit);

popupAddCard.addEventListener("submit", handleNewCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileProfession.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(popupEdit);
});

popupEditCloseButton.addEventListener("click", () => {
  closeModal(popupEdit);
});

addCardButton.addEventListener("click", () => {
  clearValidation(addCardForm,validationConfig);
  openModal(popupAddCard);
});

popupAddCardCloseButton.addEventListener("click", () => {
  closeModal(popupAddCard);
});

enableValidation(validationConfig);

// Добавление обработчика клика по оверлею на все попапы
popupList.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (!event.target.closest(".popup__content")) {
      closeModal(popup);
    }
  });
});


// Вывод первых шести карточек на страницу
initialCards.forEach((card) => {
  const newCard = createCard(
    card.name,
    card.link,
    removeCard,
    likeCard,
    openImage
  );
  cardsList.prepend(newCard);
});
