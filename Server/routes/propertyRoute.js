const express = require('express');
const PropertyController = require('../controllers/PropertyController');

const router = express.Router({ mergeParams: true });

router.route
('/')
.get(PropertyController.getAllProperties)
.post(PropertyController.addPropertyToList)


router.route
('/:id')
.get(PropertyController.getAllProperties)
.patch(PropertyController.updateProperty)
.delete(PropertyController.deleteProperty)

module.exports = router;