import React, { useState, useRef, useEffect } from "react";

const days = ["Dan 1", "Dan 2"];

const DaySelect = ({ selectedDay, setSelectedDay, theme }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      style={{ width: "100%", color: theme.label.color }}
      className="relative"
    >
      <label
        className="block mb-2 font-semibold text-lg"
        style={{ color: theme.label.color }}
      >
        Odaberi dan:
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
        {selectedDay || "Odaberi dan"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          style={{
            width: "20px",
            height: "20px",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
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
          {days.map((day) => (
            <li
              key={day}
              onClick={() => {
                setSelectedDay(day);
                setOpen(false);
              }}
              className="day-option"
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                borderRadius: "12px",
                backgroundColor: selectedDay === day ? theme.button.backgroundColor : "transparent",
                color: selectedDay === day ? theme.button.color : theme.label.color,
                fontWeight: selectedDay === day ? "600" : "normal",
                transition: "background-color 0.2s, color 0.2s",
                userSelect: "none",
              }}
            >
              {day}
              <style>
                {`
                  .day-option:hover {
                    background-color: ${theme.stepUpcoming};
                    color: ${theme.label.color};
                  }
                `}
              </style>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DaySelect;
