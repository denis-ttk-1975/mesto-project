const elementsArea = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;

import {
  closePopup,
  openPictureFullView,
  popupNewPlaceInput,
  inputsPlaceNameNewPlacePopup,
  inputsPictureLinkNewPlacePopup,
  popupNewAvatarInput,
  inputsAvatarLinkNewAvatarPopup,
} from "./modal.js";

import {
  setNewCard,
  getCardsArray,
  deleteCard,
  setLike,
  deleteLike,
  loadNewAvatar,
} from "./api.js";

import { userID, summonProfile } from "./index.js";
//! функция проверки есть ли у карточки лайк поставленный текущим пользователем ранее и сохраненный в массиве на сервере
function findUserLike(likeData, myUserId) {
  return likeData.some(function (likerData) {
    return myUserId === likerData._id;
  });
}
//! функция удаления и добавления лайка от текущего пользователя с окрашиванием сердечка
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
//! функция создания карточки из объекта с набором данных для карточки
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
//! функция создания поля с карточками из массива
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
//! функция загрузки массива с данными карточек из сервера и формирования из него поля карточек
export function addNewPlaceCard(evt) {
  evt.preventDefault();
  document.querySelector(".popup__btn-save_new-place-input").textContent =
    "Сохранение...";

  for (let i = 1; i < 1000000; i++) {
    console.log(i);
  }

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
  document.querySelector(".popup__btn-save_new-place-input").textContent =
    "Создать";
}
//! функция загрузки картинки нового аватара
export function addNewAvatar(evt) {
  evt.preventDefault();

  console.log(
    document.querySelector(".popup__btn-save_avatar-input").innerHTML
  );

  document.getElementsByClassName("popup__btn-save_avatar-input").innerHTML =
    "Сохранение...";

  for (let i = 1; i < 1000000; i++) {
    console.log(i);
  }

  const url = inputsAvatarLinkNewAvatarPopup.value;

  loadNewAvatar(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      summonProfile();
    });

  inputsAvatarLinkNewAvatarPopup.value = "";
  closePopup(popupNewAvatarInput);
  document.querySelector(".popup__btn-save_avatar-input").innerHTML =
    "Сохранить";
}
