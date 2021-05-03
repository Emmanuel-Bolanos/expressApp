const fs = require('fs');
const path = require('path');
// TODO Select identifier, might take a look into nanoid https://github.com/ai/nanoid
// or just use uuid https://www.npmjs.com/package/uuid
// const uuid = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class User {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this.tags = data.tags;
    // id!
  }

  save() {
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      books.push(this);
      fs.writeFile(p, JSON.stringify(books), (error) => console.log(error));
    });
  }

  static getAll(cb) {
    fs.readFile(p, (err, data) => {
      let books = [];
      if (!err) {
        books = JSON.parse(data);
      }
      cb(books);
    });
  }
};
