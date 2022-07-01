import React from 'react'
import "./LandingPage.css"

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
          <img className="hero-img" src="http://codepath-lifetracker.surge.sh/static/media/smartwatch-screen-digital-device.e2983a85.svg" />
          <h1>Life Tracker</h1>
          <p className="landing-title">Helping you take control of your world</p>
      </div>
      <div className="tiles">
        <div className="tile">
          <img src="https://codepath-lifetracker.surge.sh/static/media/icons-workout-48.4f4cdb05.svg"  alt="Fitness" />
          <p className="tile-color" >Fitness</p>
        </div>

        <div className="tile">
        <img src="https://codepath-lifetracker.surge.sh/static/media/icons8-porridge-100.132d2715.svg"  alt="Food" />
        <p className="tile-color" >Food</p>
        </div>

        <div className="tile">
        <img src="https://codepath-lifetracker.surge.sh/static/media/icons8-resting-100.81067336.svg"  alt="Rest" />
          <p className="tile-color" >Rest</p>  
        </div>

        <div className="tile">
        <img src="https://codepath-lifetracker.surge.sh/static/media/icons8-planner-100.997ca54c.svg"  alt="Planner" />
          <p className="tile-color" >Planner</p>
        </div>

      </div>
    </div>
  )
}

export default LandingPage