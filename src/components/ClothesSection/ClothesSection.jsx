import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
// import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleCardClick,
  handleOpenModal,
}) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              // TODO - pass as prop
              onCardClick={onCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default ClothesSection;
