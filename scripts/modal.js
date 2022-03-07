// закрытие popup по клику на overlay
var overlay = document.querySelectorAll(".popup");
var popup = document.querySelectorAll(".popup__container");

overlay.addEventListener("click", function () {
  shimModalContent.classList.add("shim-modal-show");
});

shimModalContent.addEventListener("click", function (event) {
  event.stopPropagation();
  shimModalContent.classList.remove("shim-modal-show");
});

function overlayClickHandler  (event, popupName, ) {

    let target = event.target;
    if(target.closest(".popup-container") && !target.closest(".popup__btn-save") && !target.closest(".popup__btn-close"))
    event.stopPropagation();
    else if( target.closest(".shim-modal-content") )
    shimModalContent.classList.remove("shim-modal-show");
    else shimModalContent.classList.add("shim-modal-show");
}};
