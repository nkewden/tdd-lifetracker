import * as React from "react"
import "./ActivityPage.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

function ActivityPage({ user, setAppState }) {
    const isAuthenticated = Boolean(user?.email)

    if (isAuthenticated) {
        return (
            <div className="ActivityPage">
              <h2>Activity Page</h2>
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

export default ActivityPage