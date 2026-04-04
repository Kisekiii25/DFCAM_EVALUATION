import { useEffect, useState, useRef } from "react"; 
import { dfcamTheme } from '../theme';     
import TeacherCard from "../components/TeacherCard";
import schoolLogo from "../assets/DFCAM-logo.webp";
import LoadingScreen from "../components/LoadingScreen";


import { ThemeProvider } from '@mui/material/styles';
import RestartAltIcon from '@mui/icons-material/RestartAlt'; 
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { 
    FormControl, InputLabel, Select, MenuItem, 
    Box, Alert, Button, Typography, Paper, Grid
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';




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

    const navigate = useNavigate();

    const [showScrollTop, setShowScrollTop] = useState(false);
    const resultsRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
            // Show button if user scrolled down more than 400px
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        if (selectedSection && resultsRef.current) {
            resultsRef.current.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, [selectedSection]);

    useEffect(() => {
        localStorage.setItem('saved_course', selectedCourse);
        localStorage.setItem('saved_year', selectedYear);
        localStorage.setItem('saved_section', selectedSection);
    }, [selectedCourse, selectedYear, selectedSection]);

    // LOADING WHILE FECHING IS LOADING
    if (!allData || allData.length === 0) {
        return <LoadingScreen />;
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

                {/* BACK TO HOME BTN */}
                <Box sx={{ maxWidth: '800px', width: '100%', display: 'flex', mb: 1 }}>
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => navigate("/")}
                        variant="text" 
                        sx={{ 
                            color: 'rgba(255,255,255,0.6)',
                            '&:hover': { color: '#fff', bgcolor: 'transparent' },
                            textTransform: 'none',
                            fontSize: '0.9rem'
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

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
                        ref={resultsRef}
                        sx={{ 
                            scrollMarginTop: '80px',
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
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                textAlign: 'center',
                                mt: 1
                            }}
                        >
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'primary.light', 
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                    display: 'flex',
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    gap: 0.5,
                                    opacity: 0.9
                                }}
                            >
                                {/* Main Instruction */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <span style={{ fontSize: '1.1rem' }}>ⓘ</span> 
                                    Note: Please evaluate all your instructors honestly.
                                </Box>

                                {/* ADDED: Grade Scale on Next Line */}
                                <Box 
                                    component="span" 
                                    sx={{ 
                                        fontSize: '0.7rem', 
                                        opacity: 0.7, 
                                        fontWeight: 500,
                                        bgcolor: 'rgba(255, 255, 255, 0.05)', // Very subtle background
                                        px: 1,
                                        py: 0.2,
                                        borderRadius: '4px',
                                        mt: 0.5,
                                        color: 'text.secondary'
                                    }}
                                >
                                    (5 is the highest grade and 1 is the lowest)
                                </Box>
                            </Typography>
                        </Box>
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
                            <Grid size={12} key={index} sx={{ display: 'flex', width: '100%' }}> 
                                <TeacherCard {...teacher} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>

            {/* SCROLL TO TOP FAB */}
            <Zoom in={showScrollTop}>
                <Fab 
                    onClick={scrollToTop}
                    color="primary" 
                    size="small" 
                    aria-label="scroll back to top"
                    sx={{ 
                        position: 'fixed', 
                        bottom: 32, 
                        right: 32,
                        bgcolor: 'primary.main',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                        zIndex: 1000,
                        '&:hover': { bgcolor: 'primary.dark' }
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Zoom> 
            
        </ThemeProvider>
    );
}