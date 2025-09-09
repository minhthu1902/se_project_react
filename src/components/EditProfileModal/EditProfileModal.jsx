import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfileModal.css";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";
import { useUser } from "../../utils/contexts/UserContext.jsx";

export default function EditProfileModal({
  onClose,
  isOpen,
  onUpdateProfile,
}) {
  const { user } = useUser();
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  const [updateError, setUpdateError] = useState("");
  const [wrongField, setWrongField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdateProfile({
        name: values.name,
        avatar: values.avatar,
      });

      setWrongField("");
      setUpdateError("");
      onClose();
    } catch (err) {
      console.error("Profile update error:", err);
      
      // Handle different error structures more robustly
      let status = null;
      
      if (typeof err?.status === "number") {
        status = err.status;
      } else if (typeof err?.response?.status === "number") {
        status = err.response.status;
      } else if (typeof err?.message === "string" && !isNaN(Number(err.message))) {
        status = Number(err.message);
      }

      if (status === 400) {
        // Try to parse error message to identify specific field
        const errorMessage = err?.message || err?.response?.data?.message || "";
        let fieldToHighlight = "";
        let specificError = "Invalid input format. Please check all fields.";

        if (errorMessage.toLowerCase().includes("name")) {
          fieldToHighlight = "name";
          specificError = "Invalid name format.";
        } else if (
          errorMessage.toLowerCase().includes("avatar") ||
          errorMessage.toLowerCase().includes("url")
        ) {
          fieldToHighlight = "avatar";
          specificError = "Invalid avatar URL format.";
        }

        setWrongField(fieldToHighlight);
        setUpdateError(specificError);
      } else if (status === 422) {
        setWrongField("avatar");
        setUpdateError("Invalid avatar URL format.");
      } else {
        // Don't highlight a specific field for unknown errors
        setWrongField("");
        setUpdateError("Failed to update profile. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isOpen && user) {
      setValues({ 
        name: user.name || "", 
        avatar: user.avatar || "" 
      });
      setUpdateError("");
      setWrongField("");
    }
  }, [isOpen, user, setValues]);

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      type="submit"
      error={updateError}
    >
      <label
        htmlFor="profile-name"
        className={`modal__label ${
          wrongField === "name" ? "modal__label--error" : ""
        }`}
      >
        Name *
        <input
          type="text"
          name="name"
          className={`modal__input ${
            wrongField === "name" ? "input-error" : ""
          }`}
          id="profile-name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label
        htmlFor="profile-avatar"
        className={`modal__label ${
          wrongField === "avatar" ? "modal__label--error" : ""
        }`}
      >
        Avatar URL *
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            wrongField === "avatar" ? "input-error" : ""
          }`}
          id="profile-avatar"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
          required
        />
      </label>
      
      <div className="modal__auth-switch">
        <button
          type="submit"
          className="modal__submit modal__submit--save"
        >
          Save changes
        </button>
      </div>
    </ModalWithForm>
  );
}