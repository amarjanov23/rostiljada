require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Team = require('../models/Team');

const app = express();

// Middleware za parsiranje JSON-a
app.use(express.json());

// Dinamički CORS: dozvoli lokalni
app.use(cors({
  origin: 'https://rostiljada.vercel.app',  // Dozvoli samo ovu frontend domenu
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Metode koje dozvoljavaš
  credentials: true,  // Ako koristiš cookie-je ili autorizaciju
}));

// Povezivanje na MongoDB iz .env
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => console.log('✅ Povezano s MongoDB Atlas'))
  .catch(err => console.error('❌ Greška pri povezivanju:', err));

// API rute
app.post('/api/register', async (req, res) => {
  try {
    const noviTim = new Team(req.body);
    await noviTim.save();
    res.status(201).json({ poruka: 'Tim uspješno dodan!' });
  } catch (err) {
    console.error('Greška pri dodavanju tima:', err);
    res.status(500).json({ greška: 'Greška pri dodavanju tima.' });
  }
});

app.get('/api/register', async (req, res) => {
  try {
    const timovi = await Team.find();
    res.status(200).json(timovi);
  } catch (err) {
    console.error('Greška pri dohvaćanju timova:', err);
    res.status(500).json({ greška: 'Greška pri dohvaćanju timova.' });
  }
});

// Start servera
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
