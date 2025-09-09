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
  });

  const [loginError, setLoginError] = useState("");
  const [wrongField, setWrongField] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await onLogin(values);
      } else {
        await onRegister(values);
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
        setLoginError("Email already exists");
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
      setValues({ email: "", password: "" });
      setLoginError("");
      setWrongField("");
    }
  }, [isOpen, setValues]); // reset form when modal is opened, setValues is a dependency because it's a function from useForm hook

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
        htmlFor="email"
        className={`modal__label ${
          wrongField === "email" ? "modal__label--error" : ""
        }`}
      >
        Email
        <input
          type="email"
          name="email"
          className={`modal__input ${
            wrongField === "email" ? "input-error" : ""
          }`}
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={values.email || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${
          wrongField === "password" ? "modal__label--error" : ""
        }`}
      >
        Password
        <input
          type="password"
          name="password"
          className={`modal__input ${
            wrongField === "password" ? "input-error" : ""
          }`}
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password || ""}
          minLength="2"
          maxLength="40"
          required
        />
      </label>
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
