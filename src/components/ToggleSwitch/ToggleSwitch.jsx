import "./ToggleSwitch.css";
import { useContext } from "react";
import currentTempUnitContext from "../..contexts/currentTempUnit.jsx";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    currentTempUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        value=""
        onChange={handleToggleSwitchChange}
        checked={isChecked}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__text toggle-switch__text_F"> F </span>
      <span className="toggle-switch__text toggle-switch__text_C"> C </span>
    </label>
  );
}

// The new version of the code uses the new Context API to get the current temperature unit and the handleToggleSwitchChange function. It also uses the new class names for the toggle switch.
