import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

// Custom SVG Icons for maximum compatibility and zero build errors
const PlacementIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
);
const ResultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
const EventIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);

interface NotificationProps {
  id: string;
  type: 'Placement' | 'Result' | 'Event';
  message: string;
  timestamp: string;
  isViewed: boolean;
  onView: (id: string) => void;
}

const NotificationCard: React.FC<NotificationProps> = ({
  id,
  type,
  message,
  timestamp,
  isViewed,
  onView,
}) => {
  const getMetaData = (type: string) => {
    switch (type) {
      case 'Placement': 
        return { color: '#1A73E8', bg: '#E8F0FE', icon: <PlacementIcon /> };
      case 'Result': 
        return { color: '#006B3F', bg: '#E6F4EA', icon: <ResultIcon /> };
      case 'Event': 
        return { color: '#5F6368', bg: '#F1F3F4', icon: <EventIcon /> };
      default: 
        return { color: '#5F6368', bg: '#F1F3F4', icon: <EventIcon /> };
    }
  };

  const meta = getMetaData(type);

  return (
    <Card 
      onClick={() => onView(id)}
      sx={{ 
        mb: 2, 
        cursor: 'pointer',
        position: 'relative',
        borderLeft: isViewed ? '1px solid #E8EAED' : `6px solid ${meta.color}`,
        backgroundColor: isViewed ? '#FFFFFF' : meta.bg,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateX(8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          '& .arrow-icon': { opacity: 1, transform: 'translateX(0)' }
        }
      }}
    >
      <CardContent sx={{ py: '16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '10px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'white',
              color: meta.color,
              mr: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            {meta.icon}
          </Box>
          
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: meta.color, 
                  fontWeight: 800, 
                  letterSpacing: '0.1em',
                  lineHeight: 1
                }}
              >
                {type.toUpperCase()}
              </Typography>
              {!isViewed && (
                <Chip 
                  label="NEW" 
                  size="small" 
                  sx={{ 
                    height: 20, 
                    fontSize: '0.65rem', 
                    fontWeight: 900, 
                    bgcolor: meta.color, 
                    color: 'white' 
                  }} 
                />
              )}
            </Box>
            
            <Typography variant="body1" sx={{ fontWeight: isViewed ? 500 : 700, color: 'text.primary' }}>
              {message}
            </Typography>
            
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}>
              {new Date(timestamp).toLocaleDateString('en-IN', { 
                day: 'numeric', 
                month: 'short', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Typography>
          </Box>

          <Box className="arrow-icon" sx={{ color: 'divider', opacity: 0, transform: 'translateX(-10px)', transition: '0.3s' }}>
            <ArrowIcon />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
