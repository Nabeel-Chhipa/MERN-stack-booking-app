import React from 'react'
import { useDispatch } from 'react-redux'
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers'
import { adminAction } from '../../store'
import AuthForm from '../Auth/AuthForm'

const Admin = () => {

  const dispatch = useDispatch()
  const onResReceived = (data) => {
    console.log(data)
    dispatch(adminAction.login())
    localStorage.setItem('adminId', data.id)
    localStorage.setItem('token', data.token)
  }

  const getData = (data) => {
    console.log('Data : ', data)
    sendAdminAuthRequest(data.inputs)
    .then(onResReceived)
    .catch(error => console.log(error))
  }

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin