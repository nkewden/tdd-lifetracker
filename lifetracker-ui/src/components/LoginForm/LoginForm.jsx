import React from "react";
import "./LoginForm.css";
import { useState } from "react";

function LoginForm() {
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handler = (evt) => {
    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setInput((f) => ({ ...f, [evt.target.name]: evt.target.value }));
  };

  return (
    <div className="login-form">
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="user@gmail.com"
          value={input.email}
          onChange={handler}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={input.email}
          onChange={handler}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button
        className="submit-login"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default LoginForm;
