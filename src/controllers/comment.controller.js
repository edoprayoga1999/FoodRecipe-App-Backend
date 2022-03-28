const commentModel = require('../models/comment.model')
const commentController = {
  showCommentByRecipe: (req, res) => {
    try {
      const recipeID = req.params.recipeID
      if (!recipeID) {
        throw Error('ID harus di isi')
      }
      commentModel.showCommentByRecipe(recipeID)
        .then((result) => {
          const list = result.rows
          const hasil = { status: 'Sukses', list }
          res.json(hasil)
        })
        .catch((err) => {
          const hasil = { status: 'Error', err }
          res.json(hasil)
        })
    } catch (err) {
      const errorMsg = err.message
      const hasil = { status: 'Error', errorMsg }
      res.json(hasil)
    }
  },
  postCommentByRecipe: (req, res) => {
    try {
      const recipeID = req.params.recipeID
      const commentText = req.body.comment_text
      const userID = req.body.user_id
      if (!recipeID) {
        throw Error('recipe_id harus di isi')
      }
      if (!commentText) {
        throw Error('comment_text harus di isi')
      }
      if (!userID) {
        throw Error('user_id harus di isi')
      }
      commentModel.postCommentByRecipe(recipeID, commentText, userID)
        .then((result) => {
          const hasil = { status: 'Sukses', message: 'Sukses menambahkan komentar' }
          res.json(hasil)
        })
        .catch((err) => {
          const hasil = { status: 'Error', err }
          res.json(hasil)
        })
    } catch (err) {
      const errorMsg = err.message
      const hasil = { status: 'Error', errorMsg }
      res.json(hasil)
    }
  },
  editComment: (req, res) => {
    try {
      const id = req.params.id
      const recipeID = req.body.recipe_id
      const commentText = req.body.comment_text
      const userID = req.body.user_id
      if (!id) {
        throw Error('ID harus dikirim')
      }
      if (!recipeID) {
        throw Error('recipe_id harus diisi')
      }
      if (!commentText) {
        throw Error('comment_text harus diisi')
      }
      if (!userID) {
        throw Error('user_id harus diisi')
      }
      commentModel.editComment(id, recipeID, commentText, userID)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: 'Berhasil edit comment' }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Comment dengan id = ' + id + ' tidak ditemukan' }
            res.json(hasil)
          }
        })
        .catch((err) => {
          const hasil = { status: 'Error', err }
          res.json(hasil)
        })
    } catch (err) {
      const errorMsg = err.message
      const hasil = { status: 'Error', errorMsg }
      res.json(hasil)
    }
  },
  deleteComment: (req, res) => {
    try {
      const id = req.params.id
      if (!id) {
        throw Error('ID harus dikirim')
      }
      commentModel.deleteComment(id)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: 'Hapus comment berhasil' }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Hapus comment gagal, id comment tidak ditemukan' }
            res.json(hasil)
          }
        })
        .catch((err) => {
          res.json(err)
        })
    } catch (err) {
      res.json(err)
    }
  }
}
module.exports = commentController
