import {
  cardTemplate,
  cardsList,
  popupImage,
  popupImagePicture,
  popupImageContent,
} from "../scripts/index.js";
import { openModal } from "./modal.js";

// Функция создания карточки
export function createCard(
  cardDesc,
  cardImgLink,
  removeFunc,
  likeFunc,
  imageOpenFunc
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");

  cardImg.addEventListener("click", () => imageOpenFunc(cardImg));

  cardImg.src = cardImgLink;
  cardImg.alt = cardDesc;
  cardTitle.textContent = cardDesc;

  deleteButton.addEventListener("click", () => removeFunc(card));

  likeButton.addEventListener("click", () => likeFunc(likeButton));

  cardsList.prepend(card);

  return card;
}

export function openImage(cardImg) {
  popupImagePicture.src = "";
  openModal(popupImage);
  popupImagePicture.src = cardImg.src;
  popupImagePicture.alt = cardImg.alt;
  popupImageContent.append(cardImg.alt);
}

// Функция удаления карточки
export function removeCard(card) {
  console.log(card);
  card.remove();
}

// Функция лайка карточки
export function likeCard(likeButton) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    likeButton.classList.remove("card__like-button_is-active");
  } else {
    likeButton.classList.add("card__like-button_is-active");
  }
}
