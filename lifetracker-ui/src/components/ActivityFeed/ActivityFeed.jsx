import React from 'react'
import SummaryStat from "../SummaryStat/SummaryStat"
import {useState, useEffect} from "react"
import apiClient from "../../services/apiClient"
import "./ActivityFeed.css"

function ActivityFeed({totalCaloriesPerDay, avgCaloriesPerCategory}) {
  const [activity, setActivity] = useState([])
  const [error, setError] = useState() 
  const [newActivity, setNewActivity] = useState([])

  async function getActivity(){
    const {data, err} = await apiClient.fetchActivity()
    if(err) setError(err)
    if(data){
      setNewActivity(data.perCategory)
      setActivity(data.perDay)

    }
    }


    let totalStat = {}

    if (activity.length > 0){
      totalStat = {date: activity[activity.length - 1].date, sum: activity[activity.length - 1].sum}
    }


useEffect(() => {
  getActivity()
}, []);

return (
  <div className="activity-feed" >
  {newActivity.map((item) => {return(
    <div className="stat-wrapper">
      <SummaryStat category={item.category} avgCaloriesPerCategory={item.avgCaloriesPerCategory} date={totalStat.date} sum={totalStat.sum}/>
    </div>
      )})}
  </div>
)
}

export default ActivityFeed