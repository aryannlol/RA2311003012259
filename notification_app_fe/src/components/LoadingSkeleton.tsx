import React from 'react';
import { Box, Skeleton, Card, CardContent } from '@mui/material';

const LoadingSkeleton = () => {
  return (
    <Box>
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} sx={{ mb: 2, borderLeft: '1px solid #E8EAED' }}>
          <CardContent sx={{ py: '16px !important' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="rounded" width={40} height={40} sx={{ mr: 2, borderRadius: '10px' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Skeleton variant="text" width="20%" height={20} />
                  <Skeleton variant="rounded" width={40} height={20} />
                </Box>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="40%" height={16} sx={{ mt: 1 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
