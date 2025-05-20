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
    const [step, setStep] = useState(1);

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
    const nextStep = () => {
        if (step === 1 && !selectedDay) {
            alert('Odaberi dan.');
            return;
        }
        if (step === 2 && !sport) {
            alert('Odaberi sport.');
            return;
        }
        setStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
    };

    const sportsData = {
        "Prvi dan – Studentski dom": {
            "Stolni tenis": {
                maxClanovi: 2,
                voditelj: "??",
                opis: "Brzi i dinamični mečevi 1-na-1 na stolnoteniskom stolu. Igrači se natječu u eliminacijskom formatu. Potrebna su brza razmišljanja, odlični refleksi i precizni udarci.",
                lokacija: "(Stari) Studentski dom – podrum",
                vrijeme: "10:00"
            },
            "Stolni nogomet": {
                maxClanovi: 2,
                voditelj: "??",
                opis: "Popularna društvena igra koja zahtijeva koordinaciju, brzinu i timski rad. Svaki tim ima 2 igrača koji pokušavaju postići što više golova rotiranjem igrača na štapovima.",
                lokacija: "(Stari) Studentski dom – podrum",
                vrijeme: "10:30"
            },
            "Turnir u beli": {
                maxClanovi: 2,
                voditelj: "Lorna Zbodulja",
                opis: "Klasična kartaška igra Belot za strateške umove. Igra se u parovima, gdje svaki tim pokušava nadmudriti protivnike kombinacijama karata i taktičkim odigravanjem.",
                lokacija: "Studentski dom – dvorište",
                vrijeme: "11:00"
            },
            "Turnir u trešeti": {
                maxClanovi: 2,
                voditelj: "Ivan Račan",
                opis: "Tradicionalna dalmatinska kartaška igra u kojoj su taktika i memorija ključni. Igrači u parovima koriste svoje znanje i dosjetljivost da bi pobijedili.",
                lokacija: "Studentski dom – dvorište",
                vrijeme: "11:30"
            },
            "Alias": {
                maxClanovi: 4,
                voditelj: "Lorna Zbodulja",
                opis: "Brza i zabavna timska igra u kojoj jedan član objašnjava pojmove bez upotrebe riječi iz pojma, a drugi pogađa. Idealna za one s dobrim vokabularom i komunikacijskim vještinama.",
                lokacija: "Studentski dom – dvorište",
                vrijeme: "12:00"
            },
            "Bench Press i biceps curl": {
                maxClanovi: 2,
                voditelj: "Niko Rastija, Matea Kucljak",
                opis: "Snaga i forma na testu! Natjecatelji se natječu u dizanju utega u dvije discipline – bench pressu i biceps curlu. Pobjednik je onaj s najboljim ukupnim rezultatom.",
                lokacija: "Studentski dom – Teretana",
                vrijeme: "12:30"
            },
            "Alka": {
                maxClanovi: 2,
                voditelj: "Adam Marjanović",
                opis: "Zabavna rekreacija poznate Sinjske alke – bez konja, ali s istom dozom preciznosti i natjecateljskog duha. Igrači bacaju koplje u pokretnu alku.",
                lokacija: "Studentski dom – između tribina",
                vrijeme: "13:00"
            },
            "Košarka": {
                maxClanovi: 4,
                voditelj: "Nimaj Dupanović",
                opis: "Brza 3-na-3 utakmica u kojoj vrijede pravila fer igre. Igra se u eliminacijskom formatu. Timski duh, tehnika i taktika ključni su za pobjedu.",
                lokacija: "Studentski dom – Košarkaško igralište",
                vrijeme: "13:30"
            },
            "Beer pong": {
                maxClanovi: 2,
                voditelj: "Larija Jukić",
                opis: "Preciznost i dobar cilj! Igrači pokušavaju pogoditi lopticom čaše na protivničkoj strani stola. Iako je igra simbol studentskih zabava, ovdje se natječemo ozbiljno – bez alkohola!",
                lokacija: "Studentski dom – dvorište",
                vrijeme: "14:00"
            },
            "Cageball": {
                maxClanovi: 5,
                voditelj: "Elizabeta Rengel",
                opis: "Brza verzija malog nogometa u ograđenom prostoru gdje lopta nikada ne izlazi iz igre. Akcija je neprekidna, a timska suradnja ključ uspjeha.",
                lokacija: "Studentski dom – Cageball teren",
                vrijeme: "14:30"
            },
            "Teqball": {
                maxClanovi: 2,
                voditelj: "Matej Gurdon-Beta",
                opis: "Inovativna kombinacija nogometa i stolnog tenisa na zakrivljenom stolu. Precizni udarci i nogometna tehnika odlučuju pobjednika.",
                lokacija: "Studentski dom – dvorište",
                vrijeme: "15:00"
            },
            "Vukodlaci": {
                maxClanovi: 6,
                voditelj: "Elizabeta Rengel",
                opis: "Društvena igra dedukcije i intuicije. Tko je vukodlak među nama? Igrači pokušavaju otkriti ubojicu među sobom prije nego bude prekasno.",
                lokacija: "Studentski dom – Klub",
                vrijeme: "15:30"
            }
        },

        "Drugi dan – Gradsko kupalište Drava": {
            "Odbojka": {
                maxClanovi: 6,
                voditelj: "Manuel Mathis",
                opis: "Klasična odbojka na pijesku na otvorenom. Natjecateljski format s timovima koji se natječu za titulu najboljeg. Skokovi, blokovi i odlična zabava!",
                lokacija: "Gradsko kupalište – Pješčani teren",
                vrijeme: "10:00"
            },
            "Disk golf": {
                maxClanovi: 1,
                voditelj: "??",
                opis: "Frizbi verzija golfa – umjesto loptice, ciljate koš frizbijem. Cilj je pogoditi sve mete u što manje pokušaja. Idealno za ljubitelje preciznosti i prirode.",
                lokacija: "Gradsko kupalište – Travnata zona",
                vrijeme: "10:30"
            },
            "Povlačenje užeta": {
                maxClanovi: 6,
                voditelj: "Luka Krznarić",
                opis: "Snaga i timska sinergija u jednoj od najklasičnijih ekipnih igara. Timski pokušajte povući protivnike preko označene linije.",
                lokacija: "Gradsko kupalište – Glavni teren",
                vrijeme: "11:00"
            },
            "Gađanje limenki s vodenim balonima": {
                maxClanovi: 3,
                voditelj: "??",
                opis: "Zabavno i osvježavajuće! Precizno gađanje limenki pomoću balona napunjenih vodom. Prskanje je neizbježno – donesi rezervnu majicu!",
                lokacija: "Gradsko kupalište – Zabavna zona",
                vrijeme: "11:30"
            },
            "Treasure hunt": {
                maxClanovi: 4,
                voditelj: "Manuel Mathis",
                opis: "Avanturistička timska igra u kojoj tražite skrivene tragove i predmete. Potrebna je dobra orijentacija, suradnja i kreativno razmišljanje.",
                lokacija: "Gradsko kupalište – Cijeli prostor",
                vrijeme: "12:00"
            },
            "Obaranje ruku": {
                maxClanovi: 2,
                voditelj: "Luka Krznarić",
                opis: "Natjecanje u snazi, brzini i tehnici ruku. Klasika svih druženja – tko ima jači biceps? Jedan-na-jedan eliminacijski turnir.",
                lokacija: "Gradsko kupalište – Centar",
                vrijeme: "12:30"
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

        <div className={`justify-center flex flex-col items-center min-h-screen transition-colors duration-500 m-auto ${theme.bg}`}>
  
  {/* Naslovna kartica iznad forme */}
  <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl mb-6">
    <h1 className="text-2xl md:text-5xl font-bold text-center text-sky-800 px-6">
      Prijava na aktivnosti
    </h1>
  </div>
            {introVisible ? (
                // Intro ekran
                <div
                    className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-opacity duration-700 ease-in-out ${introFadeOut ? 'opacity-0' : 'opacity-100'}`}
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
            ) : (

                // Forma
                <div className="w-full max-w-3xl p-10 bg-white rounded-3xl shadow-2xl">

                    {/* Step indikator */}

                    <div className="flex justify-between mb-8">
                        {["Dan", "Sport", "Tim"].map((label, i) => {
                            const current = i + 1 === step;
                            return (
                                <div key={label} className="flex-1 text-center">
                                    <div
                                        className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center text-white font-bold
                          ${step > i + 1 ? 'bg-green-500' : current ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    >
                                        {i + 1}
                                    </div>
                                    <div className={`${current ? 'text-blue-700 font-semibold' : 'text-gray-500'}`}>{label}</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Forma */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
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
                        )}

                        {step === 2 && selectedDay && (
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
                                    <>
                                        <div className={`mt-2 text-sm ${theme.label}`}>
                                            <p>Maks. članova: {selectedSportData.maxClanovi}</p>
                                            <p>Organizator: {selectedSportData.voditelj}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(true)}
                                            className="mt-2 underline text-theme font-medium"
                                        >
                                            Više informacija
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <>
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
                            </>
                        )}

                        {/* Navigacija */}
                        <div className="flex justify-between pt-6">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className={`p-4 ${theme.button} text-white text-lg font-bold rounded-xl`}
                                >
                                    Natrag
                                </button>
                            )}
                            {step < 3 && (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className={`ml-auto p-4 ${theme.button} text-white text-lg font-bold rounded-xl`}
                                >
                                    Dalje
                                </button>
                            )}
                            {step === 3 && (
                                <button
                                    type="submit"
                                    className={`ml-auto p-4 ${theme.button} text-white text-lg font-bold rounded-xl`}
                                >
                                    Prijavi Tim
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Modal */}
                    {showModal && selectedSportData && (
                        <div
                            className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
                            onClick={() => setShowModal(false)}
                        >
                            <div
                                className="bg-white rounded-xl p-6 max-w-md shadow-xl relative"
                                onClick={(e) => e.stopPropagation()}
                            >
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
                                <p className="text-sm text-gray-700 mb-2"><strong>Vrijeme: </strong> {selectedSportData.vrijeme}</p>
                                <p className="text-sm text-gray-700 mb-2"><strong>Lokacija: </strong> {selectedSportData.lokacija}</p>
                                {selectedSportData.opis && (
                                    <p className="text-sm text-gray-600">{selectedSportData.opis}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <Footer />
                </div>
            )}
        </div>
    );

};

export default App;
