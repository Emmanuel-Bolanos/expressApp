const { Book } = require('../models');

const getAll = (req, res) => {
  Book.getAll((books) => {
    res.send(books);
  });
};

module.exports = {
  getAll,
};
