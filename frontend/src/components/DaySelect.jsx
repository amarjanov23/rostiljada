const DaySelect = ({ selectedDay, setSelectedDay, theme }) => (
  <div
    style={{ backgroundColor: theme.cardBg, color: theme.label.color }}
    className="p-6 space-y-4 transition-colors duration-500"
  >
    <label className="block text-lg font-semibold tracking-wide">
      Odaberi dan:
    </label>

    <select
  value={selectedDay}
  onChange={(e) => setSelectedDay(e.target.value)}
  className="cursor-pointer w-full px-6 py-4 rounded-xl text-base font-semibold focus:outline-none focus:ring-0 transition-all duration-300"
  style={{
    backgroundColor: theme.button.backgroundColor,
    color: theme.button.color,
    border: 'none',
    appearance: 'none',
    outline: 'none',
    boxShadow: 'none',
  }}
>
  <option value="" className="text-gray-400">Odaberi dan</option>
  <option value="Dan 1">Dan 1</option>
  <option value="Dan 2">Dan 2</option>
</select>

  </div>
);

export default DaySelect;
