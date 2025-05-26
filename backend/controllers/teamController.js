const TeamModel = require('../models/Team');  
const sportsData = require('../data/sportsData');  

// Definicija funkcije getTeamsCount
const getTeamsCount = async (req, res) => {
  let { dan, sport } = req.query;
  dan = dan.trim();
  sport = sport.trim();

  console.log("Query params:", { dan, sport });

  try {
    const count = await TeamModel.countDocuments({
      dan: { $regex: dan, $options: 'i' },   // traži dan koji sadrži traženi string, case-insensitive
      sport: { $regex: sport, $options: 'i' } // isto za sport
    });

    console.log(`Brojim za dan: "${dan}", sport: "${sport}" — pronađeno: ${count}`);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Greška pri brojanju timova', error: error.message });
  }
};



// Definicija funkcije registerTeam
const registerTeam = async (req, res) => {
  try {
    const { dan, sport, clanovi, nazivTima, odgovornaOsoba } = req.body;

    const sportInfo = sportsData[dan]?.[sport];
    if (!sportInfo) {
      return res.status(400).json({ message: 'Nepostojeći sport ili dan' });
    }

    if (clanovi.length > sportInfo.maxClanovi) {
      return res.status(400).json({ message: `Maksimalan broj članova po timu je ${sportInfo.maxClanovi}` });
    }

    const count = await TeamModel.countDocuments({
      dan: { $regex: `^${dan.trim()}$`, $options: 'i' },
      sport: { $regex: `^${sport.trim()}$`, $options: 'i' }
    });
    
    if (count >= sportInfo.maxTimovi) {
      return res.status(400).json({ message: 'Dostignut je maksimalan broj timova za ovaj sport' });
    }

    const newTeam = new TeamModel({ dan, sport, clanovi, nazivTima, odgovornaOsoba });
    await newTeam.save();

    res.status(201).json({ message: 'Tim uspješno prijavljen' });
  } catch (error) {
    res.status(500).json({ message: 'Greška na serveru', error: error.message });
  }
};

// Definicija funkcije getAllTeams
const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamModel.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Greška pri dohvatu timova', error: error.message });
  }
};

// Definicija funkcije updateTeam
const updateTeam = async (req, res) => {
  const { id } = req.params;
  const { nazivTima, odgovornaOsoba, clanovi } = req.body;

  try {
    const team = await TeamModel.findById(id);
    if (!team) return res.status(404).json({ message: 'Tim nije pronađen' });

    team.nazivTima = nazivTima;
    team.odgovornaOsoba = odgovornaOsoba;
    team.clanovi = clanovi;

    await team.save();

    res.json(team);
  } catch (error) {
    res.status(500).json({ message: 'Greška pri ažuriranju tima', error: error.message });
  }
};

// Definicija funkcije deleteTeam
const deleteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    const team = await TeamModel.findByIdAndDelete(id);
    if (!team) return res.status(404).json({ message: 'Tim nije pronađen' });

    res.json({ message: 'Tim uspješno obrisan' });
  } catch (error) {
    res.status(500).json({ message: 'Greška pri brisanju tima', error: error.message });
  }
};

// Eksport svih funkcija
module.exports = {
  getTeamsCount,
  registerTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
};
