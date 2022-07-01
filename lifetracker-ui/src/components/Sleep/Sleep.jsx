import * as React from "react"
import "./Sleep.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

function Sleep({ user, setAppState }) {
    const isAuthenticated = Boolean(user?.email)

    if (isAuthenticated) {
        return (
            <div className="sleep">
                <h2>Sleep</h2>
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

export default Sleep