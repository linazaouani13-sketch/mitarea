const express = require('express')
const router = express.Router()
const {authmiddleware} = require('../middleware/authMiddleware.js')
const {createCategory,getCategory,editcategory,deletecategory} = require('../controllers/categorycontroller.js')

router.post('/', authmiddleware, createCategory)
router.get('/', authmiddleware, getCategory)
router.patch('/:id', authmiddleware, editcategory)
router.delete('/:id', authmiddleware, deletecategory)

module.exports = router