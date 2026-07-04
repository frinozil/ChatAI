import { Components, Theme } from '@mui/material/styles';

export const getComponentOverrides = (mode: 'light' | 'dark'): Components<Omit<Theme, 'components'>> => ({
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: '12px',
        fontWeight: 500,
        textTransform: 'none',
        boxShadow: 'none',
        transition: 'all 150ms ease-in-out',
        '&:hover': {
          boxShadow: 'none',
        },
        '&.MuiButton-containedPrimary:hover': {
          backgroundColor: mode === 'light' ? '#1D4ED8' : '#3B82F6',
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        backgroundImage: 'none',
        border: '1px solid',
        borderColor: mode === 'light' ? '#E5E7EB' : '#334155',
        transition: 'all 150ms ease-in-out',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        backgroundImage: 'none',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'small',
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: '12px',
        transition: 'all 150ms ease-in-out',
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: '1px',
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: 'all 150ms ease-in-out',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        transition: 'all 150ms ease-in-out',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: '10px',
        transition: 'all 150ms ease-in-out',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
        border: 'none',
        boxShadow: 'none',
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        boxShadow: 'none',
      },
    },
  },
});
