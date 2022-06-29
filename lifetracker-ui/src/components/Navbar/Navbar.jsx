import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import NavLinks from '../NavLinks/NavLinks'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"> <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="codepath-logo"/></Link>
      </div>
      <NavLinks />
    </nav>
  )
}

export default Navbar
