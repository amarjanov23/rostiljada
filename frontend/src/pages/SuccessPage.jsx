import { useLocation } from "react-router-dom";
import briskulaImg from '../assets/briskula.png';


import {
  defaultTheme,
  dan1Theme,
  dan2Theme,
} from "../components/themes";
const SuccessPage = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: defaultTheme.bg }}
      >
        <p style={{ color: "#4b5563", fontSize: "1.125rem" }}>Nema podataka</p>
      </div>
    );
  }

  // Odaberi temu prema danu
  let theme;
  switch (state.dan) {
    case "Dan 1":
      theme = dan1Theme;
      break;
    case "Dan 2":
      theme = dan2Theme;
      break;
    default:
      theme = defaultTheme;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{ backgroundColor: theme.bg }}
    >
      <div
        style={{ backgroundColor: theme.cardBg }}
        className="rounded-3xl shadow-2xl p-10 max-w-xl w-full"
      >
        <div className="text-center mb-8">
          <svg
            className="mx-auto mb-4 w-16 h-16"
            fill="none"
            stroke={theme.button.backgroundColor}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h1
            style={{ color: theme.button.backgroundColor }}
            className="text-4xl font-bold"
          >
            Registracija uspješna!
          </h1>
          <p
            style={{ color: theme.label.color }}
            className="mt-2"
          >
            Vaš tim je uspješno prijavljen.
          </p>
        </div>

        <div style={{ color: theme.label.color }} className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Sport:</span>
            <span>{state.sport}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Naziv tima:</span>
            <span>{state.nazivTima}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Kontakts:</span>
            <span>{state.odgovornaOsoba}</span>
          </div>
          <div>
            <span className="font-semibold">Članovi:</span>
            <ul
              className="list-disc list-inside mt-2"
              style={{ color: theme.button.backgroundColor }}
            >
              {state.clanovi.map((clan, index) => (
                <li key={index}>{clan}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          {/* Briškula slika ako je izabran taj sport */}
{state.sport === "Turnir u trešeti" && (
  <div className="mt-6 text-center">
    <img
      src={briskulaImg}
      alt="Briškula"
      className="mx-auto w-64 md:w-80 rounded-lg shadow-lg"
    />
  </div>
)}

          <a
            href="/"
            style={{
              backgroundColor: theme.button.backgroundColor,
              color: theme.button.color,
              borderRadius: "1.5rem",
              padding: "0.75rem 1.5rem",
              fontWeight: "600",
              transition: "background-color 0.2s",
              display: "inline-block",
              textDecoration: "none",
              border: theme.button.border,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = theme.stepCompleted)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = theme.button.backgroundColor)
            }
          >
            Povratak na početnu
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
