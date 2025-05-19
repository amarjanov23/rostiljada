import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer'; // prilagodi putanju




const App = () => {
    const [selectedDay, setSelectedDay] = useState('');
    const [sport, setSport] = useState('');
    const [nazivTima, setNazivTima] = useState('');
    const [odgovornaOsoba, setOdgovornaOsoba] = useState('');
    const [clanovi, setClanovi] = useState([]);
    const [showIntro, setShowIntro] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 3000); // intro traje 3 sekunde
        return () => clearTimeout(timer);
    }, []);


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
        },
    };

    const themes = {
        "Prvi dan – Studentski dom": {
            bg: "bg-sky-50",                       // svijetla nebo plava pozadina
            text: "text-sky-800",                  // tamnija plava za naslove
            label: "text-sky-600",                 // srednje plava za label
            input: "bg-white text-sky-800",        // bijelo polje s tamno plavim tekstom
            button: "bg-sky-500 hover:bg-sky-600", // vidljiv gumb
            border: "border-sky-300",              // suptilna granica
        },
        "Drugi dan – Gradsko kupalište Drava": {
            bg: "bg-emerald-30",                   // svijetla smaragdno-zelena
            text: "text-emerald-800",
            label: "text-emerald-600",
            input: "bg-white text-emerald-800",
            button: "bg-emerald-500 hover:bg-emerald-600",
            border: "border-emerald-300",
        },
    };


    const theme = themes[selectedDay] || themes["Prvi dan – Studentski dom"];
    const flatSports = selectedDay
        ? Object.entries(sportsData[selectedDay] || {})
        : [];

    const selectedSportData = selectedDay
        ? sportsData[selectedDay]?.[sport]
        : null;

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                state: { sport, nazivTima, odgovornaOsoba, clanovi },
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

    return (
        <div className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${theme.bg}`}>
            <div className="w-full max-w-lg p-10 bg-white rounded-3xl shadow-2xl">
                <h2 className={`text-4xl font-bold mb-10 text-center ${theme.text}`}>Prijava za Aktivnosti</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className={`block text-lg font-semibold mb-2 ${theme.label}`}>Dan</label>
                        <select
                            value={selectedDay}
                            onChange={(e) => {
                                setSelectedDay(e.target.value);
                                setSport('');
                                setClanovi([]);
                            }}
                            className={`w-full p-4 rounded-xl ${theme.input} focus:outline-none cursor-pointer border ${theme.border}`}
                            required
                        >
                            <option value="">-- Odaberi dan --</option>
                            {Object.keys(sportsData).map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    {selectedDay && (
                        <div>
                            <label className={`block text-lg font-semibold mb-2 ${theme.label}`}>Sport</label>
                            <select
                                value={sport}
                                onChange={(e) => {
                                    setSport(e.target.value);
                                    setClanovi([]);
                                }}
                                className={`w-full p-4 rounded-xl ${theme.input} focus:outline-none cursor-pointer border ${theme.border}`}
                                required
                            >
                                <option value="">Odaberi sport</option>
                                {Object.entries(sportsData[selectedDay]).map(([sportName]) => (
                                    <option key={sportName} value={sportName}>{sportName}</option>
                                ))}
                            </select>
                            {selectedSportData && (
                                <div className={`mt-2 text-sm ${theme.label}`}>
                                    <p>Maks. broj članova: {selectedSportData.maxClanovi}</p>
                                    <p>Organizator: {selectedSportData.voditelj}</p>
                                </div>
                            )}
                        </div>
                    )}

                    <div>
                        <label className={`block text-lg font-semibold mb-2 ${theme.label}`}>Naziv Tima</label>
                        <input
                            type="text"
                            value={nazivTima}
                            onChange={(e) => setNazivTima(e.target.value)}
                            className={`w-full p-4 rounded-xl ${theme.input} focus:outline-none border ${theme.border}`}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-lg font-semibold mb-2 ${theme.label}`}>Kontakt</label>
                        <input
                            type="text"
                            value={odgovornaOsoba}
                            onChange={(e) => setOdgovornaOsoba(e.target.value)}
                            className={`w-full p-4 rounded-xl ${theme.input} focus:outline-none border ${theme.border}`}
                            required
                        />
                    </div>

                    <div>
                        <label className={`block text-lg font-semibold mb-2 ${theme.label}`}>Članovi Tima</label>
                        {clanovi.map((clan, index) => (
                            <input
                                key={index}
                                type="text"
                                value={clan}
                                onChange={(e) => handleMemberChange(index, e)}
                                className={`w-full p-4 rounded-xl ${theme.input} focus:outline-none border ${theme.border} mb-2`}
                                placeholder={`Član ${index + 1}`}
                                required
                            />
                        ))}
                        <button
                            type="button"
                            onClick={handleAddMember}
                            disabled={clanovi.length >= selectedSportData?.maxClanovi}
                            className={`w-full p-4 bg-white border-2 rounded-xl mt-2 font-bold text-lg cursor-pointer
    ${theme.border} ${theme.text} hover:bg-opacity-80 ${clanovi.length >= selectedSportData?.maxClanovi ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Dodaj člana
                        </button>


                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            className={`w-full p-4 ${theme.button} text-white text-lg font-bold rounded-xl transition cursor-pointer`}
                        >
                            Prijavi Tim
                        </button>
                    </div>
                </form>
                <>
                    {/* sadržaj stranice */}
                    <Footer />
                </>
            </div>

        </div>




    );
};

export default App;
