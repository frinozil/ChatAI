'use client';

import React from 'react';
import { Box, Typography, CardContent, Grid } from '@mui/material';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import PrimaryButton from '@/components/ui/PrimaryButton';
import AppCard from '@/components/ui/AppCard';

interface EmptyStateProps {
  onSelectPrompt: (promptText: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onSelectPrompt }) => {
  const samplePrompts = [
    {
      title: 'Vacation & PTO Policy',
      desc: '“What is our annual vacation policy?”',
      icon: <LibraryBooksRoundedIcon color="primary" sx={{ fontSize: 24 }} />,
      prompt: 'What is our annual vacation policy?',
    },
    {
      title: 'Security Rotation',
      desc: '“How often do database secrets roll over?”',
      icon: <SecurityRoundedIcon sx={{ fontSize: 24, color: '#f59e0b' }} />,
      prompt: 'How often do we rotate database passwords?',
    },
    {
      title: 'Internal API Auth',
      desc: '“Format for token headers in microservices?”',
      icon: <CodeRoundedIcon sx={{ fontSize: 24, color: '#10b981' }} />,
      prompt: 'What headers are required for internal API authentication?',
    },
    {
      title: 'Sales Compensation',
      desc: '“When are sales commissions paid out?”',
      icon: <HelpRoundedIcon sx={{ fontSize: 24, color: '#ec4899' }} />,
      prompt: 'What is the payment schedule for sales commissions?',
    },
  ];

  const handleUploadClick = () => {
    document.getElementById('upload-zone-file-input')?.click();
  };

  return (
    <Box
      className="flex-center flex-column"
      sx={{
        height: '100%',
        px: 3,
        py: 6,
        textAlign: 'center',
      }}
    >
      {/* Central Illustration / Big Icon */}
      <Box
        className="flex-center"
        sx={{
          mb: 3,
          width: 80,
          height: 80,
          borderRadius: '50%',
          bgcolor: 'action.hover',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <LibraryBooksRoundedIcon sx={{ fontSize: 40, color: 'primary.main' }} />
      </Box>

      <Typography variant="h1" sx={{ color: 'text.primary', fontWeight: 500, mb: 1, fontSize: '32px', letterSpacing: '-0.5px' }}>
        Welcome to chatAI
      </Typography>
      
      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: 540, color: 'text.secondary', lineHeight: 1.6 }}
      >
        Upload your documents and start asking intelligent questions powered by AI.
      </Typography>

      <PrimaryButton
        onClick={handleUploadClick}
        startIcon={<CloudUploadRoundedIcon />}
        sx={{ mb: 6, px: 3.5 }}
      >
        Upload Document
      </PrimaryButton>

      {/* Starter Prompts Grid */}
      <Box sx={{ width: '100%', maxWidth: 760 }}>
        <Typography
          variant="caption"
          sx={{
            mb: 2,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontWeight: 700,
            color: 'text.disabled',
          }}
        >
          Suggested Starter Prompts
        </Typography>

        <Grid container spacing={2}>
          {samplePrompts.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <AppCard
                hoverable
                onClick={() => onSelectPrompt(item.prompt)}
                sx={{
                  height: '100%',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                  <Box
                    className="flex-center"
                    sx={{
                      p: 1,
                      borderRadius: '8px',
                      bgcolor: 'background.default',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                      {item.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </AppCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default EmptyState;
