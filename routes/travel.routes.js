const router = require('express').Router()
const {verifyToken} = require('../middlewares/verifyToken')

const {
    createTravel,
    getAllTravels,
    getTravelById,
    getTravelsByUser
} = require("../controllers/travel.controllers")

router.post('/create', createTravel)
router.get('/all-travels', getAllTravels)
router.get('/me', verifyToken, getTravelsByUser)
router.get('/:id', getTravelById)

module.exports = router