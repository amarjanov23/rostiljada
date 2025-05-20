import React, { useState, useEffect } from 'react';
import logo from './assets/icon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
    const [selectedDay, setSelectedDay] = useState('');
    const [sport, setSport] = useState('');
    const [nazivTima, setNazivTima] = useState('');
    const [odgovornaOsoba, setOdgovornaOsoba] = useState('');
    const [clanovi, setClanovi] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [introVisible, setIntroVisible] = useState(true);
    const [introFadeOut, setIntroFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroFadeOut(true);
            setTimeout(() => setIntroVisible(false), 700);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const navigate = useNavigate();

    const sportsData = {
        "Prvi dan – Studentski dom": {
            "Stolni tenis": {
                maxClanovi: 2,
                voditelj: "??",
                opis: "Brze mečeve 1-na-1 na stolnoteniskom stolu. Potrebna preciznost i refleksi."
            },
            "Stolni nogomet": {
                maxClanovi: 2,
                voditelj: "??",
                opis: "Turnir u popularnoj društvenoj igri. Svaki tim ima 2 igrača."
            },
            "Turnir u beli": {
                maxClanovi: 2,
                voditelj: "Lorna Zbodulja",
                opis: "Natjecanje u kartaškoj igri Belot. Igra se u parovima."
            },
            "Turnir u trešeti": {
                maxClanovi: 2,
                voditelj: "Ivan Račan",
                opis: "Kartaški turnir u klasičnoj dalmatinskoj igri — trešeta. Igra se u parovima."
            },
            "Alias": {
                maxClanovi: 4,
                voditelj: "Lorna Zbodulja",
                opis: "Zabavna igra pogađanja riječi. Igra se timski, komunikacija ključna!"
            },
            "Bench Press i biceps curl": {
                maxClanovi: 2,
                voditelj: "Niko Rastija, Matea Kucljak",
                opis: "Natjecanje u snazi — tko podigne više u benchu i biceps curlu."
            },
            "Alka": {
                maxClanovi: 2,
                voditelj: "Adam Marjanović",
                opis: "Rekreacija Sinjske alke s modernim twistom. Preciznost je ključna."
            },
            "Košarka": {
                maxClanovi: 4,
                voditelj: "Nimaj Dupanović",
                opis: "Klasična 3-na-3 košarka. Timovi se natječu u brzoj eliminaciji. Vrijedi fair-play!"
            },
            "Beer pong": {
                maxClanovi: 2,
                voditelj: "Larija Jukić",
                opis: "Zabavno natjecanje preciznosti i taktike. Igra se s čašama i lopticama."
            },
            "Cageball": {
                maxClanovi: 5,
                voditelj: "Elizabeta Rengel",
                opis: "Mali nogomet u kavezu – brza igra bez izbacivanja lopte!"
            },
            "Teqball": {
                maxClanovi: 2,
                voditelj: "Matej Gurdon-Beta",
                opis: "Tehnička igra na zakrivljenom stolu. Kombinacija nogometa i stolnog tenisa."
            },
            "Vukodlaci": {
                maxClanovi: 6,
                voditelj: "Elizabeta Rengel",
                opis: "Društvena igra u kojoj logika i intuicija odlučuju. Tko je vukodlak među nama?"
            }
        },
        "Drugi dan – Gradsko kupalište Drava": {
            "Odbojka": {
                maxClanovi: 6,
                voditelj: "Manuel Mathis",
                opis: "Klasična odbojka na pijesku. Timska igra, zabava i natjecanje!"
            },
            "Disk golf": {
                maxClanovi: 1,
                voditelj: "??",
                opis: "Igra slična golfu, ali se koristi frizbi. Cilj: pogoditi metu s što manje bacanja."
            },
            "Povlačenje užeta": {
                maxClanovi: 6,
                voditelj: "Luka Krznarić",
                opis: "Snaga i koordinacija tima odlučuju tko će prevući protivnika!"
            },
            "Gađanje limenki s vodenim balonima": {
                maxClanovi: 3,
                voditelj: "??",
                opis: "Zabavno gađanje limenki pomoću balona napunjenih vodom. Prskanje zagarantirano!"
            },
            "Treasure hunt": {
                maxClanovi: 4,
                voditelj: "Manuel Mathis",
                opis: "Avanturistička potraga po terenu. Snalažljivost i suradnja ključne su!"
            },
            "Obaranje ruku": {
                maxClanovi: 2,
                voditelj: "Luka Krznarić",
                opis: "Klasično natjecanje snage 1-na-1. Tko će srušiti protivnika?"
            }
        }
    };


    const themes = {
        "Prvi dan – Studentski dom": {
            bg: "bg-sky-50",
            text: "text-sky-800",
            label: "text-sky-600",
            input: "bg-white text-sky-800",
            button: "bg-sky-500 hover:bg-sky-600",
            border: "border-sky-300",
        },
        "Drugi dan – Gradsko kupalište Drava": {
            bg: "bg-emerald-30",
            text: "text-emerald-800",
            label: "text-emerald-600",
            input: "bg-white text-emerald-800",
            button: "bg-emerald-500 hover:bg-emerald-600",
            border: "border-emerald-300",
        },
    };

    const theme = themes[selectedDay] || themes["Prvi dan – Studentski dom"];
    const flatSports = selectedDay ? Object.entries(sportsData[selectedDay]) : [];
    const selectedSportData = selectedDay ? sportsData[selectedDay]?.[sport] : null;

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

            {introVisible && (
                <div
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${introFadeOut ? 'opacity-0' : 'opacity-100'
                        }`}
                    onClick={() => {
                        setIntroFadeOut(true);
                        setTimeout(() => setIntroVisible(false), 700);
                    }}
                >
                    <img src={logo} alt="Logo" className="w-64 h-64 mb-6" />
                    <h1 className="text-4xl md:text-6xl font-extrabold text-center text-sky-800 px-6">
                        Studentska Roštiljada 2025<br />
                        <span className="text-2xl md:text-3xl font-medium text-sky-600">
                            28. i 29.5. – Prijavi svoj tim!
                        </span>
                    </h1>
                </div>
            )}


            {!introVisible && (
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

                            {selectedSportData && (
                                <button
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                    className="mt-2 underline text-theme font-medium"
                                >
                                    Više informacija
                                </button>
                            )}
                            {showModal && selectedSportData && (
                                <div
                                    className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
                                    onClick={() => setShowModal(false)} // Klik na overlay zatvara modal
                                >
                                    <div
                                        className="bg-white rounded-xl p-6 max-w-md shadow-xl relative"
                                        onClick={(e) => e.stopPropagation()} // Klik unutar modala ne zatvara modal
                                    >
                                        {/* X dugme za zatvaranje, pozicionirano u gornjem desnom uglu */}
                                        <button
                                            className="absolute top-3 right-3 text-black text-xl font-bold hover:text-gray-700 cursor-pointer"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Zatvori modal"
                                        >
                                            &times;
                                        </button>

                                        <h2 className="text-xl font-bold mb-2">{sport}</h2>
                                        <p className="text-sm text-gray-700 mb-2"><strong>Organizator:</strong> {selectedSportData.voditelj}</p>
                                        <p className="text-sm text-gray-700 mb-2"><strong>Maks. članova:</strong> {selectedSportData.maxClanovi}</p>
                                        {selectedSportData.opis && (
                                            <p className="text-sm text-gray-600">{selectedSportData.opis}</p>
                                        )}
                                    </div>
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

                        <Footer />
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
