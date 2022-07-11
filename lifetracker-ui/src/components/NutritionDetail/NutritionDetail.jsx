import { useParams } from "react-router-dom"
import NotFound from "components/NotFound/NotFound"
import NutritionCard from "../NutritionCard/NutritionCard"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"
import apiClient from "../../services/apiClient"

export default function NutritionDetail() {
    const [nutrition, setNutrition] = useState({})
    const [notFound, setNotFound] = useState(false)
    const {nutritionId} = useParams()
    const [isProcessing, setIsProcessing] = useState(false)

    async function getNutrition(){
      const {data, err} = await apiClient.fetchNutritionById(nutritionId)
      console.log(10, data)
      if(err) setError(err)
      if(data){
        setNutrition(data.nutrition)
        setNotFound(false)
      }
      setIsProcessing(false)
      }

      console.log(3, nutrition)
  
  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-detail">
        <NutritionCard quantity={nutrition.quantity} id={nutrition.id} key={nutrition.name} name={nutrition.name} calories={nutrition.calories} imageUrl={nutrition.imageUrl} category={nutrition.category} createdAt={nutrition.createdAt}/>
    </div>
  )
}

