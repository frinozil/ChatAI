'use client';

import React from 'react';
import { Box, Avatar, Typography, IconButton, Tooltip } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import SmartToyRoundedIcon from '@mui/icons-material/SmartToyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { Message } from '@/types/chat';
import MarkdownRenderer from './MarkdownRenderer';
import SourceCards from './SourceCards';
import { useAppState } from '@/context/AppContext';
import { chatBubbleStyles } from '@/styles/commonStyles';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { role, content, timestamp, sources } = message;
  const isUser = role === 'user';
  const { showNotification } = useAppState();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    showNotification('Response copied to clipboard', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <Box
      className="flex-column"
      sx={{
        alignItems: isUser ? 'flex-end' : 'flex-start',
        mb: 3.5,
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isUser ? 'row-reverse' : 'row',
          alignItems: 'flex-start',
          gap: 1.5,
          maxWidth: { xs: '100%', sm: '85%', md: '80%' },
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            width: 36,
            height: 36,
            bgcolor: isUser ? 'primary.main' : 'background.paper',
            color: isUser ? 'white' : 'text.secondary',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            border: isUser ? 'none' : '1px solid',
            borderColor: 'divider',
          }}
        >
          {isUser ? <PersonRoundedIcon sx={{ fontSize: 20 }} /> : <SmartToyRoundedIcon sx={{ fontSize: 20 }} />}
        </Avatar>

        {/* Bubble Core */}
        <Box className="flex-column" sx={{ alignItems: isUser ? 'flex-end' : 'flex-start' }}>
          <Box sx={chatBubbleStyles(isUser)}>
            {isUser ? (
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {content}
              </Typography>
            ) : (
              <MarkdownRenderer content={content} />
            )}
          </Box>

          {/* Message Footer Info (Timestamp, Copy Button, Sources) */}
          <Box
            className="flex-center"
            sx={{
              gap: 1,
              mt: 0.75,
              color: 'text.disabled',
              px: 1,
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '10px' }}>
              {formatTime(timestamp)}
            </Typography>
            {!isUser && (
              <Tooltip title={copied ? 'Copied!' : 'Copy message'}>
                <IconButton size="small" onClick={handleCopy} sx={{ p: 0.25, color: 'text.disabled' }}>
                  {copied ? <CheckRoundedIcon sx={{ fontSize: 14 }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 14 }} />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>

      {/* RAG Sources cards under assistant message */}
      {!isUser && sources && sources.length > 0 && (
        <Box sx={{ width: '100%', maxWidth: { xs: '100%', sm: '85%', md: '80%' }, pl: 6.5 }}>
          <SourceCards sources={sources} />
        </Box>
      )}
    </Box>
  );
};

export default MessageBubble;
