const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

// Povezivanje s MongoDB
mongoose.connect('mongodb://localhost:27017/teams', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Povezan na MongoDB"))
  .catch(err => console.log("Greška pri povezivanju s MongoDB:", err));

// Definiraj model tima
const teamSchema = new mongoose.Schema({
  sport: String,
  nazivTima: String,
  odgovornaOsoba: String,
  clanovi: [String],
});

const Team = mongoose.model('Team', teamSchema);

app.use(cors());
app.use(express.json());

// Ruta za registraciju tima
app.post('/api/register', async (req, res) => {
  const { sport, nazivTima, odgovornaOsoba, clanovi } = req.body;

  const newTeam = new Team({ sport, nazivTima, odgovornaOsoba, clanovi });
  await newTeam.save();
  res.status(200).json({ message: 'Registracija uspješna!' });
});

// Ruta za dohvat svih timova
app.get('/api/teams', async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
