const express = require('express');
const router = express.Router();
const { getTeamsCount, registerTeam, updateTeam, deleteTeam, getAllTeams } = require('../controllers/teamController');
const authenticate = require('../middleware/authenticate');  // pretpostavljam da imaš neki auth middleware

// Dohvati sve timove (za admin dashboard)
router.get('/', authenticate, getAllTeams);

// Broj timova
router.get('/count', getTeamsCount);

// Registracija tima
router.post('/register', registerTeam);

// Update tima
router.put('/:id', authenticate, updateTeam);

// Brisanje tima
router.delete('/:id', authenticate, deleteTeam);

module.exports = router;
