const express = require('express');
const { bookResources } = require('../resources');

const router = express.Router();

router.use('/books', bookResources);

module.exports = router;
