import express from 'express'

const app = express()

app.use('/', (req, res, next) => {
    res.send('Hello world')
})

app.listen(5000, () => {
    console.log('Server start on PORT 5000')
})