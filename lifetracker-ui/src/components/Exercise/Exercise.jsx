import * as React from "react"
import "./Exercise.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

function Exercise({ user, setAppState }) {
    const isAuthenticated = Boolean(user?.email)

    if (isAuthenticated) {
        return (
            <div className="exercise">
                <h2>Exercise</h2>
                <p>Coming soon!</p>
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

export default Exercise