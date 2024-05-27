const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    avatar: {
      type: String,
      default: 'https://res.cloudinary.com/dv7nx2bxb/image/upload/v1715702223/travel-next/cky1nilyf1ojtc06gg85.png'
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    age: {
      type: Number
    },
    favorites:{
      travels: [{
        type: Schema.Types.ObjectId,
        ref: 'travel'
      }],
      activities: [{
        type: Schema.Types.ObjectId,
        ref: 'activity'
      }]
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { username, email, avatar, role, age } = this
  const payload = { username, email, avatar, role, age }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "4h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (possiblePassword) {
  return bcrypt.compareSync(possiblePassword, this.password)
}

const User = model("user", userSchema);

module.exports = User;
