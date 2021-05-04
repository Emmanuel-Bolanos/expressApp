const { check, validationResult, oneOf } = require('express-validator');

const createBook = [
  check('title')
    .exists()
    .withMessage('Title can not be empty!')
    .bail()
    .isString()
    .withMessage('Title contains invalid characters!'),
  check('author')
    .exists()
    .withMessage('Author can not be empty!')
    .bail()
    .isString()
    .not()
    .isNumeric()
    .withMessage('Author name contains invalid characters!'),
  check('year')
    .exists()
    .withMessage('Year can not be empty!')
    .bail()
    .isNumeric()
    .withMessage('Year must be a number!')
    .bail()
    .custom((value) => {
      const minYear = 1454;
      const currentYear = new Date().getFullYear();
      if (value > currentYear || value < minYear) throw new Error('Year must be greater than 1454 and not from the future!');
      return true;
    }),
  check('tags')
    .exists().withMessage('Tags can not be empty!')
    .bail()
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
        .bail()
        .isString(),
    ],
    [
      check('author')
        .exists()
        .bail()
        .isString()
        .not()
        .isNumeric(),
    ],
    [
      check('year')
        .exists()
        .bail()
        .isNumeric()
        .bail()
        .custom((value) => {
          const minYear = 1454;
          const currentYear = new Date().getFullYear();

          if (value > currentYear || value < minYear) throw new Error('Year must be greater than 1454 and not from the future!');
          return true;
        }),
    ],
    [
      check('tags')
        .exists()
        .bail()
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
