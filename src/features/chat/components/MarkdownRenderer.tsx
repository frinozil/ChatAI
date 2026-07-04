'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <Box
      sx={{
        wordBreak: 'break-word',
        '& p': { mb: 1.5, mt: 0, lineHeight: 1.6 },
        '& p:last-child': { mb: 0 },
        '& ul, & ol': { mt: 0, mb: 1.5, pl: 3 },
        '& li': { mb: 0.5, lineHeight: 1.6 },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          mt: 2.5,
          mb: 1.5,
          fontWeight: 600,
          color: 'text.primary',
        },
        '& h1': { fontSize: '1.5rem' },
        '& h2': { fontSize: '1.25rem' },
        '& h3': { fontSize: '1.1rem' },
      }}
    >
      <ReactMarkdown
        components={{
          // Render paragraph with typography
          p: ({ ...props }) => (
            <Typography variant="body2" component="p" {...props} />
          ),
          // Render tables with MUI table components
          table: ({ ...props }) => (
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ my: 2, overflowX: 'auto', borderRadius: '8px' }}
            >
              <Table size="small" {...props} />
            </TableContainer>
          ),
          thead: ({ ...props }) => <TableHead {...props} />,
          tbody: ({ ...props }) => <TableBody {...props} />,
          tr: ({ ...props }) => <TableRow {...props} />,
          th: ({ align, ...props }) => (
            <TableCell
              align={align && align !== 'char' ? align : undefined}
              sx={{
                fontWeight: 'bold',
                bgcolor: 'action.hover',
                borderBottom: '2px solid',
                borderColor: 'divider',
                py: 1,
              }}
              {...props}
            />
          ),
          td: ({ align, ...props }) => (
            <TableCell
              align={align && align !== 'char' ? align : undefined}
              sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}
              {...props}
            />
          ),
          // Render inline and block code
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <Box
                component="code"
                sx={{
                  bgcolor: 'action.hover',
                  px: 0.8,
                  py: 0.25,
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '0.85em',
                  color: 'secondary.main',
                  fontWeight: 600,
                  display: 'inline',
                }}
                {...props}
              >
                {children}
              </Box>
            ) : (
              <Box
                component="pre"
                sx={{
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2,
                  borderRadius: '8px',
                  overflowX: 'auto',
                  fontFamily: 'monospace',
                  fontSize: '0.9em',
                  my: 2,
                  color: 'text.primary',
                }}
              >
                <code {...props}>{children}</code>
              </Box>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
