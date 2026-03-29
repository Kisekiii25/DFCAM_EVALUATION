    import { createTheme } from '@mui/material/styles';

    export const dfcamTheme = createTheme({
        palette: {
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
        // Sets default fonts and weights for the whole websit
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
                        backgroundImage: 'none'
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        // border color
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#ffffff',
                        },
                        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.3)', // Faint white border
                        },
                        '&.Mui-focused:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#0038a8',
                        },  
                        color: '#ffffff',
                    },
                },
            },
            
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        // This makes the "Course", "Year", labels WHITE
                        color: 'rgba(255, 255, 255, 0.7)',
                        '&.Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.3)',
                        },
                    },
                },
            },
            MuiSelect: {
                styleOverrides: {
                    icon: {
                        // arrow
                        color: '#ffffff',
                        '&.Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.2)',
                        },
                    },
                },
            },
            MuiAlert: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'transparent', 
                        color: '#B8E7FB', 
                        borderColor: '#4dc4f7',
                        borderRadius: '8px',
                    },
                },
            },
        },
    });