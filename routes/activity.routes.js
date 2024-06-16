const router = require('express').Router()

const { 
    createActivity, 
    getValidTypes } = require('../controllers/activity.controllers');

router.post('/create', createActivity);
router.get('/valid-types', getValidTypes);

module.exports = router