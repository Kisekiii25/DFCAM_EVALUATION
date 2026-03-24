import React, { useState } from "react"; 
import { dfcamTheme } from '../theme'; 


import { 
    FormControl, InputLabel, Select, MenuItem, 
    Box, Alert, CircularProgress, Button, Typography, Paper, Grid
} from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt'; 
    
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TeacherCard from "../components/TeacherCard";
import schoolLogo from "../assets/DFCAMlogo.png";


export default function Evaluation({ allData }) {
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    //Add a check to prevent crash if data isn't passed yet
    if (!allData || allData.length === 0) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="calc(100vh - 130px)" bgcolor="#0f172a">
                <CircularProgress />
                <Typography sx={{ mt: 2, color: 'white' }}>Syncing faculty data...</Typography>
            </Box>
        );
    }

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

    if (!allData) {
        return (
        <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress /> 
            <Typography>Refreshing data...</Typography>
        </Box>
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
                
                {/*SCHOOL HEADER (Fixed to 800px) */}
                <Paper elevation={6} sx={{ 
                    p: { xs: 1.5, sm: 3 },
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1.5, sm: 3 },
                    borderLeft: '6px solid', 
                    borderColor: 'primary.main',
                    maxWidth: '800px', // MATCHING WIDTH
                    width: '100%',
                    mx: 'auto',
                    boxSizing: 'border-box'
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
                        <Button onClick={handleReset} startIcon={<RestartAltIcon />} sx={{ mt: 1, textTransform: 'none', color: '#60a5fa', '&:hover': {
                            color: '#93c5fd', // Even lighter on hover
                            bgcolor: 'rgba(255, 255, 255, 0.05)' 
                        } }}>
                            Clear all filters
                        </Button>
                    )}
                </Box>


                {/* Status Messages */}
                {!selectedSection && (
                    <Box sx={{ maxWidth: '800px', width: '100%' }}>
                        <Alert variant="outlined" severity="info" sx={{ borderStyle: 'dashed', borderWidth: 2 }}>
                            Selection Required: Please choose your <strong>Course</strong>, <strong>Year</strong>, and <strong>Section</strong>.
                        </Alert>
                    </Box>
                )}

                {/* SEPERATE LINE */}
                <Box 
                    sx={{ 
                        width: '100%', 
                        height: '1px', 
                        // Using a gradient makes it fade at the edges, which looks very "Pro"
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                        my: 1,
                        maxWidth: '800px',
                        mx: 'auto'
                    }} 
                />


                {/* NEW: ACTIVE SELECTION HEADER */}
                {(selectedCourse || selectedYear || selectedSection) && (
                    <Box 
                        sx={{ 
                            mb: 3, 
                            position: 'sticky',
                            top: 90,
                            zIndex: 10,
                            borderRadius: "10px",
                            py: 2,
                            bgcolor: 'rgba(15, 23, 42, 0.9)',
                            backdropFilter: 'blur(8px)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex', 
                            justifyContent: 'center', 
                            flexWrap: 'wrap', 
                            gap: 1 
                        }}
                    >
                        <Typography 
                            variant="overline" 
                            sx={{ 
                                color: 'text.secondary', 
                                width: '100%', 
                                textAlign: 'center', 
                                mb: 0.5,
                                fontWeight: 'bold'
                            }}
                        >
                            Currently Viewing
                        </Typography>
                        
                        {/* Course Chip */}
                        {selectedCourse && (
                            <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                {selectedCourse}
                            </Box>
                        )}
                        
                        {/* Year Level Chip */}
                        {selectedYear && (
                            <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                {selectedYear}
                            </Box>
                        )}
                        
                        {/* Section Chip */}
                        {selectedSection && (
                            <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                Section {selectedSection}
                            </Box>
                        )}
                    </Box>
                )}


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

            </Box>
        </ThemeProvider>
    );
}