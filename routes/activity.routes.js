const router = require('express').Router()

const {
    createActivity,

} = require("../controllers/activity.controllers")

router.post('/create', createActivity)

module.exports = router