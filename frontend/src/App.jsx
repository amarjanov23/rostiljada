import React, { useState, useMemo, useEffect } from "react";
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
  const [brojPrijava, setBrojPrijava] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);


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
    setNazivTima('');
    setOdgovornaOsoba('');
    setBrojPrijava(0); // resetiraj broj prijava kad se promijeni dan
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Dohvati broj prijava svaki put kad se promijeni sport ili dan
  useEffect(() => {
    const fetchBrojPrijava = async () => {
      if (selectedDay && sport) {
        try {
          const baseURL = import.meta.env.VITE_API_BASE_URL;
          const res = await axios.get(`${baseURL}/api/teams/count`, {
            params: { dan: selectedDay, sport },
          });
          setBrojPrijava(res.data.count);
        } catch (error) {
          console.error("Greška pri dohvatu broja prijava:", error);
        }
      } else {
        setBrojPrijava(0);
      }
    };

    fetchBrojPrijava();
  }, [selectedDay, sport]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nazivTima.trim() || !odgovornaOsoba.trim() || clanovi.length === 0) {
      alert("Popuni sva obavezna polja.");
      return;
    }

    if (clanovi.some((clan) => !clan.trim())) {
      alert("Sva imena članova moraju biti popunjena.");
      return;
    }

    if (brojPrijava >= (selectedSportData?.maxTimovi || Infinity)) {
      alert("Za ovaj sport su prijave zatvorene.");
      return;
    }

    setIsSubmitting(true);  // <-- Start loading overlay

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${baseURL}/api/teams/register`, {
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
    } finally {
      setIsSubmitting(false); // <-- Stop loading overlay
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

  // IntroOverlay fade out efekt
  useEffect(() => {
    if (introVisible) {
      const timer = setTimeout(() => {
        setIntroFadeOut(true);
        setTimeout(() => setIntroVisible(false), 700);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [introVisible]);

  const maxTimovi = selectedSportData?.maxTimovi || Infinity;
  const prijaveZatvorene = brojPrijava >= maxTimovi;

  // Validacija za dugme Dalje
  const canGoNextStep =
    (step === 1 && selectedDay) ||
    (step === 2 && sport) ||
    step === 3;

  // Validacija forme na koraku 3
  const isTeamFormValid =
    nazivTima.trim() !== "" &&
    odgovornaOsoba.trim() !== "" &&
    clanovi.length > 0 &&
    clanovi.every((clan) => clan.trim() !== "");

  return (

    <div
      style={{ backgroundColor: theme.bg, color: theme.label.color }}
      className="flex flex-col items-center min-h-screen p-6 transition-colors duration-500"
    >
      {isSubmitting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: theme.bg,
            color: theme.label.color,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          {/* Spinner */}
          <div
            style={{
              border: "8px solid",
              border: theme.label,
              color: theme.label,
              borderTop: "8px solid white",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              animation: "spin 1s linear infinite",
              marginBottom: "20px",
            }}
          ></div>

          {/* Tekst */}
          <div style={{ color: theme.label, fontSize: "1.5rem", fontWeight: "600" }}>
            Prijava u tijeku, molimo pričekajte...
          </div>

          {/* Animacija keyframes u style tag */}
          <style>
            {`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}
          </style>
        </div>
      )}


      {introVisible && (
        <IntroOverlay
          logo={logo}
          theme={theme}
          fadeOut={introFadeOut}
          onClick={() => {
            setIntroFadeOut(true);
            setTimeout(() => setIntroVisible(false), 700);
          }}
        />
      )}

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

      <main
        style={{ backgroundColor: theme.cardBg }}
        className="w-full max-w-3xl p-10 rounded-3xl shadow-lg"
      >
        <StepIndicator step={step} theme={theme} onStepClick={setStep} />


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

          {step === 3 && selectedSportData && (
            <TeamForm
              nazivTima={nazivTima}
              setNazivTima={setNazivTima}
              odgovornaOsoba={odgovornaOsoba}
              setOdgovornaOsoba={setOdgovornaOsoba}
              clanovi={clanovi}
              handleMemberChange={handleMemberChange}
              handleAddMember={handleAddMember}
              maxClanovi={selectedSportData.maxClanovi}
              theme={theme}
            />
          )}

          <div className="flex justify-between pt-8">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                style={theme.button}
                className="cursor-pointer rounded-md px-5 py-2 font-semibold shadow-md hover:brightness-90 transition"
              >
                Natrag
              </button>
            )}

            {step < 3 && (
              <button
                type="button"
                onClick={nextStep}
                disabled={!canGoNextStep}
                style={{
                  ...theme.button,
                  marginLeft: "auto",
                  opacity: !canGoNextStep ? 0.5 : 1,
                  cursor: !canGoNextStep ? "not-allowed" : "pointer",
                }}
                className="rounded-md px-5 py-2 font-semibold shadow-md transition"
              >
                Dalje
              </button>
            )}

            {step === 3 && (
              <button
                type="submit"
                disabled={prijaveZatvorene || !isTeamFormValid || isSubmitting}
                style={{
                  ...theme.button,
                  marginLeft: "auto",
                  opacity: prijaveZatvorene || !isTeamFormValid || isSubmitting ? 0.5 : 1,
                  cursor: prijaveZatvorene || !isTeamFormValid || isSubmitting ? "not-allowed" : "pointer",
                }}
                className="cursor-pointer rounded-md px-5 py-2 font-semibold shadow-md hover:brightness-90 transition"
              >
                {prijaveZatvorene
                  ? "Prijave zatvorene"
                  : isSubmitting
                    ? "Prijava u tijeku..."
                    : "Prijavi Tim"}
              </button>

            )}
          </div>
        </form>

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
