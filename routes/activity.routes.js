const router = require('express').Router()

const { 
    createActivity, 
    getValidTypes,
    getAllActivities
} = require('../controllers/activity.controllers');

router.get('/valid-types', getValidTypes);
router.post('/create', createActivity);
router.get('/all-activities', getAllActivities)

module.exports = router