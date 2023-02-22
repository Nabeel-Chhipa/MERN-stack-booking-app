import express from 'express'
import { addMovie, getAllMovie, getMovieById } from '../controllers/movie-controller'

const movieRouter = express.Router()
movieRouter.post('/', addMovie)
movieRouter.get('/', getAllMovie)
movieRouter.get('/:id', getMovieById)

export default movieRouter