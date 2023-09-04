import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ReplyIcon from '@mui/icons-material/Reply';

interface ChatMessageProps {
  message: string;
  timestamp: Date;
  sender: string;
  isMessageSentByMe: boolean;
  setReplyingToMessage: React.Dispatch<React.SetStateAction<string>>;
}

const ChatMessage = (props: ChatMessageProps) => {
  const [isReplyButtonVisible, setIsReplyButtonVisible] = React.useState(false);
  const [splitMessage, setSplitMessage] = React.useState<string[]>([]);
  const [isReply, setIsReply] = React.useState(false);

  useEffect(() => {
    const splitMessage = props.message.split(REPLY_SEPARATOR);
    console.log(splitMessage);
    if (splitMessage.length > 1) {
      setIsReply(true);
    } else {
      setIsReply(false);
    }
    setSplitMessage(splitMessage);
  }, [props.message]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: props.isMessageSentByMe ? 'flex-end' : 'flex-start',
      }}
      onMouseEnter={() => setIsReplyButtonVisible(true)}
      onMouseLeave={() => setIsReplyButtonVisible(false)}
    >
      <Box
        sx={{
          padding: '1rem',
          backgroundColor: props.isMessageSentByMe ? '#dcf8c6' : '#f2defa',
          margin: '1rem',
          borderRadius: '1rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          borderBottomLeftRadius: props.isMessageSentByMe ? '0.5rem' : '0',
          borderBottomRightRadius: props.isMessageSentByMe ? '0' : '0.5rem',
          maxWidth: '80%',
        }}
      >
        {isReply && (
          <Box
            sx={{
              borderLeft: '4px solid #3f51b5',
              paddingLeft: '0.5rem',
              marginLeft: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <Typography variant="caption" color="initial">
              Replying to: asd {splitMessage[0]}
            </Typography>
          </Box>
        )}
        <Typography variant="body1" color="initial">
          {isReply ? splitMessage[1] : splitMessage[0]}
        </Typography>
        <Typography variant="caption" color="initial" fontSize={'0.6rem'}>
          {props.timestamp.toLocaleString()}
        </Typography>
      </Box>

      {!props.isMessageSentByMe && isReplyButtonVisible && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={'Reply'}>
            <IconButton
              onClick={() =>
                props.setReplyingToMessage(
                  props.message.includes(REPLY_SEPARATOR)
                    ? splitMessage[1]
                    : props.message
                )
              }
            >
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    </Box>
  );
};

export default ChatMessage;

export const REPLY_SEPARATOR = '-*-*-*-';
