const SportSelect = ({
  selectedDay,
  sport,
  setSport,
  setClanovi,
  sportsData,
  theme
}) => {
  const sportsForDay = sportsData?.[selectedDay] || {};

  return (
    <div
      style={{ backgroundColor: theme.cardBg, color: theme.label.color }}
      className="p-6 space-y-4 transition-colors duration-500"
    >
      <label className="block text-lg font-semibold tracking-wide">
        Odaberi sport:
      </label>

      <select
        value={sport}
        onChange={(e) => {
          setSport(e.target.value);
          setClanovi([]);
        }}
        className="cursor-pointer w-full px-6 py-4 rounded-xl text-base font-semibold focus:outline-none focus:ring-0 focus:border-none transition-all duration-300"
        style={{
          backgroundColor: theme.button.backgroundColor,
          color: theme.button.color,
          border: 'none',
          appearance: 'none',
        }}
      >
        <option value="" className="text-gray-400">-- Odaberi sport --</option>
        {Object.entries(sportsForDay).map(([key]) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SportSelect;
