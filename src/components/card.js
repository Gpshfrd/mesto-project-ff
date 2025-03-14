// Функция создания карточки
export function createCard(
  cardInfo,
  userId,
  onDeleteCard,
  onLikeCard,
  onOpenPreview,
  cardTemplate
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardId = cardInfo["_id"];

  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const likeCounter = card.querySelector(".card__like-button-counter");

  cardImg.addEventListener("click", () => onOpenPreview(cardImg));

  cardImg.src = cardInfo.link;
  cardImg.alt = cardInfo.name;

  cardTitle.textContent = cardInfo.name;
  likeCounter.textContent = cardInfo.likes.length;

  const isMyLike = cardInfo.likes.some((like) => {
    return like._id == userId;
  });
  if (isMyLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  hideDeleteButton(cardInfo, userId, deleteButton);

  deleteButton.addEventListener("click", () => onDeleteCard(card, cardId));
  likeButton.addEventListener("click", () =>
    onLikeCard(cardInfo, likeButton, likeCounter, userId)
  );

  return card;
}

//Функция скрытия иконки удаления на карточках других пользователей
function hideDeleteButton(card, userId, deleteButton) {
  if (card.owner["_id"] != userId) {
    deleteButton.classList.add("card__delete-button-disabled");
    deleteButton.disabled = true;
  }
}
