import NutritionCard from "components/NutritionCard/NutritionCard"
import "./NutritionFeed.css"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import apiClient from "../../services/apiClient"

export default function NutritionFeed(props) {
    let [nutrition, setNutrition] = useState([])
    let [error, setError] = useState() 

    async function getNutrition(){
      const {data, err} = await apiClient.fetchNutrition()
      if(err) setError(err)
      if(data){
        setNutrition(data.nutrition)
      }
      }


  useEffect(() => {
    getNutrition()
  }, []);

  return (
    <div className="nutrition-feed">
        {nutrition.map((item) => {return(
            <Link to={`id/`+item.id} key={item.id}>
                <NutritionCard key={item.name} quantity={item.quantity} name={item.name} calories={item.calories} image_url={item.image_url} category={item.category} id={item.id}/>
            </Link>
        )})}
    </div>
  )
}