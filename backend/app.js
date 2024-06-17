const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const path = require('path')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blogs')
const {
    envConfig: { port, mongoUrl },
} = require('./config/config')

mongoose
    .connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('---> MongoDB Connected'))
    .catch((err) => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)

app.listen(port, () => console.log(`---> Server running on port ${port}`))
