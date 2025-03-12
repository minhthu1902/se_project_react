const baseUrl = "http://localhost:3000";

function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems };
// function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }

// function request(url, options) {
//   return fetch(url, options).then(checkResponse);
// }

// function getItems() {
//   return request(`${baseUrl}/items`);
// }

// function deleteItem(itemId) {
//   return request(`${baseUrl}/items/${itemId}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });
// }

// function postItem({ name, imageUrl, weather }) {
//   return request(`${baseUrl}/items`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name, imageUrl, weather }),
//   });
// }

// export { getItems, postItem, deleteItem, checkResponse, request };

// export const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   return Promise.reject(`Error: ${res.status}`);
// };

// function request(url, options) {
//   return fetch(url, options).then(checkResponse);
// }

// export const getItems = () => {
//   return request(`${baseUrl}/items`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((data) => {
//     console.log("API response:", data);
//     return data;
//   });
// };
// export const deleteItem = (id) => {
//   console.log("API delete request for ID:", id);

//   return request(`${baseUrl}/items/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//   });
// };

// export const addItem = (item) => {
//   return request(`${baseUrl}/items`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(item),
//   });
// };
