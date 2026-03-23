import { Paper, Box, Typography, Button, Avatar, Tooltip } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function TeacherCard({ name, subject, image, formLink }) {
    return (
    <Paper 
        elevation={0} 
        sx={{ 
            display: 'flex', 
            // 1. STACK vertically on mobile, ROW on desktop
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
                <Tooltip title={name} arrow placement="top" enterTouchDelay={0}>
                    <Typography 
                        variant="subtitle1" 
                        sx={{ 
                            fontWeight: 700, 
                            // On mobile, we can let the name wrap or stay ellipsis
                            whiteSpace: { xs: 'normal', sm: 'nowrap' }, 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis',
                            color: '#fff'
                        }}
                    >
                        {name || "Instructor Name"}
                    </Typography>
                </Tooltip>
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
                // 2. Remove left margin on mobile, add it back on desktop
                ml: { xs: 0, sm: 2 }, 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold',
                // 3. Make button full width on mobile
                width: { xs: '100%', sm: 'auto' },
                py: { xs: 1.2, sm: 1 } 
            }}
        >
            Evaluate
        </Button>
    </Paper>
    );
}