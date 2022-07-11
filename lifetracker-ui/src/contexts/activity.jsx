import * as React from "react"
import { useAuthContext} from "./auth"
import { createContext, useState, useContext, useEffect } from "react"
import apiClient from "../services/apiClient"

const ActivityContext = createContext(null)

export const ActivityContextProvider = ({children}) => {
    const [activity, setActivity] = useState(null)
    const [initialized, setInitialzed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {user} = useAuthContext()

    const fetchActivity = async () => {
                    setIsLoading(true)
                    setError(null)
                    const {data, error} = await apiClient.fetchActivity()
                    if(data){
                        setActivity(data)
                    }
                    if(error){
                        setError(error)
                    }
                setIsLoading(false)
                setInitialzed(true)
            }

    useEffect(() => {    
            const token = localStorage.getItem("lifetracker_token")
            if (token && user) {
              apiClient.setToken(token)
              fetchActivity()
            }

    }, [setActivity])

    const values = {fetchActivity, activity, setActivity, initialized, setInitialzed, isLoading, setIsLoading, error, setError}
    return (
        <ActivityContext.Provider value={values}>
            <>{children}</>
        </ActivityContext.Provider>
    )
}

export const useActivityContext = () => useContext(ActivityContext)