/* eslint-disable no-shadow */
const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');

const p = path.join(path.dirname(require.main.filename), 'data', 'books.json');

module.exports = class User {
  constructor(data) {
    this.title = data.title;
    this.author = data.author;
    this.year = Number(data.year);
    this.tags = data.tags;
    this.guid = nanoid();
  }

  getGuid() {
    return this.guid;
  }

  async save() {
    const content = await fs.readFile(p);
    let books = [];
    books = JSON.parse(content);
    books.push(this);
    await fs.writeFile(p, JSON.stringify(books));
  }

  static async update(books) {
    await fs.writeFile(p, JSON.stringify(books));
  }

  static async getAll() {
    const content = await fs.readFile(p);
    return JSON.parse(content);
  }
};
