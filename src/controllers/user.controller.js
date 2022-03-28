const userModel = require('../models/user.model')
const userController = {
  showAllUser: (req, res) => {
    try {
      userModel.showAllUser()
        .then((result) => {
          const data = result.rows
          const hasil = { status: 'sukses', data }
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
  register: (req, res) => {
    try {
      const { name, email, password, phone, photo } = req.body
      if (!name) {
        throw Error('Nama harus diisi')
      }
      if (!email) {
        throw Error('Email harus diisi')
      }
      if (!password) {
        throw Error('Password harus diisi')
      }
      if (!phone) {
        throw Error('Nomor telepon harus diisi')
      }
      userModel.checkEmailRegistered(email)
        .then((result) => {
          userModel.register(name, result, password, phone, photo)
            .then((result) => {
              const hasil = { status: 'Sukses', message: result }
              res.json(hasil)
            })
            .catch((err) => {
              const hasil = { status: 'Error', err }
              res.json(hasil)
            })
        })
        .catch((err) => {
          const hasil = { status: 'Error', errMsg: err.message }
          res.json(hasil)
        })
    } catch (err) {
      const hasil = { status: 'Error', errMsg: err.message }
      res.json(hasil)
    }
  },
  updateData: (req, res) => {
    try {
      const { name, email, password, phone, photo } = req.body
      const id = req.params.id
      if (!name) {
        throw Error('Nama harus diisi')
      }
      if (!email) {
        throw Error('Email harus diisi')
      }
      if (!password) {
        throw Error('Password harus diisi')
      }
      if (!phone) {
        throw Error('Nomor telepon harus diisi')
      }
      userModel.updateData(id, name, email, password, phone, photo)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: 'Update data sukses!' }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'Data dengan id = ' + id + ' tidak ditemukan' }
            res.json(hasil)
          }
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
  deleteUser: (req, res) => {
    try {
      const id = req.params.id
      if (!id) {
        throw Error('ID harus diisi')
      }
      userModel.deleteUser(id)
        .then((result) => {
          if (result.rowCount > 0) {
            const hasil = { status: 'Sukses', message: 'Berhasil menghapus user dengan id = ' + id }
            res.json(hasil)
          } else {
            const hasil = { status: 'Error', message: 'User dengan id = ' + id + ' tidak ditemukan' }
            res.json(hasil)
          }
        })
        .catch((err) => {
          const hasil = { status: 'Error', message: err }
          res.json(hasil)
        })
    } catch (err) {
      const hasil = { status: 'Error', errMsg: err.message }
      res.json(hasil)
    }
  }
}
module.exports = userController
