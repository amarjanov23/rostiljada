import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const [sport, setSport] = useState('');
  const [nazivTima, setNazivTima] = useState('');
  const [odgovornaOsoba, setOdgovornaOsoba] = useState('');
  const [clanovi, setClanovi] = useState([]);

  const sports = {
    "Nogomet": 5,
    "Košarka": 4,
    "Odbojka": 6,
    "Bear Pong": 6
  };

  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    event.preventDefault();
    try {
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
      alert("Došlo je do greške.");
    }
  };
  

  const handleAddMember = () => {
    if (clanovi.length < (sports[sport] || 0)) {
      setClanovi([...clanovi, '']);
    } else {
      alert('Broj članova je dostigao maksimalni broj!');
    }
  };

  const handleMemberChange = (index, event) => {
    const newMembers = [...clanovi];
    newMembers[index] = event.target.value;
    setClanovi(newMembers);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">Prijava za Aktivnosti</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-blue-600 mb-2">Sport</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full p-4 rounded-xl bg-blue-50 text-lg text-blue-700 focus:outline-none"
              required
            >
              <option value="">Odaberi sport</option>
              {Object.keys(sports).map((sportName) => (
                <option key={sportName} value={sportName}>{sportName}</option>
              ))}
            </select>
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
            <label className="block text-lg font-semibold text-blue-600 mb-2">Odgovorna Osoba (Kapetan)</label>
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
              className="w-full p-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-xl mt-2"
            >
              Dodaj člana
            </button>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold rounded-xl transition"
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
