const Activity = require("../models/Activity.model")

const createActivity = (req, res, next) => {
    const { title, type, pictutes, description, ratings} = req.body;

    Activity
    .create({ title, type, pictutes, description, ratings })
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
};

module.exports = {
    createActivity
};