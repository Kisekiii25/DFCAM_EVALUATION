import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import schoolLogo from '../assets/DFCAMlogo.png';

export default function Navbar() {
    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                bgcolor: 'rgba(15, 23, 42, 0.8)', // Semi-transparent dark
                backdropFilter: 'blur(10px)',     // The "Glass" effect
                borderBottom: '1px solid rgba(37, 99, 235, 0.3)', // Subtle blue glow
                boxShadow: 'none'
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    {/* LOGO & TITLE SECTION */}
                    <Box 
                        component={Link} 
                        to="/" 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            textDecoration: 'none', 
                            gap: 2 
                        }}
                    >
                        <Box 
                            component="img" 
                            src={schoolLogo} 
                            sx={{ 
                                width: 45, 
                                height: 45, 
                                borderRadius: '50%', 
                                bgcolor: '#fff', 
                                p: 0.2 
                            }} 
                        />
                        <Box>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#fff', 
                                    fontWeight: 800, 
                                    lineHeight: 1.1,
                                    fontSize: { xs: '0.9rem', md: '1.1rem' }
                                }}
                            >
                                DFCAMCLP
                            </Typography>
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: 'primary.light', 
                                    display: { xs: 'none', md: 'block' },
                                    fontWeight: 600
                                }}
                            >
                                Faculty Evaluation
                            </Typography>
                        </Box>
                    </Box>

                    {/* OPTIONAL: Nav Links or User Greeting */}
                    <Typography 
                        variant="body2" 
                        sx={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}
                    >
                        A.Y. 2025-2026
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}