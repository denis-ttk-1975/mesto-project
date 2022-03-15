const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7/",
  headers: {
    authorization: "62256703-4f1c-4e78-bfd6-410f01323be3",
    "Content-Type": "application/json",
  },
};

export const getUserProfile = () => {
  return fetch(config.baseUrl + "users/me", {
    headers: config.headers,
  }).then((res) => res.json());
};

export const getCardsArray = () => {
  return fetch(config.baseUrl + "cards", {
    headers: config.headers,
  }).then((res) => res.json());
};

export const setUserProfile = (name, about) => {
  return fetch(config.baseUrl + "users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
};

export const setNewCard = (name, link) => {
  return fetch(config.baseUrl + "cards", {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  });
};

export const deleteCard = (cardId) => {
  return fetch(config.baseUrl + "cards/" + cardId, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const setLike = (cardId) => {
  return fetch(config.baseUrl + "cards/likes/" + cardId, {
    method: "put",
    headers: config.headers,
  });
};

export const deleteLike = (cardId) => {
  return fetch(config.baseUrl + "cards/likes/" + cardId, {
    method: "delete",
    headers: config.headers,
  });
};

export const loadNewAvatar = (url) => {
  return fetch(config.baseUrl + "users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
};
