import LoginForm from 'components/LoginForm/LoginForm'
import React from 'react'
import "./LoginPage.css"

function LoginPage(props) {
  return (
    <div className="login-page">
      <LoginForm user={props.user} setUser={props.setUser}/>
    </div>
  )
}

export default LoginPage