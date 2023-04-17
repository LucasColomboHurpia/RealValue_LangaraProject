const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({    
    type: {
        type: String,
        // enum: ['residential', 'commercial'],
        required: true,
        lowerCase: true
    },
    image: {
        type: String,
        required: [true, 'Please provide at least one image'],
    },
    price: {
        type: String,
        required: [true, 'Please provide a price for this property']
    },
    adress1: {
        type: String,
        rquired: [true, 'Please provide address1 for this property'],
        lowerCase: true
    },
    adress2: {
        type: String,
        required: [true, 'Please provide address2 for this property'],
        lowerCase: true
    },
    area: {
        type: String,
        required: [true, 'Please provide an area for this property'],
        lowerCase: true
    },
    link: {
        type: String,
        required: [true, 'Please provide a link for this property'],
        lowerCase: true
    },
    ratio: {
        type: String,
        required: [true, 'Please provide a ratio for this property'],
        lowerCase: true
    },
    age: {
        type: String,
        required: [true, 'Please provide an age for this property'],
        lowerCase: true
    },
    list: {
        type: mongoose.Schema.ObjectId,
        ref: 'List',
        required: [true, 'Property must belong to a list!']
    },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;