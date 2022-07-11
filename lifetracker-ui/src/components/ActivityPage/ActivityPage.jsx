import * as React from "react"
import "./ActivityPage.css"
import ActivityFeed from "../ActivityFeed/ActivityFeed"
import {useAuthContext} from "../../contexts/auth"

function ActivityPage() {
    const { user } = useAuthContext()
    return (
        <div className="activity-page">
            <h1>Activity</h1>
            <ActivityFeed user={user} />
        </div>
    )
}

export default ActivityPage