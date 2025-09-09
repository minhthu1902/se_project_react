import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer";
import "./App.css";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
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
} from "../../utils/Api.js";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext.jsx";
import UserContext from "../../utils/contexts/UserContext.jsx";
import ModalContext from "../../utils/contexts/ModalContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 99 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [cardToDelete, setCardToDelete] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // User authentication state
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    console.log("Button clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
        // If it's an auth error, log out the user
        if (error.includes("401") || error.includes("403")) {
          handleLogout();
        }
      });
  };
  const handleDeleteClick = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-garment");
    // need card as parameter to delete card
  };
  const handleCardDelete = () => {
    console.log(cardToDelete);
    deleteCard(cardToDelete._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        setCardToDelete(null);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
        // If it's an auth error, log out the user
        if (error.includes("401") || error.includes("403")) {
          handleLogout();
        }
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    
    // Only allow liking if user is logged in
    if (!token || !user) {
      console.log("User must be logged in to like items");
      return;
    }

    const likeRequest = isLiked ? removeCardLike(id) : addCardLike(id);
    
    likeRequest
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((error) => {
        console.error("Failed to update like:", error);
        // If it's an auth error, log out the user
        if (error.includes("401") || error.includes("403")) {
          handleLogout();
        }
      });
  };

  // Authentication handlers
  const handleLogin = async ({ email, password }) => {
    try {
      const response = await signin({ email, password });

      // Check if server gave access token
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        setUser(response.user);
        setIsLoginModalOpen(false);
        setIsRegisterModalOpen(false);
        return response;
      } else {
        throw new Error("No token received from server");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const handleRegister = async ({ name, avatar, email, password }) => {
    try {
      const response = await register({ name, avatar, email, password });
      
      // Automatically log in the user after successful registration
      try {
        const loginResponse = await handleLogin({ email, password });
        return { ...response, loginResponse };
      } catch (loginError) {
        console.error("Auto-login after registration failed:", loginError);
        // Registration succeeded but auto-login failed
        throw new Error("Registration successful! Please log in manually.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const handleToggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleSwitchToLogin = ({ email, password }) => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
    setIsLoginMode(true);
    // Pre-fill login form with the credentials
    // This would need to be handled by the LoginModal component
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsLoginMode(true);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginMode(false);
  };

  const handleCloseAuthModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleOpenEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleUpdateProfile = async ({ name, avatar }) => {
    try {
      const updatedUser = await updateUser({ name, avatar });
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
          setUser(null);
        });
    }
  }, []);

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          await checkToken(token);
        } catch (error) {
          console.error("Token validation failed during periodic check:", error);
          // Try to refresh the token
          try {
            const refreshResponse = await refreshToken();
            if (refreshResponse.token) {
              localStorage.setItem("jwt", refreshResponse.token);
              setUser(refreshResponse.user);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            handleLogout();
          }
        }
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Fetch items on page load for all users (logged in or not)
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
        // If it's an auth error and user is logged in, log out the user
        if ((error.includes("401") || error.includes("403")) && user) {
          handleLogout();
        }
      });
  }, []); // Remove user dependency - fetch items once on mount

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleRegister,
        handleLogout,
        handleUpdateProfile,
        handleOpenEditProfileModal,
      }}
    >
      <ModalContext.Provider
        value={{
          isLoginModalOpen,
          isRegisterModalOpen,
          handleOpenLoginModal,
          handleOpenRegisterModal,
          handleCloseAuthModals,
        }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              clothingItems={clothingItems}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteClick={handleDeleteClick}
                    handleCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleDeleteClick={handleDeleteClick}
                      handleAddClick={handleAddClick}
                      handleCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            title="New garment"
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteClick}
            handleCardClick={handleCardClick}
          />
          <DeleteConfirmModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            handleCardDelete={handleCardDelete}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={handleCloseAuthModals}
            isLoginMode={isLoginMode}
            onLogin={handleLogin}
            onRegister={handleRegister}
            onToggleMode={handleToggleAuthMode}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={handleCloseAuthModals}
            onRegister={handleRegister}
            onLogin={handleLogin}
            onSwitchToLogin={handleSwitchToLogin}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={handleCloseEditProfileModal}
            onUpdateProfile={handleUpdateProfile}
          />
          <Footer />
        </div>
        </CurrentTemperatureUnitContext.Provider>
      </ModalContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
