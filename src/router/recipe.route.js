const express = require('express')
const router = express.Router()
const { createRecipe, recipeList, updateRecipe, deleteRecipe, showNewRecipe, showRecipeByAuthor } = require('../controllers/recipe.controller')
const jwtAuth = require('../middleware/jwtAuth')
const { isCustomer } = require('../middleware/authorization')
const { isVerified } = require('../middleware/isVerified')
const upload = require('../middleware/upload')
router
  .post('/post/recipe', jwtAuth, isVerified, upload, createRecipe) // For create a new recipe
  .get('/recipe/list', jwtAuth, isVerified, recipeList) // For showing recipe
  .put('/edit/recipe/:id', jwtAuth, isVerified, isCustomer, upload, updateRecipe) // For updating recipe
  .delete('/delete/recipe/:id', jwtAuth, isVerified, isCustomer, deleteRecipe) // For delete data on recipe by id
  .get('/recipe/latest', showNewRecipe) // For showing the latest data on recipe by date
  .get('/recipe/author', jwtAuth, isVerified, showRecipeByAuthor) // For showing data on a recipe based on author

module.exports = router
