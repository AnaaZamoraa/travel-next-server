const Travel = require("../models/Travel.model");
const { Activity } = require("../models/Activity.model");


const createTravel = (req, res, next) => {
    const { title, days, persons, pictures, activities, tips, ratings } = req.body;
    const owner = req.payload._id

    const activityPromises = activities.map(activity => Activity.create({...activity, owner}));

    Promise
        .all(activityPromises)
        .then(createdActivities => {
            const activityIds = createdActivities.map(activity => activity._id);

            return Travel.create({ title, days, persons, pictures, activities: activityIds, tips, ratings, owner});
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err));
};

const getTravels = (req, res, next) => {
    let query = {}
    const {location, days, persons} = req.query
    if (days){
        query = {$and: [
            {days: days}
        ]}
    }
    if (persons){
        query = {$and: [
            {persons: persons}
        ]}
    }

    Travel
    .find(query)
    .sort({ createdAt: -1 })
    .populate('owner')
    .then((travels) => res.json(travels))
    .catch(err => next(err))
}

const getTravelById = (req, res, next) => {

    const {id} = req.params

    Travel
    .findById(id)
    .populate('activities')
    .then(travel => res.status(200).json(travel))
    .catch(err => next(err))
}

const getTravelsByUser = (req, res, next) => {
    const owner = req.payload._id

    Travel
        .find({ 'owner': owner })
        .sort({ title: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))
}

module.exports = {
    createTravel,
    getTravels,
    getTravelById,
    getTravelsByUser
};
