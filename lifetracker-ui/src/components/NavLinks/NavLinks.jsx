import * as React from "react"
import { Link } from "react-router-dom"
import "./NavLinks.css"
import { useAuthContext } from "../../contexts/auth"

export default function NavLinks() {
  const {user, handleLogout} = useAuthContext()
    return (
      <div className="nav-links">
          <Link to="/activity" label="Activity" className="color-name" >Activity</Link>
          <Link to="/nutrition" label="Nutrition" className="color-name" >Nutrition</Link>
          {user.email ? (<li onClick={handleLogout}><Link to="/" className="btn ghost" >Logout</Link></li>) : 
          (
            <div className="login-register">
            <Link to="/login" label="Login" className="btn ghost">Login</Link>
            <Link to="/register" label="Sign Up" className="btn primary">Sign Up</Link>
            </div>
        )}      
      </div>
    )
  }
