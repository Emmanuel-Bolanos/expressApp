const { Book } = require('../models');

const getAll = (req, res) => {
  Book.getAll((books) => {
    let bookCollection = books;

    if (Object.keys(req.query).length > 0) {
      // Store the queries into an array
      const filters = Object.entries(req.query).map(([k, v]) => {
        // make sure that the numbers are not strings
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(v)) return { key: k, value: Number(v) };
        // turn tags to lowercase
        if (Array.isArray(v)) return { key: k, value: v.map((str) => str.toLowerCase()) };
        // turn strings to lowercase
        return { key: k, value: v.toLowerCase() };
      });

      bookCollection = books
        .filter((book) => filters.every((element) => {
          // filter numbers
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(book[element.key])) return book[element.key] === element.value;
          // filter tags
          if (Array.isArray(book[element.key])) {
            const tags = book[element.key].map((str) => str.toLowerCase());
            return element.value.every((requestTag) => tags.includes(requestTag));
          }
          // filter normal strings
          return book[element.key].toLowerCase() === element.value;
        }));
    }

    res.status(200).send(bookCollection);
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
