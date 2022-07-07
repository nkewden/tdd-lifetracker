import * as React from "react"
import { useNavigate, Link } from "react-router-dom"
import "./NutritionPage.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

export default function NutritionPage({ user, setAppState }) {
    const navigate = useNavigate()
    const isAuthenticated = Boolean(user?.email)

    const handleOnLogout = () => {
        setAppState({})
        navigate("/")
    }
    const button = isAuthenticated ? (
        <button className="btn primary" onClick={handleOnLogout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="btn primary">Login</button>
        </Link>
      )
    if (isAuthenticated) {
        return (
            <div className="nutrition-page">
                <div className="footer">{button}</div>
                Nutrition Page
            </div>
        )
    } else {
        return (
            <div>
                <AccessForbidden setAppState={setAppState}/>
            </div>
        )
    }
}