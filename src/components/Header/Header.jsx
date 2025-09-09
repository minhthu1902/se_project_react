import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext.jsx";
import { useModal } from "../../utils/contexts/ModalContext.jsx";

function Header({ handleAddClick, weatherData }) {
  const { user, handleLogout } = useUser();
  const { handleOpenLoginModal, handleOpenRegisterModal } = useModal();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      {/* add toggle switch here */}
      <div className="header__controls">
        <ToggleSwitch />
        {user && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
      </div>
      
      {user ? (
        <div className="header__user-section">
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{user.name}</p>
              <img src={user.avatar || avatar} alt="user name" className="header__avatar" />
            </div>
          </Link>
          <button
            onClick={handleLogout}
            type="button"
            className="header__logout-btn"
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="header__auth-buttons">
          <button
            onClick={handleOpenLoginModal}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
          <button
            onClick={handleOpenRegisterModal}
            type="button"
            className="header__register-btn"
          >
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
