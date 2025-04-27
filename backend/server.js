// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Dopuštamo samo sa frontenda
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); // Da parsamo JSON tijela zahtjeva

// Test ruta
app.get('/', (req, res) => {
  res.send('Server radi!');
});

// Ruta za registraciju
app.post('/api/register', (req, res) => {
  const { game, teamName, captain, members } = req.body;

  console.log('Primljeni podaci:', {
    game,
    teamName,
    captain,
    members
  });

  res.status(200).json({ message: 'Registracija uspješna!' });
});

// Pokreni server
app.listen(PORT, () => {
  console.log(`✅ Server pokrenut na http://localhost:${PORT}`);
});
