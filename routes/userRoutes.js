const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/register', (req, res) => {
  res.send('Ceci est la page d\'inscription (GET) — normalement API attend POST');
});

module.exports = router;

