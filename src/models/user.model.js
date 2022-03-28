const db = require('../config/db')
const userModel = {
  showAllUser: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  checkEmailRegistered: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT COUNT(*) FROM users WHERE email=$1', [email], (err, result) => {
        if (err) {
          reject(err)
        } else if (result.rows[0].count > 0) {
          reject(new Error('Email telah terdaftar!'))
        } else {
          resolve(email)
        }
      })
    })
  },
  register: (name, email, password, phone, photo) => {
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO users (name, email, password, phone, photo) VALUES ($1, $2, $3, $4, $5)', [name, email, password, phone, photo], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve('Register sukses!')
        }
      })
    })
  },
  updateData: (id, name, email, password, phone, photo) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=$1, email=$2, password=$3, phone=$4, photo=$5 WHERE id=$6', [name, email, password, phone, photo, id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id=$1', [id], (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
module.exports = userModel
