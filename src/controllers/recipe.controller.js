const recipeModel = require('../models/recipe.model')
const recipeController = {
  createRecipe: (req, res) => {
    try {
      const { photo, title, ingredients, video, date, user_id } = req.body
      const userID = user_id
      if (!title) {
        throw Error('Title harus diisi')
      }
      if (!ingredients) {
        throw Error('Ingredients harus diisi')
      }
      if (!date) {
        throw Error('Date harus diisi')
      }
      if (!userID) {
        throw Error('UserID harus diisi')
      }
      recipeModel.createRecipe(photo, title, ingredients, video, date, userID)
        .then((result) => {
          const hasil = { status: 'Sukses', message: 'Sukses menambahkan resep!' }
          res.json(hasil)
        })
        .catch((err) => {
          let detail = err.detail
          if (!detail) {
            detail = err.hint
          }
          const hasil = { status: 'Error', detail }
          res.json(hasil)
        })
    } catch (err) {
      const errorMsg = err.message
      const hasil = { status: 'Error', message: errorMsg }
      res.json(hasil)
    }
  },
  recipeList: (req, res) => {
    try {
      const name = req.query.name || ''
      recipeModel.recipeList(name)
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
      const hasil = { status: 'Error', err }
      res.json(hasil)
    }
  },
  updateRecipe: (req, res) => {
    try {
      const id = req.params.id
      const { photo, title, ingredients, video, date, user_id } = req.body
      const userID = user_id
      if (!id) {
        throw Error('ID harus dikirim')
      }
      if (!title) {
        throw Error('Title harus dikirim')
      }
      if (!ingredients) {
        throw Error('Ingredients harus dikirim')
      }
      if (!date) {
        throw Error('Date harus dikirim')
      }
      if (!userID) {
        throw Error('user_id harus dikirim')
      }
      recipeModel.updateRecipe(id, photo, title, ingredients, video, date, userID)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: 'Update data recipe sukses!' }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Recipe dengan id ' + id + ' tidak ditemukan' }
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
  deleteRecipe: (req, res) => {
    try {
      const id = req.params.id
      if (!id) {
        throw Error('ID harus diisi')
      }
      recipeModel.deleteRecipe(id)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: "Resep berhasil dihapus!" }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Gagal menghapus, recipe id = ' + id + ' tidak ditemukan' }
            res.json(hasil)
          }
        })
        .catch((err) => {
          const hasil = { status: 'Error', err }
          res.json(hasil)
        })
    } catch (err) {
      const hasil = { status: 'error', message: err.message }
      res.json(hasil)
    }
  },
  showNewRecipe: (req, res) => {
    try {
      recipeModel.showNewRecipe()
        .then((result) => {
          res.json(result.rows)
        })
        .catch((err) => {
          res.json(err)
        })
    } catch (err) {
      res.json(err)
    }
  },
  showRecipeByAuthorID: (req, res) => {
    try {
      const id = req.params.id
      if (!id) {
        throw Error('ID harus diisi')
      }
      recipeModel.showRecipeByAuthorID(id)
        .then((result) => {
          if (result.rowCount > 0) {
            const list = result.rows
            const hasil = { status: 'Sukses', list }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Recipe tidak ditemukan' }
            res.json(hasil)
          }
        })
        .catch((err) => {
          const hasil = { status: 'Error', err }
          res.json(hasil)
        })
    } catch (err) {
      const hasil = { status: 'Error', errorMsg: err.message }
      res.json(hasil)
    }
  }
}
module.exports = recipeController
