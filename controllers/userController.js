const users = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier que l'email n'existe pas déjà
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }

  // Hasher le mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Ajouter l'utilisateur
  const newUser = { email, password: hashedPassword };
  users.push(newUser);

  res.status(201).json({ success: true, message: 'User registered successfully' });
};
const jwt = require('jsonwebtoken');

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ success: false, message: 'Invalid email or password' });
  }

  // Générer un JWT (secret dans .env ou ici)
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET || 'secretKey123', {
    expiresIn: '1h'
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token
  });
};

module.exports = {
  registerUser,
  loginUser
};
