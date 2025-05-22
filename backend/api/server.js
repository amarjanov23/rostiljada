require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const teamRoutes = require('../routes/teamRoutes'); // prilagodi putanju ako treba

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

// Middleware
app.use(express.json());

// CORS konfiguracija
const allowedOrigins = [
  'https://rostiljada.vercel.app',
  'http://localhost:5173',
  'https://www.rostiljada-szv.online'
];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middleware za provjeru JWT tokena
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token nije pronađen' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Neispravan token' });
    req.user = user;
    next();
  });
}

// Login ruta za dobivanje JWT tokena
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const user = { name: username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Neispravan username ili lozinka' });
});

// Rute za timove
// Ovdje možeš zaštititi rutu ako želiš (authenticateToken middleware), npr:
// app.use('/api/teams', authenticateToken, teamRoutes);
// ili ostaviti javno dostupno za prijavu i brojanje
app.use('/api/teams', teamRoutes);

// Pokretanje servera i povezivanje na MongoDB
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Povezano na MongoDB');
    app.listen(PORT, () => {
      console.log(`Server radi na portu ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Greška prilikom povezivanja na MongoDB:', err);
  });
