const express = require('express');
const { bookControllers } = require('../controllers');

const bookResources = express.Router();

bookResources.get('/', bookControllers.getAll);
bookResources.post('/', bookControllers.createBook);

module.exports = bookResources;
