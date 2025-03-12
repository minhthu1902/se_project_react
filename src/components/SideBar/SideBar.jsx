import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="default avatar" className="side__avatar" />
      <h2 className="sidebar__username">User Name</h2>
    </div>
  );
}

export default SideBar;
