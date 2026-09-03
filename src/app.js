require('dotenv').config()
const express = require('express')
const authRouter = require('./routes/auth.js')
const taskRouter = require('./routes/task.js')
const app = express()
app.use(express.json())
app.use('/auth', authRouter)
app.use('/task', taskRouter)
module.exports = app