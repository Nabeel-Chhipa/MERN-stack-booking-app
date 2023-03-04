import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'

const Auth = () => {

  const getData = data => {
    console.log(data)
    sendUserAuthRequest(data.inputs, data.signup)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth