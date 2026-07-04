'use client';

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppState } from '@/context/AppContext';

export const NotificationListener: React.FC = () => {
  const { notification, hideNotification } = useAppState();

  if (!notification) return null;

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={4000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={hideNotification}
        severity={notification.severity}
        variant="filled"
        sx={{
          width: '100%',
          borderRadius: '8px',
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationListener;
