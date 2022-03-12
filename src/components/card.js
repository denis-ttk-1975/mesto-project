const elementsArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

import {
  closePopup,
  openPictureFullView,
  popupNewPlaceInput,
  inputsPlaceNameNewPlacePopup,
  inputsPictureLinkNewPlacePopup,
} from "./modal.js";

import { setNewCard, getCardsArray } from "./api.js";

function createCard(source, title) {
  const newCardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = newCardElement.querySelector(".element__mask");
  cardImage.src = source;
  cardImage.alt = title;
  newCardElement.querySelector(".element__card-name").textContent = title;
  cardImage.addEventListener("click", function (evt) {
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

export function addNewPlaceCard(evt) {
  evt.preventDefault();

  // const newElement = createCard(
  //   inputsPictureLinkNewPlacePopup.value,
  //   inputsPlaceNameNewPlacePopup.value
  // );
  // elementsArea.prepend(newElement);

  setNewCard(
    inputsPlaceNameNewPlacePopup.value,
    inputsPictureLinkNewPlacePopup.value
  ).then((res) => {
    if (res.ok) {
      getCardsArray().then((res) => createElementsArea(res));
    }
  });

  inputsPlaceNameNewPlacePopup.value = "";
  inputsPictureLinkNewPlacePopup.value = "";
  closePopup(popupNewPlaceInput);
}

export function createElementsArea(array) {
  array.forEach(function (item) {
    const newElement = createCard(item.link, item.name);
    elementsArea.prepend(newElement);
  });
}
