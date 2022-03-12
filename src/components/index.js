import "./../pages/index.css"; // добавляем импорт главного файла стилей

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

import { enableValidation } from "./validate.js";

import { addNewPlaceCard, createElementsArea } from "./card.js";

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

// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Холмогорский район",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ];

//!!!Создание поля карточек!!!
getCardsArray().then((res) => {
  console.log(res);
  createElementsArea(res);
});

// createElementsArea(initialCards);

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

enableValidation(config);

export function summonProfile() {
  const userProfileAvatar = document.querySelector(".profile__avatar");
  const userProfileName = document.querySelector(".profile__member-name");
  const userProfileAbout = document.querySelector(".profile__lower-text");

  function getCartData() {
    getUserProfile().then((res) => {
      userProfileName.textContent = res.name;
      userProfileAbout.textContent = res.about;
      userProfileAvatar.src = res.avatar;
    });
  }
  getCartData();
}

summonProfile();

// profile__avatar"
//           />
//           <div class="profile__text-block">
//             <div class="profile__upper-text">
//               <h1 class="profile__member-name">Жак-Ив Кусто</h1>
//               <button type="button" class="profile__edit-button">
//                 <img
//                   src="<%=require('./images/edit_button.svg')%>"
//                   alt="Клавиша редактирования"
//                   class="profile__image-edit-button"
//                 />
//               </button>
//             </div>
//             <p class="profile__lower-text">Исследователь океана</p

// console.log(userProfile);

// console.log("profileCartData:", profileCartData);
