const Travel = require("../models/Travel.model");
const { Activity } = require("../models/Activity.model");

const createTravel = (req, res, next) => {
    const { title, days, persons, pictures, activities, tips, ratings } = req.body;

    const activityPromises = activities.map(activity => Activity.create(activity));

    Promise.all(activityPromises)
        .then(createdActivities => {
            const activityIds = createdActivities.map(activity => activity._id);

            return Travel.create({ title, days, persons, pictures, activities: activityIds, tips, ratings });
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
};

const getAllTravels = (req, res, next) => {
    Travel
    .find()
    .sort({ createdAt: -1 })
    .populate('owner')
    .then((travels) => res.json(travels))
    .catch(err => next(err))
}
const getTravelById = (req, res, next) => {

    const {id} = req.params

    Travel
    .findById(id)
    .populate('owner')
    .then(travel => res.status(200).json(travel))
    .catch(err => next(err))
}

module.exports = {
    createTravel,
    getAllTravels,
    getTravelById
};
