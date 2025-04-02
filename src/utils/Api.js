const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Error: ${res.status}`);
  }
};
export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

function deleteCard(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  }).then(checkResponse);
}

function addItem({ name, imageUrl, weather }) {
  console.log(name, imageUrl, weather);
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkResponse);
}
export { getItems, addItem, deleteCard };
// function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }
