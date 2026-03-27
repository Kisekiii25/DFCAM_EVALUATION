import React, { useEffect, useState } from "react"; 
import { dfcamTheme } from '../theme'; 


import { 
    FormControl, InputLabel, Select, MenuItem, 
    Box, Alert, CircularProgress, Button, Typography, Paper, Grid
} from '@mui/material';

import RestartAltIcon from '@mui/icons-material/RestartAlt'; 
    
import { ThemeProvider } from '@mui/material/styles';
import TeacherCard from "../components/TeacherCard";
import schoolLogo from "../assets/DFCAMlogo.png";


export default function Evaluation({ allData }) {
    const [selectedCourse, setSelectedCourse] = useState(
        localStorage.getItem('saved_course') || ""
    );
    const [selectedYear, setSelectedYear] = useState(
        localStorage.getItem('saved_year') || ""
    );
    const [selectedSection, setSelectedSection] = useState(
        localStorage.getItem('saved_section') || ""
    );

    const handleReset = () => {
        localStorage.clear();
        setSelectedCourse("");
        setSelectedYear("");
        setSelectedSection("");
    };

    useEffect(() => {
        localStorage.setItem('saved_course', selectedCourse);
        localStorage.setItem('saved_year', selectedYear);
        localStorage.setItem('saved_section', selectedSection);
    }, [selectedCourse, selectedYear, selectedSection]);

    //check to prevent crash if data isn't passed yet
    const loadingQuotes = [
        "Education is the most powerful weapon to change the world.",
        "The influence of a great teacher can never be erased.",
        "Quality is not an act, it is a habit.",
        "Strive for excellence in every evaluation.",
        "Your feedback today builds a better classroom tomorrow.",
        "Honest evaluation is the first step toward excellence.",
        "Self-doubt kills talent.",
        "A person who never made a mistake never tried anything new.",
        "Growth starts exactly where your comfort zone ends.",
        "Loading... please wait while I tell the data to wake up.",
        "Progress, not perfection.",
        "The best project you will ever work on is YOU."
    ];

    // LOADING WHILE FECHING IS LOADING
    if (!allData || allData.length === 0) {
        const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];
        return (
            <ThemeProvider theme={dfcamTheme}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="calc(100vh - 130px)">
                    <CircularProgress size={60} thickness={4} sx={{ color: 'primary.light' }} />
                    <Typography variant="h6" sx={{ mt: 4, color: 'primary.light', fontStyle: 'italic', maxWidth: '500px' }}>
                        "{randomQuote}"
                    </Typography>
                    <Typography sx={{ mt: 2, color: 'white' }}>
                        Syncing faculty data...
                    </Typography>
                </Box>
            </ThemeProvider>
        );
    }

    // Get Unique Courses
    const courses = [...new Set(allData.map(item => item.course || item.Course))].filter(Boolean).sort();

    // Get Unique Year Levels based on Course
    const yearLevels = [...new Set(
        allData.filter(item => (item.course || item.Course) === selectedCourse)
            .map(item => item.yearLevel || item.YearLevel)
    )].filter(Boolean).sort();

    // Get Unique Sections based on Course & Year
    const availableSections = [...new Set(
        allData.filter(item => 
            (item.course || item.Course) === selectedCourse && 
            (item.yearLevel || item.YearLevel) === selectedYear
        ).map(item => item.section || item.Section)
    )].filter(Boolean).sort();



    // Final List of Teachers to display
    const filteredTeachers = allData.filter(t => 
        (t.course || t.Course) === selectedCourse && 
        (t.yearLevel || t.YearLevel) === selectedYear && 
        (t.section || t.Section) === selectedSection
    );

    return (
        <ThemeProvider theme={dfcamTheme}>
            {/* MAIN WRAPPER: Centers everything and sets the 800px guide */}
            <Box sx={{ 
                p: { xs: 2, md: 4 }, 
                minHeight: '100vh', 
                bgcolor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center' 
            }}>
                
                {/*SCHOOL HEADER */}
                <Paper elevation={6} sx={{ 
                    p: { xs: 1.5, sm: 3 },
                    mb: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1.5, sm: 3 },
                    borderLeft: '6px solid', 
                    borderColor: 'primary.main',
                    maxWidth: '800px',
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

                {/*FILTER DROPDOWNS SECTION*/}
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

                    {/* Reset Link Button */}
                    {(selectedCourse || selectedYear || selectedSection) && (
                        <Button onClick={handleReset} startIcon={<RestartAltIcon />} sx={{ mt: 1, textTransform: 'none', color: '#60a5fa', '&:hover': {
                            color: '#93c5fd', // lighter on hover
                            bgcolor: 'rgba(255, 255, 255, 0.05)' 
                        } }}>
                            Clear all filters
                        </Button>
                    )}
                </Box>


                {/* STATUS MESSAGES / DIVIDER */}
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
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
                        my: 1,
                        maxWidth: '800px',
                        mx: 'auto'
                    }} 
                />


                {/* ACTIVE SELECTION HEADER */}
                {(selectedCourse || selectedYear || selectedSection) && (
                    <Box 
                        sx={{ 
                            mb: 3, 
                            position: 'sticky',
                            top: 72,
                            zIndex: 10,
                            width: '100%',
                            py: 2,
                            bgcolor: 'rgba(15, 23, 42, 0.9)',
                            backdropFilter: 'blur(8px)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
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
                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            flexWrap: 'wrap', 
                            gap: 1 
                        }}>
                            {selectedCourse && (
                                <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                    {selectedCourse}
                                </Box>
                            )}
                            {selectedYear && (
                                <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                    {selectedYear}
                                </Box>
                            )}
                            {selectedSection && (
                                <Box sx={{ bgcolor: 'rgba(37, 99, 235, 0.15)', color: '#60a5fa', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(96, 165, 250, 0.3)' }}>
                                    Section {selectedSection}
                                </Box>
                            )}
                        </Box>
                        
                        {/* The Note: Honest Evaluation */}
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: 'primary.light', // Use that nice light blue
                                fontWeight: 600,
                                letterSpacing: 0.5,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                opacity: 0.9
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>ⓘ</span> 
                            Note: Please evaluate all your instructors honestly.
                        </Typography>
                    </Box>
                )}


                {/* TEACHER LIST SECTION */}
                <Box sx={{ 
                    width: '100%', 
                    maxWidth: '800px', 
                    mx: 'auto', 
                    mt: 2 
                }}>

                    <Grid container spacing={2}>
                        {filteredTeachers.map((teacher, index) => (
                            <Grid item xs={12} key={index} sx={{ display: 'flex', width: '100%' }}> 
                                <TeacherCard {...teacher} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>
        </ThemeProvider>
    );
}