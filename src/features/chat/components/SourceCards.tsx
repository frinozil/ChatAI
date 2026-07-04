'use client';

import React from 'react';
import { Box, CardContent, Grid, Typography } from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { Source } from '@/types/chat';
import AppCard from '@/components/ui/AppCard';

interface SourceCardsProps {
  sources: Source[];
}

export const SourceCards: React.FC<SourceCardsProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <Box sx={{ mt: 1.5, mb: 1, width: '100%' }}>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mb: 1,
          textTransform: 'uppercase',
          fontSize: '11px',
          fontWeight: 600,
          color: 'text.secondary',
          letterSpacing: '0.5px',
        }}
      >
        Sources ({sources.length})
      </Typography>
      <Grid container spacing={1.5}>
        {sources.map((source, index) => {
          const confidencePercentage = Math.round(source.confidence * 100);
          
          let color: string = 'primary.main';
          if (confidencePercentage >= 90) {
            color = 'success.main';
          } else if (confidencePercentage >= 75) {
            color = 'warning.main';
          }

          return (
            <Grid size={{ xs: 12, sm: 6 }} key={`${source.documentId}-${index}`}>
              <AppCard hoverable>
                <CardContent sx={{ p: '12px !important', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <DescriptionRoundedIcon sx={{ fontSize: 18, color: 'text.secondary', flexShrink: 0 }} />
                  <Box className="flex-1" sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: 'text.primary', fontWeight: 500, fontSize: '13px' }}
                    >
                      {source.filename}
                    </Typography>
                    <Box className="flex-center" sx={{ justifyContent: 'flex-start', gap: 1, mt: 0.25 }}>
                      {source.page && (
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '11px' }}>
                          Page {source.page}
                        </Typography>
                      )}
                      {source.page && (
                        <Box sx={{ width: 3, height: 3, borderRadius: '50%', bgcolor: 'text.disabled' }} />
                      )}
                      <Typography
                        variant="caption"
                        sx={{ color: color, fontSize: '11px', fontWeight: 600 }}
                      >
                        {confidencePercentage}% Match
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </AppCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SourceCards;
