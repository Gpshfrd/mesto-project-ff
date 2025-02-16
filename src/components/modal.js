import { popupImageContent } from "../scripts/index.js";

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

const popupList = document.querySelectorAll(".popup");

popupList.forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (!event.target.closest(".popup__content")) {
      closeModal(popup);
      popupImageContent.textContent = "";
    }
  });
});

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
      popupImageContent.textContent = "";
    }
  }
}
