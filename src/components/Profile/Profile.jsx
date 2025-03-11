import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  handleEditProfileClick,
  onCardLike,
  onLogOut,
}) {
  return (
    <div className="profile">
      <section className="profile-sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          onLogOut={onLogOut}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}
export default Profile;
