import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const SportSelect = ({ selectedDay, sport, setSport, setClanovi, sportsData, theme }) => {
  const sportsForDay = sportsData?.[selectedDay] || {};
  const [counts, setCounts] = useState({}); // brojevi prijava po sportu
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);

  // Zatvori dropdown kad klikneš van
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dohvati broj prijavljenih timova za svaki sport u odabranom danu
  useEffect(() => {
    if (!selectedDay) {
      setCounts({});
      return;
    }

    const fetchCounts = async () => {
      const noviCounts = {};
      const sportsKeys = Object.keys(sportsForDay);

      await Promise.all(
        sportsKeys.map(async (key) => {
          try {
            const res = await axios.get("/api/teams/count", {
              params: { dan: selectedDay, sport: key },
            });
            noviCounts[key] = res.data.count || 0;
          } catch (err) {
            console.error("Greška pri dohvatu broja za sport:", key, err);
            noviCounts[key] = 0;
          }
        })
      );

      setCounts(noviCounts);
    };

    fetchCounts();
  }, [selectedDay, sportsForDay]);

  // Funkcija za odabir sporta - ignorira ako je limit dosegnut
  const handleSelect = (value) => {
    if (counts[value] >= (sportsForDay[value]?.maxTimovi || Infinity)) {
      // sport je popunjen - ne dozvoli odabir
      return;
    }
    setSport(value);
    setClanovi([]);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} style={{ width: "100%", color: theme.label.color }} className="relative">
      <label className="block mb-2 font-semibold text-lg" style={{ color: theme.label.color }}>
        Odaberi sport:
      </label>

      <div
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: theme.button.backgroundColor,
          color: theme.button.color,
          borderRadius: "12px",
          padding: "14px 20px",
          cursor: "pointer",
          userSelect: "none",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: theme.button.border,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          fontWeight: "600",
          fontSize: "1rem",
        }}
      >
        {sport || "Odaberi sport"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{ width: "20px", height: "20px", transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <ul
          style={{
            position: "absolute",
            zIndex: 10,
            backgroundColor: theme.cardBg,
            width: "100%",
            marginTop: "6px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxHeight: "180px",
            overflowY: "auto",
            padding: 0,
            listStyleType: "none",
          }}
        >
          {Object.entries(sportsForDay).length === 0 && (
            <li
              style={{
                padding: "12px 20px",
                color: theme.label.color,
                userSelect: "none",
              }}
            >
              Nema sportova za odabrani dan
            </li>
          )}
          {Object.entries(sportsForDay).map(([key]) => {
            const isFull = counts[key] >= (sportsForDay[key].maxTimovi || Infinity);
            return (
              <li
                key={key}
                onClick={() => !isFull && handleSelect(key)}
                className="sport-option"
                style={{
                  padding: "12px 20px",
                  cursor: isFull ? "not-allowed" : "pointer",
                  borderRadius: "12px",
                  backgroundColor: sport === key ? theme.button.backgroundColor : "transparent",
                  color: isFull ? "#999" : sport === key ? theme.button.color : theme.label.color,
                  fontWeight: sport === key ? "600" : "normal",
                  userSelect: "none",
                  position: "relative",
                }}
                title={isFull ? "Prijave za ovaj sport su zatvorene" : ""}
              >
                {key} {isFull && "(Popunjeno)"}
              </li>
            );
          })}
        </ul>
      )}

      {sport && sportsForDay[sport] && (
        <div
          className="mt-4 p-4 rounded-lg shadow-md text-sm space-y-1"
          style={{ backgroundColor: theme.bgOverlay, color: theme.label.color }}
        >
          <p><strong>Voditelj:</strong> {sportsForDay[sport].voditelj || "N/A"}</p>
          <p><strong>Lokacija:</strong> {sportsForDay[sport].lokacija || "N/A"}</p>
          <p><strong>Vrijeme:</strong> {sportsForDay[sport].vrijeme || "N/A"}</p>
          <p><strong>Maks. članova po timu:</strong> {sportsForDay[sport].maxClanovi}</p>
          <p><strong>Maks. timova:</strong> {sportsForDay[sport].maxTimovi}</p>
          {sportsForDay[sport].opis && <p><strong>Kratki opis:</strong> {sportsForDay[sport].opis}</p>}
        </div>
      )}
    </div>
  );
};

export default SportSelect;
