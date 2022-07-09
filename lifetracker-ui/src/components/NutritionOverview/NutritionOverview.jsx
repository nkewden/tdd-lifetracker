import NutritionFeed from "components/NutritionFeed/NutritionFeed"
import { Link } from "react-router-dom"
import "./NutritionOverview.css"

export default function NutritionOverview(props) {
  return (
    <div className="nutrition-overview">
      <Link to="/nutrition/create"><button id="record">Record Nutrition</button></Link>
      <NutritionFeed user={props.user} fruit={props.fruit}></NutritionFeed>
    </div>
  )
}