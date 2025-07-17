
const books = require('../data/books.json');

const getAllBooks = (req, res) => {
  res.status(200).json({
    success: true,
    data: books
  });
};

// TASK 2: Get book by ISBN using Promise
const getBookByISBN = (req, res) => {
  const isbn = req.params.isbn;

  // Utilisation de Promise
  const findBook = new Promise((resolve, reject) => {
    const book = books.find((b) => b.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });

  findBook
    .then((book) => {
      res.status(200).json({ success: true, data: book });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};
// TASK 3: Get books by author using async/await
const getBooksByAuthor = async (req, res) => {
  try {
    const author = req.params.author.toLowerCase();

    // Simuler une fonction asynchrone (par exemple une DB)
    const booksByAuthor = await new Promise((resolve) => {
      const result = books.filter(
        (b) => b.author.toLowerCase() === author
      );
      resolve(result);
    });

    if (booksByAuthor.length > 0) {
      res.status(200).json({ success: true, data: booksByAuthor });
    } else {
      res.status(404).json({ success: false, message: 'No books found for this author' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Callback function to find books by title
function findBooksByTitle(title, callback) {
  const matchedBooks = books.filter(b => b.title.toLowerCase() === title.toLowerCase());
  if (matchedBooks.length > 0) {
    callback(null, matchedBooks);
  } else {
    callback('No books found for this title', null);
  }
}

// Get books by title using callback
const getBooksByTitle = (req, res) => {
  const title = req.params.title;

  findBooksByTitle(title, (err, data) => {
    if (err) {
      return res.status(404).json({ success: false, message: err });
    }
    res.status(200).json({ success: true, data });
  });
};

// T Get all books using async/await
const getAllBooksAsync = async (req, res) => {
  try {
    const allBooks = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(books);
      }, 100);
    });

    res.status(200).json({ success: true, data: allBooks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// Task 11: Search by ISBN using Promise
const getBookByISBNPromise = (req, res) => {
  const isbn = req.params.isbn;

  const findBookPromise = new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === isbn);
    if (book) {
      resolve(book);
    } else {
      reject('Book not found');
    }
  });

  findBookPromise
    .then(book => res.status(200).json({ success: true, data: book }))
    .catch(err => res.status(404).json({ success: false, message: err }));
};
// Task 12: Search by author using callback
function findBooksByAuthorCallback(author, callback) {
  const result = books.filter(b => b.author.toLowerCase() === author.toLowerCase());
  if (result.length > 0) {
    callback(null, result);
  } else {
    callback('No books found for this author', null);
  }
}

const getBooksByAuthorCallback = (req, res) => {
  const author = req.params.author;
  findBooksByAuthorCallback(author, (err, data) => {
    if (err) {
      return res.status(404).json({ success: false, message: err });
    }
    res.status(200).json({ success: true, data });
  });
};

module.exports = {
  getAllBooks,
  getBookByISBN,
   getBooksByAuthor,
   getBooksByTitle,
   getAllBooksAsync,
   getBookByISBNPromise,
   getBooksByAuthorCallback
};