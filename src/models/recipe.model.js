const db = require('../config/db')
const recipeModel = {
  createRecipe: (photo, title, ingredients, video, date, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (photo, title, ingredients, video, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)', [photo, title, ingredients, video, date, userID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  recipeList: (name) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe WHERE LOWER(title) LIKE LOWER($1)', ['%' + name + '%'], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateRecipe: (id, photo, title, ingredients, video, date, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET photo=$1, title=$2, ingredients=$3, video=$4, date=$5, user_id=$6 WHERE id=$7', [photo, title, ingredients, video, date, userID, id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteRecipe: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM recipe WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showNewRecipe: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe ORDER BY date DESC LIMIT 5', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showRecipeByAuthorID: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM recipe WHERE user_id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = recipeModel
