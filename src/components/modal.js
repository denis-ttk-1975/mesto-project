import { toggleButtonState, hideInputError } from "./validate.js";

import { setUserProfile } from "./api.js";

import { summonProfile } from "./index.js";

const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");
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

export const popupBigPicture = document.querySelector(".popup-big-picture");
const popupBigPictureImage = popupBigPicture.querySelector(".popup__picture");
const popupBigPictureFigcaption = popupBigPicture.querySelector(
  ".popup__picture-figcaption"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function openProfilePopup(config) {
  inputsFullNameProfilePopup.value = profileMemberName.textContent;
  inputsAboutProfilePopup.value = profileMemberOccupation.textContent;
  hideInputError(popupProfileInput, inputsFullNameProfilePopup, config);
  hideInputError(popupProfileInput, inputsAboutProfilePopup, config);
  toggleButtonState(Array.from(profileInputs), profileSubmitButton, config);
  openPopup(popupProfileInput);
}

export function closeProfilePopup() {
  // inputsFullNameProfilePopup.value = "";
  // inputsAboutProfilePopup.value = "";
  // hideInputError(popupProfileInput, inputsFullNameProfilePopup);
  // hideInputError(popupProfileInput, inputsAboutProfilePopup);
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

export function openNewPlacePopup(config) {
  hideInputError(popupNewPlaceInput, inputsPlaceNameNewPlacePopup, config);
  hideInputError(popupNewPlaceInput, inputsPictureLinkNewPlacePopup, config);
  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  toggleButtonState(Array.from(placeInputs), placeSubmitButton, config);
  openPopup(popupNewPlaceInput);
}

export function closeNewPlacePopup() {
  // inputsPlaceNameNewPlacePopup.value = "";
  // inputsPictureLinkNewPlacePopup.value = "";
  // hideInputError(popupNewPlaceInput, inputsPlaceNameNewPlacePopup);
  // hideInputError(popupNewPlaceInput, inputsPictureLinkNewPlacePopup);
  closePopup(popupNewPlaceInput);
}

export function closeBigPicturePopup() {
  closePopup(popupBigPicture);
}

export function openPictureFullView(clickedPicture) {
  popupBigPictureImage.alt = clickedPicture.alt;
  popupBigPictureImage.src = clickedPicture.src;
  popupBigPictureFigcaption.textContent = clickedPicture.alt;
  openPopup(popupBigPicture);
}

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
    // closeProfilePopup();
    // closeNewPlacePopup();
    // closeBigPicturePopup();
  }
}
