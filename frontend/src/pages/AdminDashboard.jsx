import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setTeams(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Greška pri dohvatu timova.');
        setLoading(false);
      });
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleDelete = (id) => {
    if (confirm('Jesi siguran da želiš obrisati tim?')) {
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${id}`, {
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
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/teams/${updatedTeam._id}`, updatedTeam, {
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

  const exportCSV = () => {
    const rows = [
      ['Sport', 'Naziv Tima', 'Kontakt', 'Članovi'],
      ...teams.map(t => [
        escapeCSV(t.sport),
        escapeCSV(t.nazivTima),
        escapeCSV(t.kontakt),
        escapeCSV(t.clanovi.join(', ')),
      ]),
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

  const grouped = teams.reduce((acc, team) => {
    acc[team.sport] = acc[team.sport] || [];
    acc[team.sport].push(team);
    return acc;
  }, {});

  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Učitavanje...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-blue-50 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">Admin Panel - Prijavljeni Timovi</h1>
            <p className="text-gray-600">
              Ukupno prijavljenih timova: <strong>{teams.length}</strong>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
            >
              Export CSV
            </button>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {Object.keys(grouped).map((sport) => (
          <div key={sport} className="mb-6">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">{sport}</h2>
            <ul className="space-y-2">
              {grouped[sport].map((team) => (
                <li
                  key={team._id}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <strong className="text-blue-800">{team.nazivTima}</strong> – Kontakt: {team.kontakt}
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
              ))}
            </ul>
          </div>
        ))}

        {/* === MODAL ZA UREĐIVANJE === */}
        {editingTeam && (
  <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Uredi Tim</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate(editingTeam);
        }}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium">Naziv Tima</label>
          <input
            type="text"
            value={editingTeam.nazivTima}
            onChange={(e) =>
              setEditingTeam({ ...editingTeam, nazivTima: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Kontakt</label>
          <input
            type="text"
            value={editingTeam.odgovornaOsoba}
            onChange={(e) =>
              setEditingTeam({ ...editingTeam, odgovornaOsoba: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Članovi (zarezom)</label>
          <input
            type="text"
            value={editingTeam.clanovi.join(', ')}
            onChange={(e) =>
              setEditingTeam({
                ...editingTeam,
                clanovi: e.target.value.split(',').map((c) => c.trim()),
              })
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setEditingTeam(null)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
          >
            Odustani
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Spremi
          </button>
        </div>
      </form>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
