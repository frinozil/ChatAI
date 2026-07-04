'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useChat } from '@/hooks/useChat';
import { useAppState } from '@/context/AppContext';
import ConversationItem from './ConversationItem';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SearchInput from '@/components/ui/SearchInput';

export const Sidebar: React.FC = () => {
  const {
    conversations,
    isConversationsLoading,
    createConversation,
    deleteConversation,
    isCreatingConversation,
  } = useChat();

  const { activeConversationId, setActiveConversationId, setIsSidebarOpen } = useAppState();
  const [convSearchText, setConvSearchText] = useState('');

  // Filter conversations based on local sidebar search
  const filteredConversations = conversations.filter((c) =>
    c.title.toLowerCase().includes(convSearchText.toLowerCase())
  );

  const handleNewChat = () => {
    createConversation('New Chat');
    setConvSearchText('');
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  const handleSelectConv = (id: string) => {
    setActiveConversationId(id);
    setIsSidebarOpen(false); // Close sidebar on mobile
  };

  return (
    <Box
      className="flex-column"
      sx={{
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        width: '100%',
        userSelect: 'none',
      }}
    >
      {/* New Chat Button */}
      <Box sx={{ px: 2, pt: 2, pb: 2 }}>
        <PrimaryButton
          fullWidth
          loading={isCreatingConversation}
          startIcon={<AddRoundedIcon />}
          onClick={handleNewChat}
        >
          New Chat
        </PrimaryButton>
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 2, pb: 2 }}>
        <SearchInput
          placeholder="Search chats..."
          value={convSearchText}
          onChange={setConvSearchText}
        />
      </Box>

      <Divider />

      {/* Conversations List */}
      <Box className="scrollable-content flex-1" sx={{ px: 1.5, py: 2 }}>
        <Typography
          variant="caption"
          sx={{
            px: 1,
            mb: 1,
            display: 'block',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 700,
            color: 'text.disabled',
          }}
        >
          Recent Chats
        </Typography>

        {isConversationsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredConversations.length === 0 ? (
          <Box sx={{ py: 6, px: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {convSearchText ? 'No matches found.' : 'No conversations yet.'}
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {filteredConversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                active={activeConversationId === conv.id}
                onSelect={() => handleSelectConv(conv.id)}
                onDelete={() => deleteConversation(conv.id)}
              />
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
