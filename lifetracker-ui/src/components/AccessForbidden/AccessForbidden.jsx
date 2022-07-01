import * as React from "react"
import "./AccessForbidden.css"
import LoginForm from "../LoginForm/LoginForm"

export default function AccessForbidden({setAppState}) {
    return (
        <nav className="access-forbidden">
            <h2 className="access-login">Login</h2>
            <span className="error"> You must be logged in to access that page</span>
                
            {/* <LoginForm setAppState={setAppState}/> */}
        </nav>
    )
}