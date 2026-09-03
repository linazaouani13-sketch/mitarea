const express = require('express')
const router = express.Router()
const {authmiddleware} = require('../middleware/authMiddleware.js')
const{createTask}=require('../controllers/taskcontroller.js')

router.post('/',authmiddleware, createTask)
module.exports = router