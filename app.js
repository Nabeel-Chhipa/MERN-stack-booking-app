import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express()

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.hnj2ho3.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(5000, () => {
        console.log('Server start on PORT 5000 and connected to MongoDB.')
    })
})
.catch((e) => {
    console.log(e);
})
