'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  List,
} from '@mui/material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useDocs } from '@/hooks/useDocs';
import UploadZone from './UploadZone';
import DocumentCard from './DocumentCard';
import SectionHeader from '@/components/ui/SectionHeader';
import SearchInput from '@/components/ui/SearchInput';

export const DocumentPanel: React.FC = () => {
  const { documents, isDocsLoading, handleUpload, deleteDocument, isUploading } = useDocs();
  const [docFilter, setDocFilter] = useState('');

  // Filter documents in local panel
  const filteredDocs = documents.filter((d) =>
    d.name.toLowerCase().includes(docFilter.toLowerCase())
  );

  return (
    <Box
      className="flex-column"
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        width: '100%',
      }}
    >
      {/* Header */}
      <SectionHeader
        title="Knowledge Base"
        icon={<DescriptionRoundedIcon color="primary" sx={{ fontSize: 22 }} />}
        badgeCount={documents.length}
      />

      <Divider />

      {/* Upload Zone Section */}
      <Box sx={{ px: 2, py: 2 }}>
        <UploadZone onUpload={handleUpload} isUploading={isUploading} />
      </Box>

      <Divider />

      {/* Search Documents locally */}
      <Box sx={{ px: 2, py: 2 }}>
        <SearchInput
          placeholder="Filter documents..."
          value={docFilter}
          onChange={setDocFilter}
        />
      </Box>

      {/* Document List */}
      <Box className="scrollable-content flex-1" sx={{ px: 2, pb: 2 }}>
        {isDocsLoading ? (
          <Box className="flex-center" sx={{ py: 6 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredDocs.length === 0 ? (
          <Box
            className="flex-center flex-column"
            sx={{
              py: 8,
              px: 2,
              border: '1px dashed',
              borderColor: 'divider',
              borderRadius: '12px',
              bgcolor: 'background.default',
            }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {docFilter ? 'No files match filtering criteria.' : 'No documents in workspace.'}
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredDocs.map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onDelete={() => deleteDocument(doc.id)}
              />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default DocumentPanel;
