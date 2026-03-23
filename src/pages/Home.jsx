import React, { useState } from 'react';
import { Box, Typography, Button, Container, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import schoolLogo from '../assets/DFCAMlogo.png';

export default function Home() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        setOpen(false);
        navigate('/evaluation');
    };

    return (
        <Box sx={{ 
            height: 'calc(100vh - 64px)', 
            width: '100%',
            bgcolor: '#0f172a',
            backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.9)), url('/hero-bg.jpg')`,            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
        }}>

            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 4, md: 10 } }}> 
                <Stack 
                    direction={{ xs: 'column', md: 'row' }} 
                    spacing={{ xs: 4, md: 6 }} 
                    alignItems="center"
                    justifyContent="center"
                    sx={{ minHeight: 'calc(100vh - 120px)' }} // Ensures it stays centered even on tall mobile screens
                >
                    {/* LEFT SIDE: LOGO */}
                    <Box 
                        component="img" 
                        src={schoolLogo}
                        sx={{ 
                            // Smaller on mobile (140px), larger on desktop (240px)
                            width: { xs: 140, sm: 180, md: 240 }, 
                            height: 'auto',
                            borderRadius: '50%', 
                            bgcolor: '#fff',     
                            p: 0.5,              
                            boxShadow: '0px 0px 40px rgba(37, 99, 235, 0.2)',
                            flexShrink: 0        
                        }} 
                    />

                    {/* RIGHT SIDE: TEXT CONTENT */}
                    <Box sx={{ 
                        color: '#fff', 
                        flexGrow: 0, 
                        textAlign: { xs: 'center', md: 'left' },
                        px: { xs: 1, md: 0 } 
                    }}>
                        <Typography variant="overline" sx={{ 
                            letterSpacing: { xs: 1, md: 3 }, 
                            color: 'primary.light', 
                            fontWeight: 700, 
                            opacity: 0.8,
                            fontSize: { xs: '0.65rem', md: '0.75rem' }
                        }}>
                            GUIDANCE AND COUNSELING SERVICES OFFICE
                        </Typography>
                        
                        <Typography variant="h2" sx={{ 
                            fontWeight: 800, 
                            mt: 1, 
                            mb: 2, 
                            lineHeight: 1.1,
                            // Aggressive scaling for mobile headings
                            fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.8rem' }, 
                        }}>
                            DR. FILEMON C. AGUILAR MEMORIAL COLLEGE OF LAS PIÑAS
                        </Typography>

                        <Typography variant="h6" sx={{ 
                            mb: 4, 
                            fontWeight: 300, 
                            color: 'rgba(255,255,255,0.7)', 
                            fontSize: { xs: '0.9rem', md: '1.1rem' } 
                        }}>
                            IT CAMPUS | STUDENT – FACULTY PERFORMANCE EVALUATION
                            <Box component="span" sx={{ 
                                display: 'block', 
                                fontSize: { xs: '0.75rem', md: '0.85rem' }, 
                                mt: 1, 
                                letterSpacing: 1, 
                                opacity: 0.6 
                            }}>
                                A.Y. 2025- 2026 (2nd SEMESTER, Midterm)
                            </Box>
                        </Typography>

                        <Button 
                            variant="outlined" 
                            fullWidth={false} // Prevents button from stretching 100% on mobile
                            onClick={handleOpen}
                            sx={{ 
                                color: '#fff', 
                                borderColor: 'rgba(255,255,255,0.5)', 
                                px: { xs: 4, md: 5 }, 
                                py: 1.2, 
                                borderRadius: '4px', 
                                fontSize: '0.9rem',
                                borderWidth: 1.5,
                                '&:hover': { 
                                    bgcolor: '#fff', 
                                    color: '#0f172a',
                                    borderColor: '#fff'
                                }
                            }}
                        >
                            GET STARTED
                        </Button>
                    </Box>
                </Stack>
            </Container>


             {/* REMINDER DIALOG */}
            <Dialog 
                open={open} 
                onClose={handleClose} 
                fullWidth
                maxWidth="xs"
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(2, 6, 23, 0.7)', // Matches a deep navy
                        }
                    }
                }}
                PaperProps={{ 
                    sx: { 
                        bgcolor: '#1e293b', // Match your Card colors from the Eval page
                        color: '#fff', 
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.1)', // Subtle border
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    } 
                }}
            >
                <DialogTitle sx={{ 
                    fontWeight: 800, 
                    fontSize: { xs: '1.3rem', md: '1.5rem' },
                    pb: 1 
                }}>
                    Reminder:
                </DialogTitle>

                <DialogContent>
                    <Typography variant="body1" sx={{ 
                        mb: 2, 
                        opacity: 0.9,
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        lineHeight: 1.5
                    }}>
                        This Online Evaluation aims to obtain feedback from you to assess our faculty members based on the given indicators.
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.light',
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        bgcolor: 'rgba(37, 99, 235, 0.1)',
                        p: 1.5,
                        borderRadius: '8px',
                        borderLeft: '4px solid'
                    }}>
                        Note: 5 is the highest grade and 1 is the lowest.
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ 
                    p: { xs: 2, md: 3 }, 
                    // Forced to 'row' so they stay side-by-side on all screen sizes
                    flexDirection: 'row', 
                    justifyContent: 'flex-end',
                    gap: 1
                }}>
                    <Button 
                        onClick={handleClose} 
                        // Removed fullWidth so they don't stack
                        sx={{ 
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: { xs: '0.8rem', md: '0.9rem' } 
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleConfirm} 
                        variant="contained" 
                        // Removed fullWidth and adjusted padding for mobile fit
                        sx={{ 
                            px: { xs: 2, md: 4 }, 
                            py: { xs: 1, md: 1 },
                            fontWeight: 700,
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                            whiteSpace: 'nowrap' // Prevents "I Understand" from splitting into two lines
                        }}
                    >
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}