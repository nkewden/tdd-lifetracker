import React from 'react'
import "./Navbar.css"
import { Link } from "react-router-dom"
import NavLinks from '../NavLinks/NavLinks'

function Navbar(props) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"> <img src="http://codepath-lifetracker.surge.sh/static/media/codepath.70a9a31f.svg" alt="codepath-logo"/></Link>
      </div>
      <NavLinks user={props.user} handleLogout={props.handleLogout}/>
    </nav>
  )
}

export default Navbar
