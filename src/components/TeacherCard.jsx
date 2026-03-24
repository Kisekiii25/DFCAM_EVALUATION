import { Paper, Box, Typography, Button, Avatar, Tooltip } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function TeacherCard({ name, subject, image, formLink }) {
    return (
    <Paper 
        elevation={0} 
        sx={{ 
            display: 'flex', 
            //  STACK vertically on mobile, ROW on desktop
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'stretch', sm: 'center' }, 
            justifyContent: 'space-between', 
            p: 2, 
            width: '100%', 
            boxSizing: 'border-box',
            borderRadius: '12px',
            bgcolor: '#1e293b', 
            border: '1px solid rgba(255, 255, 255, 0.1)',
            gap: { xs: 2, sm: 0 } // Add gap between text and button on mobile
        }}
    >
        {/* Left/Top Side: Avatar and Name Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, }}>
            <Avatar 
                src={image} 
                sx={{ width: 50, height: 50, mr: 2, bgcolor: 'primary.main', color: '#fff'}}
            >
                {name ? name.charAt(0) : "U"}
            </Avatar>
            
            <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 700, 
                            whiteSpace: { xs: 'normal', sm: 'nowrap' }, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            color: '#fff'
                        }}
                    >
                        {name || "Instructor Name"}
                    </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {subject || "General Instruction"}
                </Typography>
            </Box>
        </Box>

        {/* Right/Bottom Side: Full Width Button on Mobile */}
        <Button 
            variant="contained" 
            target="_blank"             
            rel="noopener noreferrer"
            href={formLink}
            startIcon={<RateReviewIcon />} 
            sx={{ 
                ml: { xs: 0, sm: 2 }, 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                py: { xs: 1.2, sm: 1 } 
            }}
        >
            Evaluate
        </Button>
    </Paper>
    );
}