import React from 'react'
import "./NavLinks.css"
import { Link } from "react-router-dom"

function NavLinks() {
  return (
    <div className="nav-links">
        <Link to="/activity">Activity</Link>
        <Link to="/nutrition">Nutrition</Link>
        <Link to ="/exercise">Exercise</Link>
        <Link to ="/sleep">Sleep</Link>
        <Link to ="/login">
            <button className="btn ghost">Login</button>
        </Link><Link to ="/register">
            <button className="btn primary">Sign Up</button>
        </Link>
    </div>
  )
}

export default NavLinks