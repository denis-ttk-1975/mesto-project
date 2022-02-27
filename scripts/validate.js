const forms = document.forms;

const formUserData = forms["user-data"];
const formNewPlace = forms["new-place"];

console.log(formUserData.elements);
console.log(formNewPlace.elements);
// console.log(forms);
// forms.forEach((item) => console.log(item));
// console.log(document.forms);
// console.log(document.forms["user-data"]);
// console.log(document.forms.user - data);

const nameInputField = formUserData.elements.full_name;
console.log("nameInputField: ", nameInputField);
const occupationInputField = formUserData.elements.about;
console.log("occupationInputField: ", occupationInputField);

const placeInputField = formNewPlace.elements.place_name;
console.log("placeInputField: ", placeInputField);
const pictureInputField = formNewPlace.elements.picture_link;
console.log("pictureInputField: ", pictureInputField);

console.log("nameInputField: ", nameInputField.validity.valid);
console.log("occupationInputField: ", occupationInputField.validity.valid);

nameInputField.addEventListener("input", function (evt) {
  console.log(nameInputField.validity.valid);
});
occupationInputField.addEventListener("input", function (evt) {
  console.log(occupationInputField.validity.valid);
});
