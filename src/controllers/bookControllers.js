const { Book } = require('../models');

const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

const createBook = (req, res) => {
  const { body } = req;
  const newBook = new Book(body);

  newBook.save();
  res.status(201).send({
    message: 'New book created successfully',
    guid: 'id goes here',
  });
};

module.exports = {
  getAll,
  createBook,
};
