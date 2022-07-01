import React from "react";
import "./LoginForm.css";
import { useState } from "react";
import { Link} from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function LoginForm(props) {
  const navigate = useNavigate()
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


  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors((e) => ({ ...e, input: null }))

    try {
      const res = await axios.post(`http://localhost:3001/auth/login`, input)
      if (res?.data) {
        props.setAppState(res.data)
        setLoading(false)
        navigate("/")
      } else {
        setErrors((e) => ({ ...e, input: "Invalid username/password combination" }))
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      const message = err?.response?.data?.error?.message
      setErrors((e) => ({ ...e, input: message ? String(message) : String(err) }))
      setLoading(false)
    }
  }

  return (
    <div className="login-form">
      <h2 className="access-login">Login</h2>
      <div className="input-field">
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

      <div className="input-field">
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

      <button className="submit-login" disabled={loading} onClick={handleOnSubmit}>{loading ? "loading..." : "Login"}</button>
      <div className="footer">
        <p>
          Don't have an account? Sign up <Link className="footer-here" to="/register" path="register">here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
