'use client';

import React, { useEffect } from 'react';
import { Box, IconButton, InputBase, Paper, Tooltip } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  message: z.string().trim().min(1),
});

type FormData = z.infer<typeof schema>;

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  initialValue?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled, initialValue = '' }) => {
  const { control, handleSubmit, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { message: '' },
  });

  // Sync initialValue changes (for starter prompts)
  useEffect(() => {
    if (initialValue) {
      setValue('message', initialValue, { shouldValidate: true });
    }
  }, [initialValue, setValue]);

  const onSubmit = (data: FormData) => {
    onSend(data.message);
    reset({ message: '' });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
    onSubmitFn: () => void
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent standard newline
      onSubmitFn();
    }
  };

  const handleAttachmentClick = () => {
    document.getElementById('upload-zone-file-input')?.click();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex-column"
      sx={{
        width: '100%',
        maxWidth: '900px', // Matches chat thread reading width
        mx: 'auto',
        position: 'relative',
        px: { xs: 2, sm: 3 },
        pb: { xs: 2, sm: 3 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '24px', // Pill-shaped search box style
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 150ms ease-in-out',
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.15)' : 'rgba(96, 165, 250, 0.15)'}`,
          },
        }}
      >
        {/* Attachment Button */}
        <Tooltip title="Attach files (PDF, DOCX, TXT)">
          <IconButton
            onClick={handleAttachmentClick}
            disabled={disabled}
            sx={{
              p: '8px',
              color: 'text.secondary',
              mr: 0.5,
            }}
          >
            <AttachFileRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
              multiline
              maxRows={6}
              disabled={disabled}
              placeholder="Ask anything about your documents..."
              sx={{
                ml: 0.5,
                flex: 1,
                fontSize: '15px',
                lineHeight: 1.5,
                color: 'text.primary',
                '& textarea': {
                  overflowY: 'auto !important',
                },
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                handleKeyDown(e, handleSubmit(onSubmit))
              }
            />
          )}
        />

        <Tooltip title="Send message">
          <span>
            <IconButton
              type="submit"
              disabled={disabled}
              sx={{
                p: '8px',
                bgcolor: disabled ? 'transparent' : 'primary.main',
                color: disabled ? 'text.disabled' : 'white',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
              aria-label="Send message"
            >
              <SendRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </span>
        </Tooltip>
      </Paper>
    </Box>
  );
};

export default ChatInput;
