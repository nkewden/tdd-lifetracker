import * as React from "react"
import "./AccessForbidden.css"
import LoginForm from "../LoginForm/LoginForm"

export default function AccessForbidden({setAppState}) {
    return (
        <nav className="access-forbidden">
            <div className="card">Login</div>
            <span className="error"> You must be logged in to access that page</span>
                
            <LoginForm setAppState={setAppState}/>
        </nav>
    )
}