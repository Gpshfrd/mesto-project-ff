import "../pages/index.css";
import { closeModal, openModal } from "../components/modal.js";
import { createCard, likeCard, removeCard } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import {
  getInitialCards,
  getUserInfo,
  updateUserInfo,
  postNewCard,
  changeAvatar,
  addLike,
  removeLike, 
  removeFromCardsList
} from "../components/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

const profileAvatar = document.querySelector(".profile__image");
const popupChangeAvatar = document.querySelector(".popup_type-change-avatar");
const changeAvatarForm = popupChangeAvatar.querySelector(".popup__form");
const avatarInput = popupChangeAvatar.querySelector(
  ".popup__input_type_change-avatar"
);
const popupChangeAvatarCloseButton =
  popupChangeAvatar.querySelector(".popup__close");

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  changeAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
    })
    .catch((error) => {
      console.error(`Ошибка изменения аватара: ${error.message}`);
    });
  closeModal(popupChangeAvatar);
  avatarInput.textContent = "";
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  updateUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileProfession.textContent = res.about;
    })
    .catch((error) => {
      console.error(`Ошибка редактирования профиля: ${error.message}`);
    });
  closeModal(popupEdit);
}

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const cardNameInput = popupAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardURLInput = popupAddCard.querySelector(".popup__input_type_url");

  Promise.all([
    getUserInfo(),
    postNewCard(cardNameInput.value, cardURLInput.value),
  ])
    .then(([user, card]) => {
      const userId = user["_id"];
      addCard(card, userId);
    })
    .catch((error) => {
      console.error(`Ошибка добавления карточки: ${error.message}`);
    });

  closeModal(popupAddCard);
  cardNameInput.value = "";
  cardURLInput.value = "";
}

function addCard(cardInfo, userId) {
  const newCard = createCard(
    cardInfo,
    userId,
    removeCard,
    likeCard,
    addLike, 
    removeLike,
    openImage,
    cardTemplate,
    removeFromCardsList
  );
  cardsList.append(newCard);
}

function openImage(cardImg) {
  popupImagePicture.src = "";
  openModal(popupImage);
  popupImagePicture.src = cardImg.src;
  popupImagePicture.alt = cardImg.alt;
  popupImageContent.textContent = cardImg.alt;
}

profileAvatar.addEventListener("click", () => {
  changeAvatarForm.reset();
  clearValidation(changeAvatarForm, validationConfig);
  openModal(popupChangeAvatar);
});

changeAvatarForm.addEventListener("submit", (evt) => {
  changeAvatarForm.querySelector(".popup__button").textContent =
    "Сохранение...";
  handleAvatarFormSubmit(evt);
  changeAvatarForm.querySelector(".popup__button").textContent = "Сохранить";
});

popupChangeAvatarCloseButton.addEventListener("click", () => {
  closeModal(popupChangeAvatar);
  avatarInput.textContent = "";
});

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImage);
  popupImageContent.textContent = "";
});

popupEdit.addEventListener("submit", (evt) => {
  popupEdit.querySelector(".popup__button").textContent = "Сохранение...";
  handleEditFormSubmit(evt);
  popupEdit.querySelector(".popup__button").textContent = "Сохранить";
});

popupAddCard.addEventListener("submit", (evt) => {
  popupAddCard.querySelector(".popup__button").textContent = "Сохранение...";
  handleNewCardSubmit(evt);
  popupAddCard.querySelector(".popup__button").textContent = "Сохранить";
});

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
  clearValidation(addCardForm, validationConfig);
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

//Добавление информации с сервера в профиль
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    const userId = user["_id"];
    profileName.textContent = user.name;
    profileProfession.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    addCards(cards, userId);
  })
  .catch((error) => {
    console.error(error);
  });

function addCards(cards, userId) {
  cards.forEach((cardInfo) => {
    const newCard = createCard(
      cardInfo,
      userId,
      removeCard,
      likeCard,
      addLike, 
      removeLike,
      openImage,
      cardTemplate,
      removeFromCardsList,
    );
    cardsList.prepend(newCard);
  });
}
