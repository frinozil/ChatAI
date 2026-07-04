import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { SxProps, Theme } from '@mui/material/styles';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  startIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  startIcon = <SearchRoundedIcon sx={{ color: 'text.disabled', fontSize: 18 }} />,
  sx = {},
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={[
        {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: 'action.hover',
            '& fieldset': { border: 'none' },
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">{startIcon}</InputAdornment>
          ) : undefined,
        },
      }}
    />
  );
};

export default SearchInput;
