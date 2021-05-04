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
    guid: newBook.guid,
  });
};

const deleteBook = (req, res) => {
  console.log(req.params);
  res.send('done');
};

module.exports = {
  getAll,
  createBook,
  deleteBook,
  getByGuid,
};
