import React from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const { state } = useLocation();

  if (!state) return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <p className="text-lg text-gray-700">Nema podataka</p>
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full">
        <div className="text-center mb-8">
          <svg
            className="mx-auto mb-4 w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h1 className="text-4xl font-bold text-blue-700">Registracija uspješna!</h1>
          <p className="text-blue-600 mt-2">Vaš tim je uspješno prijavljen.</p>
        </div>

        <div className="space-y-4 text-blue-800">
          <div className="flex justify-between">
            <span className="font-semibold">Sport:</span>
            <span>{state.sport}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Naziv tima:</span>
            <span>{state.nazivTima}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold"> Kontakts:</span>
            <span>{state.odgovornaOsoba}</span>
          </div>
          <div>
            <span className="font-semibold">Članovi:</span>
            <ul className="list-disc list-inside mt-2 text-blue-700">
              {state.clanovi.map((clan, index) => (
                <li key={index}>{clan}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition duration-200"
          >
            Povratak na početnu
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
