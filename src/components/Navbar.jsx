import { Link } from 'react-router-dom';
import schoolLogo from '../assets/DFCAM-logo.webp';

import { AppBar, Toolbar, Typography, Box, Container, useTheme } from '@mui/material';


export default function Navbar({ settings }) {
    const theme = useTheme();

    return (
        <AppBar
            position="sticky"
            sx={{
                // Using theme palette for consistency
                bgcolor: 'rgba(22, 35, 66, 0.8)', 
                backdropFilter: 'blur(10px)',
                borderBottom: `1px solid ${theme.palette.primary.main}4D`, // 4D = 30% opacity in hex
                boxShadow: 'none',
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
                            gap: 2,
                            '&:hover': { opacity: 0.9 }
                        }}
                    >
                        <Box
                            component="img"
                            src={schoolLogo}
                            alt="DFCAM Logo"
                            sx={{
                                width: 45,
                                height: 45,
                                borderRadius: '50%',
                                bgcolor: 'common.white',
                                p: 0.2
                            }}
                        />
                        <Box>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'common.white',
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

                    {/* ACADEMIC YEAR SECTION */}
                    <Typography
                        variant="body2"
                        sx={{ 
                            color: 'rgba(255, 255, 255, 0.6)', 
                            fontStyle: 'italic',
                            fontWeight: 500
                        }}
                    >
                        A.Y. {settings?.academicYear || '----'}
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}