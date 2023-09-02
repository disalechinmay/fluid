import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  accessTokenAtom,
  isAppDrawerVisibleAtom,
  messagesAtom,
  selectedChatAtom,
  userAtom,
} from '../../state';
import { Box, TextField, Typography, Button, IconButton } from '@mui/material';
import { DRAWER_WIDTH, MainContent } from '../AppDrawer/AppDrawer';
import Loader from '../Loader/Loader';
import { fetchChatMessages, postMessage } from '../../utils/api';
import ChatMessage from '../ChatMessage/ChatMessage';
import SendIcon from '@mui/icons-material/Send';

const ChatCanvas = () => {
  const [selectedChat, setSelectedChat] = useRecoilState(selectedChatAtom);
  const [isAppDrawerVisible, setIsAppDrawerVisible] = useRecoilState(
    isAppDrawerVisibleAtom
  );
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenAtom);
  const [currentUser, setCurrentUser] = useRecoilState(userAtom);
  const [message, setMessage] = useState('');
  const chatCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  const fetchMessages = async () => {
    const messages = await fetchChatMessages(
      accessToken as string,
      selectedChat as string
    );
    setMessages(messages);
  };

  const sendMessage = async () => {
    await postMessage(
      accessToken as string,
      selectedChat as string,
      currentUser.uid,
      message
    );
    setMessage('');
  };

  const scrollToBottom = () => {
    console.log('scrolling');
    chatCanvasRef.current?.scrollTo(0, chatCanvasRef.current?.scrollHeight);
  };

  if (!selectedChat)
    return (
      <MainContent open={isAppDrawerVisible}>
        <Typography variant="body1" color="initial">
          Select a chat to get started
        </Typography>
      </MainContent>
    );
  else {
    if (messages == null) {
      return <Loader />;
    }
  }
  return (
    <MainContent open={isAppDrawerVisible}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'scroll',
          }}
          ref={chatCanvasRef}
          onChange={scrollToBottom}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.text + message.timestamp + message.sender.email}
              message={message.text}
              timestamp={new Date(message.timestamp)}
              sender={message.sender.email}
              isMessageSentByMe={message.sender.email === currentUser.email}
            />
          ))}
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Type a message to send"
            variant="outlined"
            size="small"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            aria-label="Send"
            sx={{
              marginLeft: '1rem',
            }}
            size="large"
            onClick={() => sendMessage()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </MainContent>
  );
};

export default ChatCanvas;
