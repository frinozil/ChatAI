import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  loading = false,
  disabled = false,
  startIcon,
  sx = {},
  ...rest
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      disabled={disabled || loading}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
      sx={[
        {
          py: 1.2,
          px: 2.5,
          borderRadius: '12px',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
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

export default PrimaryButton;
