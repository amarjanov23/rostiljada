import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';



const App = () => {
  const [sport, setSport] = useState('');
  const [nazivTima, setNazivTima] = useState('');
  const [odgovornaOsoba, setOdgovornaOsoba] = useState('');
  const [clanovi, setClanovi] = useState([]);

  const navigate = useNavigate();

  const sportsData = {
    "Prvi dan – Studentski dom": {
      "Stolni tenis": { maxClanovi: 2, voditelj: "??" },
      "Stolni nogomet": { maxClanovi: 2, voditelj: "??" },
      "Turnir u beli": { maxClanovi: 2, voditelj: "Lorna Zbodulja" },
      "Turnir u trešeti": { maxClanovi: 2, voditelj: "Ivan Račan" },
      "Alias": { maxClanovi: 4, voditelj: "Lorna Zbodulja" },
      "Bench Press i biceps curl": { maxClanovi: 2, voditelj: "Niko Rastija, Matea Kucljak" },
      "Alka": { maxClanovi: 2, voditelj: "Adam Marjanović" },
      "Košarka": { maxClanovi: 4, voditelj: "Nimaj Dupanović" },
      "Beer pong": { maxClanovi: 2, voditelj: "Larija Jukić" },
      "Cageball": { maxClanovi: 5, voditelj: "Elizabeta Rengel" },
      "Teqball": { maxClanovi: 2, voditelj: "Matej Gurdon-Beta" },
      "Vukodlaci": { maxClanovi: 6, voditelj: "Elizabeta Rengel" },
    },
    "Drugi dan – Gradsko kupalište Drava": {
      "Odbojka": { maxClanovi: 6, voditelj: "Manuel Mathis" },
      "Disk golf": { maxClanovi: 1, voditelj: "??" },
      "Povlačenje užeta": { maxClanovi: 6, voditelj: "Luka Krznarić" },
      "Gađanje limenki s vodenim balonima": { maxClanovi: 3, voditelj: "??" },
      "Treasure hunt": { maxClanovi: 4, voditelj: "Manuel Mathis" },
      "Obaranje ruku": { maxClanovi: 2, voditelj: "Luka Krznarić" },
    }
  };

  // Flat sports map for easy access
  const flatSports = Object.entries(sportsData).flatMap(([_, sports]) => Object.entries(sports));

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validacija članova
    const prazniClanovi = clanovi.filter(clan => !clan.trim());
    if (prazniClanovi.length > 0) {
      alert("Sva imena članova moraju biti popunjena.");
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;

      await axios.post(`${baseURL}/api/register`, {
        sport,
        nazivTima,
        odgovornaOsoba,
        clanovi,
      });

      navigate('/success', {
        state: {
          sport,
          nazivTima,
          odgovornaOsoba,
          clanovi,
        },
      });
    } catch (error) {
      console.error('Greška pri registraciji:', error);
      alert('Došlo je do greške prilikom registracije.');
    }
  };

  const handleAddMember = () => {
    const selectedSport = flatSports.find(([name]) => name === sport);
    const max = selectedSport?.[1].maxClanovi || 0;

    if (clanovi.length < max) {
      setClanovi([...clanovi, '']);
    } else {
      alert(`Maksimalan broj članova za "${sport}" je ${max}.`);
    }
  };

  const handleMemberChange = (index, event) => {
    const newMembers = [...clanovi];
    newMembers[index] = event.target.value;
    setClanovi(newMembers);
  };

  const selectedSportData = flatSports.find(([name]) => name === sport)?.[1];

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">Prijava za Aktivnosti</h2>
        <>
      {/* Ostali sadržaji aplikacije */}
      <SpeedInsights />
    </>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-blue-600 mb-2">Sport</label>
            <select
              value={sport}
              onChange={(e) => {
                setSport(e.target.value);
                setClanovi([]);
              }}
              className="w-full p-4 rounded-xl bg-blue-50 text-lg text-blue-700 focus:outline-none cursor-pointer"
              required
            >
              <option value="">Odaberi sport</option>
              {Object.entries(sportsData).map(([dayGroup, sports]) => (
                <optgroup key={dayGroup} label={dayGroup}>
                  {Object.keys(sports).map(sportName => (
                    <option key={sportName} value={sportName}>
                      {sportName}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {selectedSportData && (
              <div className="mt-2 text-sm text-blue-600">
                <p>Maks. broj članova: {selectedSportData.maxClanovi}</p>
                <p>Organizator: {selectedSportData.voditelj}</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-600 mb-2">Naziv Tima</label>
            <input
              type="text"
              value={nazivTima}
              onChange={(e) => setNazivTima(e.target.value)}
              className="w-full p-4 rounded-xl bg-blue-50 text-lg text-blue-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-600 mb-2">Kontakt</label>
            <input
              type="text"
              value={odgovornaOsoba}
              onChange={(e) => setOdgovornaOsoba(e.target.value)}
              className="w-full p-4 rounded-xl bg-blue-50 text-lg text-blue-700 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-blue-600 mb-2">Članovi Tima</label>
            {clanovi.map((clan, index) => (
              <input
                key={index}
                type="text"
                value={clan}
                onChange={(e) => handleMemberChange(index, e)}
                className="w-full p-4 rounded-xl bg-blue-50 text-lg text-blue-700 focus:outline-none mb-2"
                placeholder={`Član ${index + 1}`}
                required
              />
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="w-full p-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-xl mt-2 cursor-pointer"
            >
              Dodaj člana
            </button>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-xl transition cursor-pointer"
            >
              Prijavi Tim
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
};

export default App;
