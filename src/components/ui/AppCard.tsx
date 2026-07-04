import React from 'react';
import { Card, CardProps } from '@mui/material';
import { cardHoverStyles } from '@/styles/commonStyles';

interface AppCardProps extends CardProps {
  hoverable?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  hoverable = false,
  sx = {},
  variant = 'outlined',
  ...rest
}) => {
  return (
    <Card
      variant={variant}
      sx={[
        ...(hoverable ? [cardHoverStyles(2)] : []),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    >
      {children}
    </Card>
  );
};

export default AppCard;
