const express = require('express')
const router = express.Router()
const { register, updateData, showAllUser, deleteUser } = require('../controllers/user.controller')
router
  .post('/register', register) // For insert new data on users
  .get('/user/list', showAllUser) // For showing all data on users
  .put('/edit/user/:id', updateData) // For updating data on users by id
  .delete('/delete/user/:id', deleteUser) // For deleting data on users by id

module.exports = router
