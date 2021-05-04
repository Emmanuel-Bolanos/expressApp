# Express Assignment

Build an API with Express with the following requirements:

A client wants a web page, and you're going to be on the backend team. The general requirements are the following:

"We are going to create a website to store our books information. If we want to add a new entry for a book, we need the title, author, publication year and tags. Please return to us a unique identifier (GUID) if a new book is added. For searching, we need to be able to fetch the books information in 2 different ways: by book GUID, and by parameters (title, author, publication year or a tag). We should be able to update and delete current books. If the book info is already in our database (title, author and publication year, no matter the tags), don't allow the creation for the new entry. Finally, please be careful, we don't want to see invalid values on book information: title and author should be characters, publication year should be a valid year, larger than 1454; and tags should be an array of characters like ['adventure', 'comedy']"

Interpretation:

- [X] GET all books
  - [X] GET by GUID
  - [ ] GET by parameters (title, author, year or tag)
- [X] POST books
  - [ ] body requires: title, author, year and tags. If the book already exists (same title, author & year), dont allow the duplicate.
  - [X] Return a GUID for new books.
- [ ] UPDATE specific book.
- [ ] DELETE specific book.
- [ ] Validations:
  - [ ] title and author must be strings.
  - [ ] year must be larger than 1454.
  - [ ] tags must be an array with strings.

Additional requirements:

- [X] Use port 5000 and domain /books
- [X] Your API should be able to start with the command "npm run dev"
- [X] Use MVC Model
- [ ] Use a middleware for input data validations
