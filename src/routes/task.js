const express = require('express')
const router = express.Router()
const {authmiddleware} = require('../middleware/authMiddleware.js')
const{createTask, getalltasks }=require('../controllers/taskcontroller.js')

router.post('/',authmiddleware, createTask)
router.get('/', authmiddleware, getalltasks)
module.exports = router