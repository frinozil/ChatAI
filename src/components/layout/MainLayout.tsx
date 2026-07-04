'use client';

import React from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import { useAppState } from '@/context/AppContext';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode; // Center Area (Chat viewport)
  documentPanel: React.ReactNode; // Right Sidebar (Document panel)
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, documentPanel }) => {
  const theme = useTheme();

  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const {
    isDocPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDocOpen,
    setIsMobileDocOpen,
  } = useAppState();

  return (
    <Box className="full-height-layout" sx={{ bgcolor: 'background.default' }}>
      {/* Header */}
      <AppHeader />

      {/* Main Container */}
      <Box className="flex-layout-row" sx={{ position: 'relative' }}>
        {/* Left Column: Sidebar (Desktop/Tablet) */}
        <Box
          component="aside"
          sx={{
            display: { xs: 'none', md: isSidebarOpen ? 'block' : 'none' },
            width: '280px',
            flexShrink: 0,
            height: '100%',
          }}
        >
          <Sidebar />
        </Box>

        {/* Left Drawer: Sidebar (Mobile) */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: '280px',
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
            },
          }}
        >
          <Sidebar />
        </Drawer>

        {/* Center Column: Chat Viewport */}
        <Box
          component="main"
          className="flex-column flex-1"
          sx={{
            height: '100%',
            overflow: 'hidden',
          }}
        >
          {children}
        </Box>

        {/* Right Column: Document Panel (Desktop) */}
        <Box
          component="aside"
          sx={{
            display: {
              xs: 'none',
              lg: isDocPanelOpen ? 'block' : 'none',
            },
            width: '340px',
            flexShrink: 0,
            height: '100%',
            borderLeft: '1px solid',
            borderColor: 'divider',
          }}
        >
          {documentPanel}
        </Box>

        {/* Right Drawer: Document Panel (Tablet/Mobile) */}
        <Drawer
          anchor="right"
          open={isTabletOrMobile && isMobileDocOpen}
          onClose={() => setIsMobileDocOpen(false)}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              width: '340px',
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              borderLeft: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {documentPanel}
        </Drawer>
      </Box>
    </Box>
  );
};

export default MainLayout;
