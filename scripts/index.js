import {
  //constants
  popupProfileInput,
  popupNewPlaceInput,
  popupBigPicture,
  //functions
  closePopup,
  openProfilePopup,
  closeProfilePopup,
  saveProfileData,
  openNewPlacePopup,
  closeNewPlacePopup,
  closeBigPicturePopup,
  openPictureFullView,
  overlayClickHandler,
} from "./modal.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddPlaceButton = document.querySelector(".profile__add");

const profileInputForm = document.querySelector('form[name="user-data"]');
const newPlaceInputForm = document.querySelector('form[name="new-place"]');

const popupCloseProfileInputButton =
  popupProfileInput.querySelector(".popup__btn-close");

const popupCloseNewPlaceButton =
  popupNewPlaceInput.querySelector(".popup__btn-close");
const popupNewPlaceForm = popupNewPlaceInput.querySelector(
  ".popup__userdata-input"
);
const inputsPlaceNameNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "place_name"]'
);
const inputsPictureLinkNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "picture_link"]'
);

const popupCloseBigPictureButton =
  popupBigPicture.querySelector(".popup__btn-close");

const popupWindows = document.querySelectorAll(".popup");

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

function createCard(source, title) {
  const newCardElement = cardTemplate.querySelector(".element").cloneNode(true);
  newCardElement.querySelector(".element__mask").src = source;
  newCardElement.querySelector(".element__mask").alt = title;
  newCardElement.querySelector(".element__card-name").textContent = title;
  newCardElement
    .querySelector(".element__mask")
    .addEventListener("click", function (evt) {
      openPictureFullView(evt.target);
    });
  newCardElement
    .querySelector(".element__like-btn")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-btn_liked");
    });
  newCardElement
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
  //устанавливаете 3 обработчика(открытие, лайк, удаление)
  return newCardElement; // возвращаете готовую карточку
}

function addNewPlaceCard(evt) {
  evt.preventDefault();

  const newElement = createCard(
    inputsPictureLinkNewPlacePopup.value,
    inputsPlaceNameNewPlacePopup.value
  );
  elementsArea.prepend(newElement);
  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  closePopup(popupNewPlaceInput);
}

function createElementsArea(array) {
  array.forEach(function (item) {
    const newElement = createCard(item.link, item.name);
    elementsArea.prepend(newElement);
  });
}

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
