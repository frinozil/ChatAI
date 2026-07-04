import { createTheme, ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { getComponentOverrides } from './componentOverrides';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: mode === 'light' ? lightPalette : darkPalette,
  shape: {
    borderRadius: 12,
  },
  typography,
  shadows: [
    'none',
    mode === 'light'
      ? '0px 1px 2px rgba(0, 0, 0, 0.05)'
      : '0px 1px 2px rgba(0, 0, 0, 0.3)',
    mode === 'light'
      ? '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)'
      : '0px 4px 6px -1px rgba(0, 0, 0, 0.3), 0px 2px 4px -1px rgba(0, 0, 0, 0.2)',
    mode === 'light'
      ? '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.03)'
      : '0px 10px 15px -3px rgba(0, 0, 0, 0.3), 0px 4px 6px -2px rgba(0, 0, 0, 0.2)',
    ...Array(21).fill('none'),
  ] as ThemeOptions['shadows'],
  components: getComponentOverrides(mode),
});

export const getTheme = (mode: 'light' | 'dark') => createTheme(getThemeOptions(mode));
