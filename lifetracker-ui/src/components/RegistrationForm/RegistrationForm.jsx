import React from "react";
import { useState } from "react";
import "./RegistrationForm.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

function RegistrationForm(props) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
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


  const handleOnSubmit = async () => {
    setLoading(true)
    setErrors((e) => ({ ...e, input: null }))

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }))
      setLoading(false)
      return
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }))
    }

    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        date: input.date,
        location: input.location,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      })

      if (res?.data?.user) {
        props.setAppState(res.data)
        setLoading(false)
        navigate("/portal")
      } else {
        setErrors((e) => ({ ...e, input: "Something went wrong with registration" }))
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
    <div className="registration-form">
      <h2 className="access-login">Register</h2>
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
      <button className="submit-registration" disabled={loading} onClick={handleOnSubmit}>{loading ? "loading..." : "Create Account"}</button>
      <div className="footer">
        <p>
          Already have an account? Login <Link className="footer-here" to="/login">here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegistrationForm;
