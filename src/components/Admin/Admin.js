import React from 'react'
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers'
import AuthForm from '../Auth/AuthForm'

const Admin = () => {

  const getData = (data) => {
    console.log('Data : ', data)
    sendAdminAuthRequest(data.inputs)
    .then(res => console.log(res))
    .catch(error => console.log(error))
  }

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin