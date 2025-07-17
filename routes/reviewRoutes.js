const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/auth');
const { getReviewsByISBN, addOrModifyReview, deleteReview } = require('../controllers/reviewController');

router.get('/isbn/:isbn', getReviewsByISBN);
router.post('/isbn/:isbn/review', authenticateJWT, addOrModifyReview);
router.delete('/isbn/:isbn/review', authenticateJWT, deleteReview);

module.exports = router;


