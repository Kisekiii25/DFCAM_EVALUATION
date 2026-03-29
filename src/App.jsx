import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages & Components
import Home from './pages/Home';
import Evaluation from './pages/evaluation';
import Navbar from './components/Navbar';

function App() {
    // 1. GLOBAL STATE
    const [allData, setAllData] = useState(null); 
    const [settings, setSettings] = useState({ 
        academicYear: 'Loading...', 
        semester: 'Loading...' 
    });

    // 2. DATA FETCHING (API)
    useEffect(() => {
        // Accessing the Vercel/Vite Environment Variable
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.error("API URL is missing! Check your .env file or Vercel settings.");
            return;
        }

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setAllData(data.teachers);
                setSettings(data.settings);
            })
            .catch(err => {
                console.error("Data fetch failed:", err);
            });
    }, []);

    // 3. RENDERING & ROUTES
    return (
        <>
            {/* Navbar */}
            <Navbar settings={settings} />

            <Routes>
                {/* Landing Page */}
                <Route 
                    path="/" 
                    element={<Home allData={allData} settings={settings} />} 
                />
                
                {/* Main Evaluation Page */}
                <Route 
                    path="/evaluation" 
                    element={<Evaluation allData={allData} />} 
                />
            </Routes>
        </>
    );
}

export default App;