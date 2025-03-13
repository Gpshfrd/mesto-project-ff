// Функция создания карточки
export function createCard(
  cardInfo,
  userId,
  removeFunc,
  likeFunc,
  addLikeFunc,
  removeLikeFunc,
  imageOpenFunc,
  cardTemplate,
  removeFromCardsListFunc
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-button-counter");
  const cardId = cardInfo["_id"];

  cardImg.addEventListener("click", () => imageOpenFunc(cardImg));

  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  likeCounter.textContent = cardInfo.likes.length;
  cardInfo.likes.forEach((like) => {
    if (like._id == userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  })

  hideDeleteButton(cardInfo, userId, deleteButton);

  deleteButton.addEventListener("click", () => removeFunc(card, cardId, removeFromCardsListFunc));

  likeButton.addEventListener("click", () =>
    likeFunc(cardId, likeButton, likeCounter, addLikeFunc, removeLikeFunc)
  );

  return card;
}

//Функция лайка карточки
export function likeCard(cardId, likeButton, likeCounter, addLikeFunc, removeLikeFunc) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  if (!isLiked) {
    addLikeFunc(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
      })
      .then(() => {
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(`Ошибка, невозможно поставить лайк: ${error.message}`);
      });
  } else {
    removeLikeFunc(cardId)
      .then((res) => {
        likeCounter.textContent = res.likes.length;
      })
      .then(() => {
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error(`Ошибка, невозможно убрать лайк: ${error.message}`);
      });
  }
}

// Функция удаления карточки
export function removeCard(card, cardId, removeFromCardsListFunc) {
  removeFromCardsListFunc(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => {
      console.error(`Ошибка удаления карточки: ${error.message}`);
    });
}

//Функция скрытия иконки удаления на карточках других пользователей
function hideDeleteButton(card, userId, deleteButton) {
  if (card.owner["_id"] != userId) {
    deleteButton.classList.add("card__delete-button-disabled");
    deleteButton.disabled = true;
  }
}
