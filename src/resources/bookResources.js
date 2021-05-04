const express = require('express');
const { bookControllers } = require('../controllers');

const bookResources = express.Router();

bookResources.get('/', bookControllers.getAll);
bookResources.get('/:guid', bookControllers.getByGuid);
bookResources.post('/', bookControllers.createBook);
bookResources.put('/:guid', bookControllers.updateBook);
bookResources.delete('/:guid', bookControllers.deleteBook);

module.exports = bookResources;
