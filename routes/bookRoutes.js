// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const { getAllBooks, getBookByISBN, getBooksByAuthor,getBooksByTitle,getAllBooksAsync,getBookByISBNPromise, getBooksByAuthorCallback } = require('../controllers/bookController');
router.get('/', getAllBooks);
router.get('/isbn/:isbn', getBookByISBN);
router.get('/author/:author', getBooksByAuthor);
router.get('/title/:title', getBooksByTitle);
router.get('/async', getAllBooksAsync);
router.get('/promise/isbn/:isbn', getBookByISBNPromise);
router.get('/callback/author/:author', getBooksByAuthorCallback);

module.exports = router;
