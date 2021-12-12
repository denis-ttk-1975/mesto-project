const profileEditButton = document.querySelector(".profile__edit-button");
const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");
const popupSaveButton = document.querySelector(".popup__btn-save");
const popupCloseButton = document.querySelector(".popup__btn-close");
const popupWindow = document.querySelector(".popup");
const popupInputForm = document.querySelector(".popup__userdata-input");
const inputsPopup = popupInputForm.querySelectorAll("input");
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

function openPopup() {
  inputsPopup[0].value = profileMemberName.textContent;
  inputsPopup[1].value = profileMemberOccupation.textContent;
  popupWindow.classList.add("popup_opened");
}

function closePopup() {
  inputsPopup[0].value = "";
  inputsPopup[1].value = "";
  popupWindow.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileMemberName.textContent = inputsPopup[0].value;
  profileMemberOccupation.textContent = inputsPopup[1].value;
  popupWindow.classList.remove("popup_opened");
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

profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupSaveButton.addEventListener("click", formSubmitHandler);

createElementsArea(initialCards);
