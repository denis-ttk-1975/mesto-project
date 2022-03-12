const elementsArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

import {
  closePopup,
  openPictureFullView,
  popupNewPlaceInput,
  inputsPlaceNameNewPlacePopup,
  inputsPictureLinkNewPlacePopup,
} from "./modal.js";

import {
  setNewCard,
  getCardsArray,
  deleteCard,
  setLike,
  deleteLike,
} from "./api.js";

import { userID } from "./index.js";

function findUserLike(likeData, myUserId) {
  return likeData.some(function (likerData) {
    return myUserId === likerData._id;
  });
}

function likeButtonHandler(evt) {
  const cardID = evt.target.closest(".element").dataset.cardId;
  const likeCounter = evt.target.nextElementSibling;

  if (evt.target.classList.contains("element__like-btn_liked")) {
    deleteLike(cardID)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        likeCounter.textContent = res.likes.length;
      });
  } else {
    setLike(cardID)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        likeCounter.textContent = res.likes.length;
      });
  }

  evt.target.classList.toggle("element__like-btn_liked");
}

function createCard(source, title, rating, ownerID, cardID, likes) {
  const newCardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardImage = newCardElement.querySelector(".element__mask");
  cardImage.src = source;
  cardImage.alt = title;
  newCardElement.querySelector(".element__card-name").textContent = title;
  newCardElement.querySelector(".element__rating").textContent = rating;

  // проверяем наличие лайка на карточке от нашего пользователя
  if (findUserLike(likes, userID)) {
    newCardElement
      .querySelector(".element__like-btn")
      .classList.add("element__like-btn_liked");
  }

  // скрываем кнопку удаления карточки если карта создана другим пользователем
  if (userID != ownerID) {
    newCardElement
      .querySelector(".element__delete")
      .classList.add("element__delete_hidden");
  }
  // устанавливаем пользовательский атрибут ID на карточку из полученного набора данных с сервера
  newCardElement.dataset.cardId = cardID;
  // далее устанавливаете 3 обработчика(открытие, лайк, удаление)
  cardImage.addEventListener("click", function (evt) {
    openPictureFullView(evt.target);
  });
  newCardElement
    .querySelector(".element__like-btn")
    .addEventListener("click", function (evt) {
      likeButtonHandler(evt);
    });
  newCardElement
    .querySelector(".element__delete")
    .addEventListener("click", function (evt) {
      const cardId = evt.target.closest(".element").dataset.cardId;
      deleteCard(cardId).then((res) => {
        if (res.ok) {
          getCardsArray().then((res) => createElementsArea(res));
        }
      });
    });
  // возвращаем готовую карточку
  return newCardElement;
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
  elementsArea.innerHTML = "";
  array.forEach(function (item) {
    const newElement = createCard(
      item.link,
      item.name,
      item.likes.length,
      item.owner._id,
      item._id,
      item.likes
    );
    elementsArea.prepend(newElement);
  });
}
