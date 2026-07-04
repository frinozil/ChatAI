import React from 'react';
import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  badgeCount?: number;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon,
  badgeCount,
  action,
  sx = {},
}) => {
  return (
    <Box
      sx={[
        {
          px: 2.5,
          py: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon}
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '-0.2px',
          }}
        >
          {title}
        </Typography>
        {badgeCount !== undefined && (
          <Box
            sx={{
              px: 1,
              py: 0.25,
              borderRadius: '10px',
              fontSize: '11px',
              fontWeight: 500,
              bgcolor: 'action.hover',
              color: 'text.secondary',
            }}
          >
            {badgeCount}
          </Box>
        )}
      </Box>
      {action}
    </Box>
  );
};

export default SectionHeader;
