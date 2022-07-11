import NotFound from "components/NotFound/NotFound";
import NutritionDetail from "components/NutritionDetail/NutritionDetail";
import NutritionNew from "components/NutritionNew/NutritionNew";
import NutritionOverview from "components/NutritionOverview/NutritionOverview";
import {Routes, Route} from "react-router-dom";
import { useState } from "react";
import "./NutritionPage.css"
import {useAuthContext} from "../../contexts/auth"

function NutritionPage() {
    const [fruit, setFruit] = useState([])
    const {user} = useAuthContext()

    return (
      <div className="nutrition-page">
            <Routes>
                <Route path="/" element={<NutritionOverview fruit={fruit}/>}></Route>
                <Route path="/create" element={<NutritionNew fruit={fruit} setFruit={setFruit}/>}></Route>
                <Route path="/id/:nutritionId" element={<NutritionDetail user={user}/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
      </div>
    )
  }

  export default NutritionPage;