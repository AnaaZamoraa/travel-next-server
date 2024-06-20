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

module.exports = {
    createTravel
};
