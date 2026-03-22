import React, { useEffect, useState } from "react"; 

import { 
    FormControl, InputLabel, Select, MenuItem, 
    Box, Alert, CircularProgress, Button, Typography, Paper, Grid
} from '@mui/material';

// Only keep this if you ran: npm install @mui/icons-material
import RestartAltIcon from '@mui/icons-material/RestartAlt'; 

import { createTheme, ThemeProvider } from '@mui/material/styles';
import TeacherCard from "../components/TeacherCard";
import schoolLogo from "../assets/DFCAMlogo.png"; // Double check this filename!

// 1. DFCAMCLP BRANDED THEME
const dfcamTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0038a8', // DFCAM Blue
            light: '#80D8FF', 
            contrastText: '#fff',
        },
        background: {
            default: '#0f172a', // Deep Navy
            paper: '#1e293b',
        },
        text: {
            primary: '#ffffff',
            secondary: '#9ca3af',
        },
    },
});

export default function evaluation() {
    const [allData, setAllData] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. DATA FETCHING
    useEffect(() => {
        // REPLACE WITH YOUR ACTUAL DEPLOYMENT URL
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                if (data.error) setError(data.error);
                else setAllData(data);
                setLoading(false);
            })
            .catch(err => {
                setError("Connection to Faculty Database failed.");
                setLoading(false);
            });
    }, []);

    // 3. CASCADING LOGIC
    const courses = [...new Set(allData.map(item => item.course || item.Course))].filter(Boolean).sort();

    const yearLevels = [...new Set(
        allData.filter(item => (item.course || item.Course) === selectedCourse)
            .map(item => item.yearLevel || item.YearLevel)
    )].filter(Boolean).sort();

    const availableSections = [...new Set(
        allData.filter(item => 
            (item.course || item.Course) === selectedCourse && 
            (item.yearLevel || item.YearLevel) === selectedYear
        ).map(item => item.section || item.Section)
    )].filter(Boolean).sort();

    const filteredTeachers = allData.filter(t => 
        (t.course || t.Course) === selectedCourse && 
        (t.yearLevel || t.YearLevel) === selectedYear && 
        (t.section || t.Section) === selectedSection
    );

    const handleReset = () => {
        setSelectedCourse("");
        setSelectedYear("");
        setSelectedSection("");
    };

    const loadingQuotes = [
        "Education is the most powerful weapon to change the world.",
        "The influence of a great teacher can never be erased.",
        "Quality is not an act, it is a habit.",
        "Strive for excellence in every evaluation."
    ];

    if (loading) {
        // Pick a random quote every time it loads
        const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];

        return (
            <ThemeProvider theme={dfcamTheme}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="background.default" textAlign="center" p={3}>
                    <CircularProgress size={60} thickness={4} />
                    <Typography variant="h6" sx={{ mt: 4, color: 'primary.light', fontStyle: 'italic', maxWidth: '500px' }}>
                        "{randomQuote}"
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary', letterSpacing: 2 }}>
                        CONNECTING TO DFCAMCLP DATA
                    </Typography>
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={dfcamTheme}>
            {/* MAIN WRAPPER: Centers everything and sets the 800px guide */}
            <Box sx={{ 
                p: { xs: 2, md: 4 }, 
                minHeight: '100vh', 
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' // Centers the 800px column on the screen
            }}>
                
                {/* 1. SCHOOL HEADER (Fixed to 800px) */}
                <Paper elevation={6} sx={{ 
                    p: 3, 
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 3, 
                    borderLeft: '6px solid', 
                    borderColor: 'primary.main',
                    maxWidth: '800px', // MATCHING WIDTH
                    width: '100%' 
                }}>
                    <img src={schoolLogo} alt="Logo" style={{ height: '80px', borderRadius: '50%' }} />
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: '-1px', fontSize: { xs: '1.5rem', sm: '2rem' }}}>
                            Faculty Evaluation
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'primary.light', fontWeight: 'bold', fontSize: { xs: '0.65rem', sm: '0.85rem' }}}>
                            DR. FILEMON C. AGUILAR MEMORIAL COLLEGE OF LAS PIÑAS
                        </Typography>
                    </Box>
                </Paper>

                {/* 2. FILTER SECTION (Fixed to 800px) */}
                <Box sx={{ maxWidth: '800px', width: '100%', mb: 4 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel>Course</InputLabel>
                            <Select value={selectedCourse} label="Course" onChange={(e) => { setSelectedCourse(e.target.value); setSelectedYear(""); setSelectedSection(""); }}>
                                {courses.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth disabled={!selectedCourse}>
                            <InputLabel>Year Level</InputLabel>
                            <Select value={selectedYear} label="Year Level" onChange={(e) => { setSelectedYear(e.target.value); setSelectedSection(""); }}>
                                {yearLevels.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth disabled={!selectedYear}>
                            <InputLabel>Section</InputLabel>
                            <Select value={selectedSection} label="Section" onChange={(e) => setSelectedSection(e.target.value)}>
                                {availableSections.map(s => <MenuItem key={s} value={s}>Section {s}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>

                    {/* Reset Button */}
                    {(selectedCourse || selectedYear || selectedSection) && (
                        <Button onClick={handleReset} startIcon={<RestartAltIcon />} sx={{ mt: 1, textTransform: 'none' }}>
                            Clear all filters
                        </Button>
                    )}
                </Box>

                {/* TEACHER LIST SECTION */}
                <Box sx={{ 
                    width: '100%', 
                    maxWidth: '800px', // This should match your blue header width exactly
                    mx: 'auto', 
                    mt: 2 
                }}>
                    <Grid container spacing={2}>
                        {filteredTeachers.map((teacher, index) => (
                            <Grid item xs={12} key={index} sx={{ display: 'flex', width: '100%' }}> 
                                {/* Adding width: '100%' and display: 'flex' here is critical */}
                                <TeacherCard {...teacher} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Status Messages */}
                {!selectedSection && (
                    <Box sx={{ maxWidth: '800px', width: '100%' }}>
                        <Alert variant="outlined" severity="info" sx={{ borderStyle: 'dashed', borderWidth: 2 }}>
                            Selection Required: Please choose your <strong>Course</strong>, <strong>Year</strong>, and <strong>Section</strong>.
                        </Alert>
                    </Box>
                )}
            </Box>
        </ThemeProvider>
    );
}