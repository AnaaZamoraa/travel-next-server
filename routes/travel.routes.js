const router = require('express').Router()

const {
    createTravel,
    getAllTravels,
    getTravelById
} = require("../controllers/travel.controllers")

router.post('/create', createTravel)
router.get('/all-travels', getAllTravels)
router.get('/:id', getTravelById)

module.exports = router