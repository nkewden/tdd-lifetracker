import LoginForm from 'components/LoginForm/LoginForm'
import React from 'react'
import "./LoginPage.css"

function LoginPage(props) {
  return (
    <div className="login-page">
      <LoginForm setAppState={props.setAppState}/>
    </div>
  )
}

export default LoginPage