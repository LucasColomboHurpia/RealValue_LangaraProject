const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this list"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'List must belong to a user!']
    },
    properties: [
        {
          type: mongoose.Schema.ObjectId,
          ref: 'Property'
        }
    ]
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

listSchema.virtual('propertiess', {
    ref: 'Property',
    foreignField: 'list',
    localField: '_id'
});

listSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'properties'
    });
    next();
});

const List = mongoose.model('List', listSchema);

module.exports = List;