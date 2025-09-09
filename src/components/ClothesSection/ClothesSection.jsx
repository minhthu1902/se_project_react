import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useUser } from "../../utils/contexts/UserContext.jsx";

function ClothesSection({
  // onCardClick,
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleCardLike,
}) {
  const { user } = useUser();
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
          clothingItems
            .filter((item) => item.owner === user?._id)
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                />
              );
            })}
      </ul>
    </div>
  );
}
export default ClothesSection;
