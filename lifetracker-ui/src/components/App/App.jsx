import * as React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "../LandingPage/LandingPage"
import LoginPage from "../LoginPage/LoginPage"
import RegistrationPage from "../RegistrationPage/RegistrationPage"
import ActivityPage from "../ActivityPage/ActivityPage"
import NutritionPage from "../NutritionPage/NutritionPage"
import NotFound from "../NotFound/NotFound"
import Navbar from "../Navbar/Navbar"
import Exercise from "../Exercise/Exercise"
import Sleep from "../Sleep/Sleep"

export default function App() {
  const [appState, setAppState] = React.useState({})

  return (
    <div className="app">
      <React.Fragment>
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage setAppState={setAppState}/>} />
            <Route path="/register" element={<RegistrationPage setAppState={setAppState}/>} />
            <Route path="/activity" element={<ActivityPage />} setAppState={setAppState} appState={appState}  user={appState?.user} />
            <Route path="/nutrition/*" element={<NutritionPage setAppState={setAppState} appState={appState}  user={appState?.user} />} />
            <Route path="/exercise/*" element={<Exercise setAppState={setAppState} appState={appState} user={appState?.user} />}/>
            <Route path="/sleep/*" element={<Sleep setAppState={setAppState} appState={appState} user={appState?.user} />}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </div>
  )
}
