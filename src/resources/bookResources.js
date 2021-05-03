const express = require('express');
const { bookControllers } = require('../controllers');

const bookResources = express.Router();

bookResources.get('/', bookControllers.getAll);

module.exports = bookResources;
