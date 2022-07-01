import * as React from "react"
import { useNavigate } from "react-router-dom"
import "./ActivityPage.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

export default function ActivityPage({ user, setAppState }) {
    const navigate = useNavigate()
    const isAuthenticated = Boolean(user?.email)

    if (isAuthenticated) {
        return (
            <div className="activity-page">
                Activity Page
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