import React from "react";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="sidebar__avatar" />
      <h2 className="sidebar__username">Riona</h2>
    </div>
  );
}

export default SideBar;
