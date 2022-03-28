const express = require('express')
const router = express.Router()
const { createRecipe, recipeList, updateRecipe, deleteRecipe, showNewRecipe, showRecipeByAuthorID } = require('../controllers/recipe.controller')
router
  .post('/post/recipe', createRecipe) // For create a new recipe
  .get('/recipe/list', recipeList) // For showing recipe
  .put('/edit/recipe/:id', updateRecipe) // For updating recipe
  .delete('/delete/recipe/:id', deleteRecipe) // For delete data on recipe by id
  .get('/recipe/latest', showNewRecipe) // For showing the latest data on recipe by date
  .get('/recipe/author/:id', showRecipeByAuthorID) // For showing data on a recipe based on author

module.exports = router
