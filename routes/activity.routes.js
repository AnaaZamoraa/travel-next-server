const router = require('express').Router()

const { 
    createActivity, 
    getValidTypes,
    getAllActivities,
    getActivityById
} = require('../controllers/activity.controllers');

router.get('/valid-types', getValidTypes);
router.post('/create', createActivity);
router.get('/all-activities', getAllActivities)
router.get('/:id', getActivityById)

module.exports = router