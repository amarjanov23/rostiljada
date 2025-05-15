const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  sport: { type: String, required: true },
  nazivTima: { type: String, required: true },
  odgovornaOsoba: { type: String, required: true },
  clanovi: { type: [String], required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
