import express from 'express'
import { getAllUsers } from '../controllers/users-controller'

const userRouter = express.Router()
userRouter.get('/', getAllUsers)

export default userRouter;