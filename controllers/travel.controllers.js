const Travel = require("../models/Travel.model")

const createTravel = (req, res, next) => {
    const { title, days, persons, pictures, activities, tips, ratings } = req.body;

    Travel
    .create({ title, days, persons, pictures, activities, tips, ratings })
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
};

module.exports = {
    createTravel
};