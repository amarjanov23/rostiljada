const TeamForm = ({
    nazivTima,
    setNazivTima,
    odgovornaOsoba,
    setOdgovornaOsoba,
    clanovi,
    handleMemberChange,
    handleAddMember,
    maxClanovi,
    theme,
  }) => (
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
          disabled={clanovi.length >= maxClanovi}
          className={`w-full p-4 bg-white border-2 rounded-xl mt-2 font-bold text-lg cursor-pointer
            ${theme.border} ${theme.text} hover:bg-opacity-80 ${clanovi.length >= maxClanovi ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Dodaj člana
        </button>
      </div>
    </>
  );
  
  export default TeamForm;
  