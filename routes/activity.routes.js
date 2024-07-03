const router = require('express').Router()
const {verifyToken} = require('../middlewares/verifyToken')

const { 
    createActivity, 
    getValidTypes,
    getAllActivities,
    getActivityById,
    getActivitiesByUser
} = require('../controllers/activity.controllers');

router.get('/valid-types', getValidTypes);
router.post('/create', createActivity);
router.get('/all-activities', getAllActivities)
router.get('/me', verifyToken, getActivitiesByUser)
router.get('/:id', getActivityById)

module.exports = router