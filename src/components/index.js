import "./../pages/index.css"; // добавляем импорт главного файла стилей

import {
  //constants
  popupProfileInput,
  popupNewPlaceInput,
  popupNewAvatarInput,
  popupBigPicture,
  //functions
  openProfilePopup,
  closeProfilePopup,
  saveProfileData,
  openNewPlacePopup,
  closeNewPlacePopup,
  openNewAvatarPopup,
  closeNewAvatarPopup,
  closeBigPicturePopup,
  overlayClickHandler,
} from "./modal.js";

import { enableValidation } from "./validate.js";

import { addNewPlaceCard, createElementsArea, addNewAvatar } from "./card.js";

import { getUserProfile, getCardsArray } from "./api.js";

// создаем объект с набором настроек для валидации
export const config = {
  formSelector: ".popup__userdata-input",
  inputSelector: ".popup__input-field",
  submitButtonSelector: '[type = "submit"]',
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input-field_error",
  errorClass: "popup__input-error_active",
};

//! не нравится как заявлена важная константа - ID владельца страницы. Подумай
export let userID;
// получаем кнопки для запуска попап
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddPlaceButton = document.querySelector(".profile__add");
const profileNewAvatarButton = document.querySelector(
  ".profile__overlay-avatar"
);
// получаем формы для запуска событий submit
const profileInputForm = document.querySelector('form[name="user-data"]');
const newPlaceInputForm = document.querySelector('form[name="new-place"]');
const newAvatarInputForm = document.querySelector('form[name="new-avatar"]');
// получаем кнопки закрытия форм для запуска закрытия форм
const popupCloseProfileInputButton =
  popupProfileInput.querySelector(".popup__btn-close");

const popupCloseNewPlaceButton =
  popupNewPlaceInput.querySelector(".popup__btn-close");

const popupCloseBigPictureButton =
  popupBigPicture.querySelector(".popup__btn-close");

const popupCloseNewAvatarButton =
  popupNewAvatarInput.querySelector(".popup__btn-close");

//!!! Создание поля карточек
getCardsArray()
  .then((res) => {
    createElementsArea(res);
  })
  .catch((err) => {
    console.log(err);
  });

// навешивание слушателей на попапы

profileEditButton.addEventListener("click", () => openProfilePopup(config));
popupCloseProfileInputButton.addEventListener("click", closeProfilePopup);
profileInputForm.addEventListener("submit", saveProfileData);
popupProfileInput.addEventListener("mousedown", (event) =>
  overlayClickHandler(event, popupProfileInput, closeProfilePopup)
);

profileAddPlaceButton.addEventListener("click", () =>
  openNewPlacePopup(config)
);
popupCloseNewPlaceButton.addEventListener("click", closeNewPlacePopup);
newPlaceInputForm.addEventListener("submit", addNewPlaceCard);
popupNewPlaceInput.addEventListener("mousedown", (event) =>
  overlayClickHandler(event, popupNewPlaceInput, closeNewPlacePopup)
);

popupCloseBigPictureButton.addEventListener("click", closeBigPicturePopup);
popupBigPicture.addEventListener("mousedown", (event) =>
  overlayClickHandler(event, popupBigPicture, closeBigPicturePopup)
);

profileNewAvatarButton.addEventListener("click", () =>
  openNewAvatarPopup(config)
);
popupCloseNewAvatarButton.addEventListener("click", closeNewAvatarPopup);
newAvatarInputForm.addEventListener("submit", addNewAvatar);
popupNewAvatarInput.addEventListener("mousedown", (event) =>
  overlayClickHandler(event, popupNewAvatarInput, closeNewAvatarPopup)
);

//! запуск валидации на все формы

enableValidation(config);

// создание функции скачивания данных и генерирования блок profile с данными и аватаром текущего пользователя

export function summonProfile() {
  const userProfileAvatar = document.querySelector(".profile__avatar");
  const userProfileName = document.querySelector(".profile__member-name");
  const userProfileAbout = document.querySelector(".profile__lower-text");

  function getCartData() {
    getUserProfile()
      .then((res) => {
        userProfileName.textContent = res.name;
        userProfileAbout.textContent = res.about;
        userProfileAvatar.src = res.avatar;
        userID = res._id;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getCartData();
}

//!!! запуск функции скачивания данных и генерирования блок profile с данными и аватаром текущего пользователя

summonProfile();
