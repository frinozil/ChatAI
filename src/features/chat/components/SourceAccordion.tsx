'use client';

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleIcon from '@mui/icons-material/Article';
import { Source } from '@/types/chat';

interface SourceAccordionProps {
  sources: Source[];
}

export const SourceAccordion: React.FC<SourceAccordionProps> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <Accordion
      variant="outlined"
      elevation={0}
      sx={{
        mt: 2,
        borderRadius: '8px !important',
        borderColor: 'divider',
        bgcolor: 'background.default',
        '&::before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ fontSize: 18 }} />}
        aria-controls="sources-content"
        id="sources-header"
        sx={{
          minHeight: '40px !important',
          '& .MuiAccordionSummary-content': { my: '8px !important' },
          px: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ArticleIcon sx={{ fontSize: 16, color: 'primary.main' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Sources ({sources.length})
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, borderTop: '1px solid', borderColor: 'divider' }}>
        <List disablePadding>
          {sources.map((source, index) => {
            const confidencePercentage = Math.round(source.confidence * 100);
            
            // Determine badge color based on confidence score
            let color: 'success' | 'warning' | 'primary' = 'primary';
            if (confidencePercentage >= 90) {
              color = 'success';
            } else if (confidencePercentage >= 75) {
              color = 'warning';
            }

            return (
              <ListItem
                key={`${source.documentId}-${index}`}
                sx={{
                  px: 2,
                  py: 1,
                  borderBottom: index < sources.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                  <ArticleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      noWrap
                      sx={{ color: 'text.primary', fontWeight: 500 }}
                    >
                      {source.filename}
                    </Typography>
                    {source.page && (
                      <Typography variant="caption" color="text.secondary">
                        Page {source.page}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Chip
                  size="small"
                  label={`Confidence ${confidencePercentage}%`}
                  color={color}
                  variant="outlined"
                  sx={{
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '11px',
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default SourceAccordion;
