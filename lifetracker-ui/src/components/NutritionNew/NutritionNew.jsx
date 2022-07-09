import NutritionForm from "../LoginForm/LoginForm"

export default function NutritionNew(props) {
  return (
    <div className="nutrition-new">
        <NutritionForm fruit={props.fruit} setFruit={props.setFruit}></NutritionForm>
    </div>
  )
}