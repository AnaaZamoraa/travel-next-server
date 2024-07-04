const { Schema, model } = require("mongoose");

const travelSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    // location: {
    //   type: 
    // },
    days: {
      type: Number
    },
    persons: {
      type: Number
    },
    pictures:{
      type: [String]
    },
    activities:[{
      ref: 'Activity',
      type: Schema.Types.ObjectId,
    }],
    tips:{
      type: [String]
    },
    ratings: [{
      stars: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
          required: true
      },
      owner: {
          ref: 'User',
          type: Schema.Types.ObjectId,
          required: true
      }
    }],
    owner:{
      ref: 'User',
      type: Schema.Types.ObjectId
    }
});

const Travel = model("Travel", travelSchema);

module.exports = Travel;
