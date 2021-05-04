const { check, validationResult, oneOf } = require('express-validator');

const createBook = [
  check('title')
    .exists().withMessage('Title can not be empty!')
    .isString(),
  check('author')
    .exists().withMessage('Author can not be empty!')
    .isString(),
  check('year')
    .exists().withMessage('Year can not be empty!')
    .isNumeric(),
  check('tags')
    .exists().withMessage('Tags can not be empty!')
    .isArray({ min: 1 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return next();
  },
];

const updateBook = [
  oneOf([
    [
      check('title')
        .exists()
        .isString(),
    ],
    [
      check('author')
        .exists()
        .isString(),
    ],
    [
      check('year')
        .exists()
        .isNumeric(),
    ],
    [
      check('tags')
        .exists()
        .isArray({ min: 1 }),
    ],
  ], 'Input at least one parameter!'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors);
    return next();
  },
];

module.exports = {
  createBook,
  updateBook,
};
