const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Page d'accueil
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenue à Bookstore API</h1>
    <ul>
      <li><a href="/api/books">Liste des livres</a></li>
      <li><a href="/api/reviews/isbn/123456">Voir les reviews d'un livre</a></li>
      <li><a href="/api/users/register">S'inscrire (POST via Postman)</a></li>
      <li><a href="/api/users/login">Se connecter (POST via Postman)</a></li>
    </ul>
    <p>Note : les routes d'inscription et de connexion s'utilisent avec Postman (POST)</p>
  `);
});

// Middleware
app.use(cors());
app.use(express.json()); // Analyse les requêtes JSON

// Routes API
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Middleware gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

app.listen(PORT, () => console.log(`✅ Serveur démarré sur http://localhost:${PORT}`));