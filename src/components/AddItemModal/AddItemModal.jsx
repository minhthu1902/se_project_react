import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);
  return (
    <ModalWithForm
      title="New Garment"
      name="new-card"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-item-name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="add-item-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="add-item-imageUrl" className="modal__label">
        {" "}
        Image
        <input
          type="url"
          className="modal__input"
          id="add-item-imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>

      <fieldset className="modal__radio-button">
        <legend className="modal__legend"> Select the weather type: </legend>
        <label htmlFor="add-item-hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="add-item-hot"
            name="weather"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
            className="modal__radio-input"
          />{" "}
          <span className="modal__radio-text">Hot</span>
        </label>

        <label htmlFor="add-item-warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="add-item-warm"
            name="weather"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
            className="modal__radio-input"
          />{" "}
          <span className="modal__radio-text">Warm</span>
        </label>

        <label htmlFor="add-item-cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="add-item-cold"
            name="weather"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
            className="modal__radio-input"
          />{" "}
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
