const User = require("../models/User.model");

const signup = (req, res, next) => {
  const { username, email, password, age, imageUrl } = req.body;

  User.create({ username, email, password, age, avatar: imageUrl })
    .then(() => res.sendStatus(201))
    .catch(err => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    res.status(400).json({ errorMessages: ["Email and password required"] });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ errorMessages: ["User not found"] });
        return;
      }

      if (foundUser.validatePassword(password)) {
        const authToken = foundUser.signToken();
        res.status(200).json({ authToken, username: foundUser.username });
      } else {
        res.status(401).json({ errorMessages: ["Credentials don't match"] });
      }
    })
    .catch(err => next(err));
};

const verify = (req, res, next) => {
  res.json(req.payload);
};

module.exports = {
  signup,
  login,
  verify,
};
