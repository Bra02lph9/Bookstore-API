// controllers/reviewController.js
const books = require('../data/books.json');

// Task 5: Get reviews for a specific book by ISBN
const getReviewsByISBN = (req, res) => {
  const isbn = req.params.isbn;

  const book = books.find(b => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  // On renvoie la liste des reviews, ou un tableau vide s’il n’y en a pas
  res.status(200).json({ success: true, reviews: book.reviews || [] });
};

// Add or modify review for a book
const addOrModifyReview = (req, res) => {
  const isbn = req.params.isbn;
  const { rating, comment } = req.body;
  const userEmail = req.user.email; // récupéré via JWT middleware

  const book = books.find(b => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  if (!book.reviews) {
    book.reviews = [];
  }

  // Vérifier si l'utilisateur a déjà laissé un avis
  const existingReview = book.reviews.find(r => r.user === userEmail);

  if (existingReview) {
    // Modifier l'avis
    existingReview.rating = rating;
    existingReview.comment = comment;
  } else {
    // Ajouter un nouvel avis
    book.reviews.push({
      user: userEmail,
      rating,
      comment
    });
  }

  res.status(200).json({ success: true, message: 'Review added/modified successfully', reviews: book.reviews });
};
// Supprimer l'avis de l'utilisateur connecté pour un livre donné
const deleteReview = (req, res) => {
  const isbn = req.params.isbn;
  const userEmail = req.user.email;

  const book = books.find(b => b.isbn === isbn);
  if (!book) {
    return res.status(404).json({ success: false, message: 'Book not found' });
  }

  if (!book.reviews) {
    return res.status(404).json({ success: false, message: 'No reviews found for this book' });
  }

  const reviewIndex = book.reviews.findIndex(r => r.user === userEmail);
  if (reviewIndex === -1) {
    return res.status(404).json({ success: false, message: 'Review by this user not found' });
  }

  // Supprimer l'avis
  book.reviews.splice(reviewIndex, 1);

  res.status(200).json({ success: true, message: 'Review deleted successfully', reviews: book.reviews });
};

module.exports = {
  getReviewsByISBN,
  addOrModifyReview,
  deleteReview
};
