function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var o={}.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(e):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=Array(t);o<t;o++)r[o]=e[o];return r}function _iterableToArrayLimit(e,t){var o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var r,a,n,p,u=[],i=!0,d=!1;try{if(n=(o=o.call(e)).next,0===t){if(Object(o)!==o)return;i=!1}else for(;!(i=(r=n.call(o)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){d=!0,a=e}finally{try{if(!i&&null!=o.return&&(p=o.return(),Object(p)!==p))return}finally{if(d)throw a}}return u}}function _arrayWithHoles(e){if(Array.isArray(e))return e}import"../pages/index.css";import{closeModal,openModal,overlayClickCheck}from"../components/modal.js";import{createCard,likeCard,removeCard}from"../components/card.js";import{enableValidation,clearValidation}from"../components/validation.js";import{getInitialCards,getUserInfo,updateUserInfo,postNewCard,changeAvatar,addLike,removeLike,removeFromCardsList}from"../components/api.js";var validationConfig={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};export var cardTemplate=document.querySelector("#card-template").content;export var cardsList=document.querySelector(".places__list");var userId,popupList=document.querySelectorAll(".popup"),editButton=document.querySelector(".profile__edit-button"),popupEdit=document.querySelector(".popup_type_edit"),popupEditCloseButton=popupEdit.querySelector(".popup__close"),nameInput=popupEdit.querySelector(".popup__input_type_name"),jobInput=popupEdit.querySelector(".popup__input_type_description"),profileForm=popupEdit.querySelector(".popup__form"),profileName=document.querySelector(".profile__title"),profileProfession=document.querySelector(".profile__description"),addCardButton=document.querySelector(".profile__add-button"),popupAddCard=document.querySelector(".popup_type_new-card"),addCardForm=popupAddCard.querySelector(".popup__form"),popupAddCardCloseButton=popupAddCard.querySelector(".popup__close"),popupImage=document.querySelector(".popup_type_image"),popupImageCloseButton=popupImage.querySelector(".popup__close"),popupImagePicture=popupImage.querySelector(".popup__image"),popupImageContent=popupImage.querySelector(".popup__caption"),profileAvatar=document.querySelector(".profile__image"),popupChangeAvatar=document.querySelector(".popup_type-change-avatar"),changeAvatarForm=popupChangeAvatar.querySelector(".popup__form"),avatarInput=popupChangeAvatar.querySelector(".popup__input_type_change-avatar"),popupChangeAvatarCloseButton=popupChangeAvatar.querySelector(".popup__close");function handleAvatarFormSubmit(e){e.preventDefault(),renderLoading(popupChangeAvatar,!0),changeAvatar(avatarInput.value).then((function(e){profileAvatar.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){console.error("Ошибка изменения аватара: ".concat(e.message))})).finally((function(){renderLoading(popupChangeAvatar,!1),closeModal(popupChangeAvatar)}))}function handleEditFormSubmit(e){e.preventDefault(),renderLoading(popupEdit,!0),updateUserInfo(nameInput.value,jobInput.value).then((function(e){profileName.textContent=e.name,profileProfession.textContent=e.about})).catch((function(e){console.error("Ошибка редактирования профиля: ".concat(e.message))})).finally((function(){renderLoading(popupEdit,!1),closeModal(popupEdit)}))}function handleNewCardSubmit(e){var t=popupAddCard.querySelector(".popup__input_type_card-name"),o=popupAddCard.querySelector(".popup__input_type_url");e.preventDefault(),renderLoading(popupAddCard,!0),postNewCard(t.value,o.value).then((function(e){addCard(e,userId)})).catch((function(e){console.error("Ошибка добавления карточки: ".concat(e.message))})).finally((function(){renderLoading(popupAddCard,!1),closeModal(popupAddCard)}))}function addCard(e,t){var o=createCard(e,t,removeCard,likeCard,addLike,removeLike,openImage,cardTemplate,removeFromCardsList);cardsList.append(o)}function openImage(e){openModal(popupImage),popupImagePicture.src=e.src,popupImagePicture.alt=e.alt,popupImageContent.textContent=e.alt}function renderLoading(e,t){var o=e.querySelector(".popup__button");t?(o.textContent="Сохранение...",o.disabled=!0):(o.textContent="Сохранить",o.disabled=!1)}function addCards(e,t){e.forEach((function(e){var o=createCard(e,t,removeCard,likeCard,addLike,removeLike,openImage,cardTemplate,removeFromCardsList);cardsList.prepend(o)}))}profileAvatar.addEventListener("click",(function(){changeAvatarForm.reset(),clearValidation(changeAvatarForm,validationConfig),openModal(popupChangeAvatar)})),changeAvatarForm.addEventListener("submit",(function(e){handleAvatarFormSubmit(e)})),popupChangeAvatarCloseButton.addEventListener("click",(function(){closeModal(popupChangeAvatar),avatarInput.textContent=""})),popupImageCloseButton.addEventListener("click",(function(){closeModal(popupImage)})),popupEdit.addEventListener("submit",(function(e){handleEditFormSubmit(e)})),popupAddCard.addEventListener("submit",(function(e){handleNewCardSubmit(e)})),editButton.addEventListener("click",(function(){nameInput.value=profileName.textContent,jobInput.value=profileProfession.textContent,clearValidation(profileForm,validationConfig),openModal(popupEdit)})),popupEditCloseButton.addEventListener("click",(function(){closeModal(popupEdit)})),addCardButton.addEventListener("click",(function(){clearValidation(addCardForm,validationConfig),openModal(popupAddCard)})),popupAddCardCloseButton.addEventListener("click",(function(){closeModal(popupAddCard)})),enableValidation(validationConfig),popupList.forEach((function(e){e.addEventListener("click",(function(t){overlayClickCheck(t,e)}))})),Promise.all([getUserInfo(),getInitialCards()]).then((function(e){var t=_slicedToArray(e,2),o=t[0],r=t[1],a=o._id;profileName.textContent=o.name,profileProfession.textContent=o.about,profileAvatar.style.backgroundImage="url(".concat(o.avatar,")"),addCards(r,a)})).catch((function(e){console.error(e)}));