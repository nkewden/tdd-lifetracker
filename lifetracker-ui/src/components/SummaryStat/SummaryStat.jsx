import * as React from "react"
import "./SummaryStat.css"

export default function SummaryStat(props) {
    return (
  
        <div className="summary-stat">
            <p className="unit-label">Total Calories: {props.sum}</p>
            <p className="primary-stat">Date: {props.date}</p>
            <p className="unit-label">Category: {props.category}</p>
            <p className="primary-stat">Average Calories PerCategory: {props.avgCaloriesPerCategory}</p>
        </div>


    )}