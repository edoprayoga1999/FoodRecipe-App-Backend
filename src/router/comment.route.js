const express = require('express')
const router = express.Router()
const { showCommentByRecipe, postCommentByRecipe, editComment, deleteComment } = require('../controllers/comment.controller')
router
  .get('/comment/:recipeID', showCommentByRecipe)
  .post('/post/comment/:recipeID', postCommentByRecipe)
  .put('/edit/comment/:id', editComment)
  .delete('/delete/comment/:id', deleteComment)

module.exports = router
