const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const error = new Error(`Error: ${res.status}`);
    error.status = res.status;
    return Promise.reject(error);
  }
};

// Helper function to get authorization headers
const getAuthHeaders = (url, options = {}) => {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Enhanced request function with automatic token refresh
const authenticatedRequest = async (url, options = {}) => {
  const makeRequest = (headers) => {
    return fetch(url, {
      ...options,
      headers: { ...getAuthHeaders(), ...headers },
    }).then(checkResponse);
  };

  try {
    return await makeRequest();
  } catch (error) {
    // If it's a 401 error, try to refresh the token
    if (error.status === 401) {
      try {
        const refreshResponse = await refreshToken();
        if (refreshResponse.token) {
          localStorage.setItem("jwt", refreshResponse.token);
          // Retry the original request with new token
          return await makeRequest();
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Clear invalid token and throw error
        localStorage.removeItem("jwt");
        throw new Error("Session expired. Please log in again.");
      }
    }
    throw error;
  }
};

// special function for fetching and checking responses not to duplicate it in every request
export const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};
// API function to use authorization headers
function getItems() {
  return authenticatedRequest(`${baseUrl}/items`, {
    method: "GET",
    headers: getAuthHeaders(), // added headers to the request because it is not in the options
  });
}

function deleteCard(id) {
  return authenticatedRequest(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

function addItem({ name, imageUrl, weather }) {
  console.log(name, imageUrl, weather);
  return authenticatedRequest(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

// Authentication functions
function register({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);
}

function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

function checkToken(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function refreshToken() {
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function updateUser({ name, avatar }) {
  return authenticatedRequest(`${baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify({ name, avatar }),
  });
}

function addCardLike(id) {
  return authenticatedRequest(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
  });
}

function removeCardLike(id) {
  return authenticatedRequest(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
  });
}

export {
  getItems,
  addItem,
  deleteCard,
  register,
  signin,
  checkToken,
  refreshToken,
  updateUser,
  addCardLike,
  removeCardLike,
};
// function checkResponse(res) {
//   return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
// }
