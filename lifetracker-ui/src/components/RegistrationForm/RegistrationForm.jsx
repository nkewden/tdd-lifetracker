import React from "react";
import { useState, useEffect } from "react";
import "./RegistrationForm.css"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"

function RegistrationForm({ user, setUser }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [form, setForm] = useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

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

    if (event.target.name === "passwordConfirm") {
      if (event.target.value !== form.password) {
        setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }))
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
  }

  const handleOnSubmit = async () => {
    setIsProcessing(true)
    setErrors((e) => ({ ...e, form: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setIsProcessing(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    const {data, error} = await apiClient.signupUser({email: form.email, userName: form.userName, firstName: form.firstName, lastName: form.lastName, password: form.password})
    if (error) setErrors((e) => ({ ...e, form: error }))
    if (data?.user) {
      setUser(data.user)
      apiClient.setToken(data.token)
    }
    setIsProcessing(false)
  }



  return (
    <div className="registration-form">
      <h2 className="access-login">Register</h2>
      <div className="form-input">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Nasradin@gmail.com"
          value={form.email}
          onChange={handleOnInputChange }
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="name">Username</label>
        <input
          type="text"
          name="userName"
          placeholder="Nasradin"
          value={form.userName}
          onChange={handleOnInputChange}
        />
        {errors.userName && <span className="error">{errors.userName}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Nasradin"
          value={form.firstName}
          onChange={handleOnInputChange }
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="name">Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Kewden"
          value={form.lastName}
          onChange={handleOnInputChange }
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleOnInputChange }
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-input">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={form.passwordConfirm}
          onChange={handleOnInputChange }
        />
        {errors.passwordConfirm && (
          <span className="error">{errors.passwordConfirm}</span>
        )}
      </div>
      <button className="submit-registration" disabled={isProcessing} onClick={handleOnSubmit}>{isProcessing ? "loading..." : "Create Account"}</button>
      <div className="footer">
        <p>
          Already have an account? Login <Link className="footer-here" to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
