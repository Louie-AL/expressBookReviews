const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

// Task 6: Register Users
public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    let userExists = users.filter((user) => user.username === username).length > 0;
  
    if (userExists) {
      return res.status(409).json({ message: "Username already exists" });
    }
  
    users.push({ username: username, password: password });
  
    return res.status(200).json({ message: "User registered successfully" });
});

// Task 10: Get all books using async/await
public_users.get('/', async (req, res) => {
    try {
        const getBooks = () => {
            return new Promise((resolve, reject) => {
                resolve(books);
            });
        }

        const allBooks = await getBooks();
        return res.status(200).send(JSON.stringify(allBooks, null, 4));
    } catch (err) {
        return res.status(500).json({ message: "Error getting books" });
    }
});

// Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;

    const getBookByISBN = new Promise((resolve, reject) => {
        if (books[isbn]) {
            resolve(books[isbn]);
        } else {
            reject("Book not found");
        }
    });

    getBookByISBN.then((book) => {
        return res.status(200).json(book);
    }).catch((err) => {
        return res.status(404).json({ message: err });
    });
});

// Task 12: Get book details based on author using async/await
public_users.get('/author/:author', async (req, res) => {
    const author = req.params.author;

    const getBooksByAuthor = () => {
        return new Promise((resolve, reject) => {
            let filtered_books = [];

            for (let key in books) {
                if (books[key].author === author) {
                    filtered_books.push(books[key]);
                }
            }

            if (filtered_books.length > 0) {
                resolve(filtered_books);
            } else {
                reject("No books by this author found");
            }
        });
    }

    try {
        const foundBooks = await getBooksByAuthor();
        return res.status(200).json(foundBooks);
    } catch (err) {
        return res.status(404).json({ message: err });
    }
});

// Task 13: Get book details based on title using async/await
public_users.get('/title/:title', async (req, res) => {
    const title = req.params.title;

    const getBooksByTitle = () => {
        return new Promise((resolve, reject) => {
            let filtered_books = [];

            for (let key in books) {
                if (books[key].title === title) {
                    filtered_books.push(books[key]);
                }
            }

            if (filtered_books.length > 0) {
                resolve(filtered_books);
            } else {
                reject("No books with this title found");
            }
        });
    }

    try {
        const foundBooks = await getBooksByTitle();
        return res.status(200).json(foundBooks);
    } catch (err) {
        return res.status(404).json({ message: err });
    }
});

// Task 5: Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
  
    if (book) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
