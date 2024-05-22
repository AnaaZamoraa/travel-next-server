const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

const profile = (req, res, next) => {
    const { _id: id } = req.payload;

    User.findById(id)
        .then(response => res.json(response))
        .catch(err => next(err));
};

const editUser = (req, res, next) => {
    const { _id: id } = req.payload;
    const { username, email, age } = req.body;
    let avatar = '';

    if (req.file) {
        avatar = req.file.path;
    }

    User.findByIdAndUpdate(id, { username, email, avatar, age }, { new: true })
        .then((user) => {
            const { username, email, avatar, age } = user;
            const payload = { username, email, avatar, age };

            const authToken = jwt.sign(
                payload,
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: '6h' }
            );

            res.status(200).json({ authToken });
        })
        .catch(err => next(err));
};

const deleteUser = (req, res, next) => {
    const { _id: id } = req.payload;

    User.findByIdAndDelete(id)
        .then(response => res.json({ msg: 'User was deleted!' }))
        .catch(err => next(err));
};

module.exports = {
    profile,
    editUser,
    deleteUser,
};
