const List = require('../models/List');
const Property = require('../models/Property');

exports.getAllLists = async (req, res, next) => {
    try {
        const lists = await List.find();
        return res.status(200).json({
            status: "success",
            data: lists
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not get lists"
        }) 
    }
}

exports.createList = async (req, res, next) => {
    try {
        const list = await List.create(req.body);
        return res.status(201).json({
            status: "success",
            data: list
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not create list"
        }) 
    }
}

exports.getOneList = async (req, res, next) => {
    try {
        const list = await List.findById(req.params.id);
        return res.status(200).json({
            status: "success",
            data: list
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not get list"
        }) 
    }
}

exports.updateList = async (req, res, next) => {
    try {
        const list = await List.findById(req.params.id);
        if(list) {
            const property = await Property.create({
                name: req.body.name,
                listId: list.id
            });

            list.properties = [...list.properties, property];
        }
        
        return res.status(200).json({
            status: "success",
            data: list
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not update list"
        }) 
    }
}

exports.deleteList = async (req, res, next) => {
    try {
        const list = await List.deleteOne({ _id: req.params.id});
        return res.status(204).json({
            status: "success",
            data: list
        })
    } catch (error) {
        return res.status(404).json({
            status: "success",
            message: "Could not delete list"
        }) 
    }
}