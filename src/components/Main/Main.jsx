import "./Main.css";
import { useContext } from "react";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
// import { defaultClothingItems } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext.jsx";

//rendering and define type of weather data and clothing items
function Main({ weatherData, handleCardClick, clothingItems, handleCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id} // Ensure `item.id` is a unique identifier
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
