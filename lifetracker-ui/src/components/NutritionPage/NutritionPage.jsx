import * as React from "react"
import "./NutritionPage.css"
import AccessForbidden from "../AccessForbidden/AccessForbidden"

function NutritionPage({ user, setAppState }) {
    const isAuthenticated = Boolean(user?.email)

    if (isAuthenticated) {
        return (
            <div className="nutrition-page">
                <h2>Nutrition Page</h2>
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

export default NutritionPage