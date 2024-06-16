const { Schema, model } = require("mongoose");

const validTypes = [
'Culture and Heritage', 
'Nature and Adventure', 
'Relax and Wellness', 
'Entertainment and Leisure', 
'Culinary and Gastronomy'
]

const activitySchema = new Schema(
  {
    title:{
        type: String,
        required: true
    },
    // location: {
    //     type: {
    //         type: String,
    //         default: 'Point',
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    type: {
        type: String,
        enum: [...validTypes]
    },
    pictures: {
        type: [String]
    },
    description: {
        type: String
    },
    ratings: [{
        stars: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true
        },
        owner: {
            ref: 'user',
            type: Schema.Types.ObjectId,
            required: true
        }
    }],
    owner: {
        ref: 'user',
        type: Schema.Types.ObjectId
    }
  }
);

activitySchema.index({ location: '2dsphere' });

const Activity = model("activity", activitySchema);

module.exports = { Activity, validTypes }