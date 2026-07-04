'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChatService } from '@/services/chat.service';
import { useAppState } from '@/context/AppContext';
import { useState, useRef, useEffect } from 'react';
import { Message, Conversation } from '@/types/chat';
import { AxiosResponse } from 'axios';

export function useChat() {
  const queryClient = useQueryClient();
  const { activeConversationId, setActiveConversationId, showNotification } = useAppState();

  // Active streaming state
  const [streamingMessage, setStreamingMessage] = useState<Message | null>(null);
  const [isAiResponding, setIsAiResponding] = useState(false); // Typing indicator state

  const streamingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
    };
  }, []);

  // Fetch all conversations
  const {
    data: conversationsData,
    isLoading: isConversationsLoading,
    refetch: refetchConversations,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => ChatService.getConversations(),
    select: (res) => res.data,
  });

  const conversations = conversationsData || [];

  // Fetch active conversation detail
  const {
    data: activeConversationData,
    isLoading: isActiveConvLoading,
  } = useQuery({
    queryKey: ['conversation', activeConversationId],
    queryFn: () => ChatService.getConversationById(activeConversationId!),
    enabled: !!activeConversationId,
    select: (res) => res.data,
  });

  const activeConversation = activeConversationData || null;

  // Create new conversation mutation
  const createConversationMutation = useMutation({
    mutationFn: (title?: string) => ChatService.createConversation(title),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      setActiveConversationId(res.data.id);
      showNotification('New conversation created', 'success');
    },
    onError: () => {
      showNotification('Failed to create new conversation', 'error');
    },
  });

  // Delete conversation mutation
  const deleteConversationMutation = useMutation({
    mutationFn: (id: string) => ChatService.deleteConversation(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
      showNotification('Conversation deleted', 'success');
    },
    onError: () => {
      showNotification('Failed to delete conversation', 'error');
    },
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: ({ convId, text }: { convId: string; text: string }) =>
      ChatService.sendMessage(convId, text),
    onMutate: async ({ convId, text }) => {
      // Set AI responding state to true (typing indicator shows)
      setIsAiResponding(true);

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['conversation', convId] });

      // Snapshot previous value
      const previousConv = queryClient.getQueryData<AxiosResponse<Conversation>>([
        'conversation',
        convId,
      ]);

      // Optimistically append user message to the UI
      if (previousConv && previousConv.data) {
        const userMsg: Message = {
          id: `temp_u_${Date.now()}`,
          role: 'user',
          content: text,
          timestamp: new Date().toISOString(),
        };
        queryClient.setQueryData(['conversation', convId], {
          ...previousConv,
          data: {
            ...previousConv.data,
            messages: [...previousConv.data.messages, userMsg],
          },
        });
      }

      return { previousConv };
    },
    onSuccess: (res, { convId }) => {
      // Invalidate conversations list to show updated lastUpdated and title ordering
      queryClient.invalidateQueries({ queryKey: ['conversations'] });

      // Turn off typing indicator, prepare to stream response
      setIsAiResponding(false);

      const { userMessage, assistantMessage } = res.data;

      // Ensure the query cache contains the user message
      const currentConv = queryClient.getQueryData<AxiosResponse<Conversation>>([
        'conversation',
        convId,
      ]);
      if (currentConv && currentConv.data) {
        const baseMessages = currentConv.data.messages
          ? currentConv.data.messages.filter((m: Message) => !m.id.startsWith('temp_u_'))
          : [];

        // Set state with user message saved, and initiate streaming for assistant
        queryClient.setQueryData(['conversation', convId], {
          ...currentConv,
          data: {
            ...currentConv.data,
            messages: [...baseMessages, userMessage],
          },
        });

        // Trigger character-by-character streaming effect
        streamAssistantResponse(convId, assistantMessage);
      }
    },
    onError: (err, { convId }, context) => {
      setIsAiResponding(false);
      if (context?.previousConv) {
        queryClient.setQueryData(['conversation', convId], context.previousConv);
      }
      showNotification('Failed to send message', 'error');
    },
  });

  const streamAssistantResponse = (convId: string, assistantMsg: Message) => {
    let index = 0;
    const fullText = assistantMsg.content;
    const charsPerTick = 3; // speed of streaming
    const tickInterval = 25; // ms

    // Pre-initialize streaming state
    const streamingObj: Message = {
      ...assistantMsg,
      content: '',
    };
    setStreamingMessage(streamingObj);

    if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);

    streamingTimerRef.current = setInterval(() => {
      index += charsPerTick;
      if (index >= fullText.length) {
        // Finished streaming
        if (streamingTimerRef.current) clearInterval(streamingTimerRef.current);
        setStreamingMessage(null);

        // Save complete message in React Query cache
        const currentConv = queryClient.getQueryData<AxiosResponse<Conversation>>([
          'conversation',
          convId,
        ]);
        if (currentConv && currentConv.data) {
          queryClient.setQueryData(['conversation', convId], {
            ...currentConv,
            data: {
              ...currentConv.data,
              messages: [
                ...currentConv.data.messages.filter((m: Message) => m.id !== assistantMsg.id),
                assistantMsg,
              ],
            },
          });
        }
        
        // Invalidate conversation to ensure cache state matches mock backend state
        queryClient.invalidateQueries({ queryKey: ['conversation', convId] });
      } else {
        // Update partial text
        setStreamingMessage((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            content: fullText.substring(0, index),
          };
        });
      }
    }, tickInterval);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    if (!activeConversationId) {
      // Create new conversation first, then send
      createConversationMutation.mutate('New Chat', {
        onSuccess: (res) => {
          sendMessageMutation.mutate({ convId: res.data.id, text });
        },
      });
    } else {
      sendMessageMutation.mutate({ convId: activeConversationId, text });
    }
  };

  return {
    conversations,
    activeConversation,
    isConversationsLoading,
    isActiveConvLoading: isActiveConvLoading || createConversationMutation.isPending,
    isAiResponding,
    streamingMessage,
    handleSendMessage,
    createConversation: (title?: string) => createConversationMutation.mutate(title),
    deleteConversation: (id: string) => deleteConversationMutation.mutate(id),
    isCreatingConversation: createConversationMutation.isPending,
    refetchConversations,
  };
}
