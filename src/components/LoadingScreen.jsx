import { dfcamTheme } from '../theme';

import { Box, Typography, CircularProgress, ThemeProvider } from '@mui/material';


const loadingQuotes = [
    "Education is the most powerful weapon to change the world.",
    "The influence of a great teacher can never be erased.",
    "Quality is not an act, it is a habit.",
    "Strive for excellence in every evaluation.",
    "Your feedback today builds a better classroom tomorrow.",
    "Honest evaluation is the first step toward excellence.",
    "Self-doubt kills talent.",
    "Growth starts exactly where your comfort zone ends.",
    "The best project you will ever work on is YOU."
];

const LoadingScreen = () => {
    const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];

    return (
        <ThemeProvider theme={dfcamTheme}>
            <Box 
                sx={{
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: 'calc(100vh - 130px)', 
                    bgcolor: '#0f172a', 
                    textAlign: 'center', 
                    p: 3 
                }}>

                    <CircularProgress size={60} thickness={4} sx={{ color: 'primary.light' }} />
                    <Typography variant="h6" sx={{ mt: 4, color: 'primary.light', fontStyle: 'italic', maxWidth: '500px' }}>
                        "{randomQuote}"
                    </Typography>
                    <Typography variant="caption" sx={{ mt: 2, color: 'text.secondary', letterSpacing: 2 }}>
                        CONNECTING TO DFCAMCLP DATA
                    </Typography>
            </Box>
        </ThemeProvider>
    );
};

export default LoadingScreen;