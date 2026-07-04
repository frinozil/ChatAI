'use client';

import React, { useState } from 'react';
import {
  ListItemButton,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import { Conversation } from '@/types/chat';

interface ConversationItemProps {
  conversation: Conversation;
  active: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  active,
  onSelect,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to format date
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return date.toLocaleDateString([], { weekday: 'short' });
      } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      }
    } catch {
      return '';
    }
  };

  const lastMessage = conversation.messages && conversation.messages.length > 0
    ? conversation.messages[conversation.messages.length - 1]
    : null;
  const previewText = lastMessage ? lastMessage.content : 'No messages yet';

  return (
    <ListItemButton
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        mb: 0.5,
        py: 1.2,
        px: 1.5,
        bgcolor: active ? 'action.selected' : 'transparent',
        borderLeft: '3px solid',
        borderLeftColor: active ? 'primary.main' : 'transparent',
        '&:hover': {
          bgcolor: active ? 'action.selected' : 'action.hover',
        },
      }}
    >
      <Box className="flex-column" sx={{ width: '100%', gap: 0.5 }}>
        {/* Top row: Icon + Title + Timestamp */}
        <Box className="flex-between" sx={{ width: '100%', gap: 1 }}>
          <Box className="flex-center" sx={{ gap: 1, minWidth: 0 }}>
            {active ? (
              <ChatRoundedIcon color="primary" sx={{ fontSize: 16 }} />
            ) : (
              <ChatBubbleRoundedIcon color="action" sx={{ fontSize: 16 }} />
            )}
            <Typography
              variant="body2"
              noWrap
              sx={{
                color: active ? 'text.primary' : 'text.secondary',
                fontWeight: active ? 500 : 400,
                fontSize: '14px',
              }}
            >
              {conversation.title}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: '11px', flexShrink: 0 }}>
            {formatTime(conversation.lastUpdated)}
          </Typography>
        </Box>

        {/* Bottom row: Message Preview + Delete Icon */}
        <Box className="flex-between" sx={{ width: '100%', gap: 1, height: '18px' }}>
          <Typography
            variant="caption"
            className="text-ellipsis"
            sx={{
              color: 'text.secondary',
              opacity: 0.7,
              fontSize: '12px',
              minWidth: 0,
              flex: 1,
            }}
          >
            {previewText}
          </Typography>
          {isHovered && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              sx={{
                p: 0.25,
                color: 'text.disabled',
                '&:hover': { color: 'error.main', bgcolor: 'error.lighter' },
                mt: -0.5,
              }}
              aria-label="Delete chat"
            >
              <DeleteRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Box>
      </Box>
    </ListItemButton>
  );
};

export default ConversationItem;
