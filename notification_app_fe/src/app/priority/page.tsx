'use client';

import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  AppBar, 
  Toolbar, 
  Tabs, 
  Tab,
  Alert,
  AlertTitle
} from '@mui/material';
import NotificationCard from '@/components/NotificationCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { fetchPriorityFeed } from '@/services/priorityService';
import { Notification } from '@/services/notificationService';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom SVG Icons
const NotificationsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
);

export default function PriorityInboxPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('viewed_notifications');
    if (saved) {
      setViewedIds(new Set(JSON.parse(saved)));
    }

    const loadData = async () => {
      const data = await fetchPriorityFeed(15);
      setNotifications(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleMarkAsViewed = (id: string) => {
    const newViewed = new Set(viewedIds);
    newViewed.add(id);
    setViewedIds(newViewed);
    localStorage.setItem('viewed_notifications', JSON.stringify(Array.from(newViewed)));
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #E8EAED' }}>
        <Toolbar>
          <Box sx={{ color: 'primary.main', mr: 2, display: 'flex' }}>
            <NotificationsIcon />
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary', fontWeight: 700 }}>
            Campus Connect
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={pathname === '/priority' ? 1 : 0}>
              <Tab label="All Updates" component={Link} href="/" />
              <Tab label="Priority Inbox" component={Link} href="/priority" icon={<StarIcon />} iconPosition="start" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ color: '#F9AB00', mr: 1, display: 'flex' }}>
              <StarIcon />
            </Box>
            <Typography variant="h4" color="text.primary">
              Priority Inbox
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Displaying critical Placement and Result updates first.
          </Typography>
        </Box>

        <Alert 
          severity="info" 
          icon={<InfoIcon />}
          sx={{ mb: 4, borderRadius: 3, bgcolor: '#E8F0FE', color: '#174EA6' }}
        >
          <AlertTitle sx={{ fontWeight: 700 }}>Smart Sorting Active</AlertTitle>
          Notifications are prioritized by <strong>Institutional Weight</strong> (Placement &gt; Result &gt; Event) and <strong>Recency</strong>.
        </Alert>

        {loading ? (
          <LoadingSkeleton />
        ) : notifications.length > 0 ? (
          notifications.map((n) => (
            <NotificationCard
              key={n.ID}
              id={n.ID}
              type={n.Type}
              message={n.Message}
              timestamp={n.Timestamp}
              isViewed={viewedIds.has(n.ID)}
              onView={handleMarkAsViewed}
            />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="body1" color="text.secondary">
              No priority alerts at this time.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
