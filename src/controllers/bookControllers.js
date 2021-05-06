const { Book } = require('../models');

const getAll = async (req, res) => {
  try {
    let bookCollection = await Book.getAll();

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

      bookCollection = bookCollection.filter((book) => filters.every((element) => {
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

    return res.status(200).send(bookCollection);
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error, please try again later',
    });
  }
};

const getByGuid = async (req, res) => {
  // read query parameter
  const { guid } = req.params;
  try {
    const bookCollection = await Book.getAll();
    // match query with existing guid
    const selectedBook = bookCollection.find((book) => book.guid === guid);
    // return success if found, else send a 404
    if (selectedBook) {
      return res.status(200).send(selectedBook);
    }
    return res.status(404).send({
      message: 'book not found',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error, please try again later',
    });
  }
};

const createBook = async (req, res) => {
  const data = req.body;
  const newBook = new Book(data);

  try {
    const bookCollection = await Book.getAll();

    // Check that the usr book is not on the db
    if (bookCollection.some((book) => {
      const bookProps = Object.entries(book).slice(0, 3);
      return bookProps.every((prop) => prop[1] === newBook[prop[0]]);
    })) {
      return res.status(409).send({
        message: 'The book already exists! Do not duplicate books, please',
      });
    }
    // save the book
    await newBook.save();
    return res.status(201).send({
      message: 'New book created successfully',
      guid: newBook.getGuid(),
    });
  } catch (err) {
    return res.status(500).send({
      message: 'Internal Server Error, please try again later',
    });
  }
};

const updateBook = async (req, res) => {
  const { guid } = req.params;
  const data = req.body;

  try {
    const bookCollection = await Book.getAll();
    const selectedBook = bookCollection.find((book) => book.guid === guid);

    if (selectedBook) {
      Object.assign(selectedBook, data);
      await Book.update(bookCollection);
      return res.status(200).send({
        message: 'book updated successfully',
      });
    }
    return res.status(404).send({
      message: 'book not found',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error, please try again later',
    });
  }
};

const deleteBook = async (req, res) => {
  // read the query parameter
  const { guid } = req.params;

  try {
    const bookCollection = await Book.getAll();
    // search for guid in db
    const bookIdx = bookCollection.findIndex((book) => book.guid === guid);
    // if found, delete element and notify client
    if (bookIdx !== -1) {
      bookCollection.splice(bookIdx, 1);
      Book.update(bookCollection);
      return res.status(200).send({
        message: 'book deleted successfully',
      });
    }
    // else do nothing and return a 404
    return res.status(404).send({
      message: 'book not found',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error, please try again later',
    });
  }
};

module.exports = {
  getAll,
  getByGuid,
  createBook,
  updateBook,
  deleteBook,
};
