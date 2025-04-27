import { useState } from 'react';

const games = [
  "Nogomet",
  "Odbojka",
  "Povlačenje konopa",
  "Beer pong",
];

function App() {
  const [game, setGame] = useState('');
  const [teamName, setTeamName] = useState('');
  const [captain, setCaptain] = useState('');
  const [members, setMembers] = useState(['']);
  const [message, setMessage] = useState('');

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      game: 'CS:GO',
      teamName: 'TeamExample',
      captain: 'John Doe',
      members: ['Alice', 'Bob', 'Charlie']
    };
  
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      console.log('Odgovor sa servera:', data);
    } catch (error) {
      console.error('Greška pri slanju zahtjeva:', error);
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
          Prijava na Igre
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Igra */}
          <div>
            <label className="block mb-2 font-semibold text-blue-800">Odaberi igru:</label>
            <select
              value={game}
              onChange={(e) => setGame(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">-- Odaberi --</option>
              {games.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* Naziv tima */}
          <div>
            <label className="block mb-2 font-semibold text-blue-800">Naziv tima:</label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Unesi naziv tima"
            />
          </div>

          {/* Kapetan */}
          <div>
            <label className="block mb-2 font-semibold text-blue-800">Ime kapetana:</label>
            <input
              type="text"
              value={captain}
              onChange={(e) => setCaptain(e.target.value)}
              className="w-full border-2 border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Unesi ime kapetana"
            />
          </div>

          {/* Članovi */}
          <div>
            <label className="block mb-2 font-semibold text-blue-800">Članovi tima:</label>
            {members.map((member, idx) => (
              <input
                key={idx}
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(idx, e.target.value)}
                className="w-full border-2 border-blue-200 rounded-lg p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={`Član ${idx + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="mt-3 block w-full text-blue-600 font-medium hover:underline text-center"
            >
              + Dodaj člana
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Prijavi tim
          </button>

          {/* Poruka */}
          {message && (
            <div className="mt-6 p-4 text-center rounded-lg bg-blue-100 text-blue-800 font-semibold">
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
