import { toggleButtonState, hideInputError } from "./validate.js";

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

export const popupBigPicture = document.querySelector(".popup-big-picture");
const popupBigPictureImage = popupBigPicture.querySelector(".popup__picture");
const popupBigPictureFigcaption = popupBigPicture.querySelector(
  ".popup__picture-figcaption"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

export function openProfilePopup() {
  inputsFullNameProfilePopup.value = profileMemberName.textContent;
  inputsAboutProfilePopup.value = profileMemberOccupation.textContent;
  toggleButtonState(
    Array.from(popupProfileInput.querySelectorAll(".popup__input-field")),
    popupProfileInput.querySelector('[type = "submit"]')
  );
  openPopup(popupProfileInput);
}

export function closeProfilePopup() {
  inputsFullNameProfilePopup.value = "";
  inputsAboutProfilePopup.value = "";
  hideInputError(popupProfileInput, inputsFullNameProfilePopup);
  hideInputError(popupProfileInput, inputsAboutProfilePopup);
  closePopup(popupProfileInput);
}

export function saveProfileData(evt) {
  evt.preventDefault();
  profileMemberName.textContent = inputsFullNameProfilePopup.value;
  profileMemberOccupation.textContent = inputsAboutProfilePopup.value;
  closePopup(popupProfileInput);
}

export function openNewPlacePopup() {
  toggleButtonState(
    Array.from(popupNewPlaceInput.querySelectorAll(".popup__input-field")),
    popupNewPlaceInput.querySelector('[type = "submit"]')
  );
  openPopup(popupNewPlaceInput);
}

export function closeNewPlacePopup() {
  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  hideInputError(popupNewPlaceInput, inputsPlaceNameNewPlacePopup);
  hideInputError(popupNewPlaceInput, inputsPictureLinkNewPlacePopup);
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
  let target = event.target;

  if (
    target.closest(".popup__container") ||
    target.closest(".popup__btn-save") ||
    target.closest(".popup__btn-close")
  ) {
    event.stopPropagation();
  } else {
    callBackFunction(popupName);
  }
}