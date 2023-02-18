import express from 'express'
import { deleteUser, getAllUsers, signup, updateUser } from '../controllers/users-controller'

const userRouter = express.Router()
userRouter.get('/', getAllUsers)
userRouter.post('/signup', signup)
userRouter.put('/:id', updateUser)
userRouter.delete('/:id', deleteUser)

export default userRouter;