import * as React from "react"
import "./App.css"
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import Navbar from "../Navbar/Navbar"
import apiClient from "../../services/apiClient";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import NutritionForm from "../NutritionForm/NutritionForm";
// import {authContextProver, useAuthContext} from "../../contexts/auth"

// export default function AppContainer() {
//   return (
//     <AuthContextProvider>
//         <App />
//     </AuthContextProvider>
//   )
// }


export default function App() {
  const [user, setUser] = useState({})
  const [error, setError] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      const { data, err } = await apiClient.fetchUserFromToken()
      if (data) setUser(data.user)
      if(error) setError(err)

    }

    const token = localStorage.getItem("lifetracker_token")
    if (token) {
      apiClient.setToken(token)
      fetchUser()
    }
  }, [])

  const handleLogout = async () => {
    await apiClient.logoutUser()
    setUser({})
    setError(null)
  }

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar user={user} setUser={setUser} handleLogout={handleLogout}/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage user={user} setUser={setUser}/>} />
            <Route path="/register" element={<RegistrationPage user={user} setUser={setUser}/>} />
            <Route path="/activity" element={user?.email ? (<ActivityPage/>) : (<AccessForbidden/>)}/>
            <Route path="/nutrition/" element={user?.email ? (<NutritionPage user={user}/>) : (<AccessForbidden/>)}/>
            <Route path="/nutrition/create" element={<NutritionForm user={user} setUser={setUser}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
