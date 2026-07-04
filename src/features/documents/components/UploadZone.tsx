'use client';

import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onUpload, isUploading }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Paper
      variant="outlined"
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      sx={{
        p: 3,
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'divider',
        bgcolor: isDragActive ? 'action.hover' : 'background.default',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'action.hover',
        },
      }}
      onClick={onButtonClick}
    >
      <input
        ref={fileInputRef}
        id="upload-zone-file-input"
        type="file"
        style={{ display: 'none' }}
        accept=".pdf,.docx,.txt"
        onChange={handleFileInput}
        disabled={isUploading}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <CloudUploadRoundedIcon
          sx={{
            fontSize: 40,
            color: isDragActive ? 'primary.main' : 'text.disabled',
            transition: 'transform 0.2s',
            transform: isDragActive ? 'scale(1.1)' : 'none',
          }}
        />
        <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
          Drag & drop your files here
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supports PDF, DOCX or TXT (Max 10MB)
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ my: 0.5 }}>
          — or —
        </Typography>
        <Button
          variant="outlined"
          size="small"
          disabled={isUploading}
          onClick={(e) => {
            e.stopPropagation(); // Prevent duplicate file dialog from paper click
            onButtonClick();
          }}
          sx={{ borderRadius: '8px', px: 2 }}
        >
          Select File
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadZone;
