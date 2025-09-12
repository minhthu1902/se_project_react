import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onLogin,
  onSwitchToLogin,
}) {
  // onClose: function to close the modal
  // isOpen: boolean to indicate if the modal is open
  // onRegister: function to handle registration
  // onLogin: function to handle automatic login after registration
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [registerError, setRegisterError] = useState("");
  const [wrongField, setWrongField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send registration data to /signup endpoint
      await onRegister({
        name: values.name,
        avatar: values.avatar,
        email: values.email,
        password: values.password,
      });

      // Clear any previous errors
      setWrongField("");
      setRegisterError("");

      // Automatically log in the user after successful registration
      try {
        await onLogin({
          email: values.email,
          password: values.password,
        });

        // Close the modal only after successful login
        onClose();
      } catch (loginErr) {
        console.error("Auto-login after registration failed:", loginErr);
        // Registration succeeded but login failed
        setRegisterError("Registration successful! Switching to login mode...");
        // Switch to login mode with pre-filled credentials
        setTimeout(() => {
          onSwitchToLogin({
            email: values.email,
            password: values.password,
          });
        }, 1500); // Give user time to see the success message
      }
    } catch (err) {
      console.error("Registration error:", err);
      console.error("Error structure:", {
        message: err?.message,
        status: err?.status,
        response: err?.response,
        code: err?.code,
      });

      // Handle different error structures more robustly, handle multiple error structures robustly
      let status = null;

      if (err?.code === "INVALID_CREDENTIALS") {
        status = 401;
      } else if (typeof err?.status === "number") {
        status = err.status;
      } else if (typeof err?.response?.status === "number") {
        status = err.response.status;
      } else if (
        typeof err?.message === "string" &&
        !isNaN(Number(err.message))
      ) {
        status = Number(err.message);
      }

      if (status === 409) {
        setWrongField("email");
        setRegisterError("Email already exists. Please use a different email.");
      } else if (status === 400) {
        // Try to parse error message to identify specific field
        const errorMessage = err?.message || err?.response?.data?.message || "";
        let fieldToHighlight = "";
        let specificError = "Invalid input format. Please check all fields.";

        if (errorMessage.toLowerCase().includes("email")) {
          fieldToHighlight = "email";
          specificError = "Invalid email format.";
        } else if (errorMessage.toLowerCase().includes("password")) {
          fieldToHighlight = "password";
          specificError = "Invalid password format.";
        } else if (errorMessage.toLowerCase().includes("name")) {
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
        setRegisterError(specificError);
      } else if (status === 422) {
        setWrongField("avatar");
        setRegisterError("Invalid avatar URL format.");
      } else {
        // Don't highlight a specific field for unknown errors
        setWrongField("");
        setRegisterError("Registration failed. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", avatar: "", email: "", password: "" });
      setRegisterError("");
      setWrongField("");
    }
  }, [isOpen, setValues]);

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      type="submit"
      error={registerError}
    >
      <label
        htmlFor="email-register-modal"
        className={`modal__label ${
          wrongField === "email" ? "modal__label--error" : ""
        }`}
      >
        Email*
        <input
          type="email"
          name="email"
          className={`modal__input ${
            wrongField === "email" ? "input-error" : ""
          }`}
          id="email-register-modal"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>

      <label
        htmlFor="password-register-modal"
        className={`modal__label ${
          wrongField === "password" ? "modal__label--error" : ""
        }`}
      >
        Password*
        <input
          type="password"
          name="password"
          className={`modal__input ${
            wrongField === "password" ? "input-error" : ""
          }`}
          id="password-register-modal"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>

      <label
        htmlFor="name-register-modal"
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
          id="name-register-modal"
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label
        htmlFor="avatar-register-modal"
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
          id="avatar-register-modal"
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
          required
        />
      </label>
      
      <div className="modal__auth-switch">
        <button
          type="submit"
          className="modal__submit modal__submit--register"
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__auth-link"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
}
