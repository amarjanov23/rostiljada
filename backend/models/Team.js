const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  dan: { type: String, required: true },
  sport: { type: String, required: true },
  nazivTima: { type: String, required: true },
  odgovornaOsoba: { type: String, required: true },
  clanovi: { type: [String], required: true },
});

module.exports = mongoose.model('Team', teamSchema);
