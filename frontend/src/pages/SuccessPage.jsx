import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();

  if (!state) return <p>Nema podataka</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold text-green-600">Registracija uspješna!</h1>
      <p><strong>Sport:</strong> {state.sport}</p>
      <p><strong>Naziv tima:</strong> {state.nazivTima}</p>
      <p><strong>Kapetan:</strong> {state.odgovornaOsoba}</p>
      <p><strong>Članovi:</strong> {state.clanovi.join(', ')}</p>
    </div>
  );
};

export default SuccessPage;
