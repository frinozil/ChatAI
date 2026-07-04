'use client';

import React from 'react';
import { Box } from '@mui/material';

export const TypingIndicator: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, py: 1, px: 0.5 }}>
      <Box className="dot" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />
      <Box className="dot" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />
      <Box className="dot" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'text.disabled' }} />

      <style jsx global>{`
        .dot {
          animation: wave 1.2s infinite ease-in-out;
        }
        .dot:nth-of-type(1) {
          animation-delay: -0.32s;
        }
        .dot:nth-of-type(2) {
          animation-delay: -0.16s;
        }
        @keyframes wave {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default TypingIndicator;
