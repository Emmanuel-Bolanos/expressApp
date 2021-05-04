const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class User {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this.tags = data.tags;
    this.guid = nanoid();
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
