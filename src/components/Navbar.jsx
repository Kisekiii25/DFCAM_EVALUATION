import { useState } from 'react';
import schoolLogo from '../assets/DFCAM-logo.webp';
import { 
    AppBar, Toolbar, Typography, Box, Container, useTheme,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function Navbar({ settings }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: 'rgba(22, 35, 66, 0.8)', 
                    backdropFilter: 'blur(10px)',
                    borderBottom: `1px solid ${theme.palette.primary.main}4D`, 
                    boxShadow: 'none',
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                        {/* LOGO & TITLE SECTION*/}
                        <Box
                            onClick={handleOpen}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer', 
                                gap: 2,
                                '&:hover': { opacity: 0.8 }
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

            {/* POP-UP MESSAGE */}
            <Dialog 
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        bgcolor: '#1e293b', // Matches your dark theme
                        color: 'white',
                        borderRadius: '16px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold' }}>
                    <InfoOutlinedIcon color="primary" /> System Information
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        You are currently in the <strong>Faculty Evaluation System</strong>. 
                        Please ensure you complete your feedback before leaving this page to make sure your voice is heard. 
                        <br /><br />
                        <em>"Quality education through continuous faculty development."</em>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={handleClose} 
                        variant="contained" 
                        fullWidth 
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 'bold' }}
                    >
                        Understood
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}