const router = require('express').Router()

const {
    createTravel,

} = require("../controllers/travel.controllers")

router.post('/create', createTravel)

module.exports = router