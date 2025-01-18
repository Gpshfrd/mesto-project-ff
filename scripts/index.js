// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardDesc, cardImgLink, removeFunc) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = card.querySelector(".card__delete-button");
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImg.src = cardImgLink;
  cardImg.alt = cardDesc;
  cardTitle.textContent = cardDesc;

  deleteButton.addEventListener("click", () => removeFunc(card));

  cardsList.prepend(card);

  return card;
}

// @todo: Функция удаления карточки
function removeCard(card) {
  console.log(card);
  card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  createCard(card.name, card.link, removeCard);
});
