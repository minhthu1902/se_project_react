import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer";
import "./App.css";
import React from "react";
import Profile from "../Profile/Profile.jsx";

import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { getItems } from "../../utils/Api.js";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
    condition: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
    // setIsDeleteConfirmModalOpen(false); //close delete confirm modal
    // setItemToDelete(null); //reset item to delete state
  };

  const [clothingItems, setClothingItems] = useState([]);
  // const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  // const [isWeatherDataLoading, setIsWeatherDataLoading] = useState(true);
  // const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
  //   useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  const handleAddItemModalSubmit = (name, imageUrl, weather) => {
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);
  return (
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
              path="/se_project_react/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  // onDelete={handleDeleteClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  // clothingItems={clothingItems}
                  // onDelete={handleDeleteClick}
                  // onAddClick={handleAddClick}
                />
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
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

// function App() {
//   const [weatherData, setWeatherData] = useState({
//     type: "",
//     temp: { F: 999, C: 999 },
//     city: "",
//   });
//   const [activeModal, setActiveModal] = useState("");
//   const [selectedCard, setSelectedCard] = useState({});
//   const [temp, setTemp] = useState(0);
//   const [CurrentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
//   const [clothingItems, setClothingItems] = useState([]);
//   const [addClothingItems, setAddClothingItems] = useState([]);

//   const handleCardClick = (card) => {
//     setActiveModal("preview");
//     setSelectedCard(card);
//   };

//   const handleAddClick = () => {
//     setActiveModal("add-garment");
//   };

//   const closeActiveModal = () => {
//     setActiveModal("");
//   };

//   const onAddItem = (name, imageUrl, weather) => {
//     console.log({ name, imageUrl, weather });
//   };
//   const handleToggleSwitchChange = () => {
//     if (CurrentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
//     if (CurrentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
//   };

//   useEffect(() => {
//     getWeather(coordinates, APIkey)
//       .then((data) => {
//         const filteredData = filterWeatherData(data);
//         setWeatherData(filteredData);
//       })
//       .catch(console.error);
//   }, []);

//   useEffect(() => {
//     getItems()
//       .then((data) => {
//         console.log(data);
//         setClothingItems(data);
//       })
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="page">
//       <CurrentTemperatureUnitContext.Provider
//         value={{ CurrentTemperatureUnit, handleToggleSwitchChange }}
//       >
//         <div className="page__content">
//           <Header handleAddClick={handleAddClick} weatherData={weatherData} />
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 <Main
//                   clothingItems={clothingItems}
//                   weatherData={weatherData}
//                   handleCardClick={handleCardClick}
//                 />
//               }
//             ></Route>
//             <Route
//               path="/profile"
//               element={<Profile onCardClick={handleCardClick} />}
//             ></Route>
//           </Routes>
//           <Footer />
//         </div>
//         ;
//         {activeModal === "add-garment" && (
//           <AddItemModal
//             closeActiveModal={closeActiveModal}
//             isOpen={activeModal === "add-garment"}
//             onAddItem={onAddItem}
//           />
//         )}
//         <ItemModal
//           activeModal={activeModal}
//           card={selectedCard}
//           onClose={closeActiveModal}
//         />
//       </CurrentTemperatureUnitContext.Provider>
//     </div>
//   );
// }

export default App;
