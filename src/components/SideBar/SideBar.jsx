import React from "react";
import avatar from "../../assets/avatar.png";
import { useUser } from "../../utils/contexts/UserContext.jsx";
import "./SideBar.css";
function SideBar() {
  const { user, handleOpenEditProfileModal, handleLogout } = useUser();
  
  return (
    <div className="sidebar">
      <img 
        src={user?.avatar || avatar} 
        alt={user?.name || "user"} 
        className="sidebar__avatar" 
      />
      <h2 className="sidebar__username">{user?.name || "User"}</h2>
      <button
        className="sidebar__profile-action"
        type="button"
        onClick={handleOpenEditProfileModal}
      >
        Change profile data
      </button>
      <button
        className="sidebar__profile-action sidebar__profile-action_logout"
        type="button"
        onClick={handleLogout}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
