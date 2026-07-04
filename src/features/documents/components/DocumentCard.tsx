'use client';

import React from 'react';
import {
  CardContent,
  Typography,
  Box,
  IconButton,
  LinearProgress,
  Chip,
  Tooltip,
} from '@mui/material';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import { Document } from '@/types/document';
import AppCard from '@/components/ui/AppCard';

interface DocumentCardProps {
  document: Document;
  onDelete: () => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  const { name, size, uploadDate, status, progress, errorMessage } = document;

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format date
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  // Get file type icon
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return <PictureAsPdfRoundedIcon sx={{ color: '#EF4444', fontSize: 22 }} />;
    } else if (ext === 'docx') {
      return <DescriptionRoundedIcon sx={{ color: '#2563EB', fontSize: 22 }} />;
    } else if (ext === 'txt') {
      return <InsertDriveFileRoundedIcon sx={{ color: '#6B7280', fontSize: 22 }} />;
    }
    return <InsertDriveFileRoundedIcon sx={{ color: '#9CA3AF', fontSize: 22 }} />;
  };

  // Render status indicator
  const renderStatus = () => {
    switch (status) {
      case 'Processing':
        return (
          <Chip
            size="small"
            icon={<LoopRoundedIcon className="spin-animation" sx={{ fontSize: '14px !important' }} />}
            label={`Processing ${progress !== undefined ? `${progress}%` : ''}`}
            color="warning"
            variant="outlined"
            sx={{ borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}
          />
        );
      case 'Ready':
        return (
          <Chip
            size="small"
            icon={<CheckCircleRoundedIcon sx={{ fontSize: '14px !important' }} />}
            label="Ready"
            color="success"
            variant="outlined"
            sx={{ borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}
          />
        );
      case 'Failed':
        return (
          <Tooltip title={errorMessage || 'Processing failed'}>
            <Chip
              size="small"
              icon={<ErrorRoundedIcon sx={{ fontSize: '14px !important' }} />}
              label="Failed"
              color="error"
              variant="outlined"
              sx={{ borderRadius: '6px', fontSize: '11px', fontWeight: 500 }}
            />
          </Tooltip>
        );
    }
  };

  return (
    <AppCard
      sx={{
        mb: 1.5,
        borderColor: status === 'Failed' ? 'error.light' : 'divider',
        bgcolor: status === 'Failed' ? 'error.lighter' : 'background.paper',
        '&:hover': {
          borderColor: status === 'Failed' ? 'error.main' : 'primary.main',
          boxShadow: 1,
        },
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
          {/* File Icon */}
          <Box sx={{ mt: 0.5 }}>{getFileIcon(name)}</Box>

          {/* Details */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap sx={{ color: 'text.primary', fontWeight: 600 }}>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
              {formatSize(size)} • {formatDate(uploadDate)}
            </Typography>
            
            <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {renderStatus()}
              
              {status !== 'Processing' && (
                <IconButton
                  size="small"
                  onClick={onDelete}
                  color="default"
                  sx={{ p: 0.5, '&:hover': { color: 'error.main' } }}
                  aria-label="Delete document"
                >
                  <DeleteRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        {/* Progress bar for uploading/processing */}
        {status === 'Processing' && progress !== undefined && (
          <Box sx={{ width: '100%', mt: 1.5 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="warning"
              sx={{ height: 4, borderRadius: 2 }}
            />
          </Box>
        )}
      </CardContent>
    </AppCard>
  );
};

export default DocumentCard;
