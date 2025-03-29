import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({
  // onCardClick,
  clothingItems,
  handleAddClick,
  handleCardClick,
}) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-caption">
        <p className="item__label">Your Items</p>
        <button
          onClick={handleAddClick}
          type="button"
          className="clothes__button"
        >
          {" "}
          + Add New Clothes
        </button>
      </div>
      <ul className="clothes__section-list">
        {clothingItems &&
          clothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                // TODO - pass as prop
                onCardClick={handleCardClick}
                handleCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </div>
  );
}
export default ClothesSection;
