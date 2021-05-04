const { Book } = require('../models');

const getAll = (req, res) => {
  Book.getAll((books) => {
    res.status(200).send(books);
  });
};

const getByGuid = (req, res) => {
  const { guid } = req.params;
  Book.getAll((books) => {
    const selectedBook = books.find((book) => book.guid === guid);

    if (selectedBook) {
      return res.status(200).send(selectedBook);
    }
    return res.status(404).send({
      message: 'book not found',
    });
  });
};

const createBook = (req, res) => {
  const { body } = req;
  const newBook = new Book(body);

  newBook.save();

  res.status(201).send({
    message: 'New book created successfully',
    guid: newBook.getGuid(),
  });
};

const updateBook = (req, res) => {
  const { params: { guid }, body } = req;

  Book.getAll((books) => {
    const selectedBook = books.find((book) => book.guid === guid);

    if (selectedBook) {
      Object.assign(selectedBook, body);
      Book.update(books);
      return res.status(200).send({
        message: 'book updated successfully',
      });
    }
    return res.status(404).send({
      message: 'book not found',
    });
  });
};

const deleteBook = (req, res) => {
  const { guid } = req.params;
  Book.getAll((books) => {
    const bookIdx = books.findIndex((book) => book.guid === guid);

    if (bookIdx !== -1) {
      books.splice(bookIdx, 1);
      Book.update(books);
      return res.status(200).send({
        message: 'book deleted successfully',
      });
    }
    return res.status(404).send({
      message: 'book not found',
    });
  });
};

module.exports = {
  getAll,
  getByGuid,
  createBook,
  updateBook,
  deleteBook,
};
