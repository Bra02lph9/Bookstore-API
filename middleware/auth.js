const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Format: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET || 'secretKey123', (err, user) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
      }
      req.user = user; // ajoute les infos utilisateur à la requête
      next();
    });
  } else {
    res.status(401).json({ success: false, message: 'Authorization header missing' });
  }
};

module.exports = authenticateJWT;
