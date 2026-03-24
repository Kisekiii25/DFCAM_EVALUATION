import { createTheme } from '@mui/material/styles';

export const dfcamTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#0038a8', // DFCAM Official Blue
            light: '#80D8FF', 
            contrastText: '#ffffff',
        },
        background: {
            default: '#0f172a', // Deep Navy (Tailwind Slate-900 style)
            paper: '#1e293b',   // Lighter Navy for Cards/Papers
        },
        text: {
            primary: '#ffffff',
            secondary: '#9ca3af',
        },
    },

    // --- TYPOGRAPHY SECTION ---
    // Sets default fonts and weights for the whole app
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 800,
            letterSpacing: '-0.5px',
        },
        subtitle1: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none', // Removes the default ALL CAPS on buttons
            fontWeight: 700,
        },
    },

    // --- SHAPE & BORDERS ---
    shape: {
        borderRadius: 12, 
    },

    // --- COMPONENT OVERRIDES ---
    // This applies styles to ALL components of this type automatically
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    padding: '8px 20px',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none', // Removes the default MUI grey overlay on dark mode papers
                },
            },
        },
    },
});