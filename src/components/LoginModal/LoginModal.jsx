import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm.js";

export default function LoginModal({
  onClose,
  isOpen,
  isLoginMode,
  onLogin,
  onRegister,
  onToggleMode,
}) {
  //onClose: function to close the modal, isOpen: boolean to indicate if the modal is open
  //isLoginMode: boolean to indicate if the modal is in login mode or register mode
  //onLogin: function to handle login, onRegister: function to handle register
  //onToggleMode: function to toggle between login and register mode
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const [loginError, setLoginError] = useState("");
  const [wrongField, setWrongField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await onLogin({ email: values.email, password: values.password });
      } else {
        await onRegister({
          name: values.name,
          avatar: values.avatar,
          email: values.email,
          password: values.password,
        });
      }
      setWrongField("");
      setLoginError("");
    } catch (err) {
      console.error("Login/Register error:", err);
      
      // Handle different error structures more robustly
      let status = null;
      
      if (err?.code === "INVALID_CREDENTIALS") {
        status = 401;
      } else if (typeof err?.status === "number") {
        status = err.status;
      } else if (typeof err?.response?.status === "number") {
        status = err.response.status;
      } else if (typeof err?.message === "string" && !isNaN(Number(err.message))) {
        status = Number(err.message);
      }

      if (status === 401) {
        setWrongField("password");
        setLoginError("Email or password incorrect");
      } else if (status === 409) {
        setWrongField("email");
        setLoginError(isLoginMode ? "Invalid email or password" : "Email already exists");
      } else if (status === 400) {
        setWrongField("email");
        setLoginError("Invalid email or password format");
      } else {
        // Fallback for unexpected error structures
        setWrongField("password");
        setLoginError("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "", name: "", avatar: "" });
      setLoginError("");
      setWrongField("");
    }
  }, [isOpen, isLoginMode, setValues]); // reset form when modal is opened or mode changes

  return (
    <ModalWithForm
      title={isLoginMode ? "Log In" : "Register"}
      name="login"
      buttonText=""
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      type="submit"
      error={loginError}
    >
      <label
        htmlFor={isLoginMode ? "email-login" : "email-register"}
        className={`modal__label ${
          wrongField === "email" ? "modal__label--error" : ""
        }`}
      >
        Email{!isLoginMode ? " *" : ""}
        <input
          type="email"
          name="email"
          className={`modal__input ${
            wrongField === "email" ? "input-error" : ""
          }`}
          id={isLoginMode ? "email-login" : "email-register"}
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
      <label
        htmlFor={isLoginMode ? "password-login" : "password-register"}
        className={`modal__label ${
          wrongField === "password" ? "modal__label--error" : ""
        }`}
      >
        Password{!isLoginMode ? " *" : ""}
        <input
          type="password"
          name="password"
          className={`modal__input ${
            wrongField === "password" ? "input-error" : ""
          }`}
          id={isLoginMode ? "password-login" : "password-register"}
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
      
      {!isLoginMode && (
        <>
          <label
            htmlFor="name-register"
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
              id="name-register"
              placeholder="Name"
              onChange={handleChange}
              value={values.name || ""}
              minLength="2"
              maxLength="30"
              required
            />
          </label>
          <label
            htmlFor="avatar-register"
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
              id="avatar-register"
              placeholder="Avatar URL"
              onChange={handleChange}
              value={values.avatar || ""}
              required
            />
          </label>
        </>
      )}
      
      <div className="modal__auth-switch">
        <button
          type="submit"
          className="modal__submit modal__submit--login"
        >
          {isLoginMode ? "Log In" : "Register"}
        </button>
        <button
          type="button"
          className="modal__auth-link"
          onClick={onToggleMode}
        >
          {isLoginMode ? "or Sign Up" : "or Log In"}
        </button>
      </div>
    </ModalWithForm>
  );
}
