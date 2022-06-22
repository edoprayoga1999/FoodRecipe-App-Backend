const userModel = require('../models/user.model')
const { success, failed } = require('../helpers/response')
const userController = {
  showAllUser: async (req, res) => {
    try {
      const { sortField, sortType, page, limit } = req.query
      const field = sortField || 'name'
      const type = sortType === 'DESC' ? sortType : 'ASC'
      const getPage = page ? Number(page) : 1
      const limitPage = limit ? Number(limit) : 2
      const offset = (getPage - 1) * limitPage
      const allData = await userModel.allData()
      const totalData = Number(allData.rows[0].total)
      userModel.showAllUser(field, type, limitPage, offset)
        .then((result) => {
          const pagination = { page: getPage, data_perPage: limitPage, total_data: totalData }
          success(res, result.rows, 'success', 'get user success', pagination)
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, err, 'error', 'an error has occured')
    }
  },
  updateData: (req, res) => {
    try {
      const { name, email, phone } = req.body
      let photo
      if (typeof (req.body.photo) === 'string') {
        photo = req.body.photo
      } else {
        photo = req.file.filename
      }
      const id = req.params.id
      if (!name) {
        throw Error('Nama harus diisi')
      }
      if (!email) {
        throw Error('Email harus diisi')
      }
      if (!phone) {
        throw Error('Nomor telepon harus diisi')
      }
      userModel.updateData(id, name, email, phone, photo)
        .then((result) => {
          if (result.rowCount > 0) {
            success(res, null, 'success', 'update data sukses!')
          } else {
            failed(res, 'id not found', 'error', 'data tidak ditemukan')
          }
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
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
            success(res, null, 'success', 'berhasil menghapus user!')
          } else {
            failed(res, 'id not found', 'error', 'data tidak ditemukan')
          }
        })
        .catch((err) => {
          failed(res, err, 'error', 'an error has occured')
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  },
  suspendUser: (req, res) => {
    try {
      const { id } = req.params
      if (!id) {
        throw Error('id must be given')
      }
      let status
      if (req.body.action === 'deactivate') {
        status = 0
      } else if (req.body.action === 'activate') {
        status = 1
      } else {
        throw Error("action must be 'activate' or 'deactivate' only")
      }
      userModel.updateStatus(id, status)
        .then((result) => {
          if (result.rowCount > 0) {
            success(res, null, 'success', 'update status user success!')
          } else {
            failed(res, null, 'error', 'no recipe found')
          }
        })
        .catch((err) => {
          failed(res, null, 'error', err.message)
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  },
  detailUser: (req, res) => {
    try {
      const id = req.params.id
      if (!id) {
        throw Error('ID harus diisi')
      }
      userModel.detailUser(id)
        .then((result) => {
          if (result.rowCount > 0) {
            success(res, result.rows, 'success', 'menampilkan data user sukses')
          } else {
            failed(res, 'id not found', 'error', 'data tidak ditemukan')
          }
        })
        .catch((err) => {
          failed(res, null, 'error', err.message)
        })
    } catch (err) {
      failed(res, null, 'error', err.message)
    }
  }
}
module.exports = userController
