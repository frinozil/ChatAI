import { Box, Divider, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import AppCard from './AppCard';

interface SectionCardProps {
  title?: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  headerAction,
  children,
  sx = {},
}) => {
  return (
    <AppCard sx={sx}>
      {(title || headerAction) && (
        <>
          <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {title && (
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            {headerAction}
          </Box>
          <Divider />
        </>
      )}
      <Box sx={{ p: 2.5 }}>{children}</Box>
    </AppCard>
  );
};

export default SectionCard;
