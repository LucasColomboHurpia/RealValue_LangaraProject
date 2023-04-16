const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this list"]
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

listSchema.virtual('properties', {
    ref: 'Property',
    foreignField: 'list',
    localField: '_id'
});

const List = mongoose.model('List', listSchema);

module.exports = List;