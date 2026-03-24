import { Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Evaluation from './pages/evaluation';
import Navbar from './components/Navbar';

function App() {
  const [allData, setAllData] = useState(null); 
  const [settings, setSettings] = useState({ academicYear: '...', semester: '...' });

  useEffect(() => {
      const apiUrl = import.meta.env.VITE_API_URL;
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          setAllData(data.teachers);
          setSettings(data.settings);
        })
        .catch(err => console.error("Data fetch failed", err));
  }, []);

  return (
    <>
      <Navbar settings={settings} />
      <Routes>
        <Route path="/" element={<Home allData={allData} settings={settings} />} />
        <Route path="/evaluation" element={<Evaluation allData={allData} />} />
      </Routes>
    </>
  );
}

export default App;