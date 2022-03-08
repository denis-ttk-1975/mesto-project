import {
  //constants
  popupProfileInput,
  popupNewPlaceInput,
  popupBigPicture,
  //functions
  openProfilePopup,
  closeProfilePopup,
  saveProfileData,
  openNewPlacePopup,
  closeNewPlacePopup,
  closeBigPicturePopup,
  overlayClickHandler,
} from "./modal.js";

import { config, enableValidation } from "./validate.js";

import { addNewPlaceCard, createElementsArea } from "./card.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddPlaceButton = document.querySelector(".profile__add");

const profileInputForm = document.querySelector('form[name="user-data"]');
const newPlaceInputForm = document.querySelector('form[name="new-place"]');

const popupCloseProfileInputButton =
  popupProfileInput.querySelector(".popup__btn-close");

const popupCloseNewPlaceButton =
  popupNewPlaceInput.querySelector(".popup__btn-close");

const popupCloseBigPictureButton =
  popupBigPicture.querySelector(".popup__btn-close");

// const popupWindows = document.querySelectorAll(".popup");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//!!!Создание поля карточек!!!
createElementsArea(initialCards);

// навешивание слушателей на попапы

profileEditButton.addEventListener("click", openProfilePopup);
popupCloseProfileInputButton.addEventListener("click", closeProfilePopup);
profileInputForm.addEventListener("submit", saveProfileData);
popupProfileInput.addEventListener("click", (event) =>
  overlayClickHandler(event, popupProfileInput, closeProfilePopup)
);

profileAddPlaceButton.addEventListener("click", openNewPlacePopup);
popupCloseNewPlaceButton.addEventListener("click", closeNewPlacePopup);
newPlaceInputForm.addEventListener("submit", addNewPlaceCard);
popupNewPlaceInput.addEventListener("click", (event) =>
  overlayClickHandler(event, popupNewPlaceInput, closeNewPlacePopup)
);

popupCloseBigPictureButton.addEventListener("click", closeBigPicturePopup);
popupBigPicture.addEventListener("click", (event) =>
  overlayClickHandler(event, popupBigPicture, closeBigPicturePopup)
);
// слушатель на клавишу Escape для закрытия всех попапов
document.addEventListener("keydown", function (event) {
  if (event.code == "Escape") {
    closeProfilePopup();
    closeNewPlacePopup();
    closeBigPicturePopup();
  }
});
// запуск валидации форм по input
enableValidation(config);
