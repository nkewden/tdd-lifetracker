import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "../ActivityFeed/ActivityFeed"

function ActivityPage({ user, setAppState }) {
    return (
        <div className="activity-page">
            <h1></h1>
            <ActivityFeed/>
        </div>
    )
}

export default ActivityPage