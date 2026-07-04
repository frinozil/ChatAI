'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Divider, Paper, CircularProgress } from '@mui/material';
import { useChat } from '@/hooks/useChat';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';
import TypingIndicator from './TypingIndicator';

export const ChatInterface: React.FC = () => {
  const {
    activeConversation,
    isActiveConvLoading,
    isAiResponding,
    streamingMessage,
    handleSendMessage,
  } = useChat();

  const [inputPrefill, setInputPrefill] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const messages = activeConversation?.messages || [];

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Trigger scrolling on chat updates
  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isAiResponding, streamingMessage?.content]);

  const handleSelectPrompt = (promptText: string) => {
    setInputPrefill(promptText);
    // Clear prefill shortly after to allow re-triggering
    setTimeout(() => setInputPrefill(''), 100);
  };

  return (
    <Box className="flex-column" sx={{ height: '100%', overflow: 'hidden', bgcolor: 'background.default' }}>
      {/* Active Conversation Title Header */}
      {activeConversation && (
        <Box
          className="flex-between"
          sx={{
            px: 3,
            py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Box sx={{ pr: 2 }}>
            <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
              {activeConversation.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              chatAI Session • {messages.length} messages
            </Typography>
          </Box>
        </Box>
      )}

      {/* Main Conversation Flow Area */}
      <Box
        ref={scrollContainerRef}
        className="scrollable-content flex-1"
        sx={{
          px: { xs: 2, sm: 3 },
          py: 3,
        }}
      >
        {isActiveConvLoading ? (
          <Box
            className="flex-center flex-column flex-1"
            sx={{
              height: '100%',
              gap: 2,
            }}
          >
            <CircularProgress size={32} />
            <Typography variant="body2" color="text.secondary">
              Loading conversation details...
            </Typography>
          </Box>
        ) : messages.length === 0 && !streamingMessage ? (
          <EmptyState onSelectPrompt={handleSelectPrompt} />
        ) : (
          <Box className="flex-1" sx={{ width: '100%', maxWidth: '900px', mx: 'auto' }}>
            {/* Render historic messages */}
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {/* Render typing indicator */}
            {isAiResponding && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 3 }}>
                <Box
                  className="flex-center"
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                  }}
                >
                  <CircularProgress size={16} color="inherit" sx={{ color: 'white' }} />
                </Box>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1.5,
                    borderRadius: '20px 20px 20px 4px',
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <TypingIndicator />
                </Paper>
              </Box>
            )}

            {/* Render streaming AI text output */}
            {streamingMessage && <MessageBubble message={streamingMessage} />}

            {/* Anchor scroll point */}
            <div ref={messagesEndRef} />
          </Box>
        )}
      </Box>

      {/* Footer Chat Input Area */}
      <Divider />
      <Box sx={{ bgcolor: 'background.paper', py: 1 }}>
        <ChatInput
          onSend={handleSendMessage}
          disabled={isActiveConvLoading || isAiResponding || !!streamingMessage}
          initialValue={inputPrefill}
        />
      </Box>
    </Box>
  );
};

export default ChatInterface;
