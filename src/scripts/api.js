const apiConfig = {
  url: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '0d53c2b8-7374-4b0b-bf09-0cfb2157c4bb',
    'Content-Type': 'application/json'
  }
}

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${apiConfig.url}/users/me`,  {
    headers: apiConfig.headers
  })
  .then(handleResponse);
};

export function updateUserInfo(name, about) {
  return fetch(`${apiConfig.url}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: name, 
      about: about
    })
  })
  .then(handleResponse);
}

export function getInitialCards() {
  return fetch(`${apiConfig.url}/cards`, {
    headers: apiConfig.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }
  )
}

export function postNewCard(name, link) {
  return fetch(`${apiConfig.url}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    }),
    headers: apiConfig.headers
  })
  .then(handleResponse);
}

export function removeFromCardsList(cardID) {
  return fetch(`${apiConfig.url}/cards/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(handleResponse);
}

export function addLike(cardID) {
  return fetch(`${apiConfig.url}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: apiConfig.headers
  })
  .then(handleResponse);
}

export function removeLike(cardID) {
  return fetch(`${apiConfig.url}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  })
  .then(handleResponse);
}
