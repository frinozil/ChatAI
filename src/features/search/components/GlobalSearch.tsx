'use client';

import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useSearch } from '@/hooks/useSearch';
import { useAppState } from '@/context/AppContext';

interface SearchOption {
  id: string;
  label: string;
  type: 'chat' | 'document';
}

export const GlobalSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { results, isLoading } = useSearch(inputValue);
  const { setActiveConversationId, showNotification, setIsMobileDocOpen, setIsSidebarOpen } = useAppState();

  // Map results into search options
  const options: SearchOption[] = [
    ...results.conversations.map((c) => ({
      id: c.id,
      label: c.title,
      type: 'chat' as const,
    })),
    ...results.documents.map((d) => ({
      id: d.id,
      label: d.name,
      type: 'document' as const,
    })),
  ];

  const handleSelect = (event: React.SyntheticEvent, option: SearchOption | null) => {
    if (!option) return;

    if (option.type === 'chat') {
      setActiveConversationId(option.id);
      showNotification(`Switched to conversation: "${option.label}"`, 'success');
      setIsSidebarOpen(false);
    } else {
      // Document clicked
      showNotification(`Found document: "${option.label}"`, 'success');
      // Highlight/open the doc panel if needed
      setIsMobileDocOpen(true);
    }
    setInputValue('');
  };

  return (
    <Autocomplete
      value={null}
      onChange={handleSelect}
      inputValue={inputValue}
      onInputChange={(e, newValues) => setInputValue(newValues)}
      options={options}
      loading={isLoading}
      groupBy={(option) => option.type}
      getOptionLabel={(option) => option.label}
      noOptionsText={inputValue ? 'No results found' : 'Type to search...'}
      sx={{
        width: { xs: '180px', sm: '260px', md: '360px' },
        transition: 'width 0.2s',
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px',
          bgcolor: 'action.hover',
          pr: '8px !important',
          '& fieldset': { border: 'none' },
          '&:hover fieldset': { border: 'none' },
          '&.Mui-focused fieldset': { border: 'none' },
        },
      }}
      slotProps={{
        paper: {
          elevation: 4,
          sx: {
            mt: 1,
            borderRadius: '12px',
            border: '1px solid',
            borderColor: 'divider',
            '& .MuiAutocomplete-groupLabel': {
              textTransform: 'uppercase',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              color: 'text.disabled',
              bgcolor: 'background.default',
              py: 0.75,
              px: 2,
            },
          },
        },
      }}
      renderOption={(props, option) => {
        const { key, ...rest } = props as React.HTMLAttributes<HTMLLIElement> & {
          key: React.Key;
        };
        return (
          <Box
            key={key}
            component="li"
            {...rest}
            sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}
          >
            {option.type === 'chat' ? (
              <ChatRoundedIcon sx={{ mr: 1.5, color: 'primary.main', fontSize: 20 }} />
            ) : (
              <DescriptionRoundedIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: 20 }} />
            )}
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {option.label}
            </Typography>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search documents and chats..."
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps?.input,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.disabled', fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
        />
      )}
    />
  );
};

export default GlobalSearch;
