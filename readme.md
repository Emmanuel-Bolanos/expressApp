# Express Assignment

Build an API with Express with the following requirements:

A client wants a web page, and you're going to be on the backend team. The general requirements are the following:

"We are going to create a website to store our books information. If we want to add a new entry for a book, we need the title, author, publication year and tags. Please return to us a unique identifier (GUID) if a new book is added. For searching, we need to be able to fetch the books information in 2 different ways: by book GUID, and by parameters (title, author, publication year or a tag). We should be able to update and delete current books. If the book info is already in our database (title, author and publication year, no matter the tags), don't allow the creation for the new entry. Finally, please be careful, we don't want to see invalid values on book information: title and author should be characters, publication year should be a valid year, larger than 1454; and tags should be an array of characters like ['adventure', 'comedy']"

Interpretation:

- [X] GET all books
  - [X] GET by GUID
  - [X] GET by parameters (title, author, year or tag)
- [X] POST books
  - [X] If the book already exists (same title, author & year), dont allow the duplicate.
  - [X] Return a GUID for new books.
- [X] UPDATE specific book.
- [X] DELETE specific book.
- [X] Validations:
  - [X] new books require: title, author, year and tags.
  - [X] title and author must be strings.
  - [X] year must be larger than 1454.
  - [X] tags must be an array with strings.

Additional requirements:

- [X] Use port 5000 and domain /books
- [X] Your API should be able to start with the command "npm run dev"
- [X] Use MVC Model
- [X] Use a middleware for input data validations

Extra:

- [X] Async/await implementation with Internal server error handling

# How to use it

Get all the books in the books.json file in data with a GET request to /books from the port 5000 of the localhost

You can use any of the GUID shown to query an specific book. For example, you can send a GET to: http://localhost:5000/books/jL_DJvZy6rlOQtMsgusv5 and in the original db this would return the book "Summer 2084" and all its information.

You can also search books by parameters. If you would like to see all the books that include the tag of "horror", you could send a GET to: http://localhost:5000/books?tags=horror

You can be more specific and include more parameters, for example: http://localhost:5000/books?author=James+Jameson&year=2020&tags=horror is a valid GET request and would return the book "The Triple Terror"

To create a new book send a POST request to http://localhost:5000/books and include the book data on the body. If the validation rules are not followed, a corresponding error will be returned. Furthermore, attempting to duplicate an existing book will result in a 409 status code and a notification to the user to let him know that duplicates are not allowed.

To update information in a book use a PUT request with the GUID of the book you want to modify: http://localhost:5000/books/jL_DJvZy6rlOQtMsgusv5 . To make an update you must change at least 1 value. If the change creates a duplicate of any book in the db, an error will be send to the user.

Delete a book with a DELETE request to http://localhost:5000/books/:GUID . If the GUID is not found a 404 code is returned.
