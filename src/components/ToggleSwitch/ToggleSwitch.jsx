import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span
        className={"toggle-switch__text toggle-switch__text_F"}
        style={{
          color: `${currentTemperatureUnit === "F" ? "white" : ""}`,
        }}
      >
        F
      </span>
      <span
        className="toggle-switch__text toggle-switch__text_C"
        style={{
          color: `${currentTemperatureUnit === "C" ? "white" : ""}`,
        }}
      >
        {" "}
        C{" "}
      </span>
    </label>
  );
}

// The new version of the code uses the new Context API to get the current temperature unit and the handleToggleSwitchChange function. It also uses the new class names for the toggle switch.
