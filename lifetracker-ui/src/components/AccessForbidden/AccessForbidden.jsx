import * as React from "react"
import "./AccessForbidden.css"

export default function AccessForbidden() {
    return (
        <nav className="access-forbidden">
            <span className="error"> 🛑 CONFIDENTIAL INFORMATION 🛑  -- LOGIN PLEASE!</span>
        </nav>
    )
}