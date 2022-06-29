import React from "react";
import { useState } from "react";

function RegistrationForm() {
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const handler = (event) => {
    if (event.target.name === "password") {
      if (input.passwordConfirm && input.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (input.password && input.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setInput((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  return (
    <div className="registration-form">

      <div className="form-input">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nas@gmail.com"
          value={input.email}
          onChange={handler}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Nasradin"
          value={input.firstName}
          onChange={handler}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Kewden"
          value={input.lastName}
          onChange={handler}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.password}
          onChange={handler}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={input.passwordConfirm}
          onChange={handler}
        />
        {errors.passwordConfirm && (
          <span className="error">{errors.passwordConfirm}</span>
        )}
      </div>
      <button className="submit-registration">Create Account</button>
    </div>
  );
}

export default RegistrationForm;
