import { SxProps, Theme } from '@mui/material/styles';

export const flexBetween: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const flexCenter: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const centeredColumn: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export const cardHoverStyles = (elevationVal: number = 2): SxProps<Theme> => ({
  transition: 'all 150ms ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: 'primary.main',
    boxShadow: (theme) => theme.shadows[elevationVal],
    transform: 'translateY(-1px)',
  },
});

export const transitionStyles: SxProps<Theme> = {
  transition: 'all 150ms ease-in-out',
};

export const chatBubbleStyles = (isUser: boolean): SxProps<Theme> => ({
  p: 2,
  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  bgcolor: isUser ? 'primary.main' : 'background.paper',
  color: isUser ? 'primary.contrastText' : 'text.primary',
  boxShadow: isUser ? 'none' : (theme) => theme.shadows[1],
  border: isUser ? 'none' : '1px solid',
  borderColor: 'divider',
  transition: 'all 150ms ease-in-out',
  position: 'relative',
});

export const pageContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  bgcolor: 'background.default',
};
