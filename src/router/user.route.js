const express = require('express')
const router = express.Router()
const { updateData, showAllUser, deleteUser } = require('../controllers/user.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isAdmin, isCustomerWithSameId } = require('../middleware/authorization')
const { isVerified } = require('../middleware/isVerified')

router
  .get('/user/list', jwtAuth, isVerified, isAdmin, showAllUser) // For showing all data on users
  .put('/edit/user/:id', jwtAuth, isVerified, isCustomerWithSameId, updateData) // For updating data on users by id
  .delete('/delete/user/:id', jwtAuth, isVerified, isCustomerWithSameId, deleteUser) // For deleting data on users by id
  // suspend user by admin

module.exports = router
