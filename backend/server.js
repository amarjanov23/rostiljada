require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Team = require('./models/Team');

const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins (you can limit it to specific origins if needed)

// MongoDB URI from the .env file
const uri = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(uri)
  .then(() => console.log('✅ Povezano s MongoDB Atlas'))
  .catch(err => console.error('❌ Greška pri povezivanju:', err));


// API route to register a team (POST)
app.post('/api/register', async (req, res) => {
  try {
    const noviTim = new Team(req.body); // Create a new team using the data from the request body
    await noviTim.save(); // Save the team to the database
    res.status(201).json({ poruka: 'Tim uspješno dodan!' }); // Send a success message
  } catch (err) {
    console.error('Greška pri dodavanju tima:', err);
    res.status(500).json({ greška: 'Greška pri dodavanju tima.' }); // Send error message
  }
});

// API route to fetch all teams (GET)
app.get('/api/register', async (req, res) => {
  try {
    const timovi = await Team.find(); // Fetch all teams from the database
    res.status(200).json(timovi); // Return the list of teams
  } catch (err) {
    console.error('Greška pri dohvaćanju timova:', err);
    res.status(500).json({ greška: 'Greška pri dohvaćanju timova.' }); // Send error message
  }
});

// Define the port to listen on
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server radi na portu ${PORT}`);
});
