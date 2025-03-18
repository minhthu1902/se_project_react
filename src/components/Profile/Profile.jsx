import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardClick,
  selectedCard,
  handleEditProfileModal,
  handleLogOutClick,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileModal={handleEditProfileModal}
          handleLogOutClick={handleEditProfileClick}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
          onCardLike
        />
      </section>
    </div>
  );
}
export default Profile;
