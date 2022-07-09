import { useParams } from "react-router-dom"
import NotFound from "components/NotFound/NotFound"
import NutritionCard from "components/NutritionCard/NutritionCard"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"
import apiClient from "../../services/apiClient"

export default function NutritionDetail(props) {
    const [nutrition, setNutrition] = useState({})
    const [notFound, setNotFound] = useState(false)
    const {nutritionId} = useParams()

    async function getNutrition(){
      const {data, err} = await apiClient.fetchNutritionById(nutritionId)
      if(err) setError(err)
      if(data){
        setNutrition(data.nutrition)
      }
      }
  
  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-detail">
        {notFound ? (<NotFound/>) : <NutritionCard quantity={nutrition.quantity} id={nutrition.id} key={nutrition.name} name={nutrition.name} calories={nutrition.calories} image_url={nutrition.image_url} category={nutrition.category} createdAt={nutrition.createdAt}/>}
    </div>
  )
}

