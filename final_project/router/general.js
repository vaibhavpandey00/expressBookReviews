const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


// Register a new user
public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users[username] = { password };
    
    res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop (Without Promise)
// public_users.get('/',function (req, res) {
//   return res.json(books);
// });

// Get the list of books using async-await with Axios
public_users.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://vaibhavpand3-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// // Get book details based on ISBN
// public_users.get('/isbn/:isbn', function (req, res) {
//     const isbn = parseInt(req.params.isbn, 10); 
//     const book = books[isbn];

//     if (book) {
//         res.json(book);
//     } else {
//         res.status(404).json({ message: "Book not found" });
//     }
// });

// Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const response = await axios.get(`https://vaibhavpand3-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ message: "Book not found" });
    }
});

  
// // Get book details based on author
// public_users.get('/author/:author', function (req, res) {
//     const author = req.params.author.toLowerCase();
//     const results = [];

//     for (const key in books) {
//         if (books[key].author.toLowerCase() === author) {
//             results.push(books[key]);
//         }
//     }

//     if (results.length > 0) {
//         res.json(results);
//     } else {
//         res.status(404).json({ message: "No books found for this author" });
//     }
// });

// Get book details based on author using async-await with Axios
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();
        const response = await axios.get('https://vaibhavpand3-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/:author');
        const books = response.data;
        const results = [];

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
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

// // Get all books based on title
// public_users.get('/title/:title', function (req, res) {
//     const title = req.params.title.toLowerCase();
//     const results = [];

//     for (const key in books) {
//         if (books[key].title.toLowerCase() === title) {
//             results.push(books[key]);
//         }
//     }

//     if (results.length > 0) {
//         res.json(results);
//     } else {
//         res.status(404).json({ message: "No books found with this title" });
//     }
// });

// Get all books based on title using async-await with Axios
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();
        const response = await axios.get('https://vaibhavpand3-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/:title');
        const books = response.data;
        const results = [];

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
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = parseInt(req.params.isbn, 10);
    const book = books[isbn];

    if (book) {
        res.json(book.reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
