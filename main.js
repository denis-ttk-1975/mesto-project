/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{tP:()=>oe,Zg:()=>G});var t=function(e,t,n){var o=e.querySelector(".".concat(t.name,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},n=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},o={baseUrl:"https://nomoreparties.co/v1/plus-cohort7/users/me",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},r={baseUrl:"https://nomoreparties.co/v1/plus-cohort7/cards",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},c={method:"PATCH",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/users/me",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},a={method:"POST",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/cards",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},u={method:"DELETE",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/cards/",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},i={method:"PUT",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/cards/likes/",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},l={method:"DELETE",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/cards/likes/",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},s={method:"PATCH",baseUrl:"https://nomoreparties.co/v1/plus-cohort7/users/me/avatar",headers:{authorization:"62256703-4f1c-4e78-bfd6-410f01323be3","Content-Type":"application/json"}},p=function(){return fetch(r.baseUrl,{headers:r.headers}).then((function(e){return e.json()}))},d=document.querySelector(".profile__member-name"),f=document.querySelector(".profile__lower-text"),m=document.querySelector(".popup-profile-input"),_=m.querySelector(".popup__userdata-input"),h=_.querySelector('input[name="full_name"]'),v=_.querySelector('input[name="about"]'),y=m.querySelectorAll(".popup__input-field"),b=m.querySelector('[type = "submit"]'),S=document.querySelector(".popup-new-place"),q=S.querySelector(".popup__userdata-input"),L=q.querySelector('input[name = "place_name"]'),k=q.querySelector('input[name = "picture_link"]'),E=S.querySelectorAll(".popup__input-field"),g=S.querySelector('[type = "submit"]'),C=document.querySelector(".popup-big-picture"),T=C.querySelector(".popup__picture"),w=C.querySelector(".popup__picture-figcaption"),x=document.querySelector(".popup-new-avatar"),U=x.querySelector(".popup__userdata-input").querySelector('input[name = "avatar_link"]'),j=x.querySelectorAll(".popup__input-field"),A=x.querySelector('[type = "submit"]');function H(e){e.classList.add("popup_opened"),document.addEventListener("keydown",N)}function P(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",N)}function z(){P(m)}function M(){P(S)}function O(){P(C)}function D(){P(x)}function B(e,t,n){var o=e.target;o.closest(".popup__container")||o.closest(".popup__btn-save")||o.closest(".popup__btn-close")||o.closest(".popup__figure-container")?e.stopPropagation():n(t)}function N(e){"Escape"===e.key&&P(document.querySelector(".popup_opened"))}var I=document.querySelector(".elements"),J=document.querySelector("#card-template").content;function Z(e,t,n,o,r,c){var a,s=J.querySelector(".element").cloneNode(!0),d=s.querySelector(".element__mask");return d.src=e,d.alt=t,s.querySelector(".element__card-name").textContent=t,s.querySelector(".element__rating").textContent=n,a=G,c.some((function(e){return a===e._id}))&&s.querySelector(".element__like-btn").classList.add("element__like-btn_liked"),G!=o&&s.querySelector(".element__delete").classList.add("element__delete_hidden"),s.dataset.cardId=r,d.addEventListener("click",(function(e){var t;t=e.target,T.alt=t.alt,T.src=t.src,w.textContent=t.alt,H(C)})),s.querySelector(".element__like-btn").addEventListener("click",(function(e){!function(e){var t,n=e.target.closest(".element").dataset.cardId,o=e.target.nextElementSibling;e.target.classList.contains("element__like-btn_liked")?(t=n,fetch(l.baseUrl+t,{method:l.method,headers:l.headers})).then((function(e){return e.json()})).then((function(e){o.textContent=e.likes.length})).catch((function(e){console.log(e)})):function(e){return fetch(i.baseUrl+e,{method:i.method,headers:i.headers})}(n).then((function(e){return e.json()})).then((function(e){o.textContent=e.likes.length})).catch((function(e){console.log(e)})),e.target.classList.toggle("element__like-btn_liked")}(e)})),s.querySelector(".element__delete").addEventListener("click",(function(e){var t;(t=e.target.closest(".element").dataset.cardId,fetch(u.baseUrl+t,{method:u.method,headers:u.headers})).then((function(e){e.ok&&p().then((function(e){return F(e)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})),s}function F(e){I.innerHTML="",e.forEach((function(e){var t=Z(e.link,e.name,e.likes.length,e.owner._id,e._id,e.likes);I.prepend(t)}))}var G,K={formSelector:".popup__userdata-input",inputSelector:".popup__input-field",submitButtonSelector:'[type = "submit"]',inactiveButtonClass:"popup__btn-save_inactive",inputErrorClass:"popup__input-field_error",errorClass:"popup__input-error_active"},Q=document.querySelector(".profile__edit-button"),R=document.querySelector(".profile__add"),V=document.querySelector(".profile__overlay-avatar"),W=document.querySelector('form[name="user-data"]'),X=document.querySelector('form[name="new-place"]'),Y=document.querySelector('form[name="new-avatar"]'),$=m.querySelector(".popup__btn-close"),ee=S.querySelector(".popup__btn-close"),te=C.querySelector(".popup__btn-close"),ne=x.querySelector(".popup__btn-close");function oe(){var e=document.querySelector(".profile__avatar"),t=document.querySelector(".profile__member-name"),n=document.querySelector(".profile__lower-text");fetch(o.baseUrl,{headers:o.headers}).then((function(e){return e.json()})).then((function(o){t.textContent=o.name,n.textContent=o.about,e.src=o.avatar,G=o._id})).catch((function(e){console.log(e)}))}p().then((function(e){F(e)})).catch((function(e){console.log(e)})),Q.addEventListener("click",(function(){return function(e){h.value=d.textContent,v.value=f.textContent,t(m,h,e),t(m,v,e),n(Array.from(y),b,e),H(m)}(K)})),$.addEventListener("click",z),W.addEventListener("submit",(function(e){var t,n;e.preventDefault(),b.innerHTML="Сохранение...",(t=h.value,n=v.value,fetch(c.baseUrl,{method:c.method,headers:c.headers,body:JSON.stringify({name:t,about:n})})).then((function(e){if(!e.ok)return Promise.reject(e.status);oe()})).catch((function(e){console.log(e)})).finally((function(){return b.innerHTML="Сохранить"})),P(m)})),m.addEventListener("mousedown",(function(e){return B(e,m,z)})),R.addEventListener("click",(function(){return function(e){t(S,L,e),t(S,k,e),L.value="",k.value="",n(Array.from(E),g,e),H(S)}(K)})),ee.addEventListener("click",M),X.addEventListener("submit",(function(e){var t,n;e.preventDefault(),document.querySelector(".popup__btn-save_new-place-input").innerHTML="Сохранение...",(t=L.value,n=k.value,fetch(a.baseUrl,{method:a.method,headers:a.headers,body:JSON.stringify({name:t,link:n})})).then((function(e){e.ok&&p().then((function(e){return F(e)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)})).finally((function(){document.querySelector(".popup__btn-save_new-place-input").innerHTML="Создать"})),P(S)})),S.addEventListener("mousedown",(function(e){return B(e,S,M)})),te.addEventListener("click",O),C.addEventListener("mousedown",(function(e){return B(e,C,O)})),V.addEventListener("click",(function(){return function(e){t(x,U,e),U.value="",n(Array.from(j),A,e),H(x)}(K)})),ne.addEventListener("click",D),Y.addEventListener("submit",(function(e){var t;e.preventDefault(),document.querySelector(".popup__btn-save_avatar-input").innerHTML="Сохранение...",(t=U.value,fetch(s.baseUrl,{method:s.method,headers:s.headers,body:JSON.stringify({avatar:t})})).then((function(e){return e.json()})).then((function(e){document.querySelector(".profile__member-name").textContent=e.name,document.querySelector(".profile__lower-text").textContent=e.about,document.querySelector(".profile__avatar").src=e.avatar})).catch((function(e){console.log(e)})).finally((function(){document.querySelector(".popup__btn-save_avatar-input").innerHTML="Сохранить"})),P(x)})),x.addEventListener("mousedown",(function(e){return B(e,x,D)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(o){o.addEventListener("submit",(function(e){e.preventDefault()})),function(e,o){var r=Array.from(e.querySelectorAll(o.inputSelector)),c=e.querySelector(o.submitButtonSelector);n(r,c,o),r.forEach((function(a){a.addEventListener("input",(function(){!function(e,n,o){n.validity.valid?t(e,n,o):function(e,t,n,o){var r=e.querySelector(".".concat(t.name,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,n,n.validationMessage,o)}(e,a,o),n(r,c,o)}))}))}(o,e)}))}(K),oe()})();