const express = require('express')
const router = express.Router()
const {authmiddleware} = require('../middleware/authMiddleware.js')
const{createTask, getalltasks ,getTaskbyId,edittask }=require('../controllers/taskcontroller.js')

router.post('/',authmiddleware, createTask)
router.get('/', authmiddleware, getalltasks)
router.get('/:id', authmiddleware, getTaskbyId)
router.patch('/:id', authmiddleware, edittask)
module.exports = router