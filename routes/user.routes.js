const router = require('express').Router()

const {
    profile,
    editUser,
    deleteUser,

} = require("../controllers/user.controllers")

router.post('/profile', profile)
router.post('/editUser', editUser)
router.get('/deleteUser', deleteUser)

module.exports = router