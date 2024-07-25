const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if username already exists
    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    // Register the new user
    users[username] = { password }; // Store user data (simple example, password should be hashed in a real app)
    
    res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = parseInt(req.params.isbn, 10); // Retrieve ISBN from request parameters
    const book = books[isbn];

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLowerCase(); // Retrieve author from request parameters
    const results = [];

    // Iterate through books and find matches
    for (const key in books) {
        if (books[key].author.toLowerCase() === author) {
            results.push(books[key]);
        }
    }

    if (results.length > 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "No books found for this author" });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title.toLowerCase(); // Retrieve title from request parameters
    const results = [];

    // Iterate through books and find matches
    for (const key in books) {
        if (books[key].title.toLowerCase() === title) {
            results.push(books[key]);
        }
    }

    if (results.length > 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "No books found with this title" });
    }
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = parseInt(req.params.isbn, 10); // Retrieve ISBN from request parameters
    const book = books[isbn];

    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
