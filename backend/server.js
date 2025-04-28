const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware za parsiranje JSON tijela
app.use(bodyParser.json());

// Putanja do JSON datoteke u kojoj će se pohranjivati timovi
const teamsFilePath = path.join(__dirname, '../frontend/src/data/teams.json');

// POST ruta za registraciju tima (spremanje u JSON)
app.post('/api/register', (req, res) => {
    const { sport, nazivTima, odgovornaOsoba, clanovi } = req.body;

    // Učitavanje trenutnih podataka iz JSON datoteke
    fs.readFile(teamsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Greška pri čitanju datoteke:', err);
            return res.status(500).send({ message: 'Greška pri pohrani podataka.' });
        }

        // Parsiramo postojeće podatke
        let teams = [];
        if (data) {
            teams = JSON.parse(data);
        }

        // Dodajemo novi tim
        const newTeam = {
            sport,
            nazivTima,
            odgovornaOsoba,
            clanovi,
        };

        teams.push(newTeam);

        // Spremanje ažuriranih podataka u JSON datoteku
        fs.writeFile(teamsFilePath, JSON.stringify(teams, null, 2), (err) => {
            if (err) {
                console.error('Greška pri spremanju podataka:', err);
                return res.status(500).send({ message: 'Greška pri pohrani podataka.' });
            }
            res.status(200).send({ message: 'Tim je uspješno registriran!' });
        });
    });
});

// GET ruta za dohvat svih timova
app.get('/api/teams', (req, res) => {
    // Učitavanje podataka iz JSON datoteke
    fs.readFile(teamsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Greška pri čitanju datoteke:', err);
            return res.status(500).send({ message: 'Greška pri dohvaćanju podataka.' });
        }

        // Šaljemo podatke na frontend
        const teams = data ? JSON.parse(data) : [];
        res.status(200).json(teams);
    });
});

// Pokretanje servera
app.listen(PORT, () => {
    console.log(`Server je pokrenut na portu ${PORT}`);
});
