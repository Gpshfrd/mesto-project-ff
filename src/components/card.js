import { addLike, removeLike, removeFromCardsList } from "../scripts/api";

// Функция создания карточки
export function createCard(cardInfo, userID, removeFunc, likeFunc, imageOpenFunc, cardTemplate) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-button-counter");
  const cardID = cardInfo['_id'];
  const likes = cardInfo.likes;

  cardImg.addEventListener("click", () => imageOpenFunc(cardImg));

  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likeCounter.textContent = cardInfo.likes.length;

  hideDeleteButton(cardInfo, userID, deleteButton);

  deleteButton.addEventListener("click", () => removeFunc(card, cardID));

  likeButton.addEventListener("click", () => likeFunc(cardID, likeButton, likeCounter));

  return card;
}

//Функция лайка карточки
export function likeCard(cardID, likeButton, likeCounter) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    addLike(cardID)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
    })
    .then(() => {
      likeButton.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.error(`Ошибка, невозможно поставить лайк: ${error.message}`);
    })
  } else {
    removeLike(cardID)
    .then((res) => {
      likeCounter.textContent = res.likes.length;
    })
    .then(() => {
      likeButton.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.error(`Ошибка, невозможно убрать лайк: ${error.message}`);
    })
  }
}

// Функция удаления карточки
export function removeCard(card, cardID) {
  removeFromCardsList(cardID)
  .then(() => {
    card.remove();
  })
  .catch((error) => {
    console.error(`Ошибка удаления карточки: ${error.message}`);
  })
}

//Функция скрытия иконки удаления на карточках других пользователей
function hideDeleteButton(card, userID, deleteButton) {
  if (card.owner['_id'] != userID) {
    deleteButton.classList.add('card__delete-button-disabled');
    deleteButton.disable = true;
  }
}
