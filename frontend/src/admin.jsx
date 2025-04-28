import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './index.css'; // isto trebaš da radi tailwind ili css

const Table = () => {
  const [registeredData, setRegisteredData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/register');
        setRegisteredData(response.data);
      } catch (error) {
        console.error('Greška pri dohvaćanju podataka:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {registeredData ? (
        <div className="mt-4 p-6 bg-white shadow-lg rounded-xl">
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Podaci Tima</h3>
          <p><strong>Sport:</strong> {registeredData.sport}</p>
          <p><strong>Naziv Tima:</strong> {registeredData.nazivTima}</p>
          <p><strong>Kapiten:</strong> {registeredData.odgovornaOsoba}</p>
          <p><strong>Članovi:</strong> {registeredData.clanovi.join(', ')}</p>
        </div>
      ) : (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-600">Podaci o timu nisu dostupni.</p>
        </div>
      )}
    </div>
  );
};

// Render za admin stranicu
const container = document.getElementById('table');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Table />
  </React.StrictMode>
);

export default Table;
