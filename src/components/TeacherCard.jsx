import { Paper, Box, Typography, Button, Avatar, Tooltip } from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function TeacherCard({ name, subject, image, formLink }) {
    return (
        <Paper 
            elevation={0} 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                p: 2, 
                width: '100%', 
                boxSizing: 'border-box',
                borderRadius: '12px',
                bgcolor: '#1e293b', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: '0.2s',
                '&:hover': {
                    borderColor: 'primary.light',
                    bgcolor: '#2d3748',
                    transform: 'translateX(5px)'
                }
            }}
        >
            {/* Left Side: Avatar and Name Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, flex: 1 }}>
                <Avatar 
                    src={image} 
                    sx={{ width: 50, height: 50, mr: 2, bgcolor: 'primary.main' }}
                >
                    {name ? name.charAt(0) : "U"}
                </Avatar>
                
                <Box sx={{ minWidth: 0 }}>
                    {/* TOOLTIP ADDED HERE */}
                    <Tooltip 
                        title={name || "Instructor Name"} 
                        arrow 
                        placement="top"
                        enterTouchDelay={0} 
                    >
                        <Typography 
                            variant="subtitle1" 
                            sx={{ 
                                fontWeight: 700, 
                                whiteSpace: 'nowrap', 
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis',
                                cursor: 'help' // Change cursor to a question/help icon
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

            {/* Right Side: Button */}
            <Button 
                variant="contained" 
                target="_blank"             
                rel="noopener noreferrer"
                href={formLink}
                startIcon={<RateReviewIcon />}
                sx={{ 
                    ml: 2, 
                    borderRadius: '8px', 
                    textTransform: 'none', 
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap'
                }}
            >
                Evaluate
            </Button>
        </Paper>
    );
}