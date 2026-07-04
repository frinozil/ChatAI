import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { pageContainerStyles } from '@/styles/commonStyles';

export const PageContainer: React.FC<BoxProps> = ({ children, sx = {}, ...rest }) => {
  return (
    <Box
      sx={[
        ...(Array.isArray(pageContainerStyles) ? pageContainerStyles : [pageContainerStyles]),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default PageContainer;
