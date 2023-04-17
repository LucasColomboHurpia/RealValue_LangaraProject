const List = require('../models/List');
const Property = require('../models/Property');

exports.getAllProperties = async (req, res, next) => {
    try {
        const properties = await Property.find();
        return res.status(200).json({
            status: "success",
            data: properties
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not get properties"
        }) 
    }
}

exports.addPropertyToList = async (req, res, next) => {
    try {
        const { type, image, price, adress1, adress2, area, link, ratio, age } = req.body.property;
        
        const property = await Property.create({
            list: req.params.id,
            type,
            image,
            price,
            adress1,
            adress2,
            area,
            link,
            ratio,
            age
        });

        const list = await List.findById(req.params.id);
        list.properties = [...list.properties, property._id];
        await list.save();

        console.log("List")
        console.log(list)
        
        return res.status(201).json({
            status: "success",
            data: property
        })
    } catch (error) {
        // console.log(error)
        return res.status(404).json({
            status: "success",
            message: "Could not create property"
        }) 
    }
}

exports.getOneProperty = async (req, res, next) => {
    try {
        const property = await Property.findById(req.params.id);
        return res.status(200).json({
            status: "success",
            data: property
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            data: "Could not find property"
        })
    }
}

exports.updateProperty = async (req, res, next) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            status: "success",
            data: property
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not update property"
        }) 
    }
}

exports.deleteProperty = async (req, res, next) => {
    try {
        const property = await Property.deleteOne({ _id: req.params.id});
        return res.status(204).json({
            status: "success",
            data: property
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not delete property"
        }) 
    }
}