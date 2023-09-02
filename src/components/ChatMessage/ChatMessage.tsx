import { Box, Typography } from '@mui/material';
import React from 'react';

interface ChatMessageProps {
  message: string;
  timestamp: Date;
  sender: string;
  isMessageSentByMe: boolean;
}

const ChatMessage = (props: ChatMessageProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: props.isMessageSentByMe ? 'flex-end' : 'flex-start',
      }}
    >
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: props.isMessageSentByMe ? '#dcf8c6' : '#43125912',
          margin: '1rem',
          borderRadius: '1rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          borderBottomLeftRadius: props.isMessageSentByMe ? '0.5rem' : '0',
          borderBottomRightRadius: props.isMessageSentByMe ? '0' : '0.5rem',
        }}
      >
        <Typography variant="body1" color="initial">
          {props.message}
        </Typography>
        <Typography variant="caption" color="initial">
          {props.timestamp.toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatMessage;
