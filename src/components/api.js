const configAvatar = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7/users/me",
  headers: {
    authorization: "62256703-4f1c-4e78-bfd6-410f01323be3",
    "Content-Type": "application/json",
  },
};

const configCardsField = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7/cards",
  headers: {
    authorization: "62256703-4f1c-4e78-bfd6-410f01323be3",
    "Content-Type": "application/json",
  },
};

const configPatchAvatar = {
  method: "PATCH",
  baseUrl: "https://nomoreparties.co/v1/plus-cohort7/users/me",
  headers: {
    authorization: "62256703-4f1c-4e78-bfd6-410f01323be3",
    "Content-Type": "application/json",
  },
};

export const getUserProfile = () => {
  return fetch(configAvatar.baseUrl, { headers: configAvatar.headers }).then(
    (res) => res.json()
  );
};

export const getCardsArray = () => {
  return fetch(configCardsField.baseUrl, {
    headers: configCardsField.headers,
  }).then((res) => res.json());
};

export const setUserProfile = (name, about) => {
  return fetch(configPatchAvatar.baseUrl, {
    method: configPatchAvatar.method,
    headers: configPatchAvatar.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  });
  //.then((res) => res.json());
};