import { useEffect, useState } from "react";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { coordinates, APIkey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import Footer from "../Footer/Footer.jsx";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
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
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="Hot" className="modal__label modal__label_type_radio">
            <input id="Hot" type="radio" className="modal__radio-input" /> Hot
          </label>
          <label
            htmlFor="Warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="Warm" type="radio" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="Cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="Cold" type="radio" className="modal__radio-input" /> Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
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
