const Team = require('../models/Team');

exports.registerTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ message: "Tim uspješno registriran!", team });
  } catch (error) {
    res.status(500).json({ error: "Greška pri registraciji." });
  }
};