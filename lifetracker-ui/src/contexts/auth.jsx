import {createContext, useState, useContext, useEffect} from "react"
import apiClient from "../services/apiClient"
import * as React from "react"

const AuthContext = createContext(null) 

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [error, setError] = useState()

    useEffect(() => {
        const fetchUser = async () => {
          const { data, err } = await apiClient.fetchUserFromToken()
          if (data) {
            setUser(data.user)
          }
          if(error) {
            setError(err)
          }
    
        }
    
        const token = localStorage.getItem("lifetracker_token")
        if (token) {
          apiClient.setToken(token)
          fetchUser()
        }
      }, [setUser])
    
      const handleLogout = async () => {
        await apiClient.logoutUser()
        setUser({})
        setError(null)
      }

    const authValue = {user, setUser, handleLogout, error, setError}

    return (
        <AuthContext.Provider value={authValue}>
            <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)