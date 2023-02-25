import mongoose from "mongoose";
import Movie from '../models/Movie';
import Bookings from '../models/Bookings';
import User from "../models/User";

export const newBooking = async (req, res, next) => {
    const {movie, date, seatNumber, user} = req.body;
    let existingMovie
    let existingUser
    try {
        existingMovie = await Movie.findById(movie)
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error)
    }
    if(!existingMovie) {
        return res.status(404).json({message: 'Movie Not Found With Given ID'})
    }
    if(!existingUser) {
        return res.status(404).json({message: 'User Not Found With Given ID'})
    }
    let booking
    try {
        booking = new Bookings({
            movie,
            date: new Date(`${date}`),
            seatNumber,
            user
        })
        const session = await mongoose.startSession()
        session.startTransaction()
        existingUser.booking.push(booking)
        existingMovie.booking.push(booking)
        await existingUser.save({ session })
        await existingMovie.save({ session })
        await booking.save({ session })
        await booking.save()
        session.commitTransaction()
    } catch (error) {
        return console.log(error)
    }

    if(!booking) {
        return res.status(500).json({message: 'Unable to create a booking'})
    }

    return res.status(201).json({ booking })
}

export const getBookingById = async (req, res, next) => {
    const id = req.params.id
    let booking
    try {
        booking = await Bookings.findById(id)
    } catch (error) {
        console.log(error)
    }
    if(!booking) {
        return res.status(500).json({message: 'Unexpected Error'})
    }
    return res.status(200).json({ booking })
}

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id
    let booking
    try {
        booking = await Bookings.findByIdAndRemove(id).populate('user movie')
        const session = await mongoose.startSession()
        session.startTransaction()
        await booking.user.booking.pull(booking)
        await booking.movie.booking.pull(booking)
        await booking.user.save({session})
        await booking.movie.save({session})
        session.commitTransaction()
    } catch (error) {
        console.log(error)
    }
    if(!booking) {
        return res.status(500).json({message: 'Unable to Delete'})
    }
    return res.status(200).json({message: 'Delete Successfully'})
}