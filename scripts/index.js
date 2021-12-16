const profileEditButton = document.querySelector(".profile__edit-button");
const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");
const profileAddPlaceButton = document.querySelector(".profile__add");

const profileInputForm = document.querySelector('form[name="user-data"]');
const newPlaceInputForm = document.querySelector('form[name="new-place"]');

console.log(profileInputForm, newPlaceInputForm);

const popupProfileInput = document.querySelector(".popup-profile-input");
// const popupSaveButton = popupProfileInput.querySelector(".popup__btn-save");
const popupCloseProfileInputButton =
  popupProfileInput.querySelector(".popup__btn-close");
const popupInputForm = popupProfileInput.querySelector(
  ".popup__userdata-input"
);
// const inputsProfilePopup = popupInputForm.querySelectorAll("input");
const inputsFullNameProfilePopup = popupInputForm.querySelector(
  'input[name="full_name"]'
);
const inputsAboutProfilePopup = popupInputForm.querySelector(
  'input[name="about"]'
);

const popupNewPlaceInput = document.querySelector(".popup-new-place");
// const popupCreateButton = popupNewPlaceInput.querySelector(".popup__btn-save");
const popupCloseNewPlaceButton =
  popupNewPlaceInput.querySelector(".popup__btn-close");
const popupNewPlaceForm = popupNewPlaceInput.querySelector(
  ".popup__userdata-input"
);
// const inputsNewPlacePopup = popupNewPlaceForm.querySelectorAll("input");
const inputsPlaceNameNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "place_name"]'
);
const inputsPictureLinkNewPlacePopup = popupNewPlaceForm.querySelector(
  'input[name = "picture_link"]'
);

const popupBigPicture = document.querySelector(".popup-big-picture");
const popupCloseBigPictureButton =
  popupBigPicture.querySelector(".popup__btn-close");
const popupBigPictureImage = popupBigPicture.querySelector(".popup__picture");
const popupBigPictureFigcaption = popupBigPicture.querySelector(
  ".popup__picture-figcaption"
);

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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

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

function openProfilePopup() {
  inputsFullNameProfilePopup.value = profileMemberName.textContent;
  inputsAboutProfilePopup.value = profileMemberOccupation.textContent;
  openPopup(popupProfileInput);
}

function closeProfilePopup() {
  inputsFullNameProfilePopup.value = "";
  inputsAboutProfilePopup.value = "";
  closePopup(popupProfileInput);
}

function saveProfileData(evt) {
  evt.preventDefault();
  profileMemberName.textContent = inputsFullNameProfilePopup.value;
  profileMemberOccupation.textContent = inputsAboutProfilePopup.value;
  closePopup(popupProfileInput);
}

function openNewPlacePopup() {
  // inputsPlaceNameNewPlacePopup.value = "";
  // inputsPictureLinkNewPlacePopup.value = "";
  openPopup(popupNewPlaceInput);
}

function closeNewPlacePopup() {
  // inputsPlaceNameNewPlacePopup.value = "";
  // inputsPictureLinkNewPlacePopup.value = "";
  closePopup(popupNewPlaceInput);
}

function addNewPlaceCard(evt) {
  evt.preventDefault();

  // const newElement = cardTemplate.querySelector(".element").cloneNode(true);
  // newElement.querySelector(".element__mask").src =
  //   inputsPictureLinkNewPlacePopup.value;
  // newElement.querySelector(".element__mask").alt =
  //   inputsPlaceNameNewPlacePopup.value;
  // newElement.querySelector(".element__card-name").textContent =
  //   inputsPictureLinkNewPlacePopup.value;
  const newElement = createCard(
    inputsPictureLinkNewPlacePopup.value,
    inputsPlaceNameNewPlacePopup.value
  );
  elementsArea.prepend(newElement);
  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  closePopup(popupNewPlaceInput);
}

function closeBigPicturePopup() {
  closePopup(popupBigPicture);
}

function openPictureFullView(clickedPicture) {
  popupBigPictureImage.alt = clickedPicture.alt;
  popupBigPictureImage.src = clickedPicture.src;
  popupBigPictureFigcaption.textContent = clickedPicture.alt;
  openPopup(popupBigPicture);
}

function createElementsArea(array) {
  array.forEach(function (item) {
    // const newElement = cardTemplate.querySelector(".element").cloneNode(true);
    // newElement.querySelector(".element__mask").src = item.link;
    // newElement.querySelector(".element__mask").alt = item.name;
    // newElement.querySelector(".element__card-name").textContent = item.name;
    const newElement = createCard(item.link, item.name);
    elementsArea.prepend(newElement);
  });
}

profileEditButton.addEventListener("click", openProfilePopup);
popupCloseProfileInputButton.addEventListener("click", closeProfilePopup);
profileInputForm.addEventListener("submit", saveProfileData);

profileAddPlaceButton.addEventListener("click", openNewPlacePopup);
popupCloseNewPlaceButton.addEventListener("click", closeNewPlacePopup);
newPlaceInputForm.addEventListener("submit", addNewPlaceCard);

popupCloseBigPictureButton.addEventListener("click", closeBigPicturePopup);

// elementsArea.addEventListener("click", function (evt) {
//   const eventTarget = evt.target;
//   if (eventTarget.dataset.trap) {
//     switch (eventTarget.dataset.trap) {
//       case "openPictureFullView":
//         openPictureFullView(eventTarget);
//         break;
//       case "likeButtonHandler":
//         eventTarget.classList.toggle("element__like-btn_liked");
//         break;
//       case "deleteButtonHandler":
//         let clickedCard = eventTarget.closest(".element");
//         clickedCard.remove();
//         break;
//     }
//   }
// });

createElementsArea(initialCards);

// delay for flex apple to popup windows in order not let to appear popups till their opacity will come to zero

// setTimeout(
//   popupWindows.forEach(function (item) {
//     item.classList.add("popup_smooth-opacity");
//   }),
//   1000
// );

// popupWindows.forEach(function (item) {
//   item.classList.add("popup-smooth-opacity");
// });
