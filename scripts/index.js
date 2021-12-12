const profileEditButton = document.querySelector(".profile__edit-button");
const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");
const profileAddPlaceButton = document.querySelector(".profile__add");

const popupProfileInput = document.querySelector(".popup-profile-input");
const popupSaveButton = popupProfileInput.querySelector(".popup__btn-save");
const popupCloseProfileInputButton =
  popupProfileInput.querySelector(".popup__btn-close");
const popupInputForm = popupProfileInput.querySelector(
  ".popup__userdata-input"
);
const inputsProfilePopup = popupInputForm.querySelectorAll("input");

const popupNewPlaceInput = document.querySelector(".popup-new-place");
const popupCreateButton = popupNewPlaceInput.querySelector(".popup__btn-save");
const popupCloseNewPlaceButton =
  popupNewPlaceInput.querySelector(".popup__btn-close");
const popupNewPlaceForm = popupNewPlaceInput.querySelector(
  ".popup__userdata-input"
);
const inputsNewPlacePopup = popupNewPlaceForm.querySelectorAll("input");

const elementsArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
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

function openProfilePopup() {
  inputsProfilePopup[0].value = profileMemberName.textContent;
  inputsProfilePopup[1].value = profileMemberOccupation.textContent;
  popupProfileInput.classList.add("popup_opened");
}

function closeProfilePopup() {
  inputsProfilePopup[0].value = "";
  inputsProfilePopup[1].value = "";
  popupProfileInput.classList.remove("popup_opened");
}

function formSubmitProfileHandler(evt) {
  evt.preventDefault();
  profileMemberName.textContent = inputsProfilePopup[0].value;
  profileMemberOccupation.textContent = inputsProfilePopup[1].value;
  popupProfileInput.classList.remove("popup_opened");
}

function createElementsArea(array) {
  array.forEach(function (item) {
    const newElement = cardTemplate.querySelector(".element").cloneNode(true);
    newElement.querySelector(".element__mask").src = item.link;
    newElement.querySelector(".element__mask").alt = item.name;
    newElement.querySelector(".element__card-name").textContent = item.name;
    elementsArea.prepend(newElement);
  });
}

function openNewPlacePopup() {
  popupNewPlaceInput.classList.add("popup_opened");
}

function closeNewPlacePopup() {
  inputsNewPlacePopup[0].value = "";
  inputsNewPlacePopup[1].value = "";
  popupNewPlaceInput.classList.remove("popup_opened");
}

function formSubmitNewPlaceHandler(evt) {
  evt.preventDefault();
  console.log(inputsNewPlacePopup[1]);
  // alert(inputsNewPlacePopup[0].value);
  const newElement = cardTemplate.querySelector(".element").cloneNode(true);
  newElement.querySelector(".element__mask").src = inputsNewPlacePopup[1].value;
  newElement.querySelector(".element__mask").alt = inputsNewPlacePopup[0].value;
  newElement.querySelector(".element__card-name").textContent =
    inputsNewPlacePopup[0].value;
  console.log(newElement);
  elementsArea.prepend(newElement);
  popupNewPlaceInput.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openProfilePopup);
popupCloseProfileInputButton.addEventListener("click", closeProfilePopup);
popupSaveButton.addEventListener("click", formSubmitProfileHandler);

profileAddPlaceButton.addEventListener("click", openNewPlacePopup);
popupCloseNewPlaceButton.addEventListener("click", closeNewPlacePopup);
popupCreateButton.addEventListener("click", formSubmitNewPlaceHandler);

createElementsArea(initialCards);
