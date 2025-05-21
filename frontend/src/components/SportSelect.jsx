const SportSelect = ({ selectedDay, sport, setSport, setClanovi, sportsData, selectedSportData, setShowModal, theme }) => {
  // Sports for selected day (može biti undefined ako selectedDay nije validan ključ)
  const sportsForDay = sportsData?.[selectedDay] || {};

  console.log('selectedDay:', selectedDay);
  console.log('sportsForDay:', sportsForDay);

  return (
    <div>
      <label>Odaberi sport:</label>
      <select
        value={sport}
        onChange={(e) => {
          setSport(e.target.value);
          setClanovi([]);
        }}
      >
        <option value="">-- Odaberi sport --</option>
        {Object.entries(sportsForDay).map(([key, value]) => (
          <option key={key} value={key}>
            {key} {/* ili value.name ako želiš prikazati ime */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportSelect;
