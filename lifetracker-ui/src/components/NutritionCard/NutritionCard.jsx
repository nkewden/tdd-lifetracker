import "./NutritionCard.css"


export default function NutritionCard(props) {
  return (
    <div className="nutrition-card">
      <br></br>
      <div className = "nutrition-card">
        <img className="nutrition-image" src={props.image_url} alt="" />
      </div>
        <div className="nutrition-text">
        <p className="nutrition-name">{props.name}</p>
        <p className="nutrition-calories">Calories: {props.calories}</p>
        <p className="nutrition-category ">Category: {props.category}</p>
        <p className="nutrition-quantity">Quantity: {props.quantity}</p>
        {/* <p className="nutrition-quantity">Quantity: {props.created_at}</p> */}
        </div>
    </div>
  )
}