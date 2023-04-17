const express = require('express');
const listRoute = require('./listRoute');
const authRoute = require('./authRoute');

const router = express.Router({ mergeParams: true });

router.use('/auth', authRoute);
router.use('/lists', listRoute);

module.exports = router;