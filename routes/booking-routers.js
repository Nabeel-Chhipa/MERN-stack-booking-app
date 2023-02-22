import express from 'express'
import { newBooking } from '../controllers/booking-controller'

const bookingRouter = express.Router()

bookingRouter.post('/', newBooking)

export default bookingRouter