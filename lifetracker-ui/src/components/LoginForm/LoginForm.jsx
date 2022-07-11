import React from "react";
import "./LoginForm.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"
import apiClient from "../../services/apiClient"
import {useAuthContext} from "../../contexts/auth"

function LoginForm() {
  const { user, setUser } = useAuthContext()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
      } else {
        setErrors((e) => ({ ...e, email: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    const {data, error} = await apiClient.loginUser({email: form.email, password: form.password})
    if (error) setErrors((e) => ({ ...e, form: error }))
    if (data?.user) {
      setUser(data.user)
      apiClient.setToken(data.token)
    }

    setIsProcessing(false)
  }

  return (
    <div className="login-form">
      <h2 className="access-login">Login</h2>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nasradin@gmail.com"
          value={form.email}
          onChange={handleOnInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="input-field">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleOnInputChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <button className="submit-login" disabled={isProcessing} onClick={handleOnSubmit}>{isProcessing ? "loading..." : "Login"}</button>

      <div className="footer">
        <p>
          Don't have an account? Sign up <Link className="footer-here" to="/register" path="register">here</Link>
        </p>
      </div>
    </div>
  );
}


export default LoginForm;
