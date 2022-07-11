import { useParams } from "react-router-dom"
import NotFound from "components/NotFound/NotFound"
import NutritionCard from "../NutritionCard/NutritionCard"
import { useState, useEffect } from "react"
import "./NutritionDetail.css"
import apiClient from "../../services/apiClient"

export default function NutritionDetail(props) {
  console.log(92, props)
    const [nutrition, setNutrition] = useState({})
    const [notFound, setNotFound] = useState(false)
    const {nutritionId} = useParams()
    const [isProcessing, setIsProcessing] = useState(false)


    async function getNutrition(){
      const {data, err} = await apiClient.fetchNutritionById(nutritionId)
      if(err) setError(err)
      if(data){
        setNutrition(data.nutrition)
        setNotFound(false)
      }
      setIsProcessing(false)
      }

  
  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-detail">
        {notFound ? (<NotFound/>) : <NutritionCard quantity={nutrition.quantity} id={nutrition.id} key={nutrition.name} name={nutrition.name} calories={nutrition.calories} image_url={nutrition.image_url} category={nutrition.category} created_at={nutrition.created_at}/>}
    </div>
  )
}

