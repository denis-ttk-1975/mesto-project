const profileEditButton = document.querySelector(".profile__edit-button");
const profileMemberName = document.querySelector(".profile__member-name");
const profileMemberOccupation = document.querySelector(".profile__lower-text");
const popupSaveButton = document.querySelector(".popup__btn-save");
const popupCloseButton = document.querySelector(".popup__btn-close");
const popupWindow = document.querySelector(".popup");
const popupInputForm = document.querySelector(".popup__userdata-input");
const inputsPopup = popupInputForm.querySelectorAll("input");

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

profileEditButton.addEventListener("click", openPopup);
popupCloseButton.addEventListener("click", closePopup);
popupSaveButton.addEventListener("click", formSubmitHandler);
