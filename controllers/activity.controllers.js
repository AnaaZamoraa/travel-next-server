const { Activity, validTypes } = require("../models/Activity.model");

const getValidTypes = (req, res) => {
    res.json(validTypes);
};

const createActivity = (req, res, next) => {
    const { title, type, pictures, description, ratings} = req.body;

    Activity
    .create({ title, type, pictures, description, ratings })
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
};

const getAllActivities = (req, res, next) => {
    Activity
    .find()
    .sort({ createdAt: -1 })
    .populate('owner')
    .then((activities) => res.json(activities))
    .catch(err => next(err))
}

module.exports = {
    getValidTypes,
    createActivity, 
    getAllActivities
};