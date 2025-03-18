import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css";

function Profile({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}
export default Profile;
