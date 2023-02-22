import mongoose from "mongoose";

const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    movie: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    seatNumber: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
})

export default mongoose.model('Booking', bookingSchema)