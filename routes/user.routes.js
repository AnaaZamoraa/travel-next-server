const router = require('express').Router()

const {
    profile,
    editUser,
    deleteUser,

} = require("../controllers/user.controllers")

const {verifyToken} = require('../middlewares/verifyToken')

router.get('/profile/:id', verifyToken, profile)
router.post('/editUser/:id', verifyToken, editUser)
router.delete('/deleteUser/:id', verifyToken, deleteUser)

module.exports = router