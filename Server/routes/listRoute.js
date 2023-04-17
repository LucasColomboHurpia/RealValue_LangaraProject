const express = require('express');
const ListController = require('../controllers/ListController');
const authController = require('../controllers/authController');
const propertyRoute = require('./propertyRoute');

const router = express.Router();

router.route('/')
.get(ListController.getAllLists)
.post(authController.protect, ListController.createList)

router.route('/:id')
.get(ListController.getOneList)
.patch(ListController.updateList)
.delete(ListController.deleteList)

router.use('/:id/properties', propertyRoute);

module.exports = router;