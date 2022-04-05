const db = require('../config/db')
const recipeModel = {
  allData: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) as total FROM recipe', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  createRecipe: (photo, title, ingredients, video, userID) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO recipe (photo, title, ingredients, video, date, user_id) VALUES ($1, $2, $3, $4, current_timestamp, $5)', [photo, title, ingredients, video, userID], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  recipeList: (field, type, limit, offset, name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT recipe.id, recipe.photo, title, ingredients, video, date, name FROM recipe INNER JOIN users ON recipe.user_id=users.id WHERE LOWER(title) LIKE LOWER('%${name}%') ORDER BY ${field} ${type} LIMIT ${limit} OFFSET ${offset} `, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  updateRecipe: (id, photo, title, ingredients, video, userID) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE recipe SET photo=$1, title=$2, ingredients=$3, video=$4, date=current_timestamp, user_id=$5 WHERE id=$6', [photo, title, ingredients, video, userID, id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  checkAuthor: (id) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * from recipe WHERE id=$1', [id], (err, result) => {
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
      db.query('SELECT recipe.id, recipe.photo, title, ingredients, video, date, name FROM recipe INNER JOIN users ON recipe.user_id=users.id ORDER BY date DESC LIMIT 5', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  showRecipeByAuthor: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT recipe.id, recipe.photo, title, ingredients, video, date, name FROM recipe INNER JOIN users ON recipe.user_id=users.id WHERE LOWER(name) LIKE LOWER('%${name}%')`, (err, result) => {
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
