const express = require('express');
const { bookControllers } = require('../controllers');
const { validate } = require('../validation');

const bookResources = express.Router();

bookResources.get('/', bookControllers.getAll);
bookResources.get('/:guid', bookControllers.getByGuid);
bookResources.post('/', validate.createBook, bookControllers.createBook);
bookResources.put('/:guid', validate.updateBook, bookControllers.updateBook);
bookResources.delete('/:guid', bookControllers.deleteBook);

module.exports = bookResources;
