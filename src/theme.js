import { createTheme } from '@mui/material/styles';

export const dfcamTheme = createTheme({
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
        shape: {
            borderRadius: 12, 
        },
    },
});