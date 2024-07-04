const router = require('express').Router()
const {verifyToken} = require('../middlewares/verifyToken')

const {
    createTravel,
    getTravels,
    getTravelById,
    getTravelsByUser
} = require("../controllers/travel.controllers")

router.post('/create', verifyToken, createTravel)
router.get('/all-travels', getTravels)
router.get('/me', verifyToken, getTravelsByUser)
router.get('/:id', getTravelById)

module.exports = router