const router = require('express').Router()
const {verifyToken} = require('../middlewares/verifyToken')

const { 
    createActivity, 
    getValidTypes,
    getActivities,
    getActivityById,
    getActivitiesByUser
} = require('../controllers/activity.controllers');

router.get('/valid-types', verifyToken, getValidTypes);
router.post('/create', verifyToken, createActivity);
router.get('/all-activities', getActivities)
router.get('/me', verifyToken, getActivitiesByUser)
router.get('/:id', getActivityById)

module.exports = router