'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useAppTheme } from '@/context/ThemeContext';
import { useAppState } from '@/context/AppContext';

export const AppHeader: React.FC = () => {
  const { mode, toggleTheme } = useAppTheme();
  const {
    isDocPanelOpen,
    setIsDocPanelOpen,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileDocOpen,
    setIsMobileDocOpen,
  } = useAppState();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: mode === 'light' ? 'rgba(250, 250, 250, 0.8)' : 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar className="flex-between" sx={{ minHeight: '64px', px: { xs: 1.5, sm: 2 } }}>
        {/* Left Side: Mobile Menu Trigger & Logo */}
        <Box className="flex-center" sx={{ gap: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            sx={{
              color: 'text.primary',
              fontSize: '18px',
              fontWeight: 500, // Medium font weight as per guidelines
              letterSpacing: '-0.3px',
            }}
          >
            chatAI
          </Typography>
        </Box>

        {/* Center: Empty (Global Search Bar removed) */}
        <Box className="flex-center flex-1" />

        {/* Right Side: Theme Toggle & Document Panel Toggle */}
        <Box className="flex-center" sx={{ gap: 1 }}>
          {/* Theme Toggler */}
          <Tooltip title={mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
            </IconButton>
          </Tooltip>

          {/* Desktop Document Sidebar Toggle */}
          <Tooltip title={isDocPanelOpen ? 'Hide Knowledge Base' : 'Show Knowledge Base'}>
            <IconButton
              color="inherit"
              onClick={() => setIsDocPanelOpen(!isDocPanelOpen)}
              sx={{ display: { xs: 'none', lg: 'inline-flex' } }}
            >
              {isDocPanelOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </Tooltip>

          {/* Tablet/Mobile Document Drawer Trigger */}
          <Tooltip title="View Knowledge Base">
            <IconButton
              color="inherit"
              onClick={() => setIsMobileDocOpen(!isMobileDocOpen)}
              sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
            >
              <DescriptionOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
