const { Activity, validTypes } = require("../models/Activity.model");

const getValidTypes = (req, res) => {
    res.json(validTypes);
};

const createActivity = (req, res, next) => {
    const { title, type, pictures, description, ratings} = req.body;
    const owner = req.payload._id
    Activity
    .create({ title, type, pictures, description, ratings, owner })
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
};

const getActivities = (req, res, next) => {
    let query = {}

    Activity
    .find(query)
    .sort({ createdAt: -1 })
    .populate('owner')
    .then((activities) => res.json(activities))
    .catch(err => next(err))
}

const getActivityById = (req, res, next) => {
    const { id } = req.params;
    Activity
        .findById(id)
        .populate('owner')
        .then((activity) => res.status(200).json(activity))
        .catch(err => next(err));
};

const getActivitiesByUser = (req, res, next) => {
    const owner = req.payload._id
    console.log(req.payload)

    Activity
        .find({ 'owner': owner })
        .sort({ title: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}


module.exports = {
    getValidTypes,
    createActivity, 
    getActivities,
    getActivitiesByUser,
    getActivityById,
};