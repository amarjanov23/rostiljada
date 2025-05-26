import { useEffect, useState } from 'react';
import axios from 'axios';
import sportsData from "../components/sportsData";

// Funkcija za dohvat maksimalnih limita iz sportsData
const getSportLimits = (sportName) => {
  for (const day in sportsData) {
    if (sportsData[day][sportName]) {
      const sportInfo = sportsData[day][sportName];
      return {
        maxTimovi: sportInfo.maxTimovi || 0,
        maxClanovi: typeof sportInfo.maxClanovi === 'number' ? sportInfo.maxClanovi : 0,
      };
    }
  }
  return { maxTimovi: 0, maxClanovi: 0 };
};

export default function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSports, setExpandedSports] = useState({}); // { [sport]: array of teams or undefined }
  const [editingTeam, setEditingTeam] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError("Niste prijavljeni.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const baseURL = import.meta.env.VITE_API_URL;

    axios.get(`${baseURL}/api/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setTeams(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Greška pri dohvatu timova.");
        setLoading(false);
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDelete = (id) => {
    if (confirm('Jesi siguran da želiš obrisati tim?')) {
      axios.delete(`${import.meta.env.VITE_API_URL}/api/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => setTeams((prev) => prev.filter((t) => t._id !== id)))
        .catch(() => alert('Greška pri brisanju tima.'));
    }
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
  };

  const handleUpdate = (updatedTeam) => {
    axios.put(`${import.meta.env.VITE_API_URL}/api/teams/${updatedTeam._id}`, updatedTeam, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setTeams((prev) => prev.map(t => t._id === updatedTeam._id ? updatedTeam : t));
        setEditingTeam(null);
      })
      .catch(() => alert('Greška pri ažuriranju.'));
  };

  const escapeCSV = (text) => {
    if (typeof text !== 'string') text = String(text);
    return `"${text.replace(/"/g, '""')}"`;
  };

  const exportAllCSV = () => {
    const maxClanovi = Math.max(...teams.map(t => t.clanovi.length));
    const header = ['Sport', 'Naziv Tima', 'Kontakt', ...Array.from({ length: maxClanovi }, (_, i) => `Član ${i + 1}`)];

    const rows = [
      header,
      ...teams.map(t => {
        const clanoviCols = [...t.clanovi];
        while (clanoviCols.length < maxClanovi) {
          clanoviCols.push('');
        }
        return [
          escapeCSV(t.sport),
          escapeCSV(t.nazivTima),
          escapeCSV(t.odgovornaOsoba),
          ...clanoviCols.map(escapeCSV),
        ];
      }),
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'timovi.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const CSV_SEPARATOR = ';';

  const exportCSVBySport = (sport) => {
    const sportTeams = teams.filter(team => team.sport === sport);

    const rows = [
      ['Sport', 'Naziv Tima', 'Kontakt', 'Članovi'],
      ...sportTeams.map(t => [
        t.sport,
        t.nazivTima,
        t.odgovornaOsoba,
        t.clanovi.join(', '),
      ]),
    ];

    const csvString = '\uFEFF' + rows.map(r => r.map(field => `"${field.replace(/"/g, '""')}"`).join(CSV_SEPARATOR)).join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${sport}_timovi.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Lista svih sportova iz dohvaćenih timova (bez duplikata)
  const sportsList = [...new Set(teams.map(t => t.sport))];

  // Toggle funkcija za expand/collapse sportova i dinamičko punjenje/praznjenje timova
  const toggleSport = (sport) => {
    setExpandedSports(prev => {
      if (prev[sport]) {
        // Ako je otvoren, zatvori i izbriši timove iz state-a
        const copy = { ...prev };
        delete copy[sport];
        return copy;
      } else {
        // Ako nije otvoren, napuni timove za taj sport
        const sportTeams = teams.filter(t => t.sport === sport);
        return {
          ...prev,
          [sport]: sportTeams,
        };
      }
    });
  };

  if (loading) return <p>Učitavanje...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Odjava
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={exportAllCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Export Svi Timovi CSV
        </button>
      </div>

      {sportsList.length === 0 && <p>Nema prijavljenih timova.</p>}

      {sportsList.map(sport => {
        const { maxTimovi, maxClanovi } = getSportLimits(sport);
        const open = !!expandedSports[sport];
        const brojTimova = teams.filter(t => t.sport === sport).length;
        const sportTeams = open ? expandedSports[sport] : [];

        return (
          <div key={sport} className="mb-8 border border-blue-300 rounded p-4 bg-blue-50">
            <div className=" flex justify-between items-center mb-3">
              <button
                onClick={() => toggleSport(sport)}
                className="cursor-pointer text-xl font-semibold text-blue-900 hover:underline focus:outline-none"
              >
                {sport} — {brojTimova}/{maxTimovi} timova {open ? '−' : '+'}
              </button>

              <button
                onClick={() => exportCSVBySport(sport)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold text-sm"
              >
                Export {sport}
              </button>
            </div>

            {open && (
              <ul className="space-y-3">
                {sportTeams.map(team => {
                  const clanoviCount = team.clanovi.length;
                  return (
                    <li key={team._id} className="p-4 bg-white rounded-lg border border-blue-200">
                      <strong className="text-blue-900 text-lg">{team.nazivTima}</strong> — Članovi: {clanoviCount}/{maxClanovi}
                      <br />
                      Kontakt: {team.odgovornaOsoba}
                      <br />
                      Članovi: {team.clanovi.join(', ')}
                      <div className="mt-2">
                        <button
                          onClick={() => handleDelete(team._id)}
                          className="text-red-600 hover:underline text-sm"
                        >
                          Obriši
                        </button>
                        <button
                          onClick={() => handleEdit(team)}
                          className="ml-4 text-blue-600 hover:underline text-sm"
                        >
                          Uredi
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}

      {/* Edit modal ili forma može ići ovdje ako želiš */}
      {editingTeam && (
        <EditTeamModal
          team={editingTeam}
          onClose={() => setEditingTeam(null)}
          onSave={handleUpdate}
          maxClanovi={getSportLimits(editingTeam.sport).maxClanovi}
        />
      )}
    </div>
  );
}

// Pretpostavka: Imaš komponentu EditTeamModal koju koristiš za uređivanje tima
function EditTeamModal({ team, onClose, onSave, maxClanovi }) {
  const [nazivTima, setNazivTima] = useState(team.nazivTima);
  const [odgovornaOsoba, setOdgovornaOsoba] = useState(team.odgovornaOsoba);
  const [clanovi, setClanovi] = useState(team.clanovi);

  const handleClanChange = (index, value) => {
    const newClanovi = [...clanovi];
    newClanovi[index] = value;
    setClanovi(newClanovi);
  };

  const handleAddClan = () => {
    if (clanovi.length < maxClanovi) {
      setClanovi([...clanovi, '']);
    }
  };

  const handleRemoveClan = (index) => {
    setClanovi(clanovi.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...team,
      nazivTima,
      odgovornaOsoba,
      clanovi: clanovi.filter(c => c.trim() !== ''),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-6 max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4">Uredi Tim</h2>
        <label className="block">
          Naziv Tima:
          <input
            type="text"
            value={nazivTima}
            onChange={e => setNazivTima(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </label>
        <label className="block">
          Odgovorna Osoba:
          <input
            type="text"
            value={odgovornaOsoba}
            onChange={e => setOdgovornaOsoba(e.target.value)}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </label>
        <div>
          <label className="block mb-1">Članovi:</label>
          {clanovi.map((clan, idx) => (
            <div key={idx} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={clan}
                onChange={e => handleClanChange(idx, e.target.value)}
                className="flex-grow border rounded px-3 py-2"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveClan(idx)}
                className="text-red-600 hover:underline"
              >
                X
              </button>
            </div>
          ))}
          {clanovi.length < maxClanovi && (
            <button
              type="button"
              onClick={handleAddClan}
              className="text-blue-600 hover:underline mt-2"
            >
              Dodaj člana
            </button>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Odustani
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Spremi
          </button>
        </div>
      </form>
    </div>
  );
}
