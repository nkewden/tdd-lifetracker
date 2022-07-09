import RegistrationForm from '../RegistrationForm/RegistrationForm'
import React from 'react'
import "./RegistrationPage.css"

function RegistrationPage(props) {
  return (
    <div className="registration-page">
      <RegistrationForm user={props.user} setUser={props.setUser}/>
    </div>
  )
}

export default RegistrationPage