import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userAction } from '../../store'

const Auth = () => {

  const dispatch = useDispatch()
  const onResReceived = (data) => {
    console.log(data)
    dispatch(userAction.login())
    localStorage.setItem('userId', data.id)
  }

  const getData = data => {
    console.log(data)
    sendUserAuthRequest(data.inputs, data.signup)
    .then(onResReceived)
    .catch(error => console.log(error))
  }

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth