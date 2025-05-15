require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Team = require('../models/Team'); // prilagodi putanju do modela

const app = express();
const SECRET_KEY = process.env.JWT_SECRET;

app.use(express.json());

// CORS konfiguracija
const allowedOrigins = ['https://rostiljada.vercel.app', 'http://localhost:5173'];
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
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

// Login ruta
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const user = { name: username };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).json({ message: 'Neispravan username ili lozinka' });
});

// Dohvati sve timove (zaštićena ruta)
app.get('/api/teams', authenticateToken, async (req, res) => {
  try {
    const timovi = await Team.find();
    res.json(timovi);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dohvatu timova' });
  }
});

// Registracija novog tima (javni endpoint)
app.post('/api/register', async (req, res) => {
  try {
    const noviTim = new Team(req.body);
    await noviTim.save();
    res.status(201).json({ message: 'Tim uspješno dodan' });
  } catch (err) {
    res.status(500).json({ message: 'Greška pri dodavanju tima' });
  }
});

// Ažuriranje tima s određenim ID-em (zaštićena ruta)
app.put('/api/teams/:id', authenticateToken, async (req, res) => {
  const teamId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedTeam = await Team.findByIdAndUpdate(teamId, updatedData, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Tim nije pronađen' });
    }
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ message: 'Greška pri ažuriranju tima' });
  }
});

// Brisanje tima (zaštićena ruta)
app.delete('/api/teams/:id', authenticateToken, async (req, res) => {
  const teamId = req.params.id;

  try {
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Tim nije pronađen' });
    }
    res.json({ message: 'Tim je obrisan' });
  } catch (err) {
    res.status(500).json({ message: 'Greška pri brisanju tima' });
  }
});

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Povezano na MongoDB');
    app.listen(PORT, () => {
      console.log(`Server radi na portu ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB error:', err));
