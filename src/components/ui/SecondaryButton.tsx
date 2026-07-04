import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface SecondaryButtonProps extends ButtonProps {
  loading?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  variant = 'outlined',
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant={variant}
      color="inherit"
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      sx={[
        {
          py: 1,
          px: 2,
          borderRadius: '12px',
          fontWeight: 500,
          boxShadow: 'none',
          borderColor: 'divider',
          '&:hover': {
            boxShadow: 'none',
            borderColor: 'text.secondary',
            bgcolor: 'action.hover',
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
