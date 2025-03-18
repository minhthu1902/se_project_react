import React from "react";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="sidebar__avatar" />
      <h2 className="sidebar__username">User Name</h2>
    </div>
  );
}

export default SideBar;
