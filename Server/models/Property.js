const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({    
    type: {
        type: String,
        enum: ['residential', 'commercial'],
        required: true,
        lowerCase: true
    },
    images: {
        type: Array,
        required: [true, 'Please provide at least one image'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for this property']
    },
    address: {
        type: String,
        required: [true, 'Please provide a address for this property'],
        lowerCase: true
    },
    city: {
        type: String,
        required: [true, 'Please provide a city for this property'],
        lowerCase: true
    },
    province: {
        type: String,
        required: [true, 'Please provide a province for this property'],
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