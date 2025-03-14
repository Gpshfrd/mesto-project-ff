import "../pages/index.css";
import { closeModal, openModal, overlayClickCheck } from "../components/modal.js";
import { createCard } from "../components/card.js";
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
const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector(".places__list");

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

let userId

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupChangeAvatar, true);
  changeAvatar(avatarInput.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupChangeAvatar);
    })
    .catch((error) => {
      console.error(`Ошибка изменения аватара: ${error.message}`);
    })
    .finally(() => {
      renderLoading(popupChangeAvatar, false);
      clearValidation(changeAvatarForm, validationConfig)
    })
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(popupEdit, true);
  updateUserInfo(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileProfession.textContent = res.about;
      closeModal(popupEdit);
    })
    .catch((error) => {
      console.error(`Ошибка редактирования профиля: ${error.message}`);
    })
    .finally(() => {
      renderLoading(popupEdit, false);
      clearValidation(profileForm, validationConfig)
    })
}

function handleNewCardSubmit(evt) {
  const cardNameInput = popupAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  const cardUrlInput = popupAddCard.querySelector(".popup__input_type_url");

  evt.preventDefault();
  renderLoading(popupAddCard, true);

  postNewCard(cardNameInput.value, cardUrlInput.value)
    .then((card) => {
      addCard(card, userId);
      closeModal(popupAddCard);
    })
    .catch((error) => {
      console.error(`Ошибка добавления карточки: ${error.message}`);
    })
    .finally(() => {
      renderLoading(popupAddCard, false);
      clearValidation(addCardForm, validationConfig);
    })
}

//Функция лайка карточки
function likeCard(cardInfo, likeButton, likeCounter, userId) {
  const likesList = cardInfo.likes.map(user => user._id);
  let isLiked = likesList.includes(userId);
  if (!isLiked) {
    addLike(cardInfo._id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        cardInfo.likes = res.likes;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(`Ошибка, невозможно поставить лайк: ${error.message}`);
      });
  } else {
    removeLike(cardInfo._id)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
        cardInfo.likes = res.likes;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(`Ошибка, невозможно убрать лайк: ${error.message}`);
      });
  }
}

// Функция удаления карточки
function removeCard(card, cardId) {
  removeFromCardsList(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.error(`Ошибка удаления карточки: ${error.message}`);
    });
}

function addCard(cardInfo, userId) {
  const newCard = createCard(
    cardInfo,
    userId,
    removeCard,
    likeCard,
    openImage,
    cardTemplate,
  );
  cardsList.prepend(newCard);
}

function openImage(cardImg) {
  openModal(popupImage);
  popupImagePicture.src = cardImg.src;
  popupImagePicture.alt = cardImg.alt;
  popupImageContent.textContent = cardImg.alt;
}

function renderLoading(popup, isLoading) {
  const submitButton = popup.querySelector(".popup__button")
  if (isLoading) {
    submitButton.textContent = "Сохранение...";
    submitButton.disabled = true;
  } else {
    submitButton.textContent = "Сохранить";
    submitButton.disabled = false;
  }
}

profileAvatar.addEventListener("click", () => {
  changeAvatarForm.reset();
  clearValidation(changeAvatarForm, validationConfig);
  openModal(popupChangeAvatar);
});

changeAvatarForm.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(evt);
});

popupChangeAvatarCloseButton.addEventListener("click", () => {
  closeModal(popupChangeAvatar);
});

popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupImage);
});

popupEdit.addEventListener("submit", (evt) => {
  handleEditFormSubmit(evt);
});

popupAddCard.addEventListener("submit", (evt) => {
  handleNewCardSubmit(evt);
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
  addCardForm.reset();
  openModal(popupAddCard);
});

popupAddCardCloseButton.addEventListener("click", () => {
  closeModal(popupAddCard);
});

enableValidation(validationConfig);

// Добавление обработчика клика по оверлею на все попапы
popupList.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    overlayClickCheck(event, popup);
  });
});

//Добавление информации с сервера в профиль
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    userId = user["_id"];
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
      openImage,
      cardTemplate,
    );
    cardsList.prepend(newCard);
  });
}