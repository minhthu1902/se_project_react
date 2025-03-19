import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__caption">
        <p className="Item__label">Your Item</p>
        <button
          onClick={handleAddClick}
          type="submit"
          className="clothes__button"
        >
          + Add New Clothes
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems &&
          clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // TODO - pass as prop
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
  // const currentUser = useContext(CurrentUserContext); //get current user from context
  // const profileCards = clothingItems.filter(
  //   (item) => item.owner === currentUser._id
  // );
  // return (
  //   <div className="clothes-section">
  //     <div className="items-section">
  //       <p className="items__label">Your Items</p>
  //       <button className="items__button" onClick={handleAddClick}>
  //         Add Item
  //       </button>
  //     </div>
  //     <ul className="clothes-section__items">
  //       {" "}
  //       {profileCards.map((item) => (
  //         <ItemCard
  //           key={item._id}
  //           item={item}
  //           onCardClick={handleCardClick}
  //           onCardLike={onCardLike}
  //         />
  //       ))}
  //     </ul>
  //   </div>
  // );
}
export default ClothesSection;
