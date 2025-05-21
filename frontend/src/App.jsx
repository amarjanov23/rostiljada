import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import StepIndicator from "./components/StepIndicator";
import DaySelect from "./components/DaySelect";
import SportSelect from "./components/SportSelect";
import TeamForm from "./components/TeamForm";
import SportModal from "./components/SportModal";
import Footer from "./components/Footer";
import IntroOverlay from "./components/IntroOverlay";
import sportsData from "./components/sportsData";

import {
  defaultTheme,
  dan1Theme,
  dan2Theme,
} from "./components/themes";

const App = ({ logo }) => {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState('');
  const [sport, setSport] = useState('');
  const [clanovi, setClanovi] = useState([]);
  const [nazivTima, setNazivTima] = useState('');
  const [odgovornaOsoba, setOdgovornaOsoba] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [introFadeOut, setIntroFadeOut] = useState(false);

  const navigate = useNavigate();

  const selectedSportData = sport && selectedDay
    ? sportsData[selectedDay]?.[sport]
    : null;

  const getTheme = (day) => {
    if (day === "Dan 1") return dan1Theme;
    if (day === "Dan 2") return dan2Theme;
    return defaultTheme;
  };

  const theme = useMemo(() => getTheme(selectedDay), [selectedDay]);

  const handleDayChange = (day) => {
    setSelectedDay(day);
    setSport('');
    setClanovi([]);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nazivTima || !odgovornaOsoba || clanovi.length === 0) {
      alert("Popuni sva obavezna polja.");
      return;
    }

    if (clanovi.some((clan) => !clan.trim())) {
      alert("Sva imena članova moraju biti popunjena.");
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${baseURL}/api/register`, {
        dan: selectedDay,
        sport,
        nazivTima,
        odgovornaOsoba,
        clanovi,
      });

      navigate("/success", {
        state: { dan: selectedDay, sport, nazivTima, odgovornaOsoba, clanovi },
      });
    } catch (error) {
      console.error("Greška pri registraciji:", error);
      alert("Došlo je do greške prilikom registracije.");
    }
  };

  const handleMemberChange = (index, e) => {
    const newClanovi = [...clanovi];
    newClanovi[index] = e.target.value;
    setClanovi(newClanovi);
  };

  const handleAddMember = () => {
    if (clanovi.length < selectedSportData?.maxClanovi) {
      setClanovi([...clanovi, ""]);
    }
  };

  return (
    <div
      style={{ backgroundColor: theme.bg, color: theme.label.color }}
      className="flex flex-col items-center min-h-screen p-6 transition-colors duration-500"
    >
      {/* Intro Overlay */}
      {introVisible && (
        <IntroOverlay
          logo={logo}
          theme={theme}
          fadeOut={introFadeOut}
          onClick={() => {
            setIntroFadeOut(true);
            setTimeout(() => setIntroVisible(false), 700); // Mora odgovarati .duration-700
          }}
        />
      )}

      {/* Header */}
      <header
        style={{ backgroundColor: theme.cardBg }}
        className="w-full max-w-3xl p-10 rounded-3xl shadow-lg mb-8"
      >
        <h1
          style={theme.label}
          className="text-3xl md:text-5xl font-extrabold text-center leading-tight"
        >
          Prijava na aktivnosti
        </h1>
      </header>

      {/* Main Content */}
      <main
        style={{ backgroundColor: theme.cardBg }}
        className="w-full max-w-3xl p-10 rounded-3xl shadow-lg"
      >
        <StepIndicator step={step} theme={theme} />

        <form onSubmit={handleSubmit} className="space-y-8">
          {step === 1 && (
            <DaySelect
              selectedDay={selectedDay}
              setSelectedDay={handleDayChange}
              setSport={setSport}
              setClanovi={setClanovi}
              sportsData={sportsData}
              theme={theme}
            />
          )}

          {step === 2 && selectedDay && (
            <SportSelect
              selectedDay={selectedDay}
              sport={sport}
              setSport={setSport}
              setClanovi={setClanovi}
              sportsData={sportsData}
              selectedSportData={selectedSportData}
              setShowModal={setShowModal}
              theme={theme}
            />
          )}

          {step === 3 && (
            <TeamForm
              nazivTima={nazivTima}
              setNazivTima={setNazivTima}
              odgovornaOsoba={odgovornaOsoba}
              setOdgovornaOsoba={setOdgovornaOsoba}
              clanovi={clanovi}
              handleMemberChange={handleMemberChange}
              handleAddMember={handleAddMember}
              maxClanovi={selectedSportData?.maxClanovi}
              theme={theme}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                style={theme.button}
                className="rounded-md px-5 py-2 font-semibold shadow-md hover:brightness-90 transition"
              >
                Natrag
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                style={{ ...theme.button, marginLeft: "auto" }}
                className="cursor-pointer rounded-md px-5 py-2 font-semibold shadow-md hover:brightness-90 transition"
              >
                Dalje
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                style={{ ...theme.button, marginLeft: "auto" }}
                className="rounded-md px-5 py-2 font-semibold shadow-md hover:brightness-90 transition"
              >
                Prijavi Tim
              </button>
            )}
          </div>
        </form>

        {/* Modal */}
        {showModal && selectedSportData && (
          <SportModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            sport={sport}
            details={selectedSportData}
            theme={theme}
          />
        )}

        <Footer theme={theme} />
      </main>
    </div>
  );
};

export default App;
