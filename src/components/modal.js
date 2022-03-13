import { toggleButtonState, hideInputError } from "./validate.js";

import { setUserProfile } from "./api.js";

import { summonProfile } from "./index.js";

// получаем поля блока Profile для дальнейшего внесения в попап который вносит правки в имя и профессию

const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");

// получаем поля и элементы попапа правок для Profile

export const popupProfileInput = document.querySelector(".popup-profile-input");

const popupInputForm = popupProfileInput.querySelector(
  ".popup__userdata-input"
);
const inputsFullNameProfilePopup = popupInputForm.querySelector(
  'input[name="full_name"]'
);
const inputsAboutProfilePopup = popupInputForm.querySelector(
  'input[name="about"]'
);
const profileInputs = popupProfileInput.querySelectorAll(".popup__input-field");
const profileSubmitButton =
  popupProfileInput.querySelector('[type = "submit"]');

// получаем поля и элементы попапа правок для NewPlace

export const popupNewPlaceInput = document.querySelector(".popup-new-place");
export const popupNewPlaceForm = popupNewPlaceInput.querySelector(
  ".popup__userdata-input"
);
export const inputsPlaceNameNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "place_name"]'
);
export const inputsPictureLinkNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "picture_link"]'
);

const placeInputs = popupNewPlaceInput.querySelectorAll(".popup__input-field");
const placeSubmitButton = popupNewPlaceInput.querySelector('[type = "submit"]');

// получаем поля и элементы попапа  для BigPicture

export const popupBigPicture = document.querySelector(".popup-big-picture");
const popupBigPictureImage = popupBigPicture.querySelector(".popup__picture");
const popupBigPictureFigcaption = popupBigPicture.querySelector(
  ".popup__picture-figcaption"
);

// получаем поля и элементы попапа правок для NewAvatar

export const popupNewAvatarInput = document.querySelector(".popup-new-avatar");

export const popupNewAvatarForm = popupNewAvatarInput.querySelector(
  ".popup__userdata-input"
);

export const inputsAvatarLinkNewAvatarPopup = popupNewAvatarForm.querySelector(
  'input[name = "avatar_link"]'
);

const avatarInputs = popupNewAvatarInput.querySelectorAll(
  ".popup__input-field"
);
const avatarSubmitButton =
  popupNewAvatarInput.querySelector('[type = "submit"]');

// общие функции открытия и закрытия попап - навешиваем класс и слушатель для закрытия по Esc

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

// функции для попапа редактирования Profile

export function openProfilePopup(config) {
  inputsFullNameProfilePopup.value = profileMemberName.textContent;
  inputsAboutProfilePopup.value = profileMemberOccupation.textContent;
  hideInputError(popupProfileInput, inputsFullNameProfilePopup, config);
  hideInputError(popupProfileInput, inputsAboutProfilePopup, config);
  toggleButtonState(Array.from(profileInputs), profileSubmitButton, config);
  openPopup(popupProfileInput);
}

export function closeProfilePopup() {
  closePopup(popupProfileInput);
}

export function saveProfileData(evt) {
  evt.preventDefault();
  const newName = inputsFullNameProfilePopup.value;
  const newAbout = inputsAboutProfilePopup.value;
  setUserProfile(newName, newAbout).then((res) => {
    if (res.ok) {
      summonProfile();
    } else {
      return Promise.reject(res.status);
    }
  });
  closePopup(popupProfileInput);
}

// функции для попапа NewPlace

export function openNewPlacePopup(config) {
  hideInputError(popupNewPlaceInput, inputsPlaceNameNewPlacePopup, config);
  hideInputError(popupNewPlaceInput, inputsPictureLinkNewPlacePopup, config);
  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  toggleButtonState(Array.from(placeInputs), placeSubmitButton, config);
  openPopup(popupNewPlaceInput);
}

export function closeNewPlacePopup() {
  closePopup(popupNewPlaceInput);
}

// функции для открытия и закрытия большой картинки карточки

export function closeBigPicturePopup() {
  closePopup(popupBigPicture);
}

export function openPictureFullView(clickedPicture) {
  popupBigPictureImage.alt = clickedPicture.alt;
  popupBigPictureImage.src = clickedPicture.src;
  popupBigPictureFigcaption.textContent = clickedPicture.alt;
  openPopup(popupBigPicture);
}

// функции для попапа NewAvatar

export function openNewAvatarPopup(config) {
  hideInputError(popupNewAvatarInput, inputsAvatarLinkNewAvatarPopup, config);

  inputsAvatarLinkNewAvatarPopup.value = "";
  toggleButtonState(Array.from(avatarInputs), avatarSubmitButton, config);
  openPopup(popupNewAvatarInput);
}

export function closeNewAvatarPopup() {
  closePopup(popupNewAvatarInput);
}

// функция закрытия попап при клике на зону overlay - за пределами формы запросов

export function overlayClickHandler(event, popupName, callBackFunction) {
  const target = event.target;

  if (
    target.closest(".popup__container") ||
    target.closest(".popup__btn-save") ||
    target.closest(".popup__btn-close") ||
    target.closest(".popup__figure-container")
  ) {
    event.stopPropagation();
  } else {
    callBackFunction(popupName);
  }
}
// функция для закрытия всех попапов по клавише Escape

function closeByEscape(event) {
  if (event.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
